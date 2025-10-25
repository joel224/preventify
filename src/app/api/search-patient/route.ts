import { NextResponse } from 'next/server';
import { searchPatientByMobile } from '@/lib/eka/eka-api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
        return NextResponse.json({ message: 'Missing phone number' }, { status: 400 });
    }

    try {
        const patientProfile = await searchPatientByMobile(phone);
        if (patientProfile) {
            return NextResponse.json(patientProfile);
        } else {
            return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
        }
    } catch (error: any) {
        console.error('Error in /api/search-patient route:', error.message);
        return NextResponse.json({ message: 'Failed to search for patient', error: error.message }, { status: 500 });
    }
}
