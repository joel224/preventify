
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { _loginAndGetTokens } from './eka-auth';
import { getBusinessEntitiesAndDoctors, getAvailableSlots } from './clinic-api';
import { bookAppointment } from './booking-api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory session storage for the booking flow
const bookingSessions: { [key: string]: any } = {};

app.post('/api/save-step', (req, res) => {
    const { step, sessionId, data } = req.body;
    console.log(`--- [DEBUG] SERVER index.ts: /api/save-step called for step ${step} ---`);
    console.log('--- [DEBUG] SERVER index.ts: Received data:', JSON.stringify(data, null, 2));

    if (!data) {
        return res.status(400).json({ message: 'Missing data for step.' });
    }

    if (step === 1) {
        const newSessionId = crypto.randomUUID();
        bookingSessions[newSessionId] = { step1: data };
        console.log(`--- [DEBUG] SERVER index.ts: New session created with ID: ${newSessionId} ---`);
        return res.status(200).json({ sessionId: newSessionId });
    }

    if (!sessionId || !bookingSessions[sessionId]) {
        console.error('--- [DEBUG] SERVER index.ts: Invalid or missing session ID for step > 1 ---');
        return res.status(400).json({ message: 'Invalid or missing session ID.' });
    }

    if (step === 2) {
        bookingSessions[sessionId].step2 = data;
        console.log(`--- [DEBUG] SERVER index.ts: Session ${sessionId} updated with step 2 data. ---`);
        return res.status(200).json({ message: 'Step 2 data saved.' });
    }

    return res.status(400).json({ message: 'Invalid step provided.' });
});

app.post('/api/create-appointment', async (req, res) => {
    console.log('\n--- [DEBUG] SERVER index.ts: Received request on /api/create-appointment endpoint ---');
    const { sessionId, data: step3Data, doctor, slot } = req.body;
    console.log('--- [DEBUG] SERVER index.ts: Request Body Received from Frontend:', JSON.stringify(req.body, null, 2));

    if (!sessionId || !bookingSessions[sessionId]) {
        return res.status(400).json({ message: 'Session not found or expired.' });
    }

    const sessionData = bookingSessions[sessionId];
    if (!sessionData.step1 || !sessionData.step2) {
        return res.status(400).json({ message: 'Incomplete booking data in session.' });
    }

    // Combine all data
    const nameParts = sessionData.step1.fullName.split(" ");
    const fullPayload = {
        patient: {
            firstName: nameParts[0],
            lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : " ",
            phone: sessionData.step1.phone,
            email: sessionData.step1.email || "",
            gender: step3Data.gender,
            dob: step3Data.dob,
        },
        appointment: {
            clinicId: doctor.clinicId,
            doctorId: doctor.id,
            startTime: slot.startTime,
        }
    };

    try {
        const result = await bookAppointment(fullPayload);
        console.log('--- [DEBUG] SERVER index.ts: bookAppointment was successful. Sending 201 response. ---');
        
        // Clean up the session
        delete bookingSessions[sessionId];
        console.log(`--- [DEBUG] SERVER index.ts: Session ${sessionId} cleaned up. ---`);
        
        res.status(201).json(result);
    } catch (error: any) {
        console.error('--- [DEBUG] SERVER index.ts: Error in /api/create-appointment endpoint:', error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || 'Failed to process booking request';
        res.status(statusCode).json({ message: errorMessage, error: error.response?.data || error.message });
    }
});


app.get('/api/test-login', async (req, res) => {
  try {
    await _loginAndGetTokens();
    res.json({ message: 'Login successful. Tokens saved.' });
  } catch (error: any) {
    console.error('Error in /api/test-login endpoint:', error);
    res.status(500).json({ 
        message: 'Failed to login to Eka Care API', 
        error: error.response ? JSON.stringify(error.response.data) : error.message 
    });
  }
});


app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the decoupled backend!' });
});

app.get('/api/doctors-and-clinics', async (req, res) => {
  try {
    console.log('API Endpoint: /api/doctors-and-clinics called');
    const data = await getBusinessEntitiesAndDoctors();
    res.json(data);
  } catch (error: any) {
     console.error('Error in /api/doctors-and-clinics endpoint:', error.message);
     res.status(500).json({ message: 'Failed to get doctors and clinics', error: error.message });
  }
});

app.get('/api/available-slots', async (req, res) => {
    const { doctorId, clinicId, date } = req.query;
    if (typeof doctorId !== 'string' || typeof clinicId !== 'string' || typeof date !== 'string') {
        return res.status(400).json({ message: 'Missing or invalid query parameters: doctorId, clinicId, date' });
    }
    try {
        console.log(`API Endpoint: /api/available-slots called with doctorId=${doctorId}, clinicId=${clinicId}, date=${date}`);
        const slots = await getAvailableSlots(doctorId, clinicId, date);
        res.json(slots);
    } catch (error: any) {
        console.error('Error in /api/available-slots endpoint:', error.message);
        res.status(500).json({ message: 'Failed to get available slots', error: error.message });
    }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
