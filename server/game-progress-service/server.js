require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const connectDB = require('./db'); // Ensure this path is correct
const GameProgress = require('./models/GameProgress');

   const typeDefs = gql`
       type GameProgress {
           id: ID!
           userId: ID!
           level: Int!
           experiencePoints: Int!
           score: Int!
           rank: Int
           achievements: [String]
           progress: String
           lastPlayed: String
           updatedAt: String
       }

       type Query {
           getGameProgress(userId: ID!): GameProgress
       }

       type Mutation {
           updateGameProgress(userId: ID!, level: Int, experiencePoints: Int, score: Int): GameProgress
       }
   `;

   const resolvers = {
       Query: {
           getGameProgress: async (_, { userId }) => {
               return await GameProgress.findOne({ userId });
           },
       },
       Mutation: {
           updateGameProgress: async (_, { userId, level, experiencePoints, score }) => {
               const progress = await GameProgress.findOneAndUpdate(
                   { userId },
                   { level, experiencePoints, score, updatedAt: new Date() },
                   { new: true }
               );
               return progress;
           },
       },
   };

   const startServer = async () => {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    await connectDB(); // Connect to MongoDB

    app.listen({ port: 4001 }, () =>
        console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
    );
};

startServer();