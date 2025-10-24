
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const patientFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date of birth" }),
  gender: z.enum(["M", "F", "O"], { required_error: "Gender is required" }),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;


interface Doctor {
  id: string;
  name: string;
  clinicId: string;
  clinicName: string;
}

interface Clinic {
  id: string;
  name: string;
  doctors: { id: string; name: string }[];
}

interface Slot {
  startTime: string;
  endTime: string;
  available: boolean;
}

const BookingDialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Data states
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);

  // Selection states
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientFormValues | null>(null);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
        gender: undefined,
    }
  });


  // Fetch initial doctors and clinics
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/doctors-and-clinics');
        if (!response.ok) throw new Error('Failed to fetch initial data');
        const data = await response.json();
        setDoctors(data.doctors);
        setClinics(data.clinics);
      } catch (error) {
        console.error(error);
        toast.error('Could not load doctors and clinics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    if (isOpen) {
      fetchInitialData();
    }
  }, [isOpen]);

  // Fetch slots when dependencies change
  const fetchSlots = useCallback(async () => {
    if (!selectedDoctorId || !selectedClinicId || !selectedDate) return;
    setIsLoading(true);
    setAvailableSlots([]);
    setSelectedSlot(null);
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${selectedClinicId}&date=${dateStr}`);
      if (!response.ok) throw new Error('Failed to fetch slots');
      const data = await response.json();
      setAvailableSlots(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load available slots. Please select a different date or provider.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDoctorId, selectedClinicId, selectedDate]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);
  
  const onPatientFormSubmit = (data: PatientFormValues) => {
    setPatientDetails(data);
    handleNextStep();
  };

  const resetState = () => {
    setStep(1);
    setSelectedDoctorId(null);
    setSelectedClinicId(null);
    setSelectedDate(new Date());
    setSelectedSlot(null);
    setPatientDetails(null);
    setAvailableSlots([]);
    form.reset();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetState();
    }
  };
  
  const bookAppointment = async () => {
    if (!patientDetails || !selectedSlot || !selectedDoctorId || !selectedClinicId) {
        toast.error("Incomplete appointment details. Please start over.");
        return;
    }
    
    setIsBooking(true);
    try {
        const payload = {
            patient: {
              ...patientDetails,
              dob: format(new Date(patientDetails.dob), 'yyyy-MM-dd'),
            },
            appointment: {
                doctorId: selectedDoctorId,
                clinicId: selectedClinicId,
                startTime: selectedSlot.startTime,
            }
        };

        const response = await fetch('/api/create-appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Booking failed. Please try again.');
        }

        const result = await response.json();
        toast.success(`Appointment confirmed! Your booking ID is ${result.appointment_id}.`);
        handleNextStep(); // Move to confirmation step

    } catch (error: any) {
        console.error("Booking Error:", error);
        toast.error(error.message || "An unexpected error occurred during booking.");
    } finally {
        setIsBooking(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Select Doctor & Date";
      case 2: return "Enter Patient Details";
      case 3: return "Confirm Your Appointment";
      case 4: return "Appointment Confirmed!";
      default: return "Book an Appointment";
    }
  };

  const doctorForClinic = clinics.find(c => c.id === selectedClinicId)?.doctors || doctors;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-4xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          {step < 4 && <DialogDescription>Follow the steps below to book your appointment.</DialogDescription>}
        </DialogHeader>

        {isLoading && step < 4 && (
          <div className="flex items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-preventify-purple" />
          </div>
        )}

        {!isLoading && (
            <>
                {/* Step 1: Select Doctor, Clinic, Date, and Slot */}
                {step === 1 && (
                    <div className="grid md:grid-cols-2 gap-8 py-4">
                        <div>
                            <h3 className="font-semibold mb-2">1. Select Clinic</h3>
                            <Select onValueChange={(val) => {setSelectedClinicId(val); setSelectedDoctorId(null);}} value={selectedClinicId || ""}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a clinic" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clinics.map(clinic => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            <h3 className="font-semibold mb-2 mt-4">2. Select Doctor</h3>
                            <Select onValueChange={setSelectedDoctorId} value={selectedDoctorId || ""} disabled={!selectedClinicId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {doctorForClinic.map(doctor => <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            <h3 className="font-semibold mb-2 mt-4">3. Select Date</h3>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => date < new Date(new Date().toDateString())}
                                className="rounded-md border"
                            />
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">4. Select Available Slot</h3>
                            <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                                {availableSlots.length > 0 ? (
                                    availableSlots.map((slot, index) => (
                                        <Button
                                            key={index}
                                            variant={selectedSlot?.startTime === slot.startTime ? 'default' : 'outline'}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={selectedSlot?.startTime === slot.startTime ? 'bg-preventify-blue' : ''}
                                        >
                                            {format(new Date(slot.startTime), 'hh:mm a')}
                                        </Button>
                                    ))
                                ) : (
                                    <p className="col-span-3 text-sm text-gray-500">
                                        No slots available. Please select a doctor, clinic, and date.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Patient Details */}
                {step === 2 && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onPatientFormSubmit)} className="space-y-6 py-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                             <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                           </div>
                             <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="9876543210" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex items-center space-x-4 pt-2"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="M" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Male</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="F" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Female</FormLabel>
                                                </FormItem>
                                                 <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="O" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <DialogFooter>
                                <Button type="button" variant="outline" onClick={handlePrevStep}>Back</Button>
                                <Button type="submit" className="bg-preventify-blue">Next</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
                
                {/* Step 3: Confirmation */}
                {step === 3 && patientDetails && selectedSlot && (
                    <div className="py-4 space-y-4">
                        <p><strong>Patient:</strong> {patientDetails.firstName} {patientDetails.lastName}</p>
                        <p><strong>Contact:</strong> {patientDetails.phone}</p>
                        <p><strong>Doctor:</strong> {doctors.find(d => d.id === selectedDoctorId)?.name}</p>
                        <p><strong>Clinic:</strong> {clinics.find(c => c.id === selectedClinicId)?.name}</p>
                        <p><strong>Date:</strong> {selectedDate ? format(selectedDate, 'PPP') : 'N/A'}</p>
                        <p><strong>Time:</strong> {format(new Date(selectedSlot.startTime), 'hh:mm a')}</p>
                    </div>
                )}
                
                {/* Step 4: Success */}
                {step === 4 && (
                     <div className="text-center py-10">
                        <p className="text-lg">Your appointment has been successfully booked!</p>
                        <p className="text-gray-500">You will receive a confirmation message shortly.</p>
                     </div>
                )}

            </>
        )}
        
        {step !== 2 && (
             <DialogFooter>
                {step === 1 && <Button onClick={() => setIsOpen(false)} variant="ghost">Cancel</Button>}
                {step > 1 && step < 4 && <Button variant="outline" onClick={handlePrevStep} disabled={isBooking}>Back</Button>}
                
                {step === 1 && <Button onClick={handleNextStep} disabled={!selectedDoctorId || !selectedClinicId || !selectedDate || !selectedSlot} className="bg-preventify-blue">Next</Button>}
                {step === 3 && <Button onClick={bookAppointment} disabled={isBooking} className="bg-preventify-green">{isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Confirm Booking</Button>}
                {step === 4 && <Button onClick={() => setIsOpen(false)} className="bg-preventify-blue">Done</Button>}
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
