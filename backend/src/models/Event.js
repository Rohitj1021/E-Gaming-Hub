const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    eventType: {
      type: String,
      enum: ['tournament', 'meetup', 'stream', 'announcement', 'maintenance'],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    location: String,
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    banner: String,
    link: String,
    reminder: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
