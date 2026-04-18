import User from '../models/auth.model.js';
import Request from '../models/request.model.js';
import asyncHandler from '../utils/asyncHandler.js';


export const completeOnboarding = asyncHandler(async (req, res) => {
  const { skills, interests, location, role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { skills, interests, location, role, isOnboarded: true },
    { new: true }
  );

  res.json({ success: true, data: { user } });
}
);

export const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select('username trustScore totalHelped badges skills')
    .sort({ trustScore: -1 })
    .limit(10);
  res.json({ success: true, data: users });
}
);

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id || req.user._id)
    .select('-password -refreshToken');
  res.json({ success: true, data: user });
}
);

export const getDashboardStats = asyncHandler(async (req, res) => {

  const myRequests = await Request.find({ author: req.user._id }).limit(5).sort({ createdAt: -1 });
  const myHelping = await Request.find({ helpers: req.user._id }).limit(5);
  const openCount = await Request.countDocuments({ status: 'open' });
  const solvedCount = await Request.countDocuments({ status: 'solved', author: req.user._id });

  res.json({
    success: true,
    data: {
      stats: {
        trustScore: req.user.trustScore,
        totalHelped: req.user.totalHelped,
        totalRequests: req.user.totalRequests,
        openRequests: openCount,
        solved: solvedCount,
      },
      recentRequests: myRequests,
      helpingOn: myHelping,
      badges: req.user.badges,
    }
  });
}
);
