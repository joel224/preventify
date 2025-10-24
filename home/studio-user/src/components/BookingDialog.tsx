
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { Loader2, CalendarIcon, CheckCircle, XCircle } from 'lucide-react';

// Types
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
}

const PADINJARANGADI_CLINIC_ID = "21683";

// Zod Schemas
const stepOneSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor.'),
  clinicId: z.string().min(1, 'Please select a clinic.'),
});

const stepTwoSchema = z.object({
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, 'Please select a time slot.'),
});

const stepThreeSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number.'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter DOB in YYYY-MM-DD format.'),
  gender: z.enum(['M', 'F', 'O']),
});

const bookingSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema);

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      doctorId: '',
      clinicId: PADINJARANGADI_CLINIC_ID,
      time: '',
      firstName: '',
      lastName: '',
      phone: '',
      dob: '',
      gender: 'M',
    },
  });

  const selectedDoctorId = useWatch({ control: form.control, name: 'doctorId' });
  const selectedClinicId = useWatch({ control: form.control, name: 'clinicId' });
  const selectedDate = useWatch({ control: form.control, name: 'date' });

  // Fetch doctors and clinics on mount
  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/doctors-and-clinics');
          if (!res.ok) throw new Error('Failed to fetch data');
          const { doctors, clinics } = await res.json();
          setDoctors(doctors);
          setClinics(clinics);
          // Pre-select the clinic
          form.setValue('clinicId', PADINJARANGADI_CLINIC_ID, { shouldValidate: true });
        } catch (error) {
          console.error(error);
          toast.error('Could not load doctors and clinics.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [open, form]);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      form.reset({
        doctorId: '',
        clinicId: PADINJARANGADI_CLINIC_ID,
        time: '',
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        gender: 'M',
      });
      setStep(1);
      setBookingStatus('idle');
      setAvailableSlots([]);
    }
  }, [open, form]);

  // Fetch slots when doctor, clinic, and date are selected
  useEffect(() => {
    if (selectedDoctorId && selectedClinicId && selectedDate) {
      const fetchSlots = async () => {
        setIsLoading(true);
        setAvailableSlots([]);
        form.setValue('time', '');
        try {
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          const res = await fetch(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${selectedClinicId}&date=${formattedDate}`);
          if (!res.ok) throw new Error('Failed to fetch slots');
          const slots = await res.json();
          setAvailableSlots(slots);
        } catch (error) {
          console.error(error);
          toast.error('Could not load available time slots.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedDoctorId, selectedClinicId, selectedDate, form]);
  
  const selectedDoctor = useMemo(() => doctors.find(d => d.id === selectedDoctorId), [doctors, selectedDoctorId]);
  
  const doctorsForSelectedClinic = useMemo(() => {
    const clinic = clinics.find(c => c.id === PADINJARANGADI_CLINIC_ID);
    if (!clinic) return [];
    const doctorIds = new Set(clinic.doctors.map(d => d.id));
    return doctors.filter(d => doctorIds.has(d.id));
  }, [doctors, clinics]);


  const handleNextStep = async () => {
    let result;
    if (step === 1) {
      result = await form.trigger(['doctorId', 'clinicId']);
    } else if (step === 2) {
      result = await form.trigger(['date', 'time']);
    }
    if (result) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    setBookingStatus('idle');

    const payload = {
        patient: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            dob: data.dob,
            gender: data.gender,
        },
        appointment: {
            doctorId: data.doctorId,
            clinicId: data.clinicId,
            startTime: data.time,
        }
    };

    try {
        const response = await fetch('/api/create-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Booking failed');
        }
        
        setBookingResponse(result);
        setBookingStatus('success');
        setStep(4);
    } catch (error: any) {
        console.error('Booking error:', error);
        toast.error(`Booking failed: ${error.message}`);
        setBookingStatus('error');
        setStep(4);
    } finally {
        setIsLoading(false);
    }
  };


  const renderStepContent = () => {
    const selectedClinic = clinics.find(c => c.id === PADINJARANGADI_CLINIC_ID);
    switch (step) {
      case 1: // Select Doctor
        return (
          <>
            <DialogHeader>
              <DialogTitle>Step 1: Select a Doctor</DialogTitle>
              <DialogDescription>
                Booking an appointment at {selectedClinic?.name || 'our clinic'}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor</FormLabel>
                    <Command>
                      <CommandInput placeholder="Search doctor..." />
                      <CommandList className="max-h-[250px]">
                        <CommandEmpty>No doctor found.</CommandEmpty>
                        <CommandGroup>
                           {doctorsForSelectedClinic.map((doctor) => (
                            <CommandItem
                              key={doctor.id}
                              value={doctor.name}
                              onSelect={() => {
                                form.setValue('doctorId', doctor.id, { shouldValidate: true });
                              }}
                            >
                              {doctor.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleNextStep} disabled={isLoading || doctorsForSelectedClinic.length === 0} type="button">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Next
              </Button>
            </DialogFooter>
          </>
        );
      case 2: // Select Date & Time
        return (
          <>
            <DialogHeader>
              <DialogTitle>Step 2: Select Date & Time</DialogTitle>
              <DialogDescription>
                {`Booking for ${selectedDoctor?.name} at ${selectedClinic?.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
               <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>Date</FormLabel>
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().toDateString())}
                        initialFocus
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Slots</FormLabel>
                    <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
                      {isLoading ? (
                        <div className="col-span-3 flex justify-center items-center h-24">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : availableSlots.length > 0 ? (
                        availableSlots.map((slot) => (
                            <Button
                                key={slot.startTime}
                                variant={field.value === slot.startTime ? 'default' : 'outline'}
                                onClick={() => field.onChange(slot.startTime)}
                                className="w-full"
                                type="button"
                            >
                                {format(parseISO(slot.startTime), 'hh:mm a')}
                            </Button>
                        ))
                      ) : (
                         <p className="col-span-3 text-sm text-muted-foreground text-center py-4">
                           {selectedDate ? 'No slots available. Please select another date.' : 'Please select a date to see available slots.'}
                         </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handlePrevStep} type="button">Back</Button>
              <Button onClick={handleNextStep} type="button">Next</Button>
            </DialogFooter>
          </>
        );
       case 3: // Patient Details
        return (
          <>
            <DialogHeader>
              <DialogTitle>Step 3: Patient Details</DialogTitle>
              <DialogDescription>Please provide your information.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
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
                          <Input placeholder="+919876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
               <div className="grid grid-cols-2 gap-4">
                  <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                          <Input placeholder="YYYY-MM-DD" {...field} />
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
                              className="flex space-x-4 pt-2"
                          >
                              <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                  <RadioGroupItem value="M" />
                              </FormControl>
                              <FormLabel className="font-normal">Male</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                  <RadioGroupItem value="F" />
                              </FormControl>
                              <FormLabel className="font-normal">Female</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
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
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={handlePrevStep} type="button">Back</Button>
                <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Confirm Booking
                </Button>
            </DialogFooter>
          </>
        );
        case 4: // Confirmation
            return (
                <>
                <DialogHeader className="items-center text-center">
                    {bookingStatus === 'success' ? (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <DialogTitle className="text-2xl">Appointment Confirmed!</DialogTitle>
                            <DialogDescription>
                                Your appointment has been successfully booked.
                            </DialogDescription>
                        </>
                    ) : (
                        <>
                            <XCircle className="h-16 w-16 text-red-500 mb-4" />
                            <DialogTitle className="text-2xl">Booking Failed</DialogTitle>
                            <DialogDescription>
                                There was an error processing your booking. Please try again.
                            </DialogDescription>
                        </>
                    )}
                </DialogHeader>
                {bookingStatus === 'success' && bookingResponse && (
                    <div className="py-4 space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                        <p><strong>Confirmation ID:</strong> {bookingResponse.appointment_id}</p>
                        <p><strong>Patient Name:</strong> {form.getValues('firstName')} {form.getValues('lastName')}</p>
                        <p><strong>Doctor:</strong> {doctors.find(d => d.id === form.getValues('doctorId'))?.name}</p>
                        <p><strong>Clinic:</strong> {clinics.find(c => c.id === form.getValues('clinicId'))?.name}</p>
                        <p><strong>Date & Time:</strong> {format(parseISO(form.getValues('time')), 'dd MMMM yyyy, hh:mm a')}</p>
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
                </>
            );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {renderStepContent()}
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
