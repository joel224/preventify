
'use server';

import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { processBusinessEntities } from './data-processing';
import { getEkaSecrets } from '@/lib/secrets';

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
  return axios.create({
    baseURL: EKA_API_BASE_URL,
    headers,
  });
};

export async function _loginAndGetTokens() {
  console.log('--- Attempting Eka Care API Login ---');
  const secrets = await getEkaSecrets();
  
  if (!secrets) {
    console.error('ERROR: Could not retrieve Eka Care API credentials from secret manager.');
    throw new Error('Could not retrieve Eka Care API credentials.');
  }

  const { EKA_API_KEY, EKA_CLIENT_ID, EKA_CLIENT_SECRET } = secrets;

  const client = getApiClient();
  client.defaults.headers.common['client-id'] = EKA_CLIENT_ID;

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
  const secrets = await getEkaSecrets();

  if (!tokens?.refresh_token) {
    console.log('INFO: No refresh token found. A full login is required.');
    return null;
  }
  
  if (!secrets?.EKA_CLIENT_ID) {
    console.error('ERROR: Missing Eka Client ID for token refresh.');
    return null;
  }

  const client = getApiClient();
  client.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;

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

async function makeApiRequest(apiCall: (client: any) => Promise<any>) {
  let tokens = await getTokens();
  let accessToken: string | undefined = tokens?.access_token;
  const secrets = await getEkaSecrets();

  if (!secrets?.EKA_CLIENT_ID) {
    throw new Error('Eka Client ID is missing. Cannot make API requests.');
  }

  if (!accessToken) {
    console.log('INFO: No access token found. Logging in...');
    const newTokens = await _loginAndGetTokens();
    accessToken = newTokens.access_token;
  }

  const apiClient = getApiClient(accessToken);
  apiClient.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;


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
        newApiClient.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;
        return await apiCall(newApiClient);
      }
      
      console.log('WARN: Token refresh failed. Performing a full login...');
      const freshTokens = await _loginAndGetTokens();
      console.log('INFO: Retrying API call with new login token.');
      const freshApiClient = getApiClient(freshTokens.access_token);
      freshApiClient.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;
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
        const response = await makeApiRequest(async (client) => {
            return client.get(`/dr/v1/doctor/${doctorId}/clinic/${clinicId}/appointment/slot`, {
                params: {
                    start_date: formattedStartDate,
                    end_date: formattedEndDate
                }
            });
        });
        
        const responseData = response.data;
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

        if (format(slotStartTime, 'yyyy-MM-dd') !== format(requestedDate, 'yyyy-MM-dd')) {
            return false;
        }
        
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
    
    const response = await makeApiRequest(async (client) => {
        console.log('INFO: Fetching business entities (/dr/v1/business/entities)...');
        return client.get('/dr/v1/business/entities');
    });

    const { doctors: doctorList, clinics: clinicList } = response.data;

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

function sanitizeMobileNumber(mobile: string): string {
    // 1. Remove all non-digit characters
    let plainNumber = mobile.replace(/\D/g, '');

    // 2. Handle different formats
    if (plainNumber.length === 12 && plainNumber.startsWith('91')) {
        // Format is 91xxxxxxxxxx, it's already correct
        return plainNumber;
    } else if (plainNumber.length === 10) {
        // Format is xxxxxxxxxx, prepend 91
        return `91${plainNumber}`;
    } else {
        // Fallback: assume the last 10 digits are the mobile number and prepend 91
        return `91${plainNumber.slice(-10)}`;
    }
}

export async function searchPatientByMobile(mobile: string): Promise<any | null> {
    const searchMobile = sanitizeMobileNumber(mobile);

    console.log(`--- Searching for patient with mobile: ${searchMobile} ---`);

    try {
        const response = await makeApiRequest(async (client) => {
            return client.get('/dr/v1/business/patients/search', {
                params: {
                    mobile: searchMobile,
                }
            });
        });

        const profiles = response.data?.data?.profiles;
        if (profiles && profiles.length > 0) {
            // Return the first matching profile's patient_profile object
            const patientProfile = profiles[0].patient_profile;
            console.log(`SUCCESS: Found existing patient profile:`, patientProfile);
            return patientProfile;
        }

        console.log(`INFO: No patient found with mobile ${searchMobile}.`);
        return null;

    } catch (error: any) {
        console.error(`ERROR searching for patient by mobile:`, error.message);
        return null;
    }
}

async function findPatientId(mobile: string): Promise<string | null> {
    const patientProfile = await searchPatientByMobile(mobile);
    return patientProfile ? patientProfile.patient_id : null;
}


export async function bookAppointment(data: any): Promise<any> {
    console.log("--- [DEBUG] BACKEND eka-api.ts: bookAppointment function started ---");
    console.log("--- [DEBUG] BACKEND eka-api.ts: Received data from index.ts:", JSON.stringify(data, null, 2));

    const sanitizedMobile = sanitizeMobileNumber(data.patient.phone);
    
    const existingPatientId = await findPatientId(data.patient.phone);

    let partnerPatientId;
    if (existingPatientId) {
        partnerPatientId = existingPatientId;
        console.log(`INFO: Using existing patient ID for booking: ${partnerPatientId}`);
    } else {
        partnerPatientId = `preventify_patient_${sanitizedMobile}_${Date.now()}`;
        console.log(`INFO: Generating new patient ID for booking: ${partnerPatientId}`);
    }

    const partnerAppointmentId = `preventify_appt_${Date.now()}`;
    const startTimeInSeconds = Math.floor(new Date(data.appointment.startTime).getTime() / 1000);
    const endTimeInSeconds = startTimeInSeconds + 600; // 10 minute duration

    const getDesignation = (gender: string) => {
        if (gender === 'F') return 'Ms.';
        if (gender === 'M') return 'Mr.';
        return 'Mx.';
    };

    const appointmentPayload = {
        partner_appointment_id: partnerAppointmentId,
        clinic_id: data.appointment.clinicId,
        doctor_id: data.appointment.doctorId,
        partner_patient_id: partnerPatientId, // Use the determined patient ID
        appointment_details: {
            start_time: startTimeInSeconds,
            end_time: endTimeInSeconds,
            mode: "INCLINIC",
        },
        patient_details: {
            designation: getDesignation(data.patient.gender),
            first_name: data.patient.firstName,
            last_name: data.patient.lastName,
            mobile: sanitizedMobile,
            gender: data.patient.gender,
            dob: data.patient.dob,
        },
    };
    
    console.log("\n--- [DEBUG] BACKEND eka-api.ts: Booking Appointment via /dr/v1/appointment ---");
    console.log("--- [DEBUG] BACKEND eka-api.ts: Full Request Payload to Eka API ---");
    console.log(JSON.stringify(appointmentPayload, null, 2));
    console.log("------------------------------------");

    const attemptBooking = async () => {
        return makeApiRequest(async (client) => {
            const response = await client.post('/dr/v1/appointment', appointmentPayload);
            return response.data; // Return just the data part
        });
    };

    try {
        const bookingResponse = await attemptBooking();
        console.log("--- [DEBUG] BACKEND eka-api.ts: SUCCESS on first attempt. ---");
        console.log(JSON.stringify(bookingResponse, null, 2));
        return bookingResponse;
    } catch(error: any) {
        console.error("--- [DEBUG] BACKEND eka-api.ts: ERROR during first booking attempt ---");
        if (error.response) {
            console.error("Eka API Error Response Status:", error.response.status);
            console.error("Eka API Error Response Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Eka API Error Message:", error.message);
        }
        console.log("--- [INFO] Retrying booking after a fresh login... ---");

        // Force a new login
        await _loginAndGetTokens();

        // Retry the booking
        try {
            const bookingResponse = await attemptBooking();
            console.log("--- [DEBUG] BACKEND eka-api.ts: SUCCESS on second attempt. ---");
            console.log(JSON.stringify(bookingResponse, null, 2));
            return bookingResponse;
        } catch (finalError: any) {
            console.error("--- [DEBUG] BACKEND eka-api.ts: ERROR during second booking attempt ---");
             if (finalError.response) {
                console.error("Eka API Error Response Status:", finalError.response.status);
                console.error("Eka API Error Response Data:", JSON.stringify(finalError.response.data, null, 2));
            } else {
                console.error("Eka API Error Message:", finalError.message);
            }
            throw finalError; // Throw the final error if the retry also fails
        }
    }
}
