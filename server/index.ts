import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPatientDetails } from './eka-api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the decoupled backend!' });
});

app.get('/api/patient', async (req, res) => {
  try {
    // This is a placeholder user token. In a real app, this would be dynamically obtained.
    const userToken = "some-user-token"; 
    // The mobile number would likely come from the request, e.g., req.query.mobile
    const patientData = await getPatientDetails("9999999999", userToken);
    res.json(patientData);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to get patient details', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
