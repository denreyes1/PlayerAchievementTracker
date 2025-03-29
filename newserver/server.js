const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Import type definitions and resolvers from both microservices
const gameProgressTypeDefs = require('./microservices/game-progress-service/schemas/gameprogress.schema');
const gameProgressResolvers = require('./microservices/game-progress-service/resolvers/gameprogress.resolvers');
const userTypeDefs = require('./microservices/user-management-service/schemas/user.schema');
const userResolvers = require('./microservices/user-management-service/resolvers/user.resolvers');

async function startServer() {
  const app = express();
  
  // Initialize Apollo Server with the combined typeDefs and resolvers
  const server = new ApolloServer({
    typeDefs: [gameProgressTypeDefs, userTypeDefs],
    resolvers: [gameProgressResolvers, userResolvers],
  });
  
  await server.start();
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();