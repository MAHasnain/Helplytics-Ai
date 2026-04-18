import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createRequest, deleteRequest, getRequestById, getRequests, markSolved, offerHelp } from "../controller/request.controller.js";

const router = Router();

router.route("/")
    .get(verifyJWT, getRequests)
    .post(verifyJWT, createRequest);

router.route("/:id")
    .get(verifyJWT, getRequestById)
    .delete(verifyJWT, deleteRequest);

router.route("/:id/help")
    .post(verifyJWT, offerHelp);

router.route("/:id/solve")
    .patch(verifyJWT, markSolved);

export default router;