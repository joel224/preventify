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
import { toast } from "./ui/sonner";
import axios from "axios";
import { format, startOfHour, addMinutes } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Define schemas for each step
const stepOneSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Please enter a valid phone number."),
});

const stepTwoSchema = z.object({
  gender: z.enum(["M", "F", "O"], { required_error: "Please select a gender." }),
  dob: z.date({ required_error: "Date of birth is required." }),
});

const stepThreeSchema = z.object({
    doctor: z.string({ required_error: "Please select a doctor."}),
});

const stepFourSchema = z.object({
    startTime: z.string({ required_error: "Please select a time slot."}),
});

const combinedSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema).merge(stepFourSchema);
type BookingFormValues = z.infer<typeof combinedSchema>;

type Doctor = { id: string; name: string; clinicId: string; clinicName: string; };
type Slot = { startTime: string; endTime: string; doctorId: string; clinicId: string; };
type GroupedSlots = { [hour: string]: Slot[] };


export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);

    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    const getCurrentSchema = () => {
        switch(step) {
            case 1: return stepOneSchema;
            case 2: return stepTwoSchema;
            case 3: return stepThreeSchema;
            case 4: return stepFourSchema;
            default: return combinedSchema;
        }
    }

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(getCurrentSchema()),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
        },
    });
    
    // This effect updates the resolver when the step changes
    useEffect(() => {
        form.reset(undefined, { keepDirty: true, keepValues: true }); // Keep form state across steps
    }, [step, form]);

    const selectedDoctorId = form.watch("doctor");
    const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

    useEffect(() => {
        if (isOpen && step === 3 && doctors.length === 0) {
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
    }, [isOpen, step, doctors.length]);

    useEffect(() => {
        if (selectedDoctorId && selectedDoctor) {
            setIsFetchingSlots(true);
            setAvailableSlots([]);
            setSelectedHour(null);
            form.resetField("startTime");

            const dateString = format(new Date(), 'yyyy-MM-dd');
            axios.get(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${selectedDoctor.clinicId}&date=${dateString}`)
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
        }
    }, [selectedDoctorId, selectedDoctor, form]);

    const groupedSlots = useMemo(() => {
        return availableSlots.reduce((acc, slot) => {
            const hourKey = format(startOfHour(new Date(slot.startTime)), "ha").toLowerCase();
            if (!acc[hourKey]) acc[hourKey] = [];
            acc[hourKey].push(slot);
            return acc;
        }, {} as GroupedSlots);
    }, [availableSlots]);
    
    const selectedSlotValue = form.watch("startTime");

    const handleHourClick = (hourKey: string) => {
        setSelectedHour(hourKey);
        
        const slotsInHour = groupedSlots[hourKey];
        if (!slotsInHour || slotsInHour.length === 0) return;

        const hourStart = startOfHour(new Date(slotsInHour[0].startTime));
        const targetTime = addMinutes(hourStart, 20);

        let bestSlot = slotsInHour.find(slot => new Date(slot.startTime) >= targetTime);

        if (!bestSlot) {
            bestSlot = slotsInHour[slotsInHour.length - 1];
        }

        form.setValue("startTime", bestSlot.startTime, { shouldValidate: true });
    };

    const processBooking = async (data: BookingFormValues) => {
        setIsSubmitting(true);
        try {
            const selectedSlot = availableSlots.find(s => s.startTime === data.startTime);
            if (!selectedSlot || !selectedDoctor) {
                toast.error("Invalid slot or doctor selected");
                setIsSubmitting(false);
                return;
            }

            const designation = data.gender === 'F' ? 'Ms.' : 'Mr.';

            const payload = {
                patient: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    gender: data.gender,
                    dob: format(data.dob, 'yyyy-MM-dd'),
                    designation: designation,
                },
                appointment: {
                    clinicId: selectedSlot.clinicId,
                    doctorId: selectedSlot.doctorId,
                    startTime: selectedSlot.startTime,
                }
            };
            
            await axios.post('/api/book-appointment', payload);
            toast.success("Appointment Booked!", { description: `Your appointment with ${selectedDoctor?.name} on ${format(new Date(selectedSlot.startTime), "PPP")} at ${format(new Date(selectedSlot.startTime), "p")} is confirmed.` });
            setStep(5); // Move to confirmation screen

        } catch (error: any) {
            console.error("Booking failed:", error);
            toast.error("Booking Failed", { description: error.response?.data?.message || "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setIsLoading(false);
            setIsSubmitting(false);
            setAvailableSlots([]);
            setIsFetchingSlots(false);
            setSelectedHour(null);
            form.reset();
        }
    }, [isOpen, form]);

    const handleNext = async (fields: (keyof BookingFormValues)[]) => {
        const isValid = await form.trigger(fields);
        if (isValid) {
            setStep(prev => prev + 1);
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
                            <DialogDescription>Please provide your name and phone number.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                           <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem> <FormLabel>First Name</FormLabel> <FormControl><Input placeholder="John" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                           <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem> <FormLabel>Last Name</FormLabel> <FormControl><Input placeholder="Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                           <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <Button onClick={() => handleNext(['firstName', 'lastName', 'phone'])} className="w-full">Next</Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Step 2: Additional Details</DialogTitle>
                            <DialogDescription>Please provide your gender and date of birth.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <FormField control={form.control} name="gender" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select your gender" /></SelectTrigger>
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
                                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
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
                            <Button onClick={handleBack} variant="outline" className="w-1/3">Back</Button>
                            <Button onClick={() => handleNext(['gender', 'dob'])} className="w-2/3">Next</Button>
                        </div>
                    </>
                );
            case 3:
                 return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Step 3: Choose a Doctor</DialogTitle>
                            <DialogDescription>Who would you like to see?</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                        {isLoading ? ( <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div> ) : (
                            <FormField control={form.control} name="doctor" render={({ field }) => ( 
                                <FormItem> 
                                    <FormLabel>Doctor</FormLabel> 
                                    <Select onValueChange={field.onChange} defaultValue={field.value}> 
                                        <FormControl> 
                                            <SelectTrigger> 
                                                <SelectValue placeholder="Select a doctor" /> 
                                            </SelectTrigger> 
                                        </FormControl> 
                                        <SelectContent> 
                                            {doctors.map(doctor => <SelectItem key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.clinicName}</SelectItem>)} 
                                        </SelectContent> 
                                    </Select> 
                                    <FormMessage /> 
                                </FormItem> 
                            )}/>
                        )}
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleBack} variant="outline" className="w-1/3">Back</Button>
                            <Button onClick={() => handleNext(['doctor'])} className="w-2/3" disabled={!form.watch('doctor')}>Next</Button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Step 4: Select Time Slot</DialogTitle>
                            <DialogDescription>Choose an available time for {selectedDoctor?.name}.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 min-h-[200px]">
                            {isFetchingSlots ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="mr-2 h-8 w-8 animate-spin" /> <p>Finding open slots...</p>
                                </div>
                            ) : Object.keys(groupedSlots).length > 0 ? (
                                <FormField control={form.control} name="startTime" render={() => (
                                        <FormItem>
                                            <FormLabel>Select an hour</FormLabel>
                                            <div className="grid grid-cols-4 gap-2 pt-2">
                                                {Object.keys(groupedSlots).map((hourKey) => (
                                                    <Button key={hourKey} variant={selectedHour === hourKey ? "default" : "outline"} onClick={() => handleHourClick(hourKey)} className="uppercase" type="button" >
                                                        {hourKey}
                                                    </Button>
                                                ))}
                                            </div>
                                            {selectedSlotValue && (
                                                <div className="text-center pt-4">
                                                    <p className="text-sm text-muted-foreground">Selected time: <span className="font-bold text-primary">{format(new Date(selectedSlotValue), "p")}</span></p>
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <div className="text-center text-muted-foreground py-16 h-full flex flex-col justify-center items-center">
                                    <p>No available slots for the selected provider.</p>
                                    <p className="text-sm">Please try a different doctor or check back later.</p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                           <Button onClick={handleBack} variant="outline" className="w-1/3" type="button">Back</Button>
                           <Button onClick={form.handleSubmit(processBooking)} disabled={isSubmitting || isFetchingSlots || !form.watch('startTime')} className="w-2/3">
                               {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Booking...</> : "Confirm Appointment"}
                           </Button>
                        </div>
                    </>
                );
             case 5:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Appointment Confirmed!</DialogTitle>
                            <DialogDescription>Your booking was successful. We look forward to seeing you.</DialogDescription>
                        </DialogHeader>
                        <div className="py-8 text-center">
                            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p className="mt-4">You will receive a confirmation message shortly.</p>
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
