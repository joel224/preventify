
import { NextResponse } from 'next/server';
import { bookAppointment } from '@/lib/eka/eka-api';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || !body.patient || !body.appointment) {
            return NextResponse.json({ message: 'Invalid booking data provided. Patient or appointment details are missing.' }, { status: 400 });
        }

        const result = await bookAppointment(body);
        return NextResponse.json(result, { status: 201 });

    } catch (error: any) {
        console.error('Error in /api/create-appointment endpoint:', error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || 'Failed to process booking request';
        const errorData = error.response?.data || error.message;

        return NextResponse.json({ message: errorMessage, error: errorData }, { status: statusCode });
    }
}
