import { Router } from 'express';
import {
    completeOnboarding, getLeaderboard,
    getProfile, getDashboardStats
} from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/onboarding')
    .post(verifyJWT, completeOnboarding);

router.route('/leaderboard')
    .get(verifyJWT, getLeaderboard);

router.route('/dashboard')
    .get(verifyJWT, getDashboardStats);

router.route('/profile/:userId')
    .get(verifyJWT, getProfile);

router.route('/profile')
    .get(verifyJWT, getProfile);

export default router;