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
import { Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "./ui/sonner";
import axios from "axios";
import { format, startOfHour, addMinutes, getMinutes } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

// Define schemas for each step
const patientDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
});

const doctorSelectionSchema = z.object({
    doctor: z.string({ required_error: "Please select a doctor."}),
});

const slotSelectionSchema = z.object({
    startTime: z.string({ required_error: "Please select a time slot."}),
});

const bookingSchema = patientDetailsSchema.merge(doctorSelectionSchema).merge(slotSelectionSchema);
type BookingFormValues = z.infer<typeof bookingSchema>;

type Doctor = { id: string; name: string; clinicId: string; clinicName: string; };
type Slot = { startTime: string; endTime: string; doctorId: string; clinicId: string; };
type GroupedSlots = { [hour: string]: Slot[] };


export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Data states
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);

    // State for the new UI
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(step === 1 ? patientDetailsSchema : step === 2 ? doctorSelectionSchema : slotSelectionSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
        },
    });
    
    useEffect(() => {
        form.reset(undefined, { keepValues: true }); 
    }, [step, form]);

    const selectedDoctorId = form.watch("doctor");
    const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

    useEffect(() => {
        if (isOpen && step === 2 && doctors.length === 0) {
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
            const hourKey = format(startOfHour(new Date(slot.startTime)), "ha").toLowerCase(); // "9am", "10am", "1pm"
            if (!acc[hourKey]) {
                acc[hourKey] = [];
            }
            acc[hourKey].push(slot);
            return acc;
        }, {} as GroupedSlots);
    }, [availableSlots]);
    
    const selectedSlotValue = form.watch("startTime");

    const handleHourClick = (hourKey: string) => {
        setSelectedHour(hourKey);
        
        const slotsInHour = groupedSlots[hourKey];
        if (!slotsInHour || slotsInHour.length === 0) return;

        // Automated selection logic
        const hourStart = startOfHour(new Date(slotsInHour[0].startTime));
        const targetTime = addMinutes(hourStart, 20); // Aim for 20 minutes past the hour

        // Find the first available slot that is 20+ minutes past the hour
        let bestSlot = slotsInHour.find(slot => new Date(slot.startTime) >= targetTime);

        // If no such slot exists, fall back to the last available slot in that hour
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

            const nameParts = data.fullName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0];


            const payload = {
                patient: {
                    fullName: data.fullName,
                    firstName: firstName,
                    lastName: lastName,
                    phone: data.phone,
                    email: data.email,
                    dob: '1990-01-01', // Placeholder DOB
                    gender: 'O', // Placeholder for 'Other'
                },
                appointment: {
                    clinicId: selectedSlot.clinicId,
                    doctorId: selectedSlot.doctorId,
                    startTime: selectedSlot.startTime,
                }
            };
            
            await axios.post('/api/book-appointment', payload);
            toast.success("Appointment Booked!", { description: `Your appointment with ${selectedDoctor?.name} on ${format(new Date(selectedSlot.startTime), "PPP")} at ${format(new Date(selectedSlot.startTime), "p")} is confirmed.` });
            setStep(4); 

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

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment: Your Details</DialogTitle>
                            <DialogDescription>Step 1 of 3: Tell us about yourself.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                           <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                           <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                           <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email (Optional)</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <Button onClick={async () => { const isValid = await form.trigger(["fullName", "phone", "email"]); if(isValid) setStep(2); }} className="w-full">Next: Select Doctor</Button>
                    </>
                );
            case 2:
                 return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment: Choose a Doctor</DialogTitle>
                            <DialogDescription>Step 2 of 3: Who would you like to see?</DialogDescription>
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
                            <Button onClick={() => setStep(1)} variant="outline" className="w-1/3">Back</Button>
                            <Button onClick={async () => { const isValid = await form.trigger(["doctor"]); if (isValid) setStep(3); }} className="w-2/3" disabled={!form.watch('doctor')}>Next: Select Time</Button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment: Time Slot</DialogTitle>
                            <DialogDescription>Step 3 of 3: Choose an available time for {selectedDoctor?.name}.</DialogDescription>
                        </DialogHeader>

                        {isFetchingSlots && (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                                <p>Finding open slots...</p>
                            </div>
                        )}

                        {!isFetchingSlots && Object.keys(groupedSlots).length > 0 && (
                             <FormField
                                control={form.control}
                                name="startTime"
                                render={() => (
                                    <FormItem className="py-4">
                                        <Label>Select an hour</Label>
                                        <div className="grid grid-cols-4 gap-2 pt-2">
                                            {Object.keys(groupedSlots).map((hourKey) => (
                                                <Button
                                                    key={hourKey}
                                                    variant={selectedHour === hourKey ? "default" : "outline"}
                                                    onClick={() => handleHourClick(hourKey)}
                                                    className="uppercase"
                                                    type="button"
                                                >
                                                    {hourKey}
                                                </Button>
                                            ))}
                                        </div>
                                        {selectedSlotValue && (
                                            <div className="text-center pt-4">
                                                <p className="text-sm text-muted-foreground">
                                                    Selected time: 
                                                    <span className="font-bold text-primary"> {format(new Date(selectedSlotValue), "p")}</span>
                                                </p>
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {!isFetchingSlots && Object.keys(groupedSlots).length === 0 && (
                             <div className="text-center text-muted-foreground py-16 h-64 flex flex-col justify-center items-center">
                                <p>No available slots for the selected provider.</p>
                                <p className="text-sm">Please try a different doctor or check back later.</p>
                            </div>
                        )}
                        
                        <div className="flex gap-2">
                           <Button onClick={() => setStep(2)} variant="outline" className="w-1/3" type="button">Back</Button>
                           <Button onClick={form.handleSubmit(processBooking)} disabled={isSubmitting || isFetchingSlots || !form.watch('startTime')} className="w-2/3">
                               {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Booking...</> : "Confirm Appointment"}
                           </Button>
                        </div>
                    </>
                );
             case 4:
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
                    <form onSubmit={e => e.preventDefault()}>
                        {renderStepContent()}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
