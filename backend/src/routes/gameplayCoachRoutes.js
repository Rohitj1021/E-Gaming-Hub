const express = require('express');
const { authenticate } = require('../middleware/auth');
const {
  generateGameplayTips,
  getGameplayTips,
  getAimTips,
  getStrategyTips,
  getWeaponRecommendations,
} = require('../controllers/gameplayCoachController');

const router = express.Router();

// Generate gameplay tips
router.post('/tips/generate', authenticate, generateGameplayTips);

// Get gameplay tips
router.get('/tips', authenticate, getGameplayTips);

// Get aim tips
router.get('/aim-tips', authenticate, getAimTips);

// Get strategy tips
router.get('/strategy-tips', authenticate, getStrategyTips);

// Get weapon recommendations
router.get('/weapons', authenticate, getWeaponRecommendations);

module.exports = router;
