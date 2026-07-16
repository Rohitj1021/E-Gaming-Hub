const admin = require('firebase-admin');

exports.sendPushNotification = async (tokens, title, body, data) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      data,
      tokens,
    };

    const response = await admin.messaging().sendMulticast(message);

    return {
      success: response.successCount,
      failed: response.failureCount,
    };
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};

exports.sendTournamentReminder = async (userId, tournamentName) => {
  // Get user's FCM tokens
  // Send notification
};

exports.sendMatchStartNotification = async (teamIds, matchName) => {
  // Get tokens for team members
  // Send notification
};

exports.sendAchievementNotification = async (userId, achievementName) => {
  // Send achievement unlocked notification
};
