'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Doctor = { id: string; name: string; clinicId: string; clinicName: string; };
type Slot = { startTime: string; endTime: string; doctorId: string; clinicId: string; };
type GroupedSlots = { [hour: string]: Slot[] };

// This schema covers all fields across all steps.
// We make them all optional here because we will validate them step-by-step.
const FormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters.").optional(),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Please enter a valid phone number.").optional(),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  doctor: z.string().optional(),
  startTime: z.string().optional(),
  gender: z.enum(["M", "F", "O"]).optional(),
  dob: z.date().optional(),
});

type BookingFormValues = z.infer<typeof FormSchema>;

export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- State for Backend-Driven Flow ---
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isStepLoading, setIsStepLoading] = useState(false);
    // ---
    
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);
    
    const [selectedDoctorObj, setSelectedDoctorObj] = useState<Doctor | null>(null);
    const [selectedSlotObj, setSelectedSlotObj] = useState<Slot | null>(null);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            doctor: "",
            startTime: "",
            gender: undefined,
            dob: undefined,
        }
    });

    const selectedDoctorId = form.watch("doctor");
    
    useEffect(() => {
        if (isOpen && step === 2) {
            if (doctors.length === 0) {
                setIsLoading(true);
                axios.get('/api/doctors-and-clinics')
                    .then(response => {
                        setDoctors(response.data.doctors || []);
                    })
                    .catch(error => {
                        console.error("Failed to fetch doctors:", error);
                        toast.error("Failed to load doctor data", { description: "Please try again." });
                    })
                    .finally(() => setIsLoading(false));
            }
        }
    }, [isOpen, step, doctors.length]);

     useEffect(() => {
        if (selectedDoctorId) {
            const doctor = doctors.find(d => d.id === selectedDoctorId);
            setSelectedDoctorObj(doctor || null);
            if (!doctor) return;

            setIsFetchingSlots(true);
            setAvailableSlots([]);
            form.setValue("startTime", "");
            setSelectedSlotObj(null);

            const dateString = format(new Date(), 'yyyy-MM-dd');
            axios.get(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${doctor.clinicId}&date=${dateString}`)
                .then(response => {
                    setAvailableSlots(response.data || []);
                })
                .catch(error => {
                    console.error("Failed to fetch slots:", error);
                    toast.error("Failed to fetch time slots", { description: "Please try another provider." });
                })
                .finally(() => setIsFetchingSlots(false));
        } else {
             setAvailableSlots([]);
             setSelectedDoctorObj(null);
        }
    }, [selectedDoctorId, doctors, form]);


    const groupedSlots = useMemo(() => {
        return availableSlots.reduce((acc, slot) => {
            const hourKey = format(new Date(slot.startTime), "ha").toLowerCase();
            if (!acc[hourKey]) acc[hourKey] = [];
            acc[hourKey].push(slot);
            return acc;
        }, {} as GroupedSlots);
    }, [availableSlots]);
    
    const handleHourClick = (hourKey: string) => {
        const slotsInHour = groupedSlots[hourKey];
        if (!slotsInHour || slotsInHour.length === 0) return;
        
        const hourStart = new Date(slotsInHour[0].startTime);
        hourStart.setMinutes(0, 0, 0);

        let bestSlot = slotsInHour.find(slot => new Date(slot.startTime).getMinutes() >= 20);

        if (!bestSlot) {
            bestSlot = slotsInHour[slotsInHour.length - 1];
        }
        
        form.setValue("startTime", bestSlot.startTime, { shouldValidate: true });
        setSelectedSlotObj(bestSlot);
    };
    
    const selectedSlotValue = form.watch("startTime");

    // This is now the final submission function
    const processBooking = async () => {
        setIsSubmitting(true);
        const finalStepData = form.getValues();

        // Manual validation for the last step's fields
        if (!finalStepData.gender || !finalStepData.dob) {
            toast.error("Validation failed", { description: "Please complete all required fields." });
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                sessionId: sessionId,
                step: 3,
                data: {
                    gender: finalStepData.gender,
                    dob: format(finalStepData.dob, 'yyyy-MM-dd'),
                },
                doctor: selectedDoctorObj,
                slot: selectedSlotObj
            };

            await axios.post('/api/create-appointment', payload);
            
            toast.success("Appointment Booked!", { 
                description: `Your appointment is confirmed.`
            });
            setStep(4); // Move to success step

        } catch (error: any) {
            console.error("[DEBUG] Frontend: Booking request failed.", error);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error("Booking Failed", { description: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Reset form and state when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setIsLoading(false);
                setIsSubmitting(false);
                setAvailableSlots([]);
                setIsFetchingSlots(false);
                setSelectedDoctorObj(null);
                setSelectedSlotObj(null);
                setSessionId(null);
                setIsStepLoading(false);
                form.reset();
            }, 300);
        }
    }, [isOpen, form]);

    const handleNext = async () => {
        let fieldsToValidate: (keyof BookingFormValues)[] = [];
        let stepData: Partial<BookingFormValues> = {};
        
        if (step === 1) {
            fieldsToValidate = ['fullName', 'phone', 'email'];
            const { fullName, phone, email } = form.getValues();
            stepData = { fullName, phone, email };
        } else if (step === 2) {
            fieldsToValidate = ['doctor', 'startTime'];
             const { doctor, startTime } = form.getValues();
            stepData = { doctor, startTime };
        }

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setIsStepLoading(true);
            try {
                const response = await axios.post('/api/save-step', {
                    step: step,
                    sessionId: sessionId,
                    data: stepData
                });

                if (step === 1 && response.data.sessionId) {
                    setSessionId(response.data.sessionId);
                }

                setStep(prev => prev + 1);

            } catch (error: any) {
                console.error("Error saving step data:", error);
                const errorMessage = error.response?.data?.message || `Failed to save Step ${step} data.`;
                toast.error("Error", { description: errorMessage });
            } finally {
                setIsStepLoading(false);
            }
        }
    };

    const handleBack = () => setStep(prev => prev - 1);

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Step 1: Your Details</DialogTitle>
                            <DialogDescription>Please provide your name and contact information.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                           <FormField control={form.control} name="fullName" render={({ field }) => ( 
                               <FormItem> 
                                   <FormLabel>Full Name</FormLabel> 
                                   <FormControl>
                                       <Input placeholder="John Doe" {...field} value={field.value ?? ""} />
                                   </FormControl> 
                                   <FormMessage /> 
                               </FormItem> 
                           )}/>
                           <FormField control={form.control} name="phone" render={({ field }) => ( 
                               <FormItem> 
                                   <FormLabel>Phone</FormLabel> 
                                   <FormControl>
                                       <Input placeholder="+91 98765 43210" {...field} value={field.value ?? ""} />
                                   </FormControl> 
                                   <FormMessage /> 
                               </FormItem> 
                           )}/>
                           <FormField control={form.control} name="email" render={({ field }) => ( 
                               <FormItem> 
                                   <FormLabel>Email (Optional)</FormLabel> 
                                   <FormControl>
                                       <Input placeholder="you@example.com" {...field} value={field.value ?? ""} />
                                   </FormControl> 
                                   <FormMessage /> 
                               </FormItem> 
                           )}/>
                        </div>
                        <Button onClick={handleNext} className="w-full" disabled={isStepLoading}>
                            {isStepLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Next"}
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Step 2: Select Doctor & Time</DialogTitle>
                            <DialogDescription>Choose a doctor and an available time slot for today.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4 min-h-[250px]">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                </div>
                            ) : (
                                <FormField control={form.control} name="doctor" render={({ field }) => ( 
                                    <FormItem> 
                                        <FormLabel>Doctor</FormLabel> 
                                        <Select 
                                            onValueChange={field.onChange} 
                                            value={field.value}
                                        > 
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a doctor" />
                                                </SelectTrigger>
                                            </FormControl> 
                                            <SelectContent> 
                                                {doctors.map(doc => (
                                                    <SelectItem key={doc.id} value={doc.id}>
                                                        {doc.name} - {doc.clinicName}
                                                    </SelectItem>
                                                ))} 
                                            </SelectContent> 
                                        </Select> 
                                        <FormMessage /> 
                                    </FormItem> 
                                )}/>
                            )}

                            {selectedDoctorId && (
                                <div>
                                {isFetchingSlots ? (
                                    <div className="flex items-center justify-center pt-8">
                                        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> 
                                        <p>Finding open slots...</p>
                                    </div>
                                ) : Object.keys(groupedSlots).length > 0 ? (
                                    <FormField control={form.control} name="startTime" render={() => (
                                        <FormItem>
                                            <FormLabel>Select an hour</FormLabel>
                                            <div className="grid grid-cols-4 gap-2 pt-2">
                                                {Object.keys(groupedSlots).map((hourKey) => (
                                                    <Button 
                                                        key={hourKey} 
                                                        variant={
                                                            selectedSlotObj?.startTime && 
                                                            format(new Date(selectedSlotObj.startTime), "ha").toLowerCase() === hourKey 
                                                                ? "default" 
                                                                : "outline"
                                                        } 
                                                        onClick={() => handleHourClick(hourKey)} 
                                                        className="uppercase" 
                                                        type="button" 
                                                        disabled={isFetchingSlots}
                                                    >
                                                        {hourKey}
                                                    </Button>
                                                ))}
                                            </div>
                                            {selectedSlotValue && (
                                                <div className="text-center pt-4">
                                                    <p className="text-sm text-muted-foreground">
                                                        Selected time: <span className="font-bold text-primary">{format(new Date(selectedSlotValue), "p")}</span>
                                                    </p>
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                ) : (
                                    <div className="text-center text-muted-foreground py-8 h-full flex flex-col justify-center items-center">
                                        <p>No available slots for the selected provider today.</p>
                                        <p className="text-sm">Please try a different doctor.</p>
                                    </div>
                                )}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleBack} variant="outline" className="w-1/3" disabled={isStepLoading}>Back</Button>
                            <Button 
                                onClick={handleNext} 
                                className="w-2/3" 
                                disabled={!form.watch('startTime') || isFetchingSlots || isStepLoading}
                            >
                                {isStepLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Next"}
                            </Button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Step 3: Final Details</DialogTitle>
                            <DialogDescription>Please provide these last details to confirm your identity.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <FormField control={form.control} name="gender" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your gender" />
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
                            )}/>
                            <FormField control={form.control} name="dob" render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button 
                                                    variant={"outline"} 
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar 
                                                mode="single" 
                                                selected={field.value} 
                                                onSelect={field.onChange}
                                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")} 
                                                initialFocus 
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <div className="flex gap-2">
                           <Button onClick={handleBack} variant="outline" className="w-1/3" type="button">Back</Button>
                           <Button 
                               onClick={form.handleSubmit(processBooking)} 
                               disabled={isSubmitting} 
                               className="w-2/3"
                           >
                               {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Booking...</> : "Book Appointment"}
                           </Button>
                        </div>
                    </>
                );
             case 4: // Success Step
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Appointment Confirmed!</DialogTitle>
                            <DialogDescription>Your booking was successful. We look forward to seeing you.</DialogDescription>
                        </DialogHeader>
                        <div className="py-8 text-center space-y-4">
                            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-sm text-muted-foreground">Your appointment details have been confirmed. You will receive a confirmation message shortly.</p>
                        </div>
                        <Button onClick={() => setIsOpen(false)} className="w-full">Close</Button>
                    </>
                );
            default:
                return <p>Something went wrong.</p>;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <Form {...form}>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        {renderStepContent()}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
