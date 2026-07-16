const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: String,
    website: String,
    email: String,
    contactPerson: String,
    industry: String,
    sponsorships: [
      {
        tournamentId: mongoose.Schema.Types.ObjectId,
        amount: Number,
        tierLevel: {
          type: String,
          enum: ['bronze', 'silver', 'gold', 'platinum'],
        },
        benefits: [String],
        startDate: Date,
        endDate: Date,
      },
    ],
    totalInvestment: Number,
    roi: Number,
    campaigns: [
      {
        name: String,
        impressions: Number,
        clicks: Number,
        conversions: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sponsor', sponsorSchema);
