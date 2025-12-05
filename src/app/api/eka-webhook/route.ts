
import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
import { tmpdir } from 'os';

// This is a temporary file-based "database" to store video links.
// In a production environment, you would use a proper database like Firestore, PostgreSQL, etc.
const dbPath = path.join(process.env.VERCEL ? '/tmp' : tmpdir(), 'video_links.json');

async function readDb(): Promise<Record<string, any>> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return {}; // File doesn't exist yet, return empty object
    }
    console.error('Error reading from temp db:', error);
    return {};
  }
}

async function writeDb(data: Record<string, any>): Promise<void> {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to temp db:', error);
  }
}

/**
 * API route to handle incoming webhooks from Eka Care.
 * This endpoint listens for the 'appointment.tele.dr_joined' event.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Log the entire payload for debugging purposes
    console.log('--- EKA WEBHOOK RECEIVED ---');
    console.log(JSON.stringify(payload, null, 2));
    
    // Specifically handle the event where the doctor joins the video call
    if (payload.event === 'appointment.tele.dr_joined' && payload.data?.appointment_id && payload.data?.video_connect?.meet_link) {
        console.log(`Doctor joined for appointment: ${payload.data.appointment_id}. Storing video link.`);

        const db = await readDb();
        db[payload.data.appointment_id] = {
            meet_link: payload.data.video_connect.meet_link,
            timestamp: new Date().toISOString(),
        };
        await writeDb(db);
        
        console.log(`Video link stored successfully for ${payload.data.appointment_id}.`);
    }

    // Respond to Eka Care to acknowledge receipt of the webhook
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Error handling webhook:', error.message);
    return NextResponse.json({ message: 'Error processing webhook', error: error.message }, { status: 500 });
  }
}
