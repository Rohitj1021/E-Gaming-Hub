const User = require('../models/User');

// @desc Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('followers')
      .populate('following')
      .populate('achievements');

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { bio, country, level, favoriteGames, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        country,
        level,
        favoriteGames,
        profilePicture,
      },
      { new: true }
    );

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const { type = 'global', limit = 50 } = req.query;

    let query = {};
    if (type === 'country') {
      query.country = req.query.country;
    }

    const leaderboard = await User.find(query)
      .sort({ rank: 1 })
      .limit(parseInt(limit))
      .select('username rank xp level country');

    res.json({ leaderboard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get user stats
exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        username: user.username,
        rank: user.rank,
        xp: user.xp,
        level: user.level,
        followers: user.followers.length,
        following: user.following.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Add friend
exports.addFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.id;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.following.includes(friendId)) {
      user.following.push(friendId);
      friend.followers.push(userId);

      await user.save();
      await friend.save();
    }

    res.json({ message: 'Friend added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Remove friend
exports.removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.id;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.following = user.following.filter((id) => id.toString() !== friendId);
    friend.followers = friend.followers.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get friends
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('following', 'username profilePicture level');

    res.json({ friends: user.following });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
