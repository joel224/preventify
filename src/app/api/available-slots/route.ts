import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/eka/eka-api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const clinicId = searchParams.get('clinicId');
    const date = searchParams.get('date');

    if (!doctorId || !clinicId || !date) {
        return NextResponse.json({ message: 'Missing or invalid query parameters: doctorId, clinicId, date' }, { status: 400 });
    }

    try {
        console.log(`API Route: /api/available-slots called with doctorId=${doctorId}, clinicId=${clinicId}, date=${date}`);
        const slots = await getAvailableSlots(doctorId, clinicId, date);
        return NextResponse.json(slots);
    } catch (error: any) {
        console.error('Error in /api/available-slots route:', error.message);
        return NextResponse.json({ message: 'Failed to get available slots', error: error.message }, { status: 500 });
    }
}