const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true,
    },
    totalRegistrations: Number,
    totalTeams: Number,
    totalMatches: Number,
    completedMatches: Number,
    avgMatchDuration: Number,
    peakViewers: Number,
    totalViewerHours: Number,
    engagement: {
      likes: Number,
      comments: Number,
      shares: Number,
    },
    revenue: Number,
    sponsorMetrics: {
      impressions: Number,
      clicks: Number,
      conversions: Number,
    },
    playerStats: [
      {
        playerId: mongoose.Schema.Types.ObjectId,
        matches: Number,
        wins: Number,
        avgKills: Number,
        mvpCount: Number,
      },
    ],
    demographics: {
      ageGroups: {},
      regions: {},
      games: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
