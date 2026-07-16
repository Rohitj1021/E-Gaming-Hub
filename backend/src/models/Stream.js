const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    description: String,
    game: String,
    platform: {
      type: String,
      enum: ['twitch', 'youtube', 'facebook'],
    },
    streamUrl: String,
    isLive: {
      type: Boolean,
      default: false,
    },
    viewers: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    duration: Number,
    startTime: Date,
    endTime: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stream', streamSchema);
