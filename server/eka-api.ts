
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
  }
  return axios.create({
    baseURL: EKA_API_BASE_URL,
    headers,
  });
};

export async function _loginAndGetTokens(userToken: string) {
  console.log('Attempting full login...');
  const { EKA_API_KEY, EKA_CLIENT_ID, EKA_CLIENT_SECRET } = process.env;

  if (!EKA_API_KEY || !EKA_CLIENT_ID || !EKA_CLIENT_SECRET) {
    console.error('Missing Eka Care API credentials in .env file');
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

  } catch(error: any) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      throw error;
  }
}

async function _refreshAccessToken() {
  console.log('Refreshing access token...');
  const tokens = await getTokens();
  if (!tokens?.refresh_token) {
    console.log('No refresh token found. A full login is required.');
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
        throw new Error("Refresh response did not include tokens");
    }
    await saveTokens({ access_token, refresh_token });
    console.log('Token refresh successful. New tokens saved.');
    return access_token;
  } catch (error) {
    console.error('Failed to refresh token. A full login may be required.', error);
    return null;
  }
}

async function makeApiRequest(apiCall: (client: any) => Promise<any>, userToken: string) {
  let tokens = await getTokens();

  // If no tokens, perform a full login first.
  if (!tokens?.access_token) {
    console.log('No access token found. Logging in...');
    tokens = await _loginAndGetTokens(userToken);
  }

  const apiClient = getApiClient(tokens.access_token);

  try {
    // First attempt
    return await apiCall(apiClient);
  } catch (error: any) {
    // If the first attempt fails with a 401, try to refresh the token.
    if (error.response?.status === 401) {
      console.log('Access token may be expired. Attempting to refresh...');
      const newAccessToken = await _refreshAccessToken();
      
      // If refresh was successful, retry the API call with the new token.
      if (newAccessToken) {
        console.log('Retrying API call with new refreshed token.');
        const newApiClient = getApiClient(newAccessToken);
        return await apiCall(newApiClient);
      }
      
      // If refresh failed, perform a full login and then retry.
      console.log('Token refresh failed. Performing a full login...');
      const freshTokens = await _loginAndGetTokens(userToken);
      console.log('Retrying API call with new login token.');
      const freshApiClient = getApiClient(freshTokens.access_token);
      return await apiCall(freshApiClient);

    } else {
      // For any other error, rethrow it.
      console.error('An unrecoverable error occurred during API call:', error.message);
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
    // Attempt to find specific keywords
    const keywords = ['PADINJARANGADI', 'PALAKKAD', 'VATTAMKULAM', 'KANJIRATHANI'];
    for (const keyword of keywords) {
        const foundPart = parts.find(part => part.toUpperCase().includes(keyword));
        if (foundPart) {
            return foundPart.split('(')[0].trim();
        }
    }
    // Fallback to the first part of the address if no specific keywords are found
    return parts[0]?.trim() || 'N/A';
};

export async function getBusinessEntitiesAndDoctors(userToken: string): Promise<any> {
    console.log("Calling getBusinessEntitiesAndDoctors...");
    const businessEntitiesResponse = await makeApiRequest(async (client) => {
        console.log('Fetching business entities...');
        const response = await client.get('/dr/v1/business/entities');
        console.log("Successfully fetched business entities.");
        return response.data;
    }, userToken);

    const { doctors: doctorList, clinics: clinicList } = businessEntitiesResponse;

    if (!doctorList || doctorList.length === 0) {
        console.log("No doctors found in the initial response.");
        return { doctors: [], clinics: [] };
    }

    console.log(`Found ${doctorList.length} doctors and ${clinicList.length} clinics. Fetching details...`);

    const doctorDetailsPromises = doctorList
        .filter((doc: any) => doc && doc.doctor_id)
        .map(async (doctor: any) => {
            try {
                const doctorDetailsResponse = await makeApiRequest(async (client) => {
                    // console.log(`Fetching details for doctor ${doctor.doctor_id}...`);
                    return client.get(`/dr/v1/doctor/${doctor.doctor_id}`);
                }, userToken);

                const details = doctorDetailsResponse.data.profile;
                const professional = details?.professional;
                const personal = details?.personal;

                const specialty = professional?.speciality?.[0]?.name || professional?.major_speciality?.name || 'General';
                
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
                return null;
            }
        });

    const settledDoctorDetails = await Promise.all(doctorDetailsPromises);
    const validDoctors = settledDoctorDetails.filter(details => details !== null);

    const clinics = clinicList.map((c: any) => ({id: c.clinic_id, name: c.name}));
    
    console.log(`Returning ${validDoctors.length} processed doctors and ${clinics.length} clinics.`);
    return { doctors: validDoctors, clinics };
}
