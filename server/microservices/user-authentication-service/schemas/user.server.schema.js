const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # User type
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
    }

    # Auth response type
    type AuthPayload {
        message: String!
        user: User
    }

    # Generic response
    type Response {
        message: String!
    }

    # Queries (Fetching Data)
    type Query {
        users: [User]
        user(id: ID!): User
    }

    # Mutations (Modifying Data)
    type Mutation {
        registerUser(username: String!, email: String!, password: String!, role: String!): User
        loginUser(username: String!, password: String!): AuthPayload
        logoutUser: Response
    }
`;

module.exports = typeDefs;