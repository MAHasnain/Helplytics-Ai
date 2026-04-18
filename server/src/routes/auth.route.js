import { Router } from "express";

import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { editUserProfile, login, logout, registerUser } from "../controller/auth.controller.js";

const router = Router();

router
    .route("/register")
    .post(registerUser);

// router
//     .route("/register-doctor")
//     .post(upload.single("avatar"), registerDoctor);

router
    .route("/login")
    .post(login)

// Secured routes
router
    .route("/profile")
    .put(verifyJWT, upload.single("avatar"), editUserProfile)

// router
//     .route("/refresh-token")
//     .post(verifyJWT, refreshAccessToken)

router
    .route("/logout")
    .post(verifyJWT, logout)

export default router