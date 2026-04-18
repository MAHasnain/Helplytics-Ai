import Notification from '../models/notification.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user._id })
        .sort({ createdAt: -1 }).limit(20);

    const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

    const totalUnread = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

    console.log("unreadCount", unreadCount);
    console.log("totalUnread", totalUnread);

    res.status(200).json(
        new ApiResponse(200, { notifications, unreadCount, totalUnread }, "Notifications fetched successfully")
    );
}
);

export const markAllRead = asyncHandler(async (req, res) => {
    await Notification.updateMany({ recipient: req.user._id }, { isRead: true });
    res.status(200).json(
        new ApiResponse(200, {}, "All notifications marked as read")
    );
}
);
