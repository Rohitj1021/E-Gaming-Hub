const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ['general', 'strategies', 'tournaments', 'teams', 'games', 'off-topic'],
      required: true,
    },
    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumThread',
      },
    ],
    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    rules: [String],
  },
  { timestamps: true }
);

const forumThreadSchema = new mongoose.Schema(
  {
    forumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Forum',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        content: String,
        likes: Number,
        createdAt: Date,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = {
  Forum: mongoose.model('Forum', forumSchema),
  ForumThread: mongoose.model('ForumThread', forumThreadSchema),
};
