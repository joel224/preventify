
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getBusinessEntitiesAndDoctors, _loginAndGetTokens, bookAppointment, getAvailableSlots } from './eka-api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


// New endpoint specifically for testing the login
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
    const data = await getBusinessEntitiesAndDoctors();
    res.json(data);
  } catch (error: any) {
     console.error('Error in /api/doctors-and-clinics endpoint:', error);
     res.status(500).json({ message: 'Failed to get doctors and clinics', error: error.message });
  }
});

app.get('/api/available-slots', async (req, res) => {
    const { doctorId, clinicId, date } = req.query;
    if (typeof doctorId !== 'string' || typeof clinicId !== 'string' || typeof date !== 'string') {
        return res.status(400).json({ message: 'Missing or invalid query parameters: doctorId, clinicId, date' });
    }
    try {
        const slots = await getAvailableSlots(doctorId, clinicId, date);
        res.json(slots);
    } catch (error: any) {
        console.error('Error in /api/available-slots endpoint:', error);
        res.status(500).json({ message: 'Failed to get available slots', error: error.message });
    }
});

app.post('/api/book-appointment', async (req, res) => {
    try {
        if (!req.body || !req.body.patient || !req.body.appointment) {
            return res.status(400).json({ message: 'Invalid booking data provided.' });
        }
        const result = await bookAppointment(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error in /api/book-appointment endpoint:', error);
        res.status(500).json({ message: 'Failed to process booking request', error: error.message });
    }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

