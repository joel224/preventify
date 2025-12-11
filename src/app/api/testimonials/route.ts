
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// IMPORTANT: Vercel only allows writing to the /tmp directory in Serverless Functions.
// We use a relative path for local dev and an absolute path for Vercel.
const isVercel = process.env.VERCEL;
const dataFilePath = isVercel 
  ? path.join('/tmp', 'testimonials.json') 
  : path.join(process.cwd(), 'src/data/testimonials.json');


async function readTestimonials() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, return an empty array
      return [];
    }
    // For other errors, re-throw them
    throw error;
  }
}

async function writeTestimonials(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

// GET handler to read testimonials
export async function GET() {
  try {
    const testimonials = await readTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error reading testimonials:", error);
    return NextResponse.json({ message: 'Error reading testimonials' }, { status: 500 });
  }
}

// POST handler to add a new testimonial
export async function POST(req: NextRequest) {
  try {
    const newTestimonial = await req.json();

    // Basic validation
    if (!newTestimonial.name || !newTestimonial.program || !newTestimonial.quote) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const testimonials = await readTestimonials();
    
    // Add the new testimonial to the beginning of the array
    testimonials.unshift(newTestimonial);
    
    await writeTestimonials(testimonials);

    return NextResponse.json({ message: 'Testimonial added successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error writing testimonial:", error);
    return NextResponse.json({ message: 'Error writing testimonial' }, { status: 500 });
  }
}
