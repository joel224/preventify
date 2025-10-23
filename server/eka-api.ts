
import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';
import { format } from "date-fns";

const EKA_API_BASE_URL = 'https://api.eka.care';

const getApiClient = (accessToken?: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
     headers['auth'] = accessToken;
     headers['Authorization'] = `Bearer ${accessToken}`;
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
  } catch (error) {
    console.error('ERROR: Failed to refresh token. A full login may be required.', error);
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

export async function getAvailableSlots(doctorId: string, clinicId: string, date: string): Promise<any> {
    console.log(`--- Fetching available slots for doctor: ${doctorId}, clinic: ${clinicId}, date: ${date} ---`);

    const formattedDate = format(new Date(date), 'yyyy-MM-dd');

    return makeApiRequest(async (client) => {
        const response = await client.get(`/dr/v1/doctor/${doctorId}/clinic/${clinicId}/appointment/slot`, {
            params: {
                start_date: formattedDate,
                end_date: formattedDate
            }
        });
        console.log("SUCCESS: Fetched available slots.");
        // We only care about the schedule data for the frontend
        return response.data.data.schedule;
    });
}


export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    console.log("--- Starting getBusinessEntitiesAndDoctors ---");
    
    const businessEntitiesResponse = await makeApiRequest(async (client) => {
        console.log('INFO: Fetching business entities (/dr/v1/business/entities)...');
        const response = await client.get('/dr/v1/business/entities');
        console.log("SUCCESS: Fetched business entities.");
        return response.data;
    });

    const { doctors: doctorList, clinics: clinicList } = businessEntitiesResponse;

    if (!doctorList || doctorList.length === 0) {
        console.log("INFO: No doctors found in business entities response.");
        return { doctors: [], clinics: [] };
    }
    
    console.log(`INFO: Found ${doctorList.length} doctors and ${clinicList.length} clinics. Fetching details...`);
    
    const simplifiedDoctors = doctorList.map((doc: any) => ({
      id: doc.doctor_id,
      name: doc.name,
      specialty: 'General', // Placeholder
      location: 'Not Specified', // Placeholder
      image: 'https://res.cloudinary.com/dyf8umlda/image/upload/v1748260270/Dr_Abdurahiman_mct6bx.jpg'
    }));

    const clinics = clinicList.map((c: any) => ({id: c.clinic_id, name: c.name}));
    
    console.log(`--- Finished getBusinessEntitiesAndDoctors. Returning ${simplifiedDoctors.length} doctors and ${clinics.length} clinics. ---`);
    return { doctors: simplifiedDoctors, clinics };
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

    } catch (error: any) => {
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

