/*
curl --request POST \   --url https://api.eka.care/connect-auth/v1/account/login   \   --header 'Content-Type: application/json' \   --data '{   "api_key": "<string>",   "client_id": "<string>",   "client_secret": "<string>",   "user_token": "<string>" }'  This is the Connect Login API used for authentication. It generates an access token and refresh token by providing your client_id, client_secret, api_key, and user_token. These tokens authenticate your API requests to Eka's services.  The access token is included in the auth header for subsequent API calls. When it expires (returns 401), use the refresh token to get a new one. .  curl --request POST \   --url https://api.eka.care/connect-auth/v1/account/refresh-token   \   --header 'Authorization: <authorization>' \   --header 'Client-Id: <client-id>' \   --header 'Content-Type: application/json' \   --data '{   "access_token": "<string>",   "refresh_token": "<string>" }'  This is the refresh token endpoint for Eka's authentication system. It gets you a new access token when your current one expires.  How it works:  Send your expired access_token and refresh_token in the request body Include Authorization header with Bearer token and Client-Id header Returns a fresh access_token and refresh_token with new expiration times When to use: Call this when you get a 401 Unauthorized error, indicating your access token has expired. This lets you continue using the API without re-authenticating from scratch.   Login API (/account/login): Gets initial access token and refresh token when you first authenticate with credentials.  Refresh API (/account/refresh): Gets a new access token using your refresh token when the current access token expires (401 error).  Scenarios:  Initial authentication: Use login API with credentials Access token expired: Use refresh API with refresh token to get new access token Continuous operation: Implement auto-refresh logic to maintain uninterrupted API access Session management: Refresh tokens have longer expiry than access tokens  1. Initial Authentication When: First time connecting to Eka APIs  What happens:  You call /connect-auth/v1/account/login with your client_id, client_secret, api_key, and user_token Server validates credentials Returns two tokens: Access token (~30 min expiry) - for API requests Refresh token (longer expiry) - to get new access tokens Store both tokens securely 2. Access Token Expired When: Access token expires after ~30 minutes  What happens:  API returns 401 Unauthorized error Use /connect-auth/v1/account/refresh with your refresh token Get a new access token without re-entering credentials Continue making API calls with new token No user interruption - happens in background 3. Continuous Operation When: Long-running applications (batch jobs, background services)  What happens:  Implement auto-refresh logic before token expires Monitor token expiry time (returned in login response) Proactively refresh ~5 minutes before expiry Prevents service interruption Example: Cron job refreshes token every 25 minutes 4. Session Management When: Managing user sessions across devices/apps  What happens:  Access tokens expire quickly (30 min) for security Refresh tokens last longer (hours/days) for convenience User stays logged in via refresh token Access token refreshes automatically Logout = delete both tokens  5. Token expiry management: Access tokens expire in ~30 minutes. Use refresh API proactively before expiry to avoid service interruption.  6. Multi-device sessions: When users access from multiple devices, each needs separate login but can share refresh tokens for synchronized sessions.  7. Long-running processes: For batch operations or background jobs, implement automatic token refresh to maintain continuous API access.  8. Security breach recovery: If credentials are compromised, use login API to generate new tokens and invalidate old ones.  9. Session extension: When user activity is detected, use refresh API to extend session without re-authentication.  10. SDK initialization: SDKs (iOS, Web) require tokens during initialization - login provides initial tokens, refresh maintains them throughout app lifecycle.   Real Usage Examples:  Example 1. Search Patient by Mobile Number:  Login → Get access token Call Search API (GET /dr/v1/business/patients/search?mobile=9876543210) with access token in auth header Returns patient profiles matching that mobile number Refresh token when access token expires (401 error) Example 2. Upload Medical Records:  Login → Get tokens Upload files to medical records API with access token Auto-refresh token in background if long upload Commit transaction after upload completes Example 3. Book Appointment:  Login → Authenticate user Search patient by mobile to get patient_id Create appointment with patient_id and doctor_id Refresh token periodically during session  "periodically during session" means refreshing the access token before it expires to maintain continuous API access without interruption.  Why? Access tokens expire in ~30 minutes. If your appointment booking flow takes longer (user browsing doctors, filling forms, etc.), the token might expire mid-process.  Solution: Implement proactive refresh - check token expiry time and refresh it ~5 minutes before expiration, ensuring seamless user experience throughout the session.      The Connect Login API is used for initial authentication, returning an access token and a refresh token . The Connect Refresh API is used to obtain a new access token when the current one expires, using the refresh token . These tokens are essential for authenticating subsequent API requests to Eka's services
*/

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, addMinutes, getHours, setHours, addDays, getYear, getMonth, getDate } from 'date-fns';
import { Loader2, CheckCircle, XCircle, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DialogTrigger } from '@radix-ui/react-dialog';

// Types
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinicId: string; // Keep for booking logic
}

interface Slot {
  startTime: string;
  endTime: string;
}

interface HourlySlot {
  hour: number; // 0-23
  firstAvailableSlot: string;
}

interface FoundPatientProfile {
    first_name: string;
    last_name: string;
    dob: string; // "YYYY-MM-DD"
    gender: "M" | "F" | "O" | "male" | "female" | "other"; // Allow for API inconsistencies
}

// Hardcoded doctor list
const doctors: Doctor[] = [
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
    //NOTE: These doctors had no ID, so they are not included in the booking form.
    // { id: '', name: 'Dr. Md. Abdurahiman', specialty: 'Minor Surgeries', clinicId: '673d87fdaa91c2001d716c91'},
    // { id: '', name: 'Dr. Ashwin T.R.', specialty: 'Resident Medical Officer', clinicId: '673d87fdaa91c2001d716c91'},
];


// Zod Schemas
const stepOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number.'),
});

const stepTwoSchema = z.object({
  doctorId: z.string({ required_error: "Please select a doctor."}).min(1, 'Please select a doctor.'),
  clinicId: z.string().min(1, 'Internal: Clinic ID is missing.'),
});

const stepThreeSchema = z.object({
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, 'Please select a time slot.'),
});

const stepFourSchema = z.object({
  dobYear: z.string().optional(),
  dobMonth: z.string().optional(),
  dobDay: z.string().optional(),
  gender: z.enum(["M", "F", "O"]).optional(),
});

const combinedSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema).merge(stepFourSchema);

type CombinedFormData = z.infer<typeof combinedSchema>;

const years = Array.from({ length: 100 }, (_, i) => getYear(new Date()) - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const newPatientSchema = z.object({
    dobYear: z.string().min(1, "Year is required."),
    dobMonth: z.string().min(1, "Month is required."),
    dobDay: z.string().min(1, "Day is required."),
    gender: z.enum(["M", "F", "O"], { required_error: "Gender is required."}),
});


export default function BookingDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [bookingResponse, setBookingResponse] = useState<any>(null);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [foundPatientProfile, setFoundPatientProfile] = useState<FoundPatientProfile | null>(null);

  const form = useForm<CombinedFormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      doctorId: '',
      clinicId: '',
      time: '',
      dobYear: '',
      dobMonth: '',
      dobDay: '',
      gender: undefined,
    },
  });

  const selectedDoctorId = useWatch({ control: form.control, name: 'doctorId' });
  const selectedDate = useWatch({ control: form.control, name: 'date' });

  const selectedClinicId = useMemo(() => {
    if (!selectedDoctorId || doctors.length === 0) return '';
    const doctor = doctors.find(d => d.id === selectedDoctorId);
    return doctor ? doctor.clinicId : '';
  }, [selectedDoctorId]);

  useEffect(() => {
    if (!open) {
      form.reset();
      setStep(1);
      setBookingStatus('idle');
      setAvailableSlots([]);
      setFoundPatientProfile(null);
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
  
  const selectedDoctor = useMemo(() => doctors.find(d => d.id === selectedDoctorId), [selectedDoctorId]);
  
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
        result = await form.trigger(['firstName', 'lastName', 'phone']);
        if (result) {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/search-patient?phone=${encodeURIComponent(form.getValues('phone'))}`);
                if (res.ok) {
                    const patient: FoundPatientProfile = await res.json();
                    setFoundPatientProfile(patient);
                    form.setValue('firstName', patient.first_name);
                    form.setValue('lastName', patient.last_name);
                    // Don't pre-fill DOB/gender form fields as they'll be taken from the profile directly
                    toast.info(`Welcome back, ${patient.first_name}! Your details have been pre-filled.`);
                } else {
                    setFoundPatientProfile(null);
                }
            } catch (error) {
                console.log('Patient search failed or not found, continuing as new patient.');
                setFoundPatientProfile(null);
            } finally {
                setIsLoading(false);
                setStep(2);
            }
        }
    } else if (step === 2) {
      result = await form.trigger(['doctorId']);
      if(result) {
         const doctor = doctors.find(d => d.id === form.getValues('doctorId'));
         if(doctor) {
            form.setValue('clinicId', doctor.clinicId, { shouldValidate: true });
            setStep(step + 1);
         } else {
             result = false;
             toast.error("Could not find clinic for the selected doctor.");
         }
      }
    } else if (step === 3) {
        result = await form.trigger(['date', 'time']);
        if (result) {
            // If we found a patient, skip step 4 and submit
            if (foundPatientProfile) {
                await onSubmit(form.getValues());
            } else {
                setStep(step + 1);
            }
        }
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const formatGenderAPI = (gender: FoundPatientProfile['gender']): 'M' | 'F' | 'O' => {
      if (!gender) return 'O';
      const lowerGender = gender.toLowerCase();
      if (lowerGender.startsWith('m')) return 'M';
      if (lowerGender.startsWith('f')) return 'F';
      return 'O';
  };

  const onSubmit = async (data: CombinedFormData) => {
    setIsLoading(true);
    setBookingStatus('idle');

    let patientPayload;

    if (foundPatientProfile) {
        patientPayload = {
            firstName: foundPatientProfile.first_name,
            lastName: foundPatientProfile.last_name,
            phone: data.phone,
            dob: foundPatientProfile.dob,
            gender: formatGenderAPI(foundPatientProfile.gender),
        };
    } else {
        const dataToValidate = {
          dobYear: data.dobYear,
          dobMonth: data.dobMonth,
          dobDay: data.dobDay,
          gender: data.gender
        }
        const newPatientValidation = newPatientSchema.safeParse(dataToValidate);
        if (!newPatientValidation.success) {
            
            toast.error("Please fill in all required details for the new patient.");
            setIsLoading(false);
            await form.trigger(['dobYear', 'dobMonth', 'dobDay', 'gender']);
            return;
        }

        const { dobYear, dobMonth, dobDay, gender } = newPatientValidation.data;
        patientPayload = {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            dob: `${dobYear}-${String(dobMonth).padStart(2, '0')}-${String(dobDay).padStart(2, '0')}`,
            gender: gender,
        };
    }

    const payload = {
        patient: patientPayload,
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
        setStep(5);
    } catch (error: any) {
        setBookingResponse({ message: error.message });
        setBookingStatus('error');
        setStep(5);
    } finally {
        setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>You're leaving the Chrome Web Store</DialogTitle>
              <DialogDescription>Please provide your contact details. If you are a returning patient, we'll find your details.</DialogDescription>
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
                       <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">+91</span>
                            </div>
                            <FormControl>
                                <Input placeholder="9876543210" {...field} className="pl-10" />
                            </FormControl>
                        </div>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>
            <DialogFooter>
                <Button onClick={handleNextStep} disabled={isLoading} type="button">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Next
                </Button>
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Doctor</FormLabel>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? doctors.find(
                                  (doctor) => doctor.id === field.value
                                )?.name
                              : "Select doctor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search doctor..." />
                          <CommandList>
                            <CommandEmpty>No doctor found.</CommandEmpty>
                            <CommandGroup>
                              {doctors.map((doctor) => (
                                <CommandItem
                                  value={doctor.name}
                                  key={doctor.id}
                                  onSelect={() => {
                                    form.setValue("doctorId", doctor.id, { shouldValidate: true });
                                    setComboboxOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      doctor.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    {doctor.name}
                                    <span className="text-xs text-muted-foreground ml-2">({doctor.specialty})</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                           </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handlePrevStep} type="button">Back</Button>
              <Button onClick={handleNextStep} disabled={isLoading || doctors.length === 0} type="button">
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
              <DialogTitle>Step 3: Select Date & Time</DialogTitle>
              <DialogDescription>
                {`Booking for ${selectedDoctor?.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
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
              <Button onClick={handleNextStep} disabled={!form.getValues('time')} type="button">
                {foundPatientProfile ? 'Confirm Booking' : 'Next'}
              </Button>
            </DialogFooter>
          </>
        );
        case 4:
            return (
              <>
                <DialogHeader>
                  <DialogTitle>Step 4: Confirm Your Details</DialogTitle>
                  <DialogDescription>
                    Please provide your date of birth and gender to complete the booking.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <div className="grid grid-cols-3 gap-2">
                                <FormField
                                    control={form.control}
                                    name="dobYear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {years.map(year => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dobMonth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {months.map(month => <SelectItem key={month} value={String(month)}>{month}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dobDay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Day" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {days.map(day => <SelectItem key={day} value={String(day)}>{day}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </FormItem>
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
        case 5:
            const finalData = form.getValues();
            const finalDoctor = doctors.find(d => d.id === finalData.doctorId)
            return (
                <>
                <DialogHeader className="items-center text-center">
                    <DialogTitle className="sr-only">Booking Confirmation</DialogTitle>
                    {bookingStatus === 'success' ? (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h2 className="text-2xl font-semibold">Appointment Confirmed!</h2>
                            <DialogDescription>
                                Your appointment has been successfully booked.
                            </DialogDescription>
                        </>
                    ) : (
                        <>
                            <XCircle className="h-16 w-16 text-red-500 mb-4" />
                            <h2 className="text-2xl font-semibold">Booking Failed</h2>
                            <DialogDescription>
                                {bookingResponse?.message || 'There was an error processing your booking. Please try again.'}
                            </DialogDescription>
                        </>
                    )}
                </DialogHeader>
                {bookingStatus === 'success' && bookingResponse && (
                    <div className="py-4 space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                        <p><strong>Confirmation ID:</strong> {bookingResponse.appointment_id}</p>
                        <p><strong>Patient Name:</strong> {finalData.firstName} {finalData.lastName}</p>
                        <p><strong>Doctor:</strong> {finalDoctor?.name}</p>
                        <p><strong>Date & Time:</strong> {format(parseISO(finalData.time), 'dd MMMM yyyy, hh:mm a')}</p>
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
        <DialogTitle className="sr-only">Book an Appointment</DialogTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {renderStepContent()}
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
