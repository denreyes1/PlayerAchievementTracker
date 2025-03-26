
const GameProgress = require('../models/gameprogress.server.model');
require('dotenv').config();

const resolvers = {
    Query: {
        // Retrieve game progress for a specific user by userId
        async getGameProgress(_, { userId }) {
            try {
                const progress = await GameProgress.findOne({ userId });
                if (!progress) {
                    throw new Error("Game progress not found for this user.");
                }
                return progress;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },

    Mutation: {
        // Update game progress for a specific user; create record if it doesn't exist
        async updateGameProgress(_, { userId, progressData }) {
            try {
                let progress = await GameProgress.findOne({ userId });
                if (!progress) {
                    // Create a new record if none exists
                    progress = new GameProgress({ userId, progress: progressData });
                } else {
                    // Merge the new progress data with the existing record
                    progress.progress = { ...progress.progress, ...progressData };
                }
                await progress.save();
                return progress;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
};

module.exports = resolvers;