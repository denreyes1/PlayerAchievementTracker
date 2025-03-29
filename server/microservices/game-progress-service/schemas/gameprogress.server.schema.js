const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Import GraphQL JSON scalar
  scalar JSON

  # GameProgress type represents the progress data for a user
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
    # Retrieves the game progress for a specific user by userId
    getGameProgress(userId: ID!): GameProgress

    # Retrieves the leaderboard sorted by rank in ascending order
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
    # Adds a new game progress record for a specific user. Fails if a record already exists.
    addGameProgress(userId: ID!, progressData: GameProgressInput!): GameProgress
    
    # Updates the game progress for a specific user. If no record exists, one is created.
    updateGameProgress(userId: ID!, progressData: GameProgressInput!): GameProgress
  }
`;

module.exports = typeDefs;
