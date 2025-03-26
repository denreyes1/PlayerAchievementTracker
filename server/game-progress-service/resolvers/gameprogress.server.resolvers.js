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
                const newProgress = new GameProgress({ userId, ...progressData });
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
                    { $set: { ...progressData, updatedAt: new Date() } },
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
