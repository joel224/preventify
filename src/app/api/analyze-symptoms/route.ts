// src/app/api/analyze-symptoms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { analyzeSymptoms } from '@/ai/flows/symptom-analyzer-flow';
import { z } from 'zod';

const ApiInputSchema = z.object({
    symptoms: z.string().min(10, 'Symptoms must be at least 10 characters long.'),
    doctors: z.array(z.object({
        id: z.string(),
        name: z.string(),
        specialty: z.string(),
    })).min(1, 'Doctors list cannot be empty.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = ApiInputSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.errors }, { status: 400 });
    }

    const { symptoms, doctors } = validation.data;

    const result = await analyzeSymptoms({ symptoms, doctors });
    
    // Return only the recommendedDoctorId
    return NextResponse.json({ 
        recommendedDoctorId: result.recommendedDoctorId
    });
  } catch (error: any) {
    console.error('Error in analyze-symptoms API:', error);
    return NextResponse.json({ message: 'An error occurred while analyzing symptoms.', error: error.message || 'Unknown error' }, { status: 500 });
  }
}
