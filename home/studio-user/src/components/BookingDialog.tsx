
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

const patientDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['M', 'F', 'O'], { required_error: 'Gender is required' }),
});

type Doctor = { id: string; name: string; clinicId: string; clinicName: string };
type Clinic = { id:string; name: string; doctors: { id: string, name: string }[] };
type Slot = { startTime: string; endTime: string };

export default function BookingDialog({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedClinicId, setSelectedClinicId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof patientDetailsSchema>>({
    resolver: zodResolver(patientDetailsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      dob: '',
      gender: undefined,
    },
  });

  useEffect(() => {
    async function fetchDoctorsAndClinics() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/doctors-and-clinics');
        if (!response.ok) throw new Error('Failed to fetch initial data');
        const data = await response.json();
        setDoctors(data.doctors || []);
        setClinics(data.clinics || []);
      } catch (error) {
        console.error(error);
        toast({ title: 'Error', description: 'Could not load doctors and clinics.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    }
    if (isOpen) {
      fetchDoctorsAndClinics();
    }
  }, [isOpen, toast]);

  useEffect(() => {
    async function fetchSlots() {
      if (selectedDoctorId && selectedClinicId && selectedDate) {
        setSlotsLoading(true);
        setAvailableSlots([]);
        setSelectedSlot(null);
        try {
          const dateString = format(selectedDate, 'yyyy-MM-dd');
          const response = await fetch(`http://localhost:3001/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${selectedClinicId}&date=${dateString}`);
          if (!response.ok) throw new Error('Failed to fetch slots');
          const data = await response.json();
          setAvailableSlots(data);
        } catch (error) {
          console.error(error);
          toast({ title: 'Error', description: 'Could not load available slots.', variant: 'destructive' });
        } finally {
          setSlotsLoading(false);
        }
      }
    }
    fetchSlots();
  }, [selectedDoctorId, selectedClinicId, selectedDate, toast]);


  const handleDoctorChange = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    setSelectedDoctorId(doctorId);
    if(doctor) {
        setSelectedClinicId(doctor.clinicId);
    }
  };

  const availableClinicsForDoctor = useMemo(() => {
    if (!selectedDoctorId) return clinics;
    return clinics.filter(c => c.doctors.some(d => d.id === selectedDoctorId));
  }, [selectedDoctorId, clinics]);

  async function onSubmit(values: z.infer<typeof patientDetailsSchema>) {
    if (!selectedDoctorId || !selectedClinicId || !selectedSlot) {
        toast({ title: 'Error', description: 'Incomplete appointment details.', variant: 'destructive'});
        return;
    }

    const bookingData = {
        patient: values,
        appointment: {
            doctorId: selectedDoctorId,
            clinicId: selectedClinicId,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
        },
    };
    
    try {
        const response = await fetch('http://localhost:3001/api/create-appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Booking failed');
        }

        const result = await response.json();
        toast({
            title: 'Appointment Booked!',
            description: `Your appointment with ID ${result.appointment_id} is confirmed.`,
        });
        resetAndClose();
    } catch (error: any) {
        toast({
            title: 'Booking Failed',
            description: error.message || 'An unexpected error occurred.',
            variant: 'destructive',
        });
    }
  }

  const resetAndClose = () => {
    form.reset();
    setStep(1);
    setSelectedDoctorId('');
    setSelectedClinicId('');
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setAvailableSlots([]);
    setIsOpen(false);
  };
  
  const Step1 = () => (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Step 1: Select Doctor and Clinic</DialogTitle>
        <DialogDescription>Choose your preferred doctor and clinic for the appointment.</DialogDescription>
      </DialogHeader>
      {loading ? <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div> :
      <div className="grid gap-4 py-4">
        <Select onValueChange={handleDoctorChange} value={selectedDoctorId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Doctor" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map(doctor => (
              <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedClinicId} value={selectedClinicId} disabled={!selectedDoctorId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Clinic" />
          </SelectTrigger>
          <SelectContent>
            {availableClinicsForDoctor.map(clinic => (
              <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    }
      <DialogFooter>
        <Button onClick={() => setStep(2)} disabled={!selectedDoctorId || !selectedClinicId}>Next</Button>
      </DialogFooter>
    </DialogContent>
  );

  const Step2 = () => (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Step 2: Select Date and Time</DialogTitle>
        <DialogDescription>Pick an available date and time for your consultation.</DialogDescription>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-4 py-4">
        <div>
          <h4 className="font-medium mb-2 text-sm">Select Date</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-full justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}/>
            </PopoverContent>
          </Popover>
        </div>
        <div className="max-h-60 overflow-y-auto">
            <h4 className="font-medium mb-2 text-sm">Select Time</h4>
            {slotsLoading ? <div className="flex justify-center items-center h-40"><Loader2 className="h-6 w-6 animate-spin" /></div> :
            <div className="grid grid-cols-3 gap-2">
                {availableSlots.length > 0 ? availableSlots.map(slot => (
                    <Button 
                        key={slot.startTime} 
                        variant={selectedSlot?.startTime === slot.startTime ? 'default' : 'outline'}
                        onClick={() => setSelectedSlot(slot)}
                    >
                        {format(new Date(slot.startTime), 'p')}
                    </Button>
                )) : <p className="text-sm text-muted-foreground col-span-3">No slots available for this date.</p>}
            </div>
            }
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={() => setStep(3)} disabled={!selectedSlot}>Next</Button>
      </DialogFooter>
    </DialogContent>
  );

  const Step3 = () => (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Step 3: Patient Details</DialogTitle>
        <DialogDescription>Please provide your information to complete the booking.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
          </div>
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="dob" render={({ field }) => (
            <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="gender" render={({ field }) => (
            <FormItem><FormLabel>Gender</FormLabel><FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="M" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="F" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="O" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                </RadioGroup>
            </FormControl><FormMessage /></FormItem>
          )}/>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if(!open) { resetAndClose(); }
        setIsOpen(open)
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      
    </Dialog>
  );
}

    