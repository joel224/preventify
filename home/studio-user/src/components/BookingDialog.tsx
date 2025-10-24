
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

// Schemas for each step
const Step1Schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
});

const Step2Schema = z.object({
  doctor: z.string({ required_error: "Please select a doctor." }).min(1, "Please select a doctor."),
  startTime: z.string({ required_error: "Please select a time slot." }).min(1, "Please select a time slot."),
});

const Step3Schema = z.object({
  gender: z.enum(["M", "F", "O"], { required_error: "Please select a gender." }),
  dob: z.date({ required_error: "Date of birth is required." }),
});

// Type definitions from schemas
type Step1Values = z.infer<typeof Step1Schema>;
type Step2Values = z.infer<typeof Step2Schema>;
type Step3Values = z.infer<typeof Step3Schema>;

type Doctor = { id: string; name: string; clinicId: string; clinicName: string; };
type Slot = { startTime: string; endTime: string; doctorId: string; clinicId: string; };
type GroupedSlots = { [hour: string]: Slot[] };

// ####################
// ## Step Components
// ####################

// ====== Step 1 Form ======
function Step1Form({ onNext, onDialogClose }: { onNext: (data: Step1Values) => void; onDialogClose: () => void; }) {
    const form = useForm<Step1Values>({
        resolver: zodResolver(Step1Schema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Step 1: Your Details</DialogTitle>
                    <DialogDescription>Please provide your name and contact information.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    
                    <FormField 
                        control={form.control} 
                        name="fullName" 
                        // Destructure field to separate value from the rest
                        render={({ field: { value, ...restOfField } }) => ( 
                        <FormItem> 
                            <FormLabel>Full Name</FormLabel> 
                            <Input 
                                placeholder="John Doe" 
                                {...restOfField} // Pass ref, name, onChange, onBlur
                                value={value ?? ""} // Pass ONLY ONE value prop
                            />
                            <FormMessage /> 
                        </FormItem> 
                    )}/>
                    
                    <FormField 
                        control={form.control} 
                        name="phone" 
                        // Destructure field to separate value from the rest
                        render={({ field: { value, ...restOfField } }) => ( 
                        <FormItem> 
                            <FormLabel>Phone</FormLabel> 
                            <Input 
                                placeholder="+91 98765 43210" 
                                {...restOfField} // Pass ref, name, onChange, onBlur
                                value={value ?? ""} // Pass ONLY ONE value prop
                            />
                            <FormMessage /> 
                        </FormItem> 
                    )}/>

                    <FormField 
                        control={form.control} 
                        name="email" 
                        // Destructure field to separate value from the rest
                        render={({ field: { value, ...restOfField } }) => ( 
                        <FormItem> 
                            <FormLabel>Email (Optional)</FormLabel> 
                            <Input 
                                placeholder="you@example.com" 
                                {...restOfField} // Pass ref, name, onChange, onBlur
                                value={value ?? ""} // Pass ONLY ONE value prop
                            />
                            <FormMessage /> 
                        </FormItem> 
                    )}/>
                </div>
                <Button type="submit" className="w-full">Next</Button>
            </form>
        </Form>
    );
}


// ====== Step 2 Form ======
function Step2Form({ onNext, onBack, onDialogClose }: { onNext: (data: Step2Values) => void; onBack: () => void; onDialogClose: () => void; }) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);
    
    const [selectedDoctorObj, setSelectedDoctorObj] = useState<Doctor | null>(null);
    const [selectedSlotObj, setSelectedSlotObj] = useState<Slot | null>(null);

    const form = useForm<Step2Values>({
        resolver: zodResolver(Step2Schema),
        mode: "onChange",
        defaultValues: { 
            doctor: undefined, 
            startTime: undefined 
        } 
    });

    const selectedDoctorId = form.watch("doctor");
    
    useEffect(() => {
        axios.get('/api/doctors-and-clinics')
            .then(response => setDoctors(response.data.doctors || []))
            .catch(error => {
                console.error("Failed to fetch doctors:", error);
                toast.error("Failed to load doctor data", { description: "Please try again." });
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (selectedDoctorId) {
            const doctor = doctors.find(d => d.id === selectedDoctorId);
            setSelectedDoctorObj(doctor || null);
            if (!doctor) return;

            setIsFetchingSlots(true);
            setAvailableSlots([]);
            form.setValue("startTime", undefined);
            setSelectedSlotObj(null);

            const dateString = format(new Date(), 'yyyy-MM-dd');
            axios.get(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${doctor.clinicId}&date=${dateString}`)
                .then(response => setAvailableSlots(response.data || []))
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
        const bestSlot = slotsInHour[0]; // Simple selection
        form.setValue("startTime", bestSlot.startTime, { shouldValidate: true });
        setSelectedSlotObj(bestSlot);
    };
    
    const selectedSlotValue = form.watch("startTime");
    
    const onSubmit = (data: Step2Values) => {
        const submissionData = {
            ...data,
            doctor: selectedDoctorObj, // sending the full doctor object
            slot: selectedSlotObj      // sending the full slot object
        };
        onNext(submissionData as any);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Step 2: Select Doctor & Time</DialogTitle>
                    <DialogDescription>Choose a doctor and an available time slot for today.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 min-h-[250px]">
                    {isLoading ? ( <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div> ) 
                    : (
                        <FormField control={form.control} name="doctor" render={({ field }) => ( 
                            <FormItem> 
                                <FormLabel>Doctor</FormLabel> 
                                <Select onValueChange={field.onChange} value={field.value}> 
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a doctor" /></SelectTrigger></FormControl> 
                                    <SelectContent> 
                                        {doctors.map(doc => <SelectItem key={doc.id} value={doc.id}>{doc.name} - {doc.clinicName}</SelectItem>)} 
                                    </SelectContent> 
                                </Select> 
                                <FormMessage /> 
                            </FormItem> 
                        )}/>
                    )}

                    {selectedDoctorId && (
                        <div>
                        {isFetchingSlots ? (<div className="flex items-center justify-center pt-8"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> <p>Finding open slots...</p></div>) 
                        : Object.keys(groupedSlots).length > 0 ? (
                            <FormField control={form.control} name="startTime" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select an hour</FormLabel>
                                    <div className="grid grid-cols-4 gap-2 pt-2">
                                        {Object.keys(groupedSlots).map((hourKey) => (
                                            <Button key={hourKey} variant={selectedSlotObj?.startTime && format(new Date(selectedSlotObj.startTime), "ha").toLowerCase() === hourKey ? "default" : "outline"} onClick={() => handleHourClick(hourKey)} className="uppercase" type="button" disabled={isFetchingSlots}>
                                                {hourKey}
                                            </Button>
                                        ))}
                                    </div>
                                    {selectedSlotValue && (<div className="text-center pt-4"><p className="text-sm text-muted-foreground">Selected time: <span className="font-bold text-primary">{format(new Date(selectedSlotValue), "p")}</span></p></div>)}
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
                    <Button onClick={onBack} variant="outline" className="w-1/3" type="button">Back</Button>
                    <Button type="submit" className="w-2/3" disabled={!form.formState.isValid || isFetchingSlots}>Next</Button>
                </div>
            </form>
        </Form>
    );
}

// ====== Step 3 Form ======
function Step3Form({ onBack, onSubmit }: { onBack: () => void; onSubmit: (data: Step3Values) => void; }) {
    const form = useForm<Step3Values>({
        resolver: zodResolver(Step3Schema),
        mode: "onChange",
        defaultValues: { 
            gender: undefined, 
            dob: undefined 
        }
    });
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Step 3: Final Details</DialogTitle>
                    <DialogDescription>Please provide these last details to confirm your identity.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select your gender" /></SelectTrigger></FormControl>
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
                                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <div className="flex gap-2">
                   <Button onClick={onBack} variant="outline" className="w-1/3" type="button">Back</Button>
                   <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid} className="w-2/3">
                       {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Booking...</> : "Book Appointment"}
                   </Button>
                </div>
            </form>
        </Form>
    );
}

// ############################
// ## Main Dialog Conductor
// ############################
export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState(0); // 0=closed, 1=step1, 2=step2, 3=step3, 4=success
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isStepLoading, setIsStepLoading] = useState(false);
    const [finalBookingData, setFinalBookingData] = useState<any>(null);

    const resetFlow = () => {
        setStep(0);
        setSessionId(null);
        setIsStepLoading(false);
        setFinalBookingData(null);
    };

    const handleNextStep1 = async (data: Step1Values) => {
        setIsStepLoading(true);
        try {
            const response = await axios.post('/api/save-step', { step: 1, data });
            if (response.data.sessionId) {
                setSessionId(response.data.sessionId);
                setStep(2);
            }
        } catch (error) {
            toast.error("Error saving data", { description: "Could not proceed to the next step." });
        } finally {
            setIsStepLoading(false);
        }
    };

    const handleNextStep2 = async (data: Step2Values) => {
        setIsStepLoading(true);
        const { doctor, slot } = data as any;
        
        setFinalBookingData({ doctor, slot }); 

        try {
            const payload = {
                doctor: doctor.id,
                startTime: slot.startTime,
                clinicId: doctor.clinicId, // Pass clinicId as well
                slot: slot, // Pass full slot and doctor object
                doctorObj: doctor
            };
            await axios.post('/api/save-step', { step: 2, sessionId, data: payload });
            setStep(3);
        } catch (error) {
            toast.error("Error saving data", { description: "Could not proceed to the next step." });
        } finally {
            setIsStepLoading(false);
        }
    };
    
    const handleFinalSubmit = async (data: Step3Values) => {
        setIsStepLoading(true);
        try {
            const payload = {
                sessionId,
                step: 3,
                data: {
                    ...data,
                    dob: format(data.dob, 'yyyy-MM-dd'),
                },
            };
            const response = await axios.post('/api/create-appointment', payload);
            setFinalBookingData(prev => ({...prev, bookingDetails: response.data}));
            setStep(4);
        } catch (error: any) {
            console.error("[DEBUG] Frontend: Booking request failed.", error);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error("Booking Failed", { description: errorMessage });
        } finally {
            setIsStepLoading(false);
        }
    };
    
    const handleBack = () => setStep(prev => prev - 1);

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            if (step === 0) setStep(1); 
        } else {
            resetFlow();
        }
    }
    
    const renderContent = () => {
        if (isStepLoading) {
            return (
                <div className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            );
        }

        switch (step) {
            case 1:
                return <Step1Form onNext={handleNextStep1} onDialogClose={resetFlow} />;
            case 2:
                return <Step2Form onNext={handleNextStep2} onBack={handleBack} onDialogClose={resetFlow} />;
            case 3:
                return <Step3Form onSubmit={handleFinalSubmit} onBack={handleBack} />;
            case 4:
                return (
                     <>
                        <DialogHeader>
                            <DialogTitle>Appointment Confirmed!</DialogTitle>
                            <DialogDescription>Your booking was successful. We look forward to seeing you.</DialogDescription>
                        </DialogHeader>
                        <div className="py-8 text-center space-y-4">
                            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {finalBookingData?.doctor && finalBookingData?.slot && (
                                <p>Your appointment with <span className="font-bold">{finalBookingData.doctor.name}</span> on <span className="font-bold">{format(new Date(finalBookingData.slot.startTime), 'PPP')}</span> at <span className="font-bold">{format(new Date(finalBookingData.slot.startTime), 'p')}</span> is confirmed.</p>
                            )}
                            <p className="text-sm text-muted-foreground">You will receive a confirmation message shortly.</p>
                        </div>
                        <Button onClick={resetFlow} className="w-full">Close</Button>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <Dialog open={step > 0} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}
