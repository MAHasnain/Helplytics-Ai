import jwt from "jsonwebtoken";
import logger from "../../logger/winston.logger.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/auth.model.js";

const registerUser = asyncHandler(async (req, res) => {
    /*  
     REGISTER USER ALGORITHM
        getting user data
        data validation  not empty
        check user existance in db
        tokens generating 
        image file uploading on cloudinary
        password encryption
        create user object   save in db
        remove pass and token field to response
        check for user creation then return
    */
    logger.info(req.body);
    const { email, username, phoneNumber, dob, password } = req.body;
    // logger.info(email);
    // logger.info(username);
    // logger.info(password);
    // logger.info(role);

    // Validation 
    if ([phoneNumber, dob, username, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedUser = await User.findOne(
        { $or: [{ username }, { email }] }
    )
    logger.info({ "existedUser": existedUser });

    if (existedUser) {
        throw new ApiError(409, "email and username already exist.");
    }

    // const avatarFile = req.file;
    // console.log(avatarFile);
    // if (!avatarFile) {
    //     throw new ApiError(400, "Avatar file is required.");
    // }

    // const patientAvatar = await uploadOnCloudinary(avatarFile.buffer);
    // console.log(patientAvatar);
    // if (!patientAvatar) {
    //     throw new ApiError(400, "Avatar file is required.");
    // }

    const userData = {
        // fullName,
        // avatar: patientAvatar.url,
        email,
        username: username.toLowerCase(),
        phoneNumber,
        password,
        dob,
        // address,
        // role,
        // emergencyContact,
    }
    const patient = await User.create(userData);

    const registered = await User.findById(patient._id).select(
        "-password -refreshToken"
    );

    if (!registered) {
        throw new ApiError(500, "Something went wrong while registering a patient.");
    }
    return res
        .status(201)
        .json(
            new ApiResponse(201, registered, "User registered successfully.")
        );

});

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // save in db
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { refreshToken, accessToken };

    } catch (error) {
        console.log("Token generation error: ", error);
        throw new ApiError(500, "Something went wrong while generating access and refresh token,");
    }
}

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    logger.info({ email, password });

    if ([email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "email or password is required");
    }

    // final check user 
    let user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found.");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(403, "Invalid user credentials.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                { loggedInUser, refreshToken, accessToken },
                "User logged in successfully."
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decodedToken);

        if (decodedToken?.role === "patient") {
            const user = await Patient.findById(decodedToken?._id);

            console.log(user);
            // validation
            if (!user) {
                throw new ApiError(401, "Invalid refresh token")
            };
            if (incommingRefreshToken !== user?.refreshToken) {
                throw new ApiError(401, "Refresh token is expired or used");
            };

            const options = {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            };

            // tokens generating
            const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id, user.role);

            // replace old refreshToken to newRefreshToken
            user.refreshToken = newRefreshToken;
            user.save({ validateBeforeSave: false });

            // return response
            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                    new ApiResponse(200,
                        { accessToken, refreshToken: newRefreshToken },
                        "Access token refreshed"
                    )
                );

        } else if (decodedToken?.role === "doctor") {

            const user = await Doctor.findById(decodedToken?._id);
            console.log(user);
            // validation
            if (!user) {
                throw new ApiError(401, "Invalid refresh token")
            };
            if (incommingRefreshToken !== user?.refreshToken) {
                throw new ApiError(401, "Refresh token is expired or used");
            };

            const options = {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            };

            // tokens generating
            const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id, user.role);

            console.log({ "accessToken": accessToken });

            user.refreshToken = newRefreshToken;
            user.save({ validateBeforeSave: false });

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        { accessToken, refreshToken: newRefreshToken },
                        "Access token refreshed"
                    )
                )
        }

    } catch (error) {
        console.log(error);
        throw new ApiError(401, error?.message, "Invalid refresh token");

    }

});

const editUserProfile = asyncHandler(async (req, res) => {

    console.log(req.body);
    const { fullName, phoneNumber, dob, address, password } = req.body;
    const userId = req.user._id;
    const avatarFile = req.file
    console.log(fullName);
    console.log(userId);

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (password) updateData.password = password;
    if (address) updateData.address = address;
    if (avatarFile) updateData.avatar = avatarFile;
    if (dob) updateData.dob = dob;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User profile updated successfully."
            )
        )
})

const logout = asyncHandler(async (req, res) => {

    console.log("user", req.user);
    await User.findByIdAndUpdate(req.user, {
        $set: {
            refreshToken: ""
        }
    }, { new: true });

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out."))

})

export {
    registerUser,
    login,
    refreshAccessToken,
    logout,
    editUserProfile
}