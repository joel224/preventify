import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';

const EKA_API_BASE_URL = 'https://api.eka.care/connect-auth/v1';

const getApiClient = (accessToken?: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return axios.create({
    baseURL: EKA_API_BASE_URL,
    headers,
  });
};

async function _loginAndGetTokens(userToken: string) {
  console.log('Performing full login...');
  const { EKA_API_KEY, EKA_CLIENT_ID, EKA_CLIENT_SECRET } = process.env;

  if (!EKA_API_KEY || !EKA_CLIENT_ID || !EKA_CLIENT_SECRET) {
    throw new Error('Missing Eka Care API credentials in .env file');
  }

  const client = getApiClient();
  try {
    const response = await client.post('/account/login', {
      api_key: EKA_API_KEY,
      client_id: EKA_CLIENT_ID,
      client_secret: EKA_CLIENT_SECRET,
      user_token: userToken, // This would be the token for the specific user
    });
    
    const { access_token, refresh_token } = response.data;
    if (!access_token || !refresh_token) {
        throw new Error("Login response did not include tokens");
    }
    
    await saveTokens({ access_token, refresh_token });
    console.log('Login successful. Tokens saved.');
    return { access_token, refresh_token };

  } catch(error) {
      console.error("Error during login:", error);
      throw error;
  }
}

async function _refreshAccessToken() {
  console.log('Refreshing access token...');
  const tokens = await getTokens();
  if (!tokens?.refresh_token) {
    console.log('No refresh token found. Falling back to full login.');
    // In a real app, you'd need user context to get a userToken here.
    // For this example, we cannot proceed without it.
    throw new Error("Cannot refresh without a user context for login.");
  }

  const client = getApiClient();
  try {
    const response = await client.post('/account/refresh', {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    const { access_token, refresh_token } = response.data;
    if (!access_token || !refresh_token) {
        throw new Error("Refresh response did not include tokens");
    }
    await saveTokens({ access_token, refresh_token });
    console.log('Token refresh successful. New tokens saved.');
    return access_token;
  } catch (error) {
    console.error('Failed to refresh token. Error:', error);
    // If refresh fails, we might need to log in again.
    // This depends on the user context being available.
    throw new Error("Could not refresh token. A full login may be required.");
  }
}

// Example function showing the full authentication flow
export async function getPatientDetails(mobileNumber: string, userToken: string, retry = true): Promise<any> {
  let tokens = await getTokens();

  if (!tokens?.access_token) {
    console.log('No access token found. Logging in...');
    tokens = await _loginAndGetTokens(userToken);
  }

  const apiClient = getApiClient(tokens.access_token);

  try {
    // This is a placeholder for the actual API call
    console.log('Attempting to get patient details with token.');
    // const response = await apiClient.get(`/patients?mobile=${mobileNumber}`);
    // return response.data;
    
    // Mocking a successful response for now
    return { "patientId": "12345", "name": "John Doe", "mobile": mobileNumber };

  } catch (error: any) {
    if (error.response?.status === 401 && retry) {
      console.log('Access token expired. Refreshing...');
      try {
        const newAccessToken = await _refreshAccessToken();
        // Retry the request with the new token
        console.log('Retrying API call with new token.');
        const newApiClient = getApiClient(newAccessToken);
        // const response = await newApiClient.get(`/patients?mobile=${mobileNumber}`);
        // return response.data;
         return { "patientId": "12345", "name": "John Doe", "mobile": mobileNumber, "retried": true };
      } catch (refreshError) {
        console.error('Failed to get patient details after token refresh:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('An error occurred while getting patient details:', error.message);
      throw error;
    }
  }
}
