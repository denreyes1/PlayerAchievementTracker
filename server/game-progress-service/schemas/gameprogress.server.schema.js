const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Custom scalar type to support arbitrary JSON objects
  scalar JSON

  # GameProgress type represents the progress data for a user
  type GameProgress {
    id: ID!
    userId: ID!
    progress: JSON
  }

  type Query {
    # Retrieves the game progress for a specific user by userId
    getGameProgress(userId: ID!): GameProgress
  }

  type Mutation {
    # Updates the game progress for a specific user. If no record exists, one is created.
    updateGameProgress(userId: ID!, progressData: JSON): GameProgress
  }
`;

module.exports = typeDefs;