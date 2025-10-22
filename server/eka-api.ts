
import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';

const EKA_API_BASE_URL = 'https://api.eka.care';

const getApiClient = (accessToken?: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers['auth'] = accessToken;
  }
  return axios.create({
    baseURL: EKA_API_BASE_URL,
    headers,
  });
};

export async function _loginAndGetTokens() {
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

async function makeApiRequest(apiCall: (client: any) => Promise<any>) {
  let tokens = await getTokens();

  if (!tokens?.access_token) {
    console.log('No access token found. Logging in...');
    tokens = await _loginAndGetTokens();
  }

  const apiClient = getApiClient(tokens.access_token);

  try {
    return await apiCall(apiClient);
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log('Access token may be expired. Attempting to refresh...');
      const newAccessToken = await _refreshAccessToken();
      
      if (newAccessToken) {
        console.log('Retrying API call with new refreshed token.');
        const newApiClient = getApiClient(newAccessToken);
        return await apiCall(newApiClient);
      }
      
      console.log('Token refresh failed. Performing a full login...');
      const freshTokens = await _loginAndGetTokens();
      console.log('Retrying API call with new login token.');
      const freshApiClient = getApiClient(freshTokens.access_token);
      return await apiCall(freshApiClient);

    } else {
      console.error('An unrecoverable error occurred during API call:', error.message);
      throw error;
    }
  }
}


export async function getPatientDetails(mobileNumber: string): Promise<any> {
  return makeApiRequest(async (client) => {
    console.log('Attempting to get patient details with token.');
    return { "patientId": "12345", "name": "John Doe", "mobile": mobileNumber };
  });
}

const parseLocation = (line1: string) => {
    if (!line1) return 'N/A';
    // Simple parsing, takes the first part before a comma or newline
    return line1.split(/[\r\n,]+/)[0].trim();
};

export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    console.log("Calling getBusinessEntitiesAndDoctors...");
    
    const businessEntitiesResponse = await makeApiRequest(async (client) => {
        console.log('Fetching business entities...');
        const response = await client.get('/dr/v1/business/entities');
        console.log("Successfully fetched business entities.");
        return response;
    });

    const { doctors: doctorList, clinics: clinicList } = businessEntitiesResponse.data;

    if (!doctorList || doctorList.length === 0) {
        console.log("No doctors found in the initial response.");
        return { doctors: [], clinics: [] };
    }
    
    let initialTokens = await getTokens();
    if (!initialTokens) {
      initialTokens = await _loginAndGetTokens();
    }
    let accessToken = initialTokens.access_token;


    console.log(`Found ${doctorList.length} doctors and ${clinicList.length} clinics. Fetching details...`);

    const doctorDetailsPromises = doctorList
        .filter((doc: any) => doc && doc.doctor_id)
        .map(async (doctor: any) => {
            const detailApiClient = getApiClient(accessToken);
            try {
                const response = await detailApiClient.get(`/dr/v1/doctor/${doctor.doctor_id}`);
                return { status: 'fulfilled', value: { ...response.data, base_name: doctor.name }, doctor_id: doctor.doctor_id };
            } catch (error: any) {
                 if (error.response?.status === 401) {
                    console.log(`Token expired while fetching doctor ${doctor.doctor_id}. Refreshing...`);
                    const newAccessToken = await _refreshAccessToken();
                    if (newAccessToken) {
                        accessToken = newAccessToken; // Update the shared token
                        const newDetailApiClient = getApiClient(accessToken);
                        try {
                            console.log(`Retrying fetch for doctor ${doctor.doctor_id} with new token.`);
                            const response = await newDetailApiClient.get(`/dr/v1/doctor/${doctor.doctor_id}`);
                            return { status: 'fulfilled', value: { ...response.data, base_name: doctor.name }, doctor_id: doctor.doctor_id };
                        } catch (retryError: any) {
                             return { status: 'rejected', reason: retryError, doctor_id: doctor.doctor_id };
                        }
                    }
                 }
                return { status: 'rejected', reason: error, doctor_id: doctor.doctor_id };
            }
        });

    const settledDoctorDetails = await Promise.all(doctorDetailsPromises);

    const validDoctors = [];
    for (const result of settledDoctorDetails) {
        if (result.status === 'fulfilled' && result.value.status === 'fulfilled') {
            const doctorDetails = result.value.value;
            const { profile, base_name } = doctorDetails;
            const professional = profile?.professional;
            const personal = profile?.personal;

            const specialty = professional?.speciality?.[0]?.name || professional?.major_speciality?.name || 'General';
            
            const defaultClinic = professional?.clinics?.find((c: any) => c.id === professional.default_clinic);
            const location = defaultClinic ? parseLocation(defaultClinic.address?.line1) : 'N/A';

            validDoctors.push({
                id: result.value.doctor_id,
                name: base_name || `${personal?.first_name} ${personal?.last_name}`.trim(),
                specialty,
                location,
                image: personal?.pic || 'https://res.cloudinary.com/dyf8umlda/image/upload/v1748260270/Dr_Abdurahiman_mct6bx.jpg'
            });
        } else if(result.status === 'rejected' || (result.status === 'fulfilled' && result.value.status === 'rejected')) {
             const rejectedResult = result.status === 'rejected' ? result : result.value;
             console.error(`Failed to fetch details for doctor ${rejectedResult.doctor_id}:`, rejectedResult.reason?.message);
        }
    }
    
    const clinics = clinicList.map((c: any) => ({id: c.clinic_id, name: c.name}));
    
    console.log(`Returning ${validDoctors.length} processed doctors and ${clinics.length} clinics.`);
    return { doctors: validDoctors, clinics };
}
