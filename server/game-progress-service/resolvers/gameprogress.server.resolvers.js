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
                throw new Error(`Error retrieving game progress: ${err.message}`);
            }
        },

        // Retrieve leaderboard sorted by rank (ascending)
        async getLeaderboard(_, { limit }) {
            try {
                const leaderboard = await GameProgress.find({})
                    .sort({ rank: 1 }) // Sorting by rank in ascending order (1st place first)
                    .limit(limit || 10); // Default to top 10 if no limit is provided
                return leaderboard;
            } catch (err) {
                throw new Error(`Error retrieving leaderboard: ${err.message}`);
            }
        }
    },

    Mutation: {
        // Mutation to add new game progress for a specific user; fails if record already exists
        async addGameProgress(_, { userId, progressData }) {
            try {
                const existingProgress = await GameProgress.findOne({ userId });
                if (existingProgress) {
                    throw new Error("Game progress already exists for this user.");
                }
                const newProgress = new GameProgress({ userId, ...progressData, updatedAt: new Date() });
                await newProgress.save();
                return newProgress;
            } catch (err) {
                throw new Error(`Error adding game progress: ${err.message}`);
            }
        },
        
        // Update game progress for a specific user; create record if it doesn't exist
        async updateGameProgress(_, { userId, progressData }) {
            try {
                const updatedProgress = await GameProgress.findOneAndUpdate(
                    { userId },
                    { 
                        $set: { ...progressData, updatedAt: new Date() }
                    },
                    { new: true, upsert: true } // `upsert: true` creates a new document if not found
                );
                return updatedProgress;
            } catch (err) {
                throw new Error(`Error updating game progress: ${err.message}`);
            }
        }
    }
};

module.exports = resolvers;
