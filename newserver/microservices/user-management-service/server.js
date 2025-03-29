const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./schemas/user.schema');
const resolvers = require('./resolvers/user.resolvers');


async function startServer() {
  dotenv.config();

  const app = express();
  
  // Middleware
  app.use(express.json());
  
  // Connect to MongoDB
  mongoose.connect('mongodb://0.0.0.0:27017/DenisjannReyes-lab-assignment3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));
  // Create a new ApolloServer instance and pass the schema data
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  // Apply Apollo GraphQL middleware and specify the path to /graphql
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4002;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
