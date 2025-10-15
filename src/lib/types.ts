export type Vital = {
  label: string;
  value: string;
  unit: string;
};

export type Vitals = {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  spo2: string;
  glucose: string;
};

export type HistoryItem = {
  date: string;
  title: string;
  description: string;
};

export type PatientProfile = {
  name: string;
  mrn: string;
  email: string;
  sex: string;
  age: number;
  bloodType: string;
  status: string;
  department: string;
  registeredDate: string;
  appointment: number;
  bedNumber: string;
  vitals: Vitals;
  primaryDiagnosis: string[];
  medications: string[];
  physicianNotes: string[];
  patientHistory: string[];
  history: HistoryItem[];
};
