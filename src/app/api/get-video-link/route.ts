
import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
import { tmpdir } from 'os';

// This is the same temporary file-based "database" used by the webhook.
const dbPath = path.join(process.env.VERCEL ? '/tmp' : tmpdir(), 'video_links.json');

async function readDb(): Promise<Record<string, any>> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return {}; // File doesn't exist yet, which is normal before any webhooks arrive.
    }
    console.error('Error reading from temp db:', error);
    return {};
  }
}

/**
 * API route to check for a video link for a given appointment ID.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const appointmentId = searchParams.get('appointmentId');

  if (!appointmentId) {
    return NextResponse.json({ message: 'Appointment ID is required' }, { status: 400 });
  }

  try {
    const db = await readDb();
    const appointmentData = db[appointmentId];

    if (appointmentData && appointmentData.meet_link) {
      // Link found, return it
      return NextResponse.json({ meet_link: appointmentData.meet_link }, { status: 200 });
    } else {
      // Link not found yet
      return NextResponse.json({ message: 'Video link not available yet.' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Error getting video link:', error.message);
    return NextResponse.json({ message: 'Failed to retrieve video link', error: error.message }, { status: 500 });
  }
}
