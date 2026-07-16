const mongoose = require('mongoose');

const matchmakingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rank: Number,
    kdRatio: Number,
    preferredRole: String,
    language: String,
    region: String,
    availability: {
      days: [String],
      hours: [String],
    },
    gamePreferences: [String],
    playStyle: String,
    matchedPlayers: [
      {
        playerId: mongoose.Schema.Types.ObjectId,
        compatibilityScore: Number,
        matchedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Matchmaking', matchmakingSchema);
