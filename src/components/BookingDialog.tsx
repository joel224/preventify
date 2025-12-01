
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useMemo, useReducer } from 'react';
import { format, parseISO, addMinutes, getHours, setHours, addDays, getYear } from 'date-fns';
import { Loader2, CheckCircle, XCircle, Check, ChevronsUpDown, Sparkles, Phone } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Textarea } from './ui/textarea';
import useSWR from 'swr';

// =================================================================
// TYPES AND SCHEMAS
// =================================================================

// Types for our new state management
type State = {
  step: number;
  formData: Partial<FormData>;
  bookingStatus: 'idle' | 'success' | 'error';
  bookingResponse: any;
  isLoading: boolean;
  foundPatientProfile: FoundPatientProfile | null;
};

type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_FORM_DATA'; payload: Partial<FormData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BOOKING_STATUS'; payload: 'idle' | 'success' | 'error'; response?: any }
  | { type: 'SET_PATIENT_PROFILE'; payload: FoundPatientProfile | null }
  | { type: 'RESET' };


// Schemas for each individual step
const stepOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number.'),
});

const stepTwoSchema = z.object({
  doctorId: z.string({ required_error: "Please select a doctor."}).min(1, 'Please select a doctor.'),
});

const stepThreeSchema = z.object({
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, 'Please select a time slot.'),
});

const stepFourSchema = z.object({
    dobYear: z.string().min(1, "Year is required."),
    dobMonth: z.string().min(1, "Month is required."),
    dobDay: z.string().optional(), // Day is no longer required from the form
    gender: z.enum(["M", "F", "O"], { required_error: "Gender is required."}),
});

type FormData = z.infer<typeof stepOneSchema> & 
                z.infer<typeof stepTwoSchema> & 
                z.infer<typeof stepThreeSchema> & 
                z.infer<typeof stepFourSchema>;

// Hardcoded data
const doctors: { id: string; name: string; specialty: string; clinicId: string; }[] = [
    { id: '173208576372747', name: 'Dr. Rakesh K R', specialty: 'General Physician', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '173208610763786', name: 'Dr. Mohammed Faisal', specialty: 'General Practitioner', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '174497110921725', name: 'Dr. Hafsa Hussain', specialty: 'Pediatrics', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '173771631358722', name: 'Dr. Krishnendu U K', specialty: 'General Practitioner', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175931883083616', name: 'Dr. Girish U', specialty: 'Dermatology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949148741914', name: 'Dr. Ijas V. I.', specialty: 'Pulmonology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949141398449', name: 'Dr. Husna V.', specialty: 'Gynecology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175931888074630', name: 'Dr. Neeharika V.', specialty: 'ENT', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175931864615485', name: 'Dr. Sreedev N', specialty: 'Pulmonology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949158258558', name: 'Dr. Ajay Biju', specialty: 'Resident Medical Officer', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949152812334', name: 'Dr. Renjith A.', specialty: 'Orthopedics', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949162376135', name: 'Dr. K.Y.Sanjay', specialty: 'Orthopedics', clinicId: '673d87fdaa91c2001d716c91'},
];

const years = Array.from({ length: 100 }, (_, i) => getYear(new Date()) - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

// Reducer function for state management
const initialState: State = {
  step: 1,
  formData: {},
  bookingStatus: 'idle',
  bookingResponse: null,
  isLoading: false,
  foundPatientProfile: null,
};

function bookingReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BOOKING_STATUS':
      return { ...state, bookingStatus: action.payload, bookingResponse: action.response || null, isLoading: false };
    case 'SET_PATIENT_PROFILE':
      return { ...state, foundPatientProfile: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

interface FoundPatientProfile {
    first_name: string;
    last_name: string;
    dob: string; 
    gender: "M" | "F" | "O" | "male" | "female" | "other";
}

// =================================================================
// STEP COMPONENTS
// =================================================================

const Step1NamePhone = ({ dispatch, initialData }: { dispatch: React.Dispatch<Action>, initialData: Partial<FormData> }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName: initialData.firstName || '',
      phone: initialData.phone || '',
    },
    mode: 'onChange' // Validate on change to update button state
  });
  const [isSearching, setIsSearching] = useState(false);

  const phoneValue = watch('phone');
  const isPhoneComplete = phoneValue && phoneValue.length === 10;

  useEffect(() => {
    if (initialData.firstName) setValue('firstName', initialData.firstName);
    if (initialData.phone) setValue('phone', initialData.phone.replace(/\D/g, '').slice(-10));
  }, [initialData, setValue]);

  const onStepSubmit = async (data: z.infer<typeof stepOneSchema>) => {
    setIsSearching(true);
    try {
        const res = await fetch(`/api/search-patient?phone=${encodeURIComponent(data.phone)}`);
        if (res.ok) {
            const patient: FoundPatientProfile = await res.json();
            if(patient && patient.first_name) {
                dispatch({ type: 'SET_PATIENT_PROFILE', payload: patient });
                dispatch({ type: 'SET_FORM_DATA', payload: { firstName: patient.first_name, phone: data.phone } });
                toast.info(`Welcome back, ${patient.first_name}! Your details are pre-filled.`);
            } else {
                dispatch({ type: 'SET_PATIENT_PROFILE', payload: null });
                dispatch({ type: 'SET_FORM_DATA', payload: data });
            }
        } else {
             dispatch({ type: 'SET_PATIENT_PROFILE', payload: null });
             dispatch({ type: 'SET_FORM_DATA', payload: data });
        }
    } catch (error) {
        console.log('Patient search failed or not found, continuing as new patient.');
        dispatch({ type: 'SET_PATIENT_PROFILE', payload: null });
        dispatch({ type: 'SET_FORM_DATA', payload: data });
    } finally {
        setIsSearching(false);
        dispatch({ type: 'NEXT_STEP' });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Book an Appointment</DialogTitle>
        <DialogDescription className="text-lg">Please provide your details to begin.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onStepSubmit)}>
        <div className="space-y-6 py-4">
          <div>
            <label htmlFor="firstName" className="text-lg">Full Name</label>
            <Input id="firstName" placeholder="Your full name" {...register("firstName")} className="h-14 text-lg mt-1" />
            {errors.firstName && <p className="text-sm font-medium text-muted-foreground mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="text-lg">Phone Number</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 text-lg">+91</span>
              </div>
              <Input 
                id="phone"
                placeholder="9876543210" 
                {...register("phone")}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setValue('phone', value, { shouldValidate: true });
                }}
                className="pl-14 h-14 text-lg" 
              />
            </div>
            {errors.phone && <p className="text-sm font-medium text-muted-foreground mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            disabled={!isPhoneComplete || isSearching} 
            size="lg" 
            className={cn(
              "text-lg h-12 w-full transition-colors",
              isPhoneComplete ? "bg-primary hover:bg-primary/90" : "bg-gray-300 cursor-not-allowed"
            )}
          >
            {isSearching ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            Next
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

const Step2Doctor = ({ dispatch, formData }: { dispatch: React.Dispatch<Action>, formData: Partial<FormData> }) => {
    const { handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof stepTwoSchema>>({
        resolver: zodResolver(stepTwoSchema),
        defaultValues: { doctorId: formData.doctorId || '' }
    });
    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [showAiHelp, setShowAiHelp] = useState(false);
    const [symptoms, setSymptoms] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);

    const selectedDoctorId = watch('doctorId');

    const onStepSubmit = (data: z.infer<typeof stepTwoSchema>) => {
        const doctor = doctors.find(d => d.id === data.doctorId);
        if (doctor) {
            dispatch({ type: 'SET_FORM_DATA', payload: { ...data, clinicId: doctor.clinicId } });
            dispatch({ type: 'NEXT_STEP' });
        } else {
            toast.error("An error occurred. Please select a doctor again.");
        }
    };
    
    const handleAiSuggestion = async () => {
        if (!symptoms.trim()) {
            toast.error("Please describe your symptoms.");
            return;
        }
        setIsAiLoading(true);
        try {
            const response = await fetch('/api/suggest-doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms, doctors }),
            });
            if (!response.ok) throw new Error("Failed to get AI suggestion.");
            const { doctorId } = await response.json();
            if (doctorId && doctors.some(d => d.id === doctorId)) {
                setValue("doctorId", doctorId, { shouldValidate: true });
                const recommendedDoctor = doctors.find(d => d.id === doctorId);
                toast.success(`We recommend ${recommendedDoctor?.name} for you.`);
                setShowAiHelp(false);
            } else {
                throw new Error("AI could not suggest a valid doctor.");
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsAiLoading(false);
        }
    };

    if (showAiHelp) {
        return (
             <>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Describe Your Symptoms</DialogTitle>
                    <DialogDescription className="text-lg">
                        Tell us what's bothering you, and our AI will suggest the right doctor.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Textarea
                        placeholder="e.g., 'I have a sore throat and a fever for two days.'"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={4}
                        className="text-lg"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAiHelp(false)} type="button" size="lg" className="text-lg h-12">Cancel</Button>
                    <Button onClick={handleAiSuggestion} disabled={isAiLoading} type="button" size="lg" className="text-lg h-12">
                        {isAiLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                        Get AI Suggestion
                    </Button>
                </DialogFooter>
            </>
        );
    }
    
    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-2xl">Select a Doctor</DialogTitle>
                <DialogDescription className="text-lg">Booking an appointment at a Preventify clinic.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onStepSubmit)}>
                <div className="py-4 space-y-4">
                     <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between h-14 text-lg", !selectedDoctorId && "text-muted-foreground")}
                          >
                            {selectedDoctorId ? doctors.find(d => d.id === selectedDoctorId)?.name : "Our Doctors"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search doctor..." className="text-lg h-14" />
                          <CommandList>
                            <CommandEmpty>No doctor found.</CommandEmpty>
                            <CommandGroup>
                              {doctors.map((doctor) => (
                                <CommandItem
                                  value={doctor.name}
                                  key={doctor.id}
                                  onSelect={() => {
                                    setValue("doctorId", doctor.id, { shouldValidate: true });
                                    setComboboxOpen(false);
                                  }}
                                  className="text-lg py-3"
                                >
                                  <Check className={cn("mr-2 h-4 w-4", doctor.id === selectedDoctorId ? "opacity-100" : "opacity-0")} />
                                  <div>
                                    {doctor.name}
                                    <span className="text-base text-muted-foreground ml-2">({doctor.specialty})</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                           </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.doctorId && <p className="text-sm font-medium text-muted-foreground mt-1">{errors.doctorId.message}</p>}
                    <div className="text-center">
                        <Button variant="link" onClick={() => setShowAiHelp(true)} type="button" className="text-lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Help me choose a doctor
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => dispatch({ type: 'PREV_STEP' })} type="button" size="lg" className="text-lg h-12">Back</Button>
                    <Button type="submit" disabled={!selectedDoctorId} size="lg" className="text-lg h-12">Next</Button>
                </DialogFooter>
            </form>
        </>
    );
};

const Step3DateTime = ({ dispatch, formData }: { dispatch: React.Dispatch<Action>, formData: Partial<FormData> }) => {
    const { handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof stepThreeSchema>>({
        resolver: zodResolver(stepThreeSchema),
        defaultValues: { date: formData.date, time: formData.time }
    });

    const selectedDate = watch('date');
    const selectedTime = watch('time');

    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
    const swrKey = formData.doctorId && formData.clinicId && formattedDate ? `/api/available-slots?doctorId=${formData.doctorId}&clinicId=${formData.clinicId}&date=${formattedDate}` : null;
    const { data: availableSlots = [], error: slotsError, isLoading: slotsLoading } = useSWR<any[]>(swrKey, fetcher, {
        shouldRetryOnError: false, revalidateOnFocus: false, revalidateOnReconnect: false,
        onError: () => toast.error('Could not load available time slots.')
    });
    
    useEffect(() => {
        setValue('time', '');
    }, [formattedDate, setValue]);

    const hourlySlots = useMemo(() => {
        if (!availableSlots.length) return [];
        const slotsByHour: { [hour: number]: string } = {};
        for (const slot of availableSlots) {
            const hour = getHours(parseISO(slot.startTime));
            if (!slotsByHour[hour]) slotsByHour[hour] = slot.startTime;
        }
        return Object.entries(slotsByHour).map(([hour, firstAvailableSlot]) => ({
            hour: parseInt(hour, 10), firstAvailableSlot,
        })).sort((a, b) => a.hour - b.hour);
    }, [availableSlots]);

    const handleHourSelect = (firstAvailableSlot: string) => {
        const slotTime = parseISO(firstAvailableSlot);
        const finalTime = slotTime.getMinutes() < 40 && availableSlots.some(s => parseISO(s.startTime).getTime() === addMinutes(slotTime, 20).getTime())
            ? addMinutes(slotTime, 20)
            : slotTime;
        setValue('time', finalTime.toISOString(), { shouldValidate: true });
    };

    const onStepSubmit = (data: z.infer<typeof stepThreeSchema>) => {
        dispatch({ type: 'SET_FORM_DATA', payload: data });
        dispatch({ type: 'NEXT_STEP' });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-2xl">Select a Time</DialogTitle>
                <DialogDescription className="text-lg">
                    {`Booking for ${doctors.find(d => d.id === formData.doctorId)?.name}`}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onStepSubmit)}>
                <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-full max-w-sm">
                            <label className="text-center block mb-2 text-lg">Date</label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button type="button" size="lg" className="text-lg h-12" variant={selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'default' : 'outline'} onClick={() => setValue('date', new Date(), { shouldValidate: true })}>Today</Button>
                                <Button type="button" size="lg" className="text-lg h-12" variant={selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(addDays(new Date(), 1), 'yyyy-MM-dd') ? 'default' : 'outline'} onClick={() => setValue('date', addDays(new Date(), 1), { shouldValidate: true })}>Tomorrow</Button>
                            </div>
                            {errors.date && <p className="text-sm font-medium text-muted-foreground text-center pt-2">{errors.date.message}</p>}
                        </div>
                        <div className="w-full max-w-sm">
                            <label className="text-center block mb-2 text-lg">Available Slots</label>
                            <div className="grid grid-cols-3 gap-2 max-h-[250px] overflow-y-auto pr-2">
                                {slotsLoading ? <div className="col-span-3 flex justify-center items-center h-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                                : hourlySlots.length > 0 ? hourlySlots.map((slot) => (
                                    <Button key={slot.hour} variant={selectedTime && getHours(parseISO(selectedTime)) === slot.hour ? 'default' : 'outline'} onClick={() => handleHourSelect(slot.firstAvailableSlot)} className="w-full h-14 text-lg" type="button">
                                        {format(setHours(new Date(), slot.hour), 'ha')}
                                    </Button>
                                ))
                                : <p className="col-span-3 text-lg text-muted-foreground text-center py-4">{selectedDate ? 'No slots available.' : 'Please select a date.'}</p>}
                            </div>
                             {errors.time && <p className="text-sm font-medium text-muted-foreground text-center pt-2">{errors.time.message}</p>}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => dispatch({ type: 'PREV_STEP' })} type="button" size="lg" className="text-lg h-12">Back</Button>
                    <Button type="submit" disabled={!selectedTime} size="lg" className="text-lg h-12">Next</Button>
                </DialogFooter>
            </form>
        </>
    );
};

const Step4ConfirmDetails = ({ dispatch, formData }: { dispatch: React.Dispatch<Action>, formData: Partial<FormData> }) => {
    const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<z.infer<typeof stepFourSchema>>({
        resolver: zodResolver(stepFourSchema),
        defaultValues: {
            dobYear: formData.dobYear || '',
            dobMonth: formData.dobMonth || '',
            gender: formData.gender || undefined,
        }
    });

    const onStepSubmit = (data: z.infer<typeof stepFourSchema>) => {
        dispatch({ type: 'SET_FORM_DATA', payload: { ...data, dobDay: '1' } });
        dispatch({ type: 'SET_STEP', payload: 5 }); // Go to final submission step
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-2xl">Confirm Your Details</DialogTitle>
                <DialogDescription className="text-lg">Please provide your date of birth and gender to complete the booking.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onStepSubmit)}>
                <div className="space-y-6 py-4">
                     <div className="space-y-2">
                         <label className="text-lg">Date of Birth</label>
                         <div className="grid grid-cols-2 gap-2">
                             <Select onValueChange={(v) => setValue('dobYear', v, {shouldValidate: true})} value={watch('dobYear')}>
                                <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Year" /></SelectTrigger>
                                <SelectContent>{years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
                             </Select>
                             <Select onValueChange={(v) => setValue('dobMonth', v, {shouldValidate: true})} value={watch('dobMonth')}>
                                <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Month" /></SelectTrigger>
                                <SelectContent>{months.map(m => <SelectItem key={m} value={String(m)}>{m}</SelectItem>)}</SelectContent>
                             </Select>
                         </div>
                         {errors.dobYear && <p className="text-sm font-medium text-muted-foreground mt-1">{errors.dobYear.message}</p>}
                         {errors.dobMonth && <p className="text-sm font-medium text-muted-foreground mt-1">{errors.dobMonth.message}</p>}
                     </div>
                     <div className="space-y-2">
                         <label className="text-lg">Gender</label>
                         <Select onValueChange={(v) => setValue('gender', v as "M" | "F" | "O", {shouldValidate: true})} value={watch('gender')}>
                            <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Select gender" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="M">Male</SelectItem>
                                <SelectItem value="F">Female</SelectItem>
                                <SelectItem value="O">Other</SelectItem>
                            </SelectContent>
                         </Select>
                         {errors.gender && <p className="text-sm font-medium text-muted-foreground mt-1">{errors.gender.message}</p>}
                     </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => dispatch({ type: 'PREV_STEP' })} type="button" size="lg" className="text-lg h-12">Back</Button>
                    <Button type="submit" size="lg" className="text-lg h-12">Confirm Booking</Button>
                </DialogFooter>
            </form>
        </>
    );
};


// =================================================================
// MAIN DIALOG COMPONENT
// =================================================================

interface BookingDialogProps {
    children: React.ReactNode;
    initialFirstName?: string;
    initialPhone?: string;
}

export default function BookingDialog({ children, initialFirstName, initialPhone }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    if (open) {
      dispatch({ type: 'SET_FORM_DATA', payload: { firstName: initialFirstName, phone: initialPhone } });
    } else {
      // Reset everything when dialog is closed
      dispatch({ type: 'RESET' });
    }
  }, [open, initialFirstName, initialPhone]);
  
  useEffect(() => {
    // This effect runs when the user proceeds from step 4
    if (state.step === 5 && !state.isLoading && state.bookingStatus === 'idle') {
      handleSubmitBooking();
    }
  }, [state.step, state.isLoading, state.bookingStatus]);
  
  const formatGenderAPI = (gender?: string): 'M' | 'F' | 'O' => {
      if (!gender) return 'O';
      const lowerGender = gender.toLowerCase();
      if (lowerGender.startsWith('m')) return 'M';
      if (lowerGender.startsWith('f')) return 'F';
      return 'O';
  };

  const handleSubmitBooking = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    let patientPayload;
    if (state.foundPatientProfile) {
        patientPayload = {
            firstName: state.foundPatientProfile.first_name,
            lastName: state.foundPatientProfile.last_name || "web",
            phone: state.formData.phone,
            dob: state.foundPatientProfile.dob,
            gender: formatGenderAPI(state.foundPatientProfile.gender),
        };
    } else {
        // Validate final step data before assembling payload
        const finalStepData = {
            dobYear: state.formData.dobYear,
            dobMonth: state.formData.dobMonth,
            dobDay: state.formData.dobDay,
            gender: state.formData.gender,
        };
        const validationResult = stepFourSchema.safeParse(finalStepData);
        if(!validationResult.success) {
            toast.error("Please fill in all required patient details.");
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'SET_STEP', payload: 4 }); // Send user back to fix errors
            return;
        }

        patientPayload = {
            firstName: state.formData.firstName,
            lastName: "web",
            phone: state.formData.phone,
            dob: `${validationResult.data.dobYear}-${String(validationResult.data.dobMonth).padStart(2, '0')}-${String(validationResult.data.dobDay).padStart(2, '0')}`,
            gender: validationResult.data.gender,
        };
    }
    
    const payload = {
        patient: patientPayload,
        appointment: {
            doctorId: state.formData.doctorId,
            clinicId: state.formData.clinicId,
            startTime: state.formData.time,
        }
    };

    try {
        const response = await fetch('/api/create-appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Booking failed');
        dispatch({ type: 'SET_BOOKING_STATUS', payload: 'success', response: result });
    } catch (error: any) {
        dispatch({ type: 'SET_BOOKING_STATUS', payload: 'error', response: { message: error.message } });
    }
  };

  const renderContent = () => {
    switch (state.step) {
      case 1:
        return <Step1NamePhone dispatch={dispatch} initialData={{firstName: initialFirstName, phone: initialPhone}} />;
      case 2:
        return <Step2Doctor dispatch={dispatch} formData={state.formData} />;
      case 3:
         // If a patient profile was found, skip step 4
         if (state.foundPatientProfile) {
            const onStepSubmit = (data: z.infer<typeof stepThreeSchema>) => {
                dispatch({ type: 'SET_FORM_DATA', payload: data });
                dispatch({ type: 'SET_STEP', payload: 5 }); // Skip to final submission
            };
            return <Step3DateTime dispatch={dispatch} formData={state.formData} />;
         }
         return <Step3DateTime dispatch={dispatch} formData={state.formData} />;
      case 4:
         if (state.foundPatientProfile) {
             // This should ideally not be reached if logic is correct, but as a fallback, submit.
             handleSubmitBooking();
             return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
         }
        return <Step4ConfirmDetails dispatch={dispatch} formData={state.formData} />;
      case 5:
        if (state.isLoading) {
            return <div className="flex justify-center items-center p-20"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
        }
        return (
            <div className="p-8">
                <DialogHeader className="items-center text-center">
                    {state.bookingStatus === 'success' ? (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h2 className="text-3xl font-semibold">Appointment Confirmed!</h2>
                        </>
                    ) : (
                        <>
                            <XCircle className="h-16 w-16 text-red-500 mb-4" />
                            <h2 className="text-3xl font-semibold">Booking Failed</h2>
                        </>
                    )}
                </DialogHeader>
                {state.bookingStatus === 'success' && state.bookingResponse && (
                    <div className="py-4 space-y-3 text-lg text-gray-700 bg-gray-50 p-6 rounded-md mt-4">
                        <p><strong>Confirmation ID:</strong> {state.bookingResponse.appointment_id}</p>
                        <p><strong>Patient Name:</strong> {state.formData.firstName}</p>
                        <p><strong>Doctor:</strong> {doctors.find(d => d.id === state.formData.doctorId)?.name}</p>
                        <p><strong>Date & Time:</strong> {format(parseISO(state.formData.time!), 'dd MMMM yyyy, hh:mm a')}</p>
                    </div>
                )}
                 {state.bookingStatus === 'error' && (
                    <p className="text-center text-red-600 mt-4">{state.bookingResponse?.message}</p>
                 )}
                <DialogFooter className="mt-6">
                    <DialogClose asChild><Button type="button" size="lg" className="text-lg h-12 w-full">Close</Button></DialogClose>
                </DialogFooter>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] lg:max-w-4xl p-0">
        <div className="text-center py-8 border-b border-gray-200">
          <p className='text-xl text-gray-500'>Prefer to book by phone?</p>
          <a href="tel:+918129334858" className="flex items-center justify-center gap-2 text-4xl font-bold text-preventify-blue hover:text-preventify-dark-blue transition-colors">
            <Phone className="w-8 h-8"/>
            +91 8129334858
          </a>
          <p className='text-sm text-gray-400 mt-1'>For emergencies, please call this number directly.</p>
        </div>
        <div className="px-8 pb-8 pt-4">
            {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
