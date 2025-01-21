import React, { useCallback } from 'react';

export function useGraphqlClient() {
  const executeQuery = useCallback(async (query, variables = {}) => {
    try {
      // Get current session information
      const params = new URLSearchParams(window.location.search);
      const shop = params.get('shop');
      
      if (!shop) {
        throw new Error('Missing shop parameter');
      }

      // Get session token
      const sessionResponse = await fetch('/api/auth/token', {
        credentials: 'include'
      });

      if (!sessionResponse.ok) {
        window.location.href = '/api/auth';
        return null;
      }

      const { accessToken } = await sessionResponse.json();

      // Execute GraphQL query
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-Shopify-Shop-Domain': shop
        },
        credentials: 'include',
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        window.location.href = '/api/auth';
        return null;
      }

      // Handle other errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(JSON.stringify(errors));
      }

      return data;
    } catch (error) {
      console.error('GraphQL error:', error);
      throw error;
    }
  }, []);

  return executeQuery;
}

// Usage example:
/*
function MyComponent() {
  const graphqlClient = useGraphqlClient();

  const fetchData = async () => {
    const query = `
      query {
        shop {
          name
        }
      }
    `;

    try {
      const data = await graphqlClient(query);
      // Handle data
    } catch (error) {
      // Handle error
    }
  };
}
*/