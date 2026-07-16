const express = require('express');
const { authenticate } = require('../middleware/auth');
const {
  findMatchedTeammates,
  updateMatchmakingProfile,
  getMatchmakingProfile,
  getAIRecommendations,
} = require('../controllers/matchmakingController');

const router = express.Router();

// Update matchmaking profile
router.put('/profile', authenticate, updateMatchmakingProfile);

// Get matchmaking profile
router.get('/profile', authenticate, getMatchmakingProfile);

// Find matched teammates
router.post('/find-teammates', authenticate, findMatchedTeammates);

// Get AI recommendations
router.get('/recommendations', authenticate, getAIRecommendations);

module.exports = router;
