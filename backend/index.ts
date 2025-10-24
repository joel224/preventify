
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
    getBusinessEntitiesAndDoctors, 
    _loginAndGetTokens, 
    getAvailableSlots,
    bookAppointment
} from './eka-api';


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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


app.post('/api/create-appointment', async (req, res) => {
    // Robust logging to see exactly what the frontend is sending
    console.log('\n--- [DEBUG] SERVER index.ts: Received request on /api/create-appointment endpoint ---');
    console.log('--- [DEBUG] SERVER index.ts: Request Body Received from Frontend: ---');
    console.log(JSON.stringify(req.body, null, 2));
    console.log('-------------------------------------------------------------------\n');

    try {
        if (!req.body || !req.body.patient || !req.body.appointment) {
            console.error('--- [DEBUG] SERVER index.ts: Invalid booking data. Missing patient or appointment details. ---');
            return res.status(400).json({ message: 'Invalid booking data provided. Patient or appointment details are missing.' });
        }
        const result = await bookAppointment(req.body);
        console.log('--- [DEBUG] SERVER index.ts: bookAppointment was successful. Sending 201 response. ---');
        res.status(201).json(result);
    } catch (error: any) {
        console.error('--- [DEBUG] SERVER index.ts: Error in /api/create-appointment endpoint:', error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || 'Failed to process booking request';
        res.status(statusCode).json({ message: errorMessage, error: error.response?.data || error.message });
    }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

    