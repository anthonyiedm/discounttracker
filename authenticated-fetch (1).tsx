import { useState, useCallback } from 'react';

export function useShopifyAuth() {
  const [sessionToken, setSessionToken] = useState(null);

  const getSessionToken = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const shop = params.get('shop');
      
      if (!shop) {
        throw new Error('Missing shop parameter');
      }

      const response = await fetch('/api/auth/token', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to get session token');
      }

      const { accessToken } = await response.json();
      setSessionToken(accessToken);
      return accessToken;
    } catch (error) {
      console.error('Authentication error:', error);
      window.location.href = '/api/auth';
      return null;
    }
  };

  const authenticatedFetch = useCallback(async (url, options = {}) => {
    try {
      const token = sessionToken || await getSessionToken();
      
      if (!token) {
        return null;
      }

      const params = new URLSearchParams(window.location.search);
      const shop = params.get('shop');

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Shopify-Shop-Domain': shop
        },
        credentials: 'include'
      });

      if (response.status === 401 || response.status === 403) {
        setSessionToken(null);
        window.location.href = '/api/auth';
        return null;
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }, [sessionToken]);

  const executeGraphQL = useCallback(async (query, variables = {}) => {
    try {
      const response = await authenticatedFetch('/graphql', {
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response) {
        return null;
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
  }, [authenticatedFetch]);

  return {
    authenticatedFetch,
    executeGraphQL,
    sessionToken,
    getSessionToken
  };
}

// Usage example:
/*
function MyComponent() {
  const { executeGraphQL } = useShopifyAuth();

  const fetchData = async () => {
    try {
      const query = `
        query {
          shop {
            name
          }
        }
      `;
      const data = await executeGraphQL(query);
      // Handle data
    } catch (error) {
      // Handle error
    }
  };
}
*/