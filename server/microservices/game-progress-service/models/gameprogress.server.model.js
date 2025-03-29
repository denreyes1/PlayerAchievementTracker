const mongoose = require('mongoose');

   const GameProgressSchema = new mongoose.Schema({
       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       level: { type: Number, required: true, default: 1 },
       experiencePoints: { type: Number, required: true, default: 0 },
       score: { type: Number, required: true, default: 0 },
       rank: { type: Number },
       achievements: { type: [String], default: [] },
       progress: { type: String, default: 'Not started' },
       lastPlayed: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now },
   });

   const GameProgress = mongoose.model('GameProgress', GameProgressSchema);
   
   module.exports = GameProgress;