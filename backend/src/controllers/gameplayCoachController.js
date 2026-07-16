const GameplayTip = require('../models/GameplayTip');
const User = require('../models/User');

// @desc Generate gameplay tips using AI
exports.generateGameplayTips = async (req, res) => {
  try {
    const { userId, game, role } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Simulate AI analysis
    const tips = generateAITips(user, game, role);

    let gameplayTip = await GameplayTip.findOne({ userId, game });

    if (!gameplayTip) {
      gameplayTip = new GameplayTip({
        userId,
        game,
        role,
        ...tips,
      });
    } else {
      gameplayTip.tips = tips.tips;
      gameplayTip.aimTips = tips.aimTips;
      gameplayTip.strategyTips = tips.strategyTips;
      gameplayTip.weaponRecommendations = tips.weaponRecommendations;
      gameplayTip.improvementAreas = tips.improvementAreas;
    }

    await gameplayTip.save();

    res.json({ tips: gameplayTip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get gameplay tips for user
exports.getGameplayTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { game } = req.query;

    const tips = await GameplayTip.findOne({ userId, game });

    if (!tips) {
      return res.status(404).json({ error: 'No tips found for this game' });
    }

    res.json({ tips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get aim improvement suggestions
exports.getAimTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { game } = req.query;

    const tips = await GameplayTip.findOne({ userId, game });

    if (!tips) {
      return res.status(404).json({ error: 'No aim tips found' });
    }

    res.json({ aimTips: tips.aimTips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get strategy suggestions
exports.getStrategyTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { game } = req.query;

    const tips = await GameplayTip.findOne({ userId, game });

    if (!tips) {
      return res.status(404).json({ error: 'No strategy tips found' });
    }

    res.json({ strategyTips: tips.strategyTips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get weapon recommendations
exports.getWeaponRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { game } = req.query;

    const tips = await GameplayTip.findOne({ userId, game });

    if (!tips) {
      return res.status(404).json({ error: 'No weapon recommendations found' });
    }

    res.json({ weapons: tips.weaponRecommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// AI Tips Generation Logic
const generateAITips = (user, game, role) => {
  const tips = {
    tips: [
      {
        category: 'Movement',
        tip: 'Practice strafing to improve dodge rate and accuracy',
        priority: 1,
      },
      {
        category: 'Crosshair',
        tip: 'Lower sensitivity for better accuracy at range',
        priority: 1,
      },
      {
        category: 'Map Control',
        tip: 'Learn key chokepoints and sightlines for this map',
        priority: 2,
      },
      {
        category: 'Economy',
        tip: 'Master weapon economy and buyout management',
        priority: 2,
      },
      {
        category: 'Communication',
        tip: 'Call out enemy positions clearly for your team',
        priority: 1,
      },
    ],
    aimTips: [
      'Pre-aim common positions before peeking',
      'Use burst fire at medium range for better accuracy',
      'Shoulder peek before full exposing yourself',
      'Practice flick shots in aim trainer for 15 mins daily',
      'Lower your crosshair to head level when holding angles',
    ],
    strategyTips: [
      `Play ${role} role to support your team composition`,
      'Rotate early if you lose your site',
      'Play for picks before team engagements',
      'Use utility effectively to gain map control',
      'Communicate rotations and timings with team',
    ],
    weaponRecommendations: [
      {
        weapon: 'AK-47',
        reason: 'Best damage per shot, ideal for ${role}',
        effectiveness: 95,
      },
      {
        weapon: 'M4A1-S',
        reason: 'Accurate for mid-range engagements',
        effectiveness: 88,
      },
      {
        weapon: 'AWP',
        reason: 'One-shot potential for positioning advantage',
        effectiveness: 90,
      },
    ],
    improvementAreas: [
      {
        area: 'Aim Accuracy',
        currentLevel: user.kdRatio ? Math.min(Math.round(user.kdRatio * 20), 100) : 50,
        targetLevel: 85,
      },
      {
        area: 'Map Knowledge',
        currentLevel: 60,
        targetLevel: 95,
      },
      {
        area: 'Team Coordination',
        currentLevel: 70,
        targetLevel: 90,
      },
      {
        area: 'Positioning',
        currentLevel: 65,
        targetLevel: 88,
      },
    ],
  };

  return tips;
};
