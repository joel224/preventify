

'use server';

import axios from 'axios';
import { getTokens, saveTokens } from './token-storage';
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { processBusinessEntities } from './data-processing';
import { getEkaSecrets } from '@/lib/secrets';

const EKA_API_BASE_URL = 'https://api.eka.care';

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

export async function _loginAndGetTokens() {
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
    return { access_token, refresh_token };

  } catch(error: any) {
      console.error("ERROR during login:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
      throw error;
  }
}

async function _refreshAccessToken() {
  const tokens = await getTokens();
  const secrets = await getEkaSecrets();

  if (!tokens?.refresh_token) {
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
    return access_token;
  } catch (error: any) {
    console.error('ERROR: Failed to refresh token.', error.response ? JSON.stringify(error.response.data) : error.message);
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
    const newTokens = await _loginAndGetTokens();
    accessToken = newTokens.access_token;
  }

  const apiClient = getApiClient(accessToken);
  apiClient.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;

  try {
    return await apiCall(apiClient);
  } catch (error: any) {
    if (error.response?.status === 401) {
      const newAccessToken = await _refreshAccessToken();
      
      if (newAccessToken) {
        const newApiClient = getApiClient(newAccessToken);
        newApiClient.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;
        return await apiCall(newApiClient);
      }
      
      const freshTokens = await _loginAndGetTokens();
      const freshApiClient = getApiClient(freshTokens.access_token);
      freshApiClient.defaults.headers.common['client-id'] = secrets.EKA_CLIENT_ID;
      return await apiCall(freshApiClient);

    } else {
      console.error('An unrecoverable error occurred during API call.');
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
        if (!responseData?.data?.schedule) {
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

    return finalFilteredSlots;
}


export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    const response = await makeApiRequest(async (client) => {
        return client.get('/dr/v1/business/entities');
    });

    const { doctors: doctorList, clinics: clinicList } = response.data;

    if (!doctorList || !clinicList) {
        console.warn("WARN: No doctors or clinics found in business entities response.");
        return { doctors: [], clinics: [] };
    }
    
    const { doctors: processedDoctors, clinics: processedClinics } = processBusinessEntities(doctorList, clinicList);
    
    return { doctors: processedDoctors, clinics: processedClinics };
}

function sanitizeMobileNumber(mobile: string): string {
    let plainNumber = mobile.replace(/\D/g, '');

    if (plainNumber.length === 12 && plainNumber.startsWith('91')) {
        return plainNumber;
    } else if (plainNumber.length === 10) {
        return `91${plainNumber}`;
    } else {
        return `91${plainNumber.slice(-10)}`;
    }
}

export async function searchPatientByMobile(mobile: string): Promise<any | null> {
    const searchMobile = sanitizeMobileNumber(mobile);

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
            const patientProfile = profiles[0].patient_profile;
            return patientProfile;
        }

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
    const sanitizedMobile = sanitizeMobileNumber(data.patient.phone);
    
    const existingPatientId = await findPatientId(data.patient.phone);

    let partnerPatientId;
    if (existingPatientId) {
        partnerPatientId = existingPatientId;
    } else {
        partnerPatientId = `preventify_patient_${sanitizedMobile}_${Date.now()}`;
    }

    const partnerAppointmentId = `preventify_appt_${Date.now()}`;
    const startTimeInSeconds = Math.floor(new Date(data.appointment.startTime).getTime() / 1000);
    const endTimeInSeconds = startTimeInSeconds + 600; // 10 minute duration

    const formatGender = (gender: string): 'M' | 'F' | 'O' => {
        if (!gender) return 'O';
        const lowerGender = gender.toLowerCase();
        if (lowerGender.startsWith('m')) return 'M';
        if (lowerGender.startsWith('f')) return 'F';
        return 'O';
    };
    
    const formattedGender = formatGender(data.patient.gender);

    const getDesignation = (gender: string) => {
        const lowerGender = gender.toLowerCase();
        if (lowerGender.startsWith('f')) return 'Ms.';
        if (lowerGender.startsWith('m')) return 'Mr.';
        return 'Mx.';
    };

    const appointmentPayload = {
        partner_appointment_id: partnerAppointmentId,
        clinic_id: data.appointment.clinicId,
        doctor_id: data.appointment.doctorId,
        partner_patient_id: partnerPatientId,
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
            gender: formattedGender,
            dob: data.patient.dob,
        },
    };

    const attemptBooking = async () => {
        return makeApiRequest(async (client) => {
            const response = await client.post('/dr/v1/appointment', appointmentPayload);
            return response.data;
        });
    };

    try {
        const bookingResponse = await attemptBooking();
        return bookingResponse;
    } catch(error: any) {
        // This catch block handles cases where makeApiRequest itself fails or
        // if the initial token was so old that even the retry logic inside it failed.
        // A final attempt after a fresh login is a robust way to handle this.
        console.error("First booking attempt failed, retrying with a fresh login...", error.message);
        await _loginAndGetTokens(); // Force a fresh login to get a new token

        try {
            const bookingResponse = await attemptBooking(); // Retry the booking
            return bookingResponse;
        } catch (finalError: any) {
            console.error("Final booking attempt failed:", finalError.message);
            throw finalError; // If it fails again, we let the error propagate.
        }
    }
}
