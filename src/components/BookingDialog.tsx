
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, addMinutes, getHours, setHours, addDays } from 'date-fns';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

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

interface HourlySlot {
  hour: number; // 0-23
  firstAvailableSlot: string;
}

// Zod Schemas
const stepOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number.'),
  email: z.string().email('Invalid email address.').optional().or(z.literal('')),
});

const stepTwoSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor.'),
  clinicId: z.string().min(1, 'Internal: Clinic ID is missing.'),
});

const stepThreeSchema = z.object({
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, 'Please select a time slot.'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please use YYYY-MM-DD format."),
  gender: z.enum(["M", "F", "O"], {required_error: "Gender is required."}),
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
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      dob: '',
      gender: undefined,
      doctorId: '',
      clinicId: '',
      time: '',
    },
  });

  const selectedDoctorId = useWatch({ control: form.control, name: 'doctorId' });
  const selectedDate = useWatch({ control: form.control, name: 'date' });

  const selectedClinicId = useMemo(() => {
    if (!selectedDoctorId || doctors.length === 0) return '';
    const doctor = doctors.find(d => d.id === selectedDoctorId);
    return doctor ? doctor.clinicId : '';
  }, [selectedDoctorId, doctors]);

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
        } catch (error) {
          console.error(error);
          toast.error('Could not load doctors and clinics.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      form.reset();
      setStep(1);
      setBookingStatus('idle');
      setAvailableSlots([]);
    }
  }, [open, form]);
  
  useEffect(() => {
    if (selectedClinicId) {
      form.setValue('clinicId', selectedClinicId, { shouldValidate: true });
    }
  }, [selectedClinicId, form]);

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
  
  const hourlySlots = useMemo((): HourlySlot[] => {
    if (!availableSlots.length) return [];
    
    const slotsByHour: { [hour: number]: string } = {};

    for (const slot of availableSlots) {
      const slotDate = parseISO(slot.startTime);
      const hour = getHours(slotDate);

      if (!slotsByHour[hour]) {
        slotsByHour[hour] = slot.startTime;
      }
    }
    
    return Object.entries(slotsByHour).map(([hour, firstAvailableSlot]) => ({
      hour: parseInt(hour, 10),
      firstAvailableSlot,
    })).sort((a, b) => a.hour - b.hour);
  }, [availableSlots]);

  const handleHourSelect = (firstAvailableSlot: string) => {
    const slotTime = parseISO(firstAvailableSlot);
    const originalMinutes = slotTime.getMinutes();

    let finalTime = slotTime;

    if (originalMinutes < 40) { 
      const bufferedTime = addMinutes(slotTime, 20);
      const isBufferedTimeAvailable = availableSlots.some(slot => 
          parseISO(slot.startTime).getTime() === bufferedTime.getTime()
      );
      
      if (isBufferedTimeAvailable) {
        finalTime = bufferedTime;
      }
    }
    
    form.setValue('time', finalTime.toISOString(), { shouldValidate: true });
  };


  const handleNextStep = async () => {
    let result;
    if (step === 1) {
      result = await form.trigger(['firstName', 'lastName', 'phone', 'email']);
    } else if (step === 2) {
      result = await form.trigger(['doctorId']);
      if(result) {
         const doctor = doctors.find(d => d.id === form.getValues('doctorId'));
         if(doctor) {
            form.setValue('clinicId', doctor.clinicId, { shouldValidate: true });
         } else {
             result = false;
             toast.error("Could not find clinic for the selected doctor.");
         }
      }
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

    const result = await form.trigger(['date', 'time', 'dob', 'gender']);
    if (!result) {
        setIsLoading(false);
        return;
    }

    const payload = {
        patient: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            dob: data.dob,
            gender: data.gender,
            email: data.email
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
    const selectedClinic = clinics.find(c => c.id === selectedClinicId);
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Step 1: Your Information</DialogTitle>
              <DialogDescription>Please provide your contact details.</DialogDescription>
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
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>
            <DialogFooter>
                <Button onClick={handleNextStep} type="button">Next</Button>
            </DialogFooter>
          </>
        );
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Step 2: Select a Doctor</DialogTitle>
              <DialogDescription>
                Booking an appointment at a Preventify clinic.
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
                           {doctors.length > 0 ? (
                              doctors.map((doctor) => (
                                <CommandItem
                                  key={doctor.id}
                                  value={doctor.name}
                                  onSelect={() => {
                                    form.setValue('doctorId', doctor.id, { shouldValidate: true });
                                  }}
                                >
                                  {doctor.name}
                                  <span className="text-xs text-muted-foreground ml-2">({doctor.clinicName})</span>
                                </CommandItem>
                              ))
                           ) : isLoading ? (
                             <div className="p-4 text-center text-sm text-muted-foreground">Loading doctors...</div>
                           ) : (
                             <div className="p-4 text-center text-sm text-muted-foreground">No doctors available.</div>
                           )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handlePrevStep} type="button">Back</Button>
              <Button onClick={handleNextStep} disabled={isLoading || doctors.length === 0} type="button">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Next
              </Button>
            </DialogFooter>
          </>
        );
      case 3:
        const today = new Date();
        const tomorrow = addDays(today, 1);
        const selectedDay = form.getValues('date');
        
        return (
          <>
            <DialogHeader>
              <DialogTitle>Step 3: Confirm Details</DialogTitle>
              <DialogDescription>
                {`Booking for ${selectedDoctor?.name} at ${selectedClinic?.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="M">Male</SelectItem>
                                        <SelectItem value="F">Female</SelectItem>
                                        <SelectItem value="O">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <div className="flex flex-col items-center gap-6">
                    <div className="w-full max-w-sm">
                        <FormLabel className="text-center block mb-2">Date</FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                            <Button 
                            type="button" 
                            variant={selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'default' : 'outline'}
                            onClick={() => form.setValue('date', today, { shouldValidate: true })}>
                                Today
                            </Button>
                            <Button 
                            type="button" 
                            variant={selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd') ? 'default' : 'outline'}
                            onClick={() => form.setValue('date', tomorrow, { shouldValidate: true })}>
                                Tomorrow
                            </Button>
                        </div>
                        <FormField control={form.control} name="date" render={() => <FormMessage className="text-center pt-2" />} />
                    </div>
                    
                    <div className="w-full max-w-sm">
                        <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-center block mb-2">Available Slots</FormLabel>
                            <div className="grid grid-cols-3 gap-2 max-h-[250px] overflow-y-auto pr-2">
                                {isLoading ? (
                                <div className="col-span-3 flex justify-center items-center h-24">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                                ) : hourlySlots.length > 0 ? (
                                hourlySlots.map((slot) => {
                                    const selectedSlotDate = form.getValues('time') ? parseISO(form.getValues('time')) : null;
                                    const slotHour = getHours(parseISO(slot.firstAvailableSlot));
                                    const isSelected = selectedSlotDate && getHours(selectedSlotDate) === slotHour;

                                    return (
                                    <Button
                                        key={slot.hour}
                                        variant={isSelected ? 'default' : 'outline'}
                                        onClick={() => handleHourSelect(slot.firstAvailableSlot)}
                                        className="w-full"
                                        type="button"
                                    >
                                        {format(setHours(new Date(), slot.hour), 'ha')}
                                    </Button>
                                    );
                                })
                                ) : (
                                <p className="col-span-3 text-sm text-muted-foreground text-center py-4">
                                    {selectedDate ? 'No slots available. Please select another date.' : 'Please select a date to see available slots.'}
                                </p>
                                )}
                            </div>
                            <FormMessage className="text-center pt-2" />
                            </FormItem>
                        )}
                        />
                    </div>
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
        case 4:
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
      <DialogContent className="sm:max-w-xl md:max-w-2xl">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {renderStepContent()}
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    