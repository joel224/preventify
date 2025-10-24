
import { makeApiRequest } from './eka-auth';

/**
 * Searches for a patient profile by their mobile number.
 * @param phone The patient's mobile number, which can include a '+'.
 * @returns The patient data if found, otherwise null.
 */
export async function searchPatientByPhone(phone: string): Promise<any | null> {
    const sanitizedMobile = phone.replace(/^\+/, '');

    console.log(`--- [DEBUG] BACKEND patient-api.ts: Starting patient search for mobile: ${sanitizedMobile}`);

    try {
        const response = await makeApiRequest(async (client) => {
            return client.get(`/dr/v1/business/patients/search`, {
                params: {
                    mobile: sanitizedMobile
                }
            });
        });

        const responseData = response.data;
        console.log(`--- [DEBUG] BACKEND patient-api.ts: Raw patient search API response for ${sanitizedMobile}:`, JSON.stringify(responseData, null, 2));

        if (responseData && responseData.data && responseData.data.length > 0) {
            console.log(`--- [DEBUG] BACKEND patient-api.ts: SUCCESS: Found ${responseData.data.length} patient record(s).`);
            return responseData.data;
        } else {
            console.log(`--- [DEBUG] BACKEND patient-api.ts: INFO: No patient found for mobile ${sanitizedMobile}.`);
            return null;
        }

    } catch (error: any) {
        console.error(`--- [DEBUG] BACKEND patient-api.ts: ERROR searching for patient ${sanitizedMobile}:`, error.message);
        if (error.response) {
            console.error("Eka API Error Response Status:", error.response.status);
            console.error("Eka API Error Response Data:", JSON.stringify(error.response.data, null, 2));
        }
        // It's important to return null here so the booking flow can continue for a new patient.
        return null;
    }
}
