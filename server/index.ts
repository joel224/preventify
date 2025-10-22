
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPatientDetails, getBusinessEntitiesAndDoctors, _loginAndGetTokens } from './eka-api';

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

app.get('/api/patient', async (req, res) => {
  try {
    // The mobile number would likely come from the request, e.g., req.query.mobile
    const patientData = await getPatientDetails("9999999999");
    res.json(patientData);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to get patient details', error: error.message });
  }
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


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
