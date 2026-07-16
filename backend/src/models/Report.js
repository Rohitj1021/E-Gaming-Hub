const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    matchId: mongoose.Schema.Types.ObjectId,
    reason: {
      type: String,
      enum: ['cheating', 'toxic-behavior', 'harassment', 'bug-abuse', 'other'],
      required: true,
    },
    description: String,
    evidence: [String],
    status: {
      type: String,
      enum: ['pending', 'investigating', 'resolved', 'dismissed'],
      default: 'pending',
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
    },
    investigator: mongoose.Schema.Types.ObjectId,
    resolution: String,
    actionTaken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
