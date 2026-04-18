import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../../logger/winston.logger.js";
import User from "../models/auth.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    };

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);

        console.log(decodedToken?._id);

        let user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        req.user = user;
        next();

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

    } catch (error) {

        console.log(error);
        throw new ApiError(500, error?.message || "Invalid access token");

    }
});

export const verifyRole = (role) => {

    return (req, res, next) => {
        // logger.info("role access ");
        console.log(req.user);
        if (req.user?.role !== role) {
            throw new ApiError(403, "Unauthorized access");
        }
        next();
    }
};
