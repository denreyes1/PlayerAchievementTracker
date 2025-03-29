// server/gateway.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");


// Initialize an Express application
const app = express();

// Middleware
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
//   credentials: true, // Allow cookies to be sent
// }));

app.use(express.json());
app.use(cookieParser());

// Configure the Apollo Gateway
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "auth", url: "http://localhost:4000/graphql" },
      { name: "games", url: "http://localhost:4001/graphql" }
    ],
  }),
});


// Initialize Apollo Server with the Apollo Gateway
const server = new ApolloServer({ gateway, subscriptions: false, introspection: true });

// Apply Apollo GraphQL middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4005 }, () =>
    console.log(`🚀 Server ready at http://localhost:4005${server.graphqlPath}`)
  );
});
