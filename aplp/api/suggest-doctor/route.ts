// src/app/api/suggest-doctor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { suggestDoctor } from '@/ai/flows/doctor-suggestion-flow';

export async function POST(req: NextRequest) {
  try {
    const { symptoms, doctors } = await req.json();

    if (!symptoms || !doctors) {
      return NextResponse.json({ message: 'Missing symptoms or doctors list' }, { status: 400 });
    }

    const result = await suggestDoctor({ symptoms, doctors });
    
    return NextResponse.json({ doctorId: result.doctorId });
  } catch (error: any) {
    console.error('Error in suggest-doctor API:', error);
    return NextResponse.json({ message: 'An error occurred while suggesting a doctor.', error: error.message }, { status: 500 });
  }
}
