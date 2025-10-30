
import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/eka/eka-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId');
  const clinicId = searchParams.get('clinicId');
  const date = searchParams.get('date');

  if (!doctorId || !clinicId || !date) {
    return NextResponse.json({ message: 'Missing required query parameters: doctorId, clinicId, date' }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(doctorId, clinicId, date);
    return NextResponse.json(slots);
  } catch (error: any) {
    console.error('API Error fetching slots:', error);
    return NextResponse.json({ message: 'Error fetching available slots', error: error.message }, { status: 500 });
  }
}
