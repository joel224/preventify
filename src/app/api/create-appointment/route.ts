import { NextResponse } from 'next/server';
import { bookAppointment } from '@/lib/eka/eka-api';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    console.log('\n--- [DEBUG] API Route: Received request on /api/create-appointment endpoint ---');
    
    try {
        const body = await request.json();
        console.log('--- [DEBUG] API Route: Request Body Received from Frontend: ---');
        console.log(JSON.stringify(body, null, 2));
        console.log('-------------------------------------------------------------------\n');

        if (!body || !body.patient || !body.appointment) {
            console.error('--- [DEBUG] API Route: Invalid booking data. Missing patient or appointment details. ---');
            return NextResponse.json({ message: 'Invalid booking data provided. Patient or appointment details are missing.' }, { status: 400 });
        }

        const result = await bookAppointment(body);
        console.log('--- [DEBUG] API Route: bookAppointment was successful. Sending 201 response. ---');
        return NextResponse.json(result, { status: 201 });

    } catch (error: any) {
        console.error('--- [DEBUG] API Route: Error in /api/create-appointment endpoint:', error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || 'Failed to process booking request';
        const errorData = error.response?.data || error.message;

        return NextResponse.json({ message: errorMessage, error: errorData }, { status: statusCode });
    }
}
