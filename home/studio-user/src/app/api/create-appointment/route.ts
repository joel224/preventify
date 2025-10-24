
import { NextResponse } from 'next/server';
import { bookAppointment } from '@/server/booking-api';

export async function POST(request: Request) {
    console.log('\n--- [DEBUG] API ROUTE: Received request on /api/create-appointment ---');
    try {
        const body = await request.json();
        console.log('--- [DEBUG] API ROUTE: Request Body Received from Frontend:', JSON.stringify(body, null, 2));

        const { patient, appointment } = body;

        if (!patient || !appointment || !patient.firstName || !patient.phone || !appointment.doctorId || !appointment.startTime) {
            console.error('--- [DEBUG] API ROUTE: Invalid booking data. Missing required details. ---');
            return NextResponse.json({ message: 'Invalid booking data provided. Patient or appointment details are missing.' }, { status: 400 });
        }

        const result = await bookAppointment(body);
        console.log('--- [DEBUG] API ROUTE: bookAppointment was successful. Sending 201 response. ---');
        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        console.error('--- [DEBUG] API ROUTE: Error in /api/create-appointment endpoint:', error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || 'Failed to process booking request';
        return NextResponse.json({ message: errorMessage, error: error.response?.data || error.message }, { status: statusCode });
    }
}
