
'use server';

import { makeApiRequest } from './eka-auth';
import { searchPatientByPhone } from './patient-api';

export async function bookAppointment(data: any): Promise<any> {
    console.log("--- [DEBUG] SERVER ACTION booking-api.ts: bookAppointment function started ---");
    console.log("--- [DEBUG] SERVER ACTION booking-api.ts: Received data:", JSON.stringify(data, null, 2));

    // Step 1: Search for the patient by phone number
    const searchResult = await searchPatientByPhone(data.patient.phone);
    
    let partnerPatientId: string;

    // Step 2: Check if patient was found and get the ID
    if (searchResult && searchResult.length > 0 && searchResult[0].patient_id) {
        partnerPatientId = searchResult[0].patient_id;
        console.log(`--- [DEBUG] SERVER ACTION booking-api.ts: Patient FOUND. Using existing patient_id: ${partnerPatientId}`);
    } else {
        // Step 2b: If not found, generate a new unique ID
        partnerPatientId = `preventify_patient_${data.patient.phone}_${Date.now()}`;
        console.log(`--- [DEBUG] SERVER ACTION booking-api.ts: Patient NOT FOUND. Generated new partner_patient_id: ${partnerPatientId}`);
    }

    // Step 3: Prepare the final appointment payload
    const partnerAppointmentId = `preventify_appt_${Date.now()}`;
    const startTimeInSeconds = Math.floor(new Date(data.appointment.startTime).getTime() / 1000);
    const endTimeInSeconds = startTimeInSeconds + 600; // 10 minute duration
    const sanitizedMobile = data.patient.phone.replace(/^\+/, '');

    const getDesignation = (gender: string) => {
        if (gender === 'F') return 'Ms.';
        if (gender === 'M') return 'Mr.';
        return 'Mx.';
    };

    const appointmentPayload = {
        partner_appointment_id: partnerAppointmentId,
        clinic_id: data.appointment.clinicId,
        doctor_id: data.appointment.doctorId,
        partner_patient_id: partnerPatientId, // Use the determined ID
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
            email: data.patient.email || undefined,
        },
    };
    
    console.log("\n--- [DEBUG] SERVER ACTION booking-api.ts: Booking Appointment via /dr/v1/appointment ---");
    console.log("--- [DEBUG] SERVER ACTION booking-api.ts: Full Request Payload to Eka API ---");
    console.log(JSON.stringify(appointmentPayload, null, 2));
    console.log("------------------------------------");

    // Step 4: Make the API call
    try {
        const bookingResponse = await makeApiRequest(async (client) => {
            const response = await client.post('/dr/v1/appointment', appointmentPayload);
            return response.data;
        });

        console.log("--- [DEBUG] SERVER ACTION booking-api.ts: SUCCESS: API responded to booking request. ---");
        console.log("--- [DEBUG] SERVER ACTION booking-api.ts: Full API Response ---");
        console.log(JSON.stringify(bookingResponse, null, 2));
        console.log("---------------------------------");
        
        return bookingResponse;
    } catch(error: any) {
        console.error("--- [DEBUG] SERVER ACTION booking-api.ts: ERROR during Eka API booking call ---");
        if (error.response) {
            console.error("Eka API Error Response Status:", error.response.status);
            console.error("Eka API Error Response Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Eka API Error Message:", error.message);
        }
        console.log("---------------------------------");
        throw error; // Re-throw the error to be caught by the endpoint handler
    }
}
