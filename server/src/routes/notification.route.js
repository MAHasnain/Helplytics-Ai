import express from 'express';
import { getNotifications, markAllRead } from '../controller/notification.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
    .get(verifyJWT, getNotifications)

router.route('/read-all')
    .patch(verifyJWT, markAllRead);

export default router;