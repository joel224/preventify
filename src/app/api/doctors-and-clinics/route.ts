import { NextResponse } from 'next/server';
import { getBusinessEntitiesAndDoctors } from '@/lib/eka/eka-api';

export const dynamic = 'force-dynamic'; // Defaults to auto

export async function GET(request: Request) {
  try {
    console.log('API Route: /api/doctors-and-clinics called');
    const data = await getBusinessEntitiesAndDoctors();
    return NextResponse.json(data);
  } catch (error: any) {
     console.error('Error in /api/doctors-and-clinics route:', error.message);
     return NextResponse.json({ message: 'Failed to get doctors and clinics', error: error.message }, { status: 500 });
  }
}
