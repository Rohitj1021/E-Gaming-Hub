const mongoose = require('mongoose');

const collegeLeagueSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
    },
    location: String,
    logo: String,
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    tournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
      },
    ],
    standings: [
      {
        teamId: mongoose.Schema.Types.ObjectId,
        wins: Number,
        losses: Number,
        points: Number,
        rank: Number,
      },
    ],
    season: {
      year: Number,
      startDate: Date,
      endDate: Date,
    },
    registrationDeadline: Date,
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CollegeLeague', collegeLeagueSchema);
