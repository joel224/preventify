import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';

const EKA_API_BASE_URL = 'https://api.eka.care';

const getApiClient = (accessToken?: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  // The 'auth' header is expected for doctor APIs
  if (accessToken) {
    headers['auth'] = accessToken;
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
    const response = await client.post('/connect-auth/v1/account/login', {
      api_key: EKA_API_KEY,
      client_id: EKA_CLIENT_ID,
      client_secret: EKA_CLIENT_SECRET,
      user_token: userToken,
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
    throw new Error("Cannot refresh without a user context for login.");
  }

  const client = getApiClient();
  try {
    const response = await client.post('/connect-auth/v1/account/refresh', {
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
    throw new Error("Could not refresh token. A full login may be required.");
  }
}

async function makeApiRequest(apiCall: (client: any) => Promise<any>, userToken: string, retry = true) {
  let tokens = await getTokens();

  if (!tokens?.access_token) {
    console.log('No access token found. Logging in...');
    tokens = await _loginAndGetTokens(userToken);
  }

  const apiClient = getApiClient(tokens.access_token);

  try {
    return await apiCall(apiClient);
  } catch (error: any) {
    if (error.response?.status === 401 && retry) {
      console.log('Access token expired. Refreshing...');
      try {
        const newAccessToken = await _refreshAccessToken();
        const newApiClient = getApiClient(newAccessToken);
        console.log('Retrying API call with new token.');
        return await apiCall(newApiClient);
      } catch (refreshError) {
        console.error('API call failed after token refresh:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('An error occurred during API call:', error.message);
      throw error;
    }
  }
}

export async function getPatientDetails(mobileNumber: string, userToken: string): Promise<any> {
  return makeApiRequest(async (client) => {
    // This is a placeholder for the actual API call
    console.log('Attempting to get patient details with token.');
    // const response = await client.get(`/patients?mobile=${mobileNumber}`);
    // return response.data;
    
    // Mocking a successful response for now
    return { "patientId": "12345", "name": "John Doe", "mobile": mobileNumber };
  }, userToken);
}

const parseLocation = (line1: string) => {
    if (!line1) return 'N/A';
    const parts = line1.split(',');
    // Attempt to find PADINJARANGADI, PALAKKAD, etc.
    const relevantParts = parts.filter(part => 
        part.toUpperCase().includes('PADINJARANGADI') || 
        part.toUpperCase().includes('PALAKKAD') ||
        part.toUpperCase().includes('VATTAMKULAM') ||
        part.toUpperCase().includes('KANJIRATHANI')
    );
    if (relevantParts.length > 0) {
        // Take the first one found, clean it up.
        return relevantParts[0].split('(')[0].trim();
    }
    // Fallback to the first part of the address if no specific keywords are found
    return parts[0] || 'N/A';
};

export async function getBusinessEntitiesAndDoctors(userToken: string): Promise<any> {
    const businessEntitiesResponse = await makeApiRequest(async (client) => {
        console.log('Fetching business entities...');
        const response = await client.get('/dr/v1/business/entities');
        return response.data;
    }, userToken);

    const { doctors: doctorList } = businessEntitiesResponse;

    if (!doctorList || doctorList.length === 0) {
        return [];
    }

    const doctorDetailsPromises = doctorList
        .filter((doc: any) => doc && doc.doctor_id)
        .map(async (doctor: any) => {
            try {
                const doctorDetailsResponse = await makeApiRequest(async (client) => {
                    return client.get(`/dr/v1/doctor/${doctor.doctor_id}`);
                }, userToken);

                const details = doctorDetailsResponse.data.profile;
                const professional = details?.professional;
                const personal = details?.personal;

                const specialty = professional?.speciality?.[0]?.name || professional?.major_speciality?.name || 'N/A';
                
                // Find the clinic that is marked as default
                const defaultClinic = professional?.clinics?.find((c: any) => c.id === professional.default_clinic);
                const location = defaultClinic ? parseLocation(defaultClinic.address?.line1) : 'N/A';

                return {
                    id: doctor.doctor_id,
                    name: `${personal?.first_name || ''} ${personal?.last_name || ''}`.trim(),
                    specialty,
                    location,
                    image: personal?.pic || 'https://res.cloudinary.com/dyf8umlda/image/upload/v1748260270/Dr_Abdurahiman_mct6bx.jpg' // default image
                };
            } catch (error: any) {
                console.error(`Failed to fetch details for doctor ${doctor.doctor_id}:`, error.message);
                return null; // Return null if a single doctor fetch fails
            }
        });

    const settledDoctorDetails = await Promise.all(doctorDetailsPromises);

    // Filter out any null results from failed API calls
    return settledDoctorDetails.filter(details => details !== null);
}