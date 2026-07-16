const mongoose = require('mongoose');

const gameplayTipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    game: String,
    role: String,
    tips: [
      {
        category: String,
        tip: String,
        priority: Number,
      },
    ],
    aimTips: [String],
    strategyTips: [String],
    weaponRecommendations: [
      {
        weapon: String,
        reason: String,
        effectiveness: Number,
      },
    ],
    improvementAreas: [
      {
        area: String,
        currentLevel: Number,
        targetLevel: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('GameplayTip', gameplayTipSchema);
