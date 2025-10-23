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
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "./ui/sonner";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

// Define schemas for each step
const patientDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  dob: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(["M", "F", "O"], { required_error: "Please select a gender." }),
});

const appointmentDetailsSchema = z.object({
    clinic: z.string({ required_error: "Please select a clinic."}),
    doctor: z.string({ required_error: "Please select a doctor."}),
    appointmentDate: z.date({ required_error: "Please select a date."}),
    startTime: z.string({ required_error: "Please select a time slot."}),
});

const bookingSchema = patientDetailsSchema.merge(appointmentDetailsSchema);
type BookingFormValues = z.infer<typeof bookingSchema>;

type Clinic = { id: string; name: string; doctors: { id: string; name: string }[] };
type Doctor = { id: string; name: string };
type Slot = { startTime: string; endTime: string; doctorId: string; clinicId: string; };

export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Data states
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);


    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
        },
    });
    
    const selectedClinicId = form.watch("clinic");
    const selectedDoctorId = form.watch("doctor");
    const selectedDate = form.watch("appointmentDate");

    // Fetch clinics and doctors when dialog opens
    useEffect(() => {
        if (isOpen && step === 2 && clinics.length === 0) {
            setIsLoading(true);
            axios.get('/api/doctors-and-clinics')
                .then(response => {
                    setClinics(response.data.clinics || []);
                })
                .catch(error => {
                    console.error("Failed to fetch clinics and doctors:", error);
                    toast.error("Failed to load clinics", { description: "Please try again." });
                })
                .finally(() => setIsLoading(false));
        }
    }, [isOpen, step, clinics.length]);

    // Update doctor list when clinic changes
    useEffect(() => {
        if (selectedClinicId) {
            const selectedClinic = clinics.find(c => c.id === selectedClinicId);
            setDoctors(selectedClinic?.doctors || []);
            form.resetField("doctor");
        }
    }, [selectedClinicId, clinics, form]);

    // Fetch slots when date, doctor, and clinic are selected
    useEffect(() => {
        if (selectedDate && selectedDoctorId && selectedClinicId) {
            setIsFetchingSlots(true);
            setAvailableSlots([]);
            const dateString = format(selectedDate, 'yyyy-MM-dd');
            axios.get(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${selectedClinicId}&date=${dateString}`)
                .then(response => {
                    setAvailableSlots(response.data || []);
                })
                .catch(error => {
                    console.error("Failed to fetch slots:", error);
                    toast.error("Failed to fetch time slots", { description: "Please try another date or provider." });
                })
                .finally(() => setIsFetchingSlots(false));
        }
    }, [selectedDate, selectedDoctorId, selectedClinicId]);


    const processBooking = async (data: BookingFormValues) => {
        setIsSubmitting(true);
        try {
            const payload = {
                patient: {
                    fullName: data.fullName,
                    firstName: data.fullName.split(' ')[0],
                    lastName: data.fullName.split(' ').slice(1).join(' ') || data.fullName.split(' ')[0],
                    phone: data.phone,
                    email: data.email,
                    dob: format(data.dob, 'yyyy-MM-dd'),
                    gender: data.gender,
                },
                appointment: {
                    clinicId: data.clinic,
                    doctorId: data.doctor,
                    startTime: data.startTime,
                }
            };
            
            await axios.post('/api/book-appointment', payload);
            toast.success("Appointment Booked!", { description: `Your appointment on ${format(data.appointmentDate, "PPP")} at ${format(new Date(data.startTime), "p")} is confirmed.` });
            setStep(4); // Move to success step

        } catch (error: any) {
            console.error("Booking failed:", error);
            toast.error("Booking Failed", { description: error.response?.data?.message || "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Reset state when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setIsLoading(false);
            setIsSubmitting(false);
            setAvailableSlots([]);
            setIsFetchingSlots(false);
            setClinics([]);
            setDoctors([]);
            form.reset();
        }
    }, [isOpen, form]);


    const renderStepContent = () => {
        switch (step) {
            case 1: // Patient Details
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment: Your Details</DialogTitle>
                            <DialogDescription>Step 1 of 3: Tell us about yourself.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email (Optional)</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="dob" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Date of Birth</FormLabel> <Popover> <PopoverTrigger asChild> <FormControl> <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )}/>
                                <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem className="space-y-3"> <FormLabel>Gender</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4"> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="M" /></FormControl> <Label className="font-normal">Male</Label> </FormItem> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="F" /></FormControl> <Label className="font-normal">Female</Label> </FormItem> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="O" /></FormControl> <Label className="font-normal">Other</Label> </FormItem> </RadioGroup> </FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                        </div>
                        <Button onClick={async () => { const isValid = await form.trigger(["fullName", "phone", "email", "dob", "gender"]); if(isValid) setStep(2); }} className="w-full"> Next: Select Appointment </Button>
                    </>
                );
            case 2: // Appointment Details
                 return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment: Schedule</DialogTitle>
                            <DialogDescription>Step 2 of 3: Choose a date, clinic, and doctor.</DialogDescription>
                        </DialogHeader>
                        {isLoading ? ( <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div> ) : (
                        <div className="space-y-4 py-4">
                            <FormField control={form.control} name="appointmentDate" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Appointment Date</FormLabel> <Popover> <PopoverTrigger asChild> <FormControl> <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground" )}> {field.value ? ( format(field.value, "PPP") ) : ( <span>Pick a date</span> )} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } initialFocus /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )}/>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="clinic" render={({ field }) => ( <FormItem> <FormLabel>Preferred Clinic</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a clinic" /> </SelectTrigger> </FormControl> <SelectContent> {clinics.map(clinic => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
                                <FormField control={form.control} name="doctor" render={({ field }) => ( <FormItem> <FormLabel>Doctor</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedClinicId || doctors.length === 0}> <FormControl> <SelectTrigger> <SelectValue placeholder={!selectedClinicId ? "Select clinic first" : "Select a doctor"} /> </SelectTrigger> </FormControl> <SelectContent> {doctors.map(doctor => <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
                            </div>
                        </div>
                        )}
                        <div className="flex gap-2">
                            <Button onClick={() => setStep(1)} variant="outline" className="w-1/3">Back</Button>
                            <Button onClick={async () => { const isValid = await form.trigger(["appointmentDate", "clinic", "doctor"]); if (isValid) setStep(3); }} className="w-2/3">Next: Select Time</Button>
                        </div>
                    </>
                );
            case 3: // Time Slot
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment: Time Slot</DialogTitle>
                            <DialogDescription>Step 3 of 3: Choose an available time.</DialogDescription>
                        </DialogHeader>

                        {isFetchingSlots ? (
                            <div className="flex items-center justify-center h-40">
                                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                                <p>Finding open slots...</p>
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-3 gap-2 py-4"
                                            >
                                                {availableSlots.map((slot) => (
                                                     <FormItem key={slot.startTime} className="flex items-center">
                                                         <FormControl>
                                                            <RadioGroupItem value={slot.startTime} id={slot.startTime} className="sr-only" />
                                                         </FormControl>
                                                        <Label
                                                            htmlFor={slot.startTime}
                                                            className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                        >
                                                            {format(new Date(slot.startTime), "p")}
                                                        </Label>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                             <div className="text-center text-muted-foreground py-16">
                                <p>No available slots for the selected provider and date.</p>
                                <p className="text-sm">Please try a different date or doctor.</p>
                            </div>
                        )}
                        
                        <div className="flex gap-2">
                           <Button onClick={() => setStep(2)} variant="outline" className="w-1/3">Back</Button>
                           <Button onClick={form.handleSubmit(processBooking)} disabled={isSubmitting || isFetchingSlots || !form.watch('startTime')} className="w-2/3">
                               {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Booking...</> : "Confirm Appointment"}
                           </Button>
                        </div>
                    </>
                );
             case 4: // Success
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
                {renderStepContent()}
            </DialogContent>
        </Dialog>
    );
}