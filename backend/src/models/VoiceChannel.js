const mongoose = require('mongoose');

const voiceChannelSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    maxUsers: {
      type: Number,
      default: 50,
    },
    activeUsers: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        joinedAt: Date,
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
    quality: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'high',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VoiceChannel', voiceChannelSchema);
