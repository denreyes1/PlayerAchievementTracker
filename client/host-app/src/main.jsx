import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Apollo client dependencies
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Instantiate Apollo Client for your GraphQL server
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Update URI as needed for your environment
  cache: new InMemoryCache(),
});

// Render the App within an ApolloProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);