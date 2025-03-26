// src/components/TestQueryComponent.jsx
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const TEST_QUERY = gql`
  query {
    __typename
  }
`;

const TestQueryComponent = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>Data: {JSON.stringify(data)}</div>;
};

export default TestQueryComponent;