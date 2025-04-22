import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';

if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_TENANT_ID || !process.env.AZURE_CLIENT_SECRET) {
  throw new Error('Missing required environment variables for Microsoft Graph authentication');
}

// Initialize the credential
const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID,
  process.env.AZURE_CLIENT_ID,
  process.env.AZURE_CLIENT_SECRET
);

// Create an authentication provider
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ['https://graph.microsoft.com/.default']
});

// Initialize the Graph client
export const graphClient = Client.initWithMiddleware({
  authProvider: authProvider,
  defaultVersion: 'v1.0'
});

// Helper function to ensure we're on the server side
export const isServer = () => typeof window === 'undefined';

// Utility function to make Graph API calls
export async function callGraph(endpoint: string) {
  if (!isServer()) {
    throw new Error('Graph API calls must be made from the server side');
  }

  try {
    const response = await graphClient.api(endpoint).get();
    return response;
  } catch (error) {
    console.error('Error calling Microsoft Graph:', error);
    throw error;
  }
} 