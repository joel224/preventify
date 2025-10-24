
import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { processBusinessEntities } from './data-processing';

const EKA_API_BASE_URL = 'https://api.eka.care';

const getApiClient = (accessToken?: string) => {
  console.log('Creating API client...');
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
     headers['Authorization'] = `Bearer ${accessToken}`;
     console.log('API client using existing access token.');
  }
   if (process.env.EKA_CLIENT_ID) {
    headers['client-id'] = process.env.EKA_CLIENT_ID;
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

// Export this function so it can be used in booking-api.ts
export async function makeApiRequest(apiCall: (client: any) => Promise<any>) {
  let tokens = await getTokens();

  if (!tokens?.access_token) {
    console.log('INFO: No access token found. Logging in...');
    tokens = await _loginAndGetTokens();
  }

  const apiClient = getApiClient(tokens.access_token);

  try {
    console.log('INFO: Making API call with current token.');
    const result = await apiCall(apiClient);
    console.log(`SUCCESS: API call successful.`);
    return result;
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

async function fetchSlotsForDate(doctorId: string, clinicId: string, startDate: Date, endDate: Date): Promise<any[]> {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    console.log(`--- Fetching available slots for doctor: ${doctorId}, clinic: ${clinicId}, from: ${formattedStartDate} to ${formattedEndDate} ---`);

    try {
        const responseData = await makeApiRequest(async (client) => {
            const response = await client.get(`/dr/v1/doctor/${doctorId}/clinic/${clinicId}/appointment/slot`, {
                params: {
                    start_date: formattedStartDate,
                    end_date: formattedEndDate
                }
            });
            return response.data; // Return the full data object from axios
        });

        console.log(`RAW SLOT API RESPONSE for ${doctorId}/${clinicId} on ${formattedStartDate}:`, JSON.stringify(responseData, null, 2));

        if (!responseData?.data?.schedule) {
            console.log(`INFO: No schedule object found for ${doctorId}/${clinicId} on ${formattedStartDate}.`);
            return [];
        }

        const schedule = responseData.data.schedule;
        let availableSlots: any[] = [];
        
        const clinicSchedule = schedule[clinicId];
        if (clinicSchedule && Array.isArray(clinicSchedule)) {
            clinicSchedule.forEach(scheduleItem => {
                if (scheduleItem.slots && Array.isArray(scheduleItem.slots)) {
                    scheduleItem.slots.forEach((slot: any) => {
                        availableSlots.push({
                            startTime: slot.s,
                            endTime: slot.e,
                            available: slot.available,
                            doctorId,
                            clinicId,
                        });
                    });
                }
            });
        }
        
        if (availableSlots.length > 0) {
            console.log(`SUCCESS: Found ${availableSlots.length} raw slots from API.`);
        } else {
            console.log(`INFO: No slots found in API response for the requested date range.`);
        }
        return availableSlots;

    } catch (error: any) {
        console.error(`ERROR fetching slots for ${doctorId}/${clinicId}:`, error.message);
        return [];
    }
}


export async function getAvailableSlots(doctorId: string, clinicId: string, date: string): Promise<any[]> {
    const requestedDate = new Date(date);
    const now = new Date();

    const apiStartDate = startOfDay(requestedDate);
    const apiEndDate = addDays(apiStartDate, 1);

    let slots = await fetchSlotsForDate(doctorId, clinicId, apiStartDate, apiEndDate);

    const finalFilteredSlots = slots.filter(slot => {
        if (!slot.available) {
            return false;
        }

        const slotStartTime = new Date(slot.startTime);

        // Ensure the slot is for the requested day
        if (format(slotStartTime, 'yyyy-MM-dd') !== format(requestedDate, 'yyyy-MM-dd')) {
            return false;
        }
        
        // If the requested date is today, ensure the slot is in the future
        if (format(requestedDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')) {
            if (isBefore(slotStartTime, now)) {
                return false;
            }
        }
        return true;
    });

    console.log(`INFO: After filtering, returning ${finalFilteredSlots.length} valid slots.`);
    return finalFilteredSlots;
}


export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    console.log("--- Starting getBusinessEntitiesAndDoctors ---");
    
    // makeApiRequest now consistently returns the full axios response object
    const response = await makeApiRequest(async (client) => {
        console.log('INFO: Fetching business entities (/dr/v1/business/entities)...');
        return client.get('/dr/v1/business/entities');
    });

    // The actual data from Eka is nested under `response.data.data`
    const { doctors: doctorList, clinics: clinicList } = response.data.data;

    if (!doctorList || doctorList.length === 0) {
        console.warn("WARN: No doctors found in business entities response.");
        return { doctors: [], clinics: [] };
    }
     if (!clinicList || clinicList.length === 0) {
        console.warn("WARN: No clinics found in business entities response.");
        return { doctors: [], clinics: [] };
    }
    
    console.log(`INFO: Found ${doctorList.length} doctors and ${clinicList.length} clinics. Processing data...`);
    
    const { doctors: processedDoctors, clinics: processedClinics } = processBusinessEntities(doctorList, clinicList);

    console.log(`--- Finished getBusinessEntitiesAndDoctors. Returning ${processedDoctors.length} doctors and ${processedClinics.length} clinics. ---`);
    
    return { doctors: processedDoctors, clinics: processedClinics };
}

