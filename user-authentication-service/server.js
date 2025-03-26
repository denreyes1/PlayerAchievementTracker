require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const connectDB = require('./db');
const { signup, login } = require('./auth');

// Define GraphQL schema
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        logout: Boolean
    }
`;

// Define resolvers
// In-memory token blacklist (for demonstration purposes)
let tokenBlacklist = [];

const resolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token, user };
    },
    logout: (_, __, { token }) => {
      // Add the token to the blacklist
      tokenBlacklist.push(token);
      return true;
    },
  },
};

// Middleware to check for blacklisted tokens
const checkTokenBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token && tokenBlacklist.includes(token)) {
    return res.status(401).send('Token is invalidated');
  }
  next();
};

// Start the server
const startServer = async () => {
  const app = express();
  app.use(checkTokenBlacklist); // Use the middleware to check for blacklisted tokens
  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ token: req.headers.authorization?.split(' ')[1] }) });
  await server.start();
  server.applyMiddleware({ app });

  await connectDB(); // Connect to MongoDB

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();