
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


export async function getPatientDetails(mobileNumber: string): Promise<any> {
  return makeApiRequest(async (client) => {
    console.log(`INFO: Getting patient details for mobile: ${mobileNumber}`);
    // This is a mock. Replace with a real API call if needed.
    return { "patientId": "12345", "name": "John Doe", "mobile": mobileNumber };
  });
}

export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    console.log("--- Starting getBusinessEntitiesAndDoctors ---");
    
    const businessEntitiesResponse = await makeApiRequest(async (client) => {
        console.log('INFO: Fetching business entities (/dr/v1/business/entities)...');
        const response = await client.get('/dr/v1/business/entities');
        console.log("SUCCESS: Fetched business entities.");
        return response;
    });

    const { doctors: doctorList, clinics: clinicList } = businessEntitiesResponse.data;

    if (!doctorList || doctorList.length === 0) {
        console.log("INFO: No doctors found in business entities response.");
        return { doctors: [], clinics: [] };
    }
    
    console.log(`INFO: Found ${doctorList.length} doctors and ${clinicList.length} clinics. Fetching details...`);
    
    // This part of the code for fetching individual doctor details is complex and seems out of scope
    // of the booking flow. We will return a simplified list for now.
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
    const partner_patient_id = `preventify_${Date.now()}`;
    const sanitizedMobile = patientDetails.phone.startsWith('+') ? patientDetails.phone.substring(1) : patientDetails.phone;

    const patientPayload = {
        partner_patient_id: partner_patient_id,
        first_name: patientDetails.firstName,
        last_name: patientDetails.lastName,
        mobile: sanitizedMobile,
        dob: patientDetails.dob,
        gender: patientDetails.gender,
        designation: patientDetails.gender === "F" ? "Ms." : "Mr.",
    };

    console.log("--- Step 1(b): Adding New Patient via API ---");
    console.log("Request URL: POST /dr/v1/patient");
    console.log("Request Payload:", JSON.stringify(patientPayload, null, 2));
    
    const responseData = await makeApiRequest(async (client) => {
        const response = await client.post('/dr/v1/patient', patientPayload);
        return response.data;
    });

    console.log("SUCCESS: Patient added successfully.");
    console.log("Response Data:", JSON.stringify(responseData, null, 2));
    
    return partner_patient_id;
}


export async function bookAppointment(data: any): Promise<any> {
    console.log("--- Starting Live Booking Process ---");
    
    const sanitizedMobile = data.patient.phone.replace(/^\+/, '');
    
    // Step 1: Search for the patient by mobile number
    console.log(`--- Step 1(a): Searching for patient with mobile: ${sanitizedMobile} ---`);
    let partnerPatientId = '';
    
    console.log(`Request URL: GET /dr/v1/business/patients/search?mobile=${sanitizedMobile}`);
    const searchResponse = await makeApiRequest(async (client) => {
        try {
            const response = await client.get(`/dr/v1/business/patients/search?mobile=${sanitizedMobile}`);
            return response.data;
        } catch (error: any) {
            console.warn("WARN during patient search, assuming not found:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            return { data: { profiles: [] } };
        }
    });

    console.log("SUCCESS: Patient search completed.");
    console.log("Response Data:", JSON.stringify(searchResponse, null, 2));


    if (searchResponse?.data?.profiles?.length > 0) {
        console.log("--- INFO: Patient found. Getting details. ---");
        const patientProfile = searchResponse.data.profiles[0];
        const ekaPatientId = patientProfile.patient_id;
        
        console.log(`Request URL: GET /dr/v1/patient/${ekaPatientId}`);
        const patientDetailsResponse = await makeApiRequest(async (client) => {
            const response = await client.get(`/dr/v1/patient/${ekaPatientId}`);
            return response.data;
        });

        console.log("SUCCESS: Patient details fetched.");
        console.log("Response Data:", JSON.stringify(patientDetailsResponse, null, 2));
        
        partnerPatientId = patientDetailsResponse.partner_patient_id;
        console.log(`--- INFO: Existing Partner Patient ID found: ${partnerPatientId} ---`);

    } else {
        console.log("--- INFO: Patient not found. Creating new patient. ---");
        partnerPatientId = await addPatient(data.patient);
    }

    if (!partnerPatientId) {
        console.error("FATAL: Could not retrieve or create a partner patient ID.");
        throw new Error("Could not retrieve or create a partner patient ID.");
    }

    // Step 2: Book the appointment with the retrieved/created partner_patient_id
    const appointmentDate = new Date(data.appointment.date);
    const startTime = Math.floor(appointmentDate.getTime() / 1000);
    
    const appointmentPayload = {
        partner_appointment_id: `preventify_appt_${Date.now()}`,
        partner_clinic_id: data.appointment.clinicId,
        partner_doctor_id: data.appointment.doctorId,
        partner_patient_id: partnerPatientId,
        appointment_details: {
            start_time: startTime,
            end_time: startTime + 900, // 15-minute slot
            mode: "INCLINIC",
            video_connect: {
                vendor: "other",
                url: "https://preventify.me/virtual-consult"
            }
        },
        patient_details: {
            designation: data.patient.gender === "F" ? "Ms." : "Mr.",
            first_name: data.patient.firstName,
            last_name: data.patient.lastName,
            mobile: sanitizedMobile,
            dob: data.patient.dob, 
            gender: data.patient.gender, 
            partner_patient_id: partnerPatientId,
        },
    };

    console.log("\n--- Final IDs for Booking ---");
    console.log(`Partner Patient ID: ${appointmentPayload.partner_patient_id}`);
    console.log(`Partner Doctor ID: ${appointmentPayload.partner_doctor_id}`);
    console.log(`Partner Clinic ID: ${appointmentPayload.partner_clinic_id}`);
    
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
