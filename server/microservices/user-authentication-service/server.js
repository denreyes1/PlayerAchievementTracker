require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { buildFederatedSchema } = require('@apollo/federation');
const configureMongoose = require('../../config/mongoose');
const typeDefs = require('./schemas/user.server.schema');
const resolvers = require('./resolvers/user.server.resolvers');

const app = express();

const port = 4000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

// Initialize the application
const startServer = async () => {
  // Step 1: Connect to MongoDB
  await configureMongoose();

  // Step 2: Create Apollo Server
  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: ({ req, res }) => ({
      req,  // Pass req object to resolvers
      res,  // Pass res object to resolvers
    }),
  });

  app.listen(process.env.PORT || port, async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Authentication microservice ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

// Start the server
startServer();
