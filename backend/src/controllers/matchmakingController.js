const Matchmaking = require('../models/Matchmaking');
const User = require('../models/User');

// Calculate compatibility score between two players
const calculateCompatibility = (player1, player2) => {
  let score = 100;

  // Rank compatibility (±2 ranks is ideal)
  const rankDiff = Math.abs(player1.rank - player2.rank);
  if (rankDiff <= 2) {
    score += 20;
  } else if (rankDiff <= 5) {
    score += 10;
  } else {
    score -= rankDiff * 2;
  }

  // K/D ratio similarity
  const kdDiff = Math.abs(player1.kdRatio - player2.kdRatio);
  if (kdDiff <= 0.5) {
    score += 15;
  } else if (kdDiff <= 1) {
    score += 8;
  }

  // Role compatibility
  if (player1.preferredRole !== player2.preferredRole) {
    score += 10;
  }

  // Language compatibility
  if (player1.language === player2.language) {
    score += 15;
  }

  // Region compatibility
  if (player1.region === player2.region) {
    score += 20;
  }

  // Availability overlap
  const dayOverlap = player1.availability.days.filter((d) =>
    player2.availability.days.includes(d)
  ).length;
  score += dayOverlap * 2;

  // Game preferences overlap
  const gameOverlap = player1.gamePreferences.filter((g) =>
    player2.gamePreferences.includes(g)
  ).length;
  score += gameOverlap * 5;

  // Play style compatibility
  if (player1.playStyle === player2.playStyle) {
    score += 10;
  }

  return Math.min(score, 100);
};

// @desc Find matched teammates
exports.findMatchedTeammates = async (req, res) => {
  try {
    const userId = req.user.id;
    const { game, limit = 5 } = req.body;

    const currentUser = await Matchmaking.findOne({ userId });

    if (!currentUser) {
      return res.status(404).json({ error: 'User matchmaking profile not found' });
    }

    // Find potential teammates
    const potentialMatches = await Matchmaking.find({
      userId: { $ne: userId },
      gamePreferences: game,
    })
      .populate('userId', 'username avatar rank')
      .limit(50);

    // Calculate compatibility and sort
    const matches = potentialMatches
      .map((player) => ({
        player: player.userId,
        compatibilityScore: calculateCompatibility(currentUser, player),
      }))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, limit);

    // Save matched players
    currentUser.matchedPlayers = matches.map((m) => ({
      playerId: m.player._id,
      compatibilityScore: m.compatibilityScore,
      matchedAt: new Date(),
    }));
    await currentUser.save();

    res.json({ matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Update user matchmaking profile
exports.updateMatchmakingProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rank, kdRatio, preferredRole, language, region, availability, gamePreferences, playStyle } = req.body;

    let profile = await Matchmaking.findOne({ userId });

    if (!profile) {
      profile = new Matchmaking({ userId });
    }

    profile.rank = rank || profile.rank;
    profile.kdRatio = kdRatio || profile.kdRatio;
    profile.preferredRole = preferredRole || profile.preferredRole;
    profile.language = language || profile.language;
    profile.region = region || profile.region;
    profile.availability = availability || profile.availability;
    profile.gamePreferences = gamePreferences || profile.gamePreferences;
    profile.playStyle = playStyle || profile.playStyle;

    await profile.save();

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get matchmaking profile
exports.getMatchmakingProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let profile = await Matchmaking.findOne({ userId }).populate('userId', 'username');

    if (!profile) {
      profile = new Matchmaking({ userId });
      await profile.save();
    }

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Recommend teammates AI algorithm
exports.getAIRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Matchmaking.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Find top 10 best compatible players
    const allPlayers = await Matchmaking.find({ userId: { $ne: userId } })
      .populate('userId', 'username avatar rank');

    const recommendations = allPlayers
      .map((player) => ({
        player: player.userId,
        compatibility: calculateCompatibility(user, player),
        reason: generateRecommendationReason(user, player),
      }))
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 10);

    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateRecommendationReason = (user1, user2) => {
  const reasons = [];

  if (user1.region === user2.region) {
    reasons.push('Same region');
  }

  if (user1.language === user2.language) {
    reasons.push('Same language');
  }

  const dayOverlap = user1.availability.days.filter((d) => user2.availability.days.includes(d)).length;
  if (dayOverlap > 0) {
    reasons.push(`${dayOverlap} days available together`);
  }

  const rankDiff = Math.abs(user1.rank - user2.rank);
  if (rankDiff <= 2) {
    reasons.push('Similar skill level');
  }

  if (user1.preferredRole !== user2.preferredRole) {
    reasons.push('Complementary roles');
  }

  return reasons.join(', ');
};
