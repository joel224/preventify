
'use server';

import axios, { AxiosInstance } from 'axios';
import { getTokens, saveTokens } from './token-storage';

const EKA_API_BASE_URL = 'https://api.eka.care';

const getApiClient = (accessToken?: string): AxiosInstance => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
     headers['Authorization'] = `Bearer ${accessToken}`;
  }
   if (process.env.EKA_CLIENT_ID) {
    headers['client-id'] = process.env.EKA_CLIENT_ID;
  } else {
    console.error("CRITICAL: EKA_CLIENT_ID is not set in environment variables.");
  }
  return axios.create({
    baseURL: EKA_API_BASE_URL,
    headers,
  });
};

export async function _loginAndGetTokens() {
  console.log('--- Attempting Eka Care API Login ---');
  const { EKA_API_KEY, EKA_CLIENT_ID, EKA_CLIENT_SECRET } = process.env;

  if (!EKA_API_KEY || !EKA_CLIENT_ID || !EKA_CLIENT_SECRET) {
    console.error('ERROR: Missing Eka Care API credentials in .env file');
    throw new Error('Missing Eka Care API credentials in .env file');
  }

  const client = getApiClient();
  try {
    const response = await client.post('/connect-auth/v1/account/login', {
      api_key: EKA_API_KEY,
      client_id: EKA_CLIENT_ID,
      client_secret: EKA_CLIENT_SECRET,
    });
    
    const { access_token, refresh_token } = response.data;
    if (!access_token || !refresh_token) {
        console.error("ERROR: Login response did not include tokens.");
        throw new Error("Login response did not include tokens");
    }
    
    await saveTokens({ access_token, refresh_token });
    console.log('SUCCESS: Login successful. Tokens saved.');
    return { access_token, refresh_token };

  } catch(error: any) {
      console.error("ERROR during login:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
      throw error;
  }
}

async function _refreshAccessToken() {
  console.log('--- Attempting to refresh access token ---');
  const tokens = await getTokens();
  if (!tokens?.refresh_token) {
    console.log('INFO: No refresh token found. A full login is required.');
    return null;
  }

  const client = getApiClient();
  try {
    const response = await client.post('/connect-auth/v1/account/refresh', {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    const { access_token, refresh_token } = response.data;
    if (!access_token || !refresh_token) {
        console.error("ERROR: Refresh response did not include tokens.");
        throw new Error("Refresh response did not include tokens");
    }
    await saveTokens({ access_token, refresh_token });
    console.log('SUCCESS: Token refresh successful. New tokens saved.');
    return access_token;
  } catch (error: any) {
    console.error('ERROR: Failed to refresh token. A full login may be required.', error.response ? JSON.stringify(error.response.data) : error.message);
    return null;
  }
}

export async function makeApiRequest(apiCall: (client: AxiosInstance) => Promise<any>): Promise<any> {
  let tokens = await getTokens();
  let accessToken: string | undefined = tokens?.access_token;

  if (!accessToken) {
    console.log('INFO: No access token found. Logging in...');
    const newTokens = await _loginAndGetTokens();
    accessToken = newTokens.access_token;
  }

  let apiClient = getApiClient(accessToken);

  try {
    console.log('INFO: Making API call with current token.');
    return await apiCall(apiClient);
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log('WARN: Access token may be expired (401 Unauthorized). Attempting to refresh...');
      const newAccessToken = await _refreshAccessToken();
      
      if (newAccessToken) {
        console.log('INFO: Retrying API call with new refreshed token.');
        const newApiClient = getApiClient(newAccessToken);
        return await apiCall(newApiClient);
      }
      
      console.log('WARN: Token refresh failed. Performing a full login...');
      const freshTokens = await _loginAndGetTokens();
      console.log('INFO: Retrying API call with new login token.');
      const freshApiClient = getApiClient(freshTokens.access_token);
      return await apiCall(freshApiClient);

    } else {
      console.error('FATAL: An unrecoverable error occurred during API call.');
      if(error.response) {
         console.error('Response Error Data:', JSON.stringify(error.response.data, null, 2));
      } else {
         console.error('Error Message:', error.message);
      }
      throw error;
    }
  }
}
