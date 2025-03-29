const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar JSON

  type GameProgress {
    id: ID!
    userId: ID!
    level: Int
    experiencePoints: Int
    score: Int
    rank: Int
    achievements: [String]
    progress: String
    lastPlayed: String
    updatedAt: String
  }

  type Query {
    getGameProgress(userId: ID!): GameProgress
    getLeaderboard(limit: Int): [GameProgress]
  }

  input GameProgressInput {
    level: Int
    experiencePoints: Int
    score: Int
    rank: Int
    achievements: [String]
    progress: String
    lastPlayed: String
    updatedAt: String
  }

  type Mutation {
    addGameProgress(userId: ID!, progressData: GameProgressInput!): GameProgress
    updateGameProgress(userId: ID!, progressData: GameProgressInput!): GameProgress
  }
`;

module.exports = typeDefs;