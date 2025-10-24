
'use server';
import { makeApiRequest } from './eka-api';

// This function is dedicated to creating an appointment using the simplified "create-on-the-fly" method.
export async function createAppointment(data: any): Promise<any> {
    console.log("--- [DEBUG] booking-api.ts: createAppointment function started ---");
    console.log("--- [DEBUG] booking-api.ts: Received data:", JSON.stringify(data, null, 2));

    // 1. Generate unique IDs for the partner system
    const partnerAppointmentId = `preventify_appt_${Date.now()}`;
    // Eka recommends using a unique patient identifier from the partner's system.
    // A combination of phone and timestamp is a good way to ensure uniqueness.
    const partnerPatientId = `preventify_patient_${data.patient.phone}_${Date.now()}`;

    // 2. Format timestamps and patient data
    const startTimeInSeconds = Math.floor(new Date(data.appointment.startTime).getTime() / 1000);
    const endTimeInSeconds = startTimeInSeconds + 600; // Duration is 10 minutes (600 seconds)
    const sanitizedMobile = data.patient.phone.replace(/^\+/, '');

    const getDesignation = (gender: string) => {
        if (gender === 'F') return 'Ms.';
        if (gender === 'M') return 'Mr.';
        return 'Mx.'; // Neutral designation for 'Other'
    };

    // 3. Construct the exact payload as per the Eka API documentation
    const appointmentPayload = {
        partner_appointment_id: partnerAppointmentId,
        clinic_id: data.appointment.clinicId,
        doctor_id: data.appointment.doctorId,
        partner_patient_id: partnerPatientId, // Use the generated unique ID
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
    
    console.log("\n--- [DEBUG] booking-api.ts: Booking Appointment via /dr/v1/appointment ---");
    console.log("--- [DEBUG] booking-api.ts: Full Request Payload to Eka API ---");
    console.log(JSON.stringify(appointmentPayload, null, 2));
    console.log("------------------------------------");

    // 4. Make the API call
    try {
        // The API call now returns the full Axios response object
        const bookingResponse = await makeApiRequest(async (client) => {
            return client.post('/dr/v1/appointment', appointmentPayload);
        });

        console.log("--- [DEBUG] booking-api.ts: SUCCESS: API responded to booking request. ---");
        console.log("--- [DEBUG] booking-api.ts: Full API Response ---");
        console.log(JSON.stringify(bookingResponse.data, null, 2)); // Log the .data property of the response
        console.log("---------------------------------");
        
        return bookingResponse.data; // Return just the data to the frontend
    } catch(error: any) {
        console.error("--- [DEBUG] booking-api.ts: ERROR during Eka API booking call ---");
        if (error.response) {
            console.error("Eka API Error Response Status:", error.response.status);
            console.error("Eka API Error Response Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Eka API Error Message:", error.message);
        }
        console.log("---------------------------------");
        throw error; // Re-throw the error to be caught by the endpoint handler in index.ts
    }
}
