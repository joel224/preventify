
import { makeApiRequest } from './eka-auth';

export async function bookAppointment(data: any): Promise<any> {
    console.log("--- [DEBUG] BACKEND: bookAppointment function started ---");
    console.log("--- [DEBUG] BACKEND: Received data from frontend:", JSON.stringify(data, null, 2));

    const partnerAppointmentId = `preventify_appt_${Date.now()}`;
    const partnerPatientId = `preventify_patient_${data.patient.phone}_${Date.now()}`;

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
            gender: data.patient.gender,
            dob: data.patient.dob,
        },
    };
    
    console.log("\n--- [DEBUG] BACKEND: Booking Appointment via /dr/v1/appointment ---");
    console.log("--- [DEBUG] BACKEND: Full Request Payload to Eka API ---");
    console.log(JSON.stringify(appointmentPayload, null, 2));
    console.log("------------------------------------");

    try {
        const bookingResponse = await makeApiRequest(async (client) => {
            const response = await client.post('/dr/v1/appointment', appointmentPayload);
            return response.data;
        });

        console.log("--- [DEBUG] BACKEND: SUCCESS: API responded to booking request. ---");
        console.log("--- [DEBUG] BACKEND: Full API Response ---");
        console.log(JSON.stringify(bookingResponse, null, 2));
        console.log("---------------------------------");
        
        return bookingResponse;
    } catch(error: any) {
        console.error("--- [DEBUG] BACKEND: ERROR during Eka API booking call ---");
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
