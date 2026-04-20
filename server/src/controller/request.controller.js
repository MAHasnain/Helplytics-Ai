import Request from "../models/request.model.js";
import User from "../models/auth.model.js";
import Notification from "../models/notification.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createRequest = asyncHandler(async (req, res) => {
    const { title, description, location, skills } = req.body;

    const request = await Request.create({
        title, description, location, skills,
        category: req.body.category,
        urgency: req.body.urgency,
        tags: req.body.tags,
        author: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { totalRequests: 1 } });

    res.status(201).json(new ApiResponse(201, request, "Request created"));
});

export const getRequests = asyncHandler(async (req, res) => {
    const { category, urgency, status, skills, location, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (urgency) filter.urgency = urgency;
    if (status) filter.status = status;
    if (location) filter.location = new RegExp(location, 'i');
    if (skills) filter.skills = { $in: skills.split(',') };
    if (search) filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') },
    ];

    const requests = await Request.find(filter)
        .populate('author', 'username trustScore badges')
        .sort({ createdAt: -1 });

    res.json(new ApiResponse(200, requests, "Requests retrieved"));

    if (!requests) {
        return res.status(500).json(new ApiError(500, {}, "Internal server error"));
    }
});

export const getRequestById = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)
        .populate('author', 'username skills trustScore badges location')
        .populate('helpers', 'username trustScore badges');

    if (!request) return res.status(404).json(new ApiError(404, {}, "Not found"));
    res.json(
        new ApiResponse(200, request, "Request retrieved"));

    if (!request) {
        return res.status(500).json(new ApiError(500, {}, "Internal server error"));
    }

});

export const offerHelp = asyncHandler(async (req, res) => {

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json(new ApiError(404, {}, "Not found"));

    const alreadyHelping = request.helpers.includes(req.user._id);
    if (alreadyHelping) return res.status(400).json(new ApiError(400, {}, "Already offered help"));

    request.helpers.push(req.user._id);
    request.status = 'in-progress';
    await request.save();

    await Notification.create({
        recipient: request.author,
        message: `${req.user.username} offered to help with "${request.title}"`,
        type: 'help-offer',
        link: `/requests/${request._id}`,
    });

    res.json(new ApiResponse(200, {}, "Help offered"));
});

export const markSolved = asyncHandler(async (req, res) => {

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json(
        new ApiError(404, {}, "Not found"));

    if (String(request.author) !== String(req.user._id))
        return res.status(403).json(
            new ApiError(403, {}, "Only author can mark solved"));

    request.status = 'solved';
    await request.save();

    for (const helperId of request.helpers) {

        const helper = await User.findByIdAndUpdate(
            helperId,
            {
                $inc: { totalHelped: 1, trustScore: 10 }
            },
            { new: true }
        );

        const badges = helper.badges || [];
        if (helper.totalHelped === 1 && !badges.includes('First Helper'))
            badges.push('First Helper');
        if (helper.totalHelped === 5 && !badges.includes('Rising Star'))
            badges.push('Rising Star');
        if (helper.totalHelped === 10 && !badges.includes('Top Contributor'))
            badges.push('Top Contributor');

        await User.findByIdAndUpdate(helperId, { badges });

        await Notification.create({
            recipient: helperId,
            message: `Your help on "${request.title}" was marked solved! +10 trust score`,
            type: 'solved',
            link: `/requests/${request._id}`,
        });
    }

    res.json(new ApiResponse(200, {}, "Marked as solved"));

});

export const deleteRequest = asyncHandler(async (req, res) => {
    
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json(new ApiError(404, {}, "Request not found"));
    
    if (String(request.author) !== String(req.user._id))
        return res.status(403).json(new ApiError(403, {}, "Not authorized"));
    
    await request.deleteOne();

    res.json(new ApiResponse(200, {}, "Request deleted"));
});