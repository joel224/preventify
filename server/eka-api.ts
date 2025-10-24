
import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';
import { format, addDays, setHours, setMinutes, setSeconds, isBefore, startOfDay, endOfDay } from "date-fns";
import { processBusinessEntities } from './data-processing';

const EKA_API_BASE_URL = 'https://api.eka.care';

const getApiClient = (accessToken?: string) => {
  console.log('Creating API client...');
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
     headers['auth'] = accessToken;
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

async function makeApiRequest(apiCall: (client: any) => Promise<any>) {
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
        const result = await apiCall(newApiClient);
        console.log(`SUCCESS: API call successful on retry.`);
        return result;
      }
      
      console.log('WARN: Token refresh failed. Performing a full login...');
      const freshTokens = await _loginAndGetTokens();
      console.log('INFO: Retrying API call with new login token.');
      const freshApiClient = getApiClient(freshTokens.access_token);
      const result = await apiCall(freshApiClient);
      console.log(`SUCCESS: API call successful on second retry.`);
      return result;

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

// Helper function to fetch slots for a given date range
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
            return response.data;
        });

        console.log(`RAW SLOT API RESPONSE for ${doctorId}/${clinicId} on ${formattedStartDate}:`, JSON.stringify(responseData, null, 2));

        if (!responseData.data || !responseData.data.schedule) {
            console.log(`INFO: No schedule object found for ${doctorId}/${clinicId} on ${formattedStartDate}.`);
            return [];
        }

        const schedule = responseData.data.schedule;
        const availableSlots: any[] = [];
        
        const scheduleItemsForClinic = schedule[clinicId];
        if (scheduleItemsForClinic && Array.isArray(scheduleItemsForClinic)) {
            for (const item of scheduleItemsForClinic) {
                if (item.slots && Array.isArray(item.slots)) {
                    item.slots.forEach((slot: any) => {
                        // The primary source of truth for a slot is its "available" flag.
                        if (slot.available) {
                            availableSlots.push({
                                startTime: slot.s,
                                endTime: slot.e,
                                doctorId,
                                clinicId,
                            });
                        }
                    });
                }
            }
        }
        
        if (availableSlots.length > 0) {
            console.log(`SUCCESS: Found ${availableSlots.length} raw available slots from API.`);
        } else {
            console.log(`INFO: No available slots found in API response for the requested date range.`);
        }
        return availableSlots;

    } catch (error: any) {
        console.error(`ERROR fetching slots for ${doctorId}/${clinicId}:`, error.message);
        return []; // Return empty array on error
    }
}


export async function getAvailableSlots(doctorId: string, clinicId: string, date: string): Promise<any[]> {
    const requestedDate = new Date(date);
    const now = new Date();

    // Per API requirements, the end date must be at least D+1.
    const apiStartDate = startOfDay(requestedDate);
    const apiEndDate = addDays(apiStartDate, 1);

    // Fetch all available slots for the requested day from the API
    let slots = await fetchSlotsForDate(doctorId, clinicId, apiStartDate, apiEndDate);

    // NEW, SIMPLIFIED FILTERING LOGIC
    const finalFilteredSlots = slots.filter(slot => {
        const slotStartTime = new Date(slot.startTime);

        // 1. Ensure the slot is on the originally requested date.
        // The API might return slots for the next day as well, which we don't want in this step.
        const isOnRequestedDate = format(slotStartTime, 'yyyy-MM-dd') === format(requestedDate, 'yyyy-MM-dd');
        if (!isOnRequestedDate) {
            return false;
        }

        // 2. If the requested date is today, ensure the slot is in the future.
        const isToday = format(requestedDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
        if (isToday && isBefore(slotStartTime, now)) {
            return false;
        }

        // If it passes the above checks, the slot is considered valid.
        return true;
    });

    console.log(`INFO: After filtering, returning ${finalFilteredSlots.length} valid slots.`);
    return finalFilteredSlots;
}


export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    console.log("--- Starting getBusinessEntitiesAndDoctors ---");
    
    const response = await makeApiRequest(async (client) => {
        console.log('INFO: Fetching business entities (/dr/v1/business/entities)...');
        const res = await client.get('/dr/v1/business/entities');
        console.log("SUCCESS: Fetched business entities.");
        return res.data;
    });

    const { doctors: doctorList, clinics: clinicList } = response;

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
    
    console.log("--- Returned Doctors List (DEBUG) ---");
    console.log(JSON.stringify(processedDoctors, null, 2));
    console.log("-------------------------------------");

    return { doctors: processedDoctors, clinics: processedClinics };
}


async function addPatient(patientDetails: any): Promise<string> {
    const sanitizedMobile = patientDetails.phone.startsWith('+') ? patientDetails.phone : `+${patientDetails.phone}`;

    const patientPayload = {
        fln: patientDetails.fullName,
        fn: patientDetails.firstName,
        ln: patientDetails.lastName,
        dob: patientDetails.dob,
        gen: patientDetails.gender,
        mobile: sanitizedMobile,
        email: patientDetails.email || "",
    };

    console.log("--- Step 1(b): Adding New Patient via /profiles/v1/patient/ ---");
    console.log("Request URL: POST /profiles/v1/patient/");
    console.log("Request Payload:", JSON.stringify(patientPayload, null, 2));
    
    const responseData = await makeApiRequest(async (client) => {
        const response = await client.post('/profiles/v1/patient/', patientPayload);
        return response.data;
    });

    console.log("SUCCESS: Patient added successfully via /profiles API.");
    console.log("Response Data:", JSON.stringify(responseData, null, 2));
    
    if (!responseData.id) {
      throw new Error("Patient creation did not return a patient ID.");
    }
    return responseData.id;
}


export async function bookAppointment(data: any): Promise<any> {
    console.log("--- Starting Live Booking Process ---");
    
    const sanitizedMobile = data.patient.phone.replace(/^\+/, '');
    
    // Step 1: Search for the patient by mobile number
    console.log(`--- Step 1(a): Searching for patient with mobile: ${sanitizedMobile} ---`);
    let patientId = '';
    
    console.log(`Request URL: GET /dr/v1/business/patients/search?mobile=${sanitizedMobile}`);
    try {
        const searchResponse = await makeApiRequest(async (client) => {
             const response = await client.get(`/dr/v1/business/patients/search?mobile=${sanitizedMobile}`);
             return response.data;
        });

        console.log("SUCCESS: Patient search completed.");
        console.log("Response Data:", JSON.stringify(searchResponse, null, 2));
        
        if (searchResponse?.data?.profiles?.length > 0) {
            console.log("--- INFO: Patient found. Using existing patient ID. ---");
            patientId = searchResponse.data.profiles[0].patient_id;
        }

    } catch (error: any) {
        if (error.response?.data?.error?.code === "PATIENTS_NOT_FOUND") {
            console.log("--- INFO: Patient not found by search. This is expected for new patients. ---");
        } else {
            // For other errors, we still want to see them
            console.error("ERROR during patient search:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        }
    }


    if (!patientId) {
        console.log("--- INFO: Patient not found or search failed. Creating new patient. ---");
        patientId = await addPatient(data.patient);
    }

    if (!patientId) {
        console.error("FATAL: Could not retrieve or create a patient ID.");
        throw new Error("Could not retrieve or create a patient ID.");
    }

    // Step 2: Book the appointment with the patientId
    const startTime = Math.floor(new Date(data.appointment.startTime).getTime() / 1000);
    const endTime = startTime + 1200; // Assuming 20 minute slot
    
    const appointmentPayload = {
        partner_appointment_id: `preventify_appt_${Date.now()}`,
        clinic_id: data.appointment.clinicId,
        doctor_id: data.appointment.doctorId,
        partner_patient_id: patientId,
        appointment_details: {
            start_time: startTime,
            end_time: endTime,
            mode: "INCLINIC",
        },
        patient_details: {
            designation: data.patient.gender === "F" ? "Ms." : "Mr.",
            first_name: data.patient.firstName,
            last_name: data.patient.lastName,
            mobile: sanitizedMobile,
            gender: data.patient.gender,
            dob: data.patient.dob,
        },
    };

    console.log("\n--- Final IDs for Booking ---");
    console.log(`Partner Patient ID (using patient_id): ${appointmentPayload.partner_patient_id}`);
    console.log(`Doctor ID: ${appointmentPayload.doctor_id}`);
    console.log(`Clinic ID: ${appointmentPayload.clinic_id}`);
    
    console.log("\n--- Step 2: Booking Appointment via API ---");
    console.log("Request URL: POST /dr/v1/appointment");
    console.log("Request Payload:", JSON.stringify(appointmentPayload, null, 2));

    const bookingResponse = await makeApiRequest(async (client) => {
        const response = await client.post('/dr/v1/appointment', appointmentPayload);
        return response.data;
    });

    console.log("SUCCESS: Appointment booked successfully.");
    console.log("Response Data:", JSON.stringify(bookingResponse, null, 2));
    console.log("--- Live Booking Process Finished ---");

    return bookingResponse;
}
