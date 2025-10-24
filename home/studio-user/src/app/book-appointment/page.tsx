
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Schemas
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

const CombinedSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);

// Type definitions
type BookingFormValues = z.infer<typeof CombinedSchema>;
type Doctor = { id: string; name: string; clinicId: string; clinicName: string; };
type Slot = { startTime: string; endTime: string; doctorId: string; clinicId: string; };
type GroupedSlots = { [hour: string]: Slot[] };


export default function BookAppointmentPage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isStepLoading, setIsStepLoading] = useState(false);

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    
    const [selectedDoctorObj, setSelectedDoctorObj] = useState<Doctor | null>(null);
    const [selectedSlotObj, setSelectedSlotObj] = useState<Slot | null>(null);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(CombinedSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            doctor: undefined,
            startTime: undefined,
            gender: undefined,
            dob: undefined,
        }
    });

    const selectedDoctorId = form.watch("doctor");
    
    useEffect(() => {
        if(step === 2 && doctors.length === 0){
            setIsStepLoading(true);
            axios.get('/api/doctors-and-clinics')
                .then(response => setDoctors(response.data.doctors || []))
                .catch(error => {
                    console.error("Failed to fetch doctors:", error);
                    toast.error("Failed to load doctor data", { description: "Please try again." });
                })
                .finally(() => setIsStepLoading(false));
        }
    }, [step, doctors.length]);

    useEffect(() => {
        if (selectedDoctorId) {
            const doctor = doctors.find(d => d.id === selectedDoctorId);
            setSelectedDoctorObj(doctor || null);
            if (!doctor) return;

            setIsStepLoading(true);
            setAvailableSlots([]);
            form.setValue("startTime", undefined, {shouldValidate: true});
            setSelectedSlotObj(null);

            const dateString = format(new Date(), 'yyyy-MM-dd');
            axios.get(`/api/available-slots?doctorId=${selectedDoctorId}&clinicId=${doctor.clinicId}&date=${dateString}`)
                .then(response => setAvailableSlots(response.data || []))
                .catch(error => {
                    console.error("Failed to fetch slots:", error);
                    toast.error("Failed to fetch time slots", { description: "Please try another provider." });
                })
                .finally(() => setIsStepLoading(false));
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
        const bestSlot = slotsInHour[0];
        form.setValue("startTime", bestSlot.startTime, { shouldValidate: true });
        setSelectedSlotObj(bestSlot);
    };

    const nextStep = async (fieldsToValidate: (keyof BookingFormValues)[]) => {
        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setStep(s => s + 1);
        } else {
             toast.error("Please fill all required fields correctly.");
        }
    };

    const prevStep = () => setStep(s => s - 1);

    const onSubmit = async (data: BookingFormValues) => {
        setIsSubmitting(true);
        try {
            const nameParts = data.fullName.split(" ");
            const payload = {
                patient: {
                    firstName: nameParts[0],
                    lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : " ",
                    phone: data.phone,
                    email: data.email || "",
                    gender: data.gender,
                    dob: format(data.dob, 'yyyy-MM-dd'),
                },
                appointment: {
                    clinicId: selectedDoctorObj?.clinicId,
                    doctorId: selectedDoctorObj?.id,
                    startTime: selectedSlotObj?.startTime,
                }
            };
            const response = await axios.post('/api/create-appointment', payload);
            setStep(4); // Move to success step
        } catch (error: any) {
            console.error("Booking request failed.", error);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error("Booking Failed", { description: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <PageHeader title="Book an Appointment" subtitle="Complete the steps below to schedule your visit."/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-6 md:p-8">
                        {step !== 4 && (
                             <div className="mb-6">
                                <div className="flex justify-between items-center">
                                    <div className={`step ${step >= 1 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>Step 1: Your Details</div>
                                    <div className={`step ${step >= 2 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>Step 2: Choose Slot</div>
                                    <div className={`step ${step >= 3 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>Step 3: Finalize</div>
                                </div>
                                <div className="relative mt-2">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300" style={{width: `${((step - 1) / 2) * 100}%`}}></div>
                                </div>
                            </div>
                        )}
                       
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {step === 1 && (
                                    <section>
                                        <h3 className="text-xl font-semibold mb-4">Step 1: Your Details</h3>
                                        <div className="space-y-4">
                                            <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                            <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email (Optional)</FormLabel> <FormControl><Input placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <Button type="button" onClick={() => nextStep(['fullName', 'phone', 'email'])}>Next</Button>
                                        </div>
                                    </section>
                                )}

                                {step === 2 && (
                                    <section>
                                        <h3 className="text-xl font-semibold mb-4">Step 2: Select Doctor & Time</h3>
                                        <div className="space-y-4 min-h-[250px]">
                                            {isStepLoading && !selectedDoctorId ? ( <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div> ) 
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
                                                {isStepLoading ? (<div className="flex items-center justify-center pt-8"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> <p>Finding open slots...</p></div>) 
                                                : Object.keys(groupedSlots).length > 0 ? (
                                                    <FormField control={form.control} name="startTime" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select an hour</FormLabel>
                                                            <div className="grid grid-cols-4 gap-2 pt-2">
                                                                {Object.keys(groupedSlots).map((hourKey) => (
                                                                    <Button key={hourKey} variant={selectedSlotObj?.startTime && format(new Date(selectedSlotObj.startTime), "ha").toLowerCase() === hourKey ? "default" : "outline"} onClick={() => handleHourClick(hourKey)} className="uppercase" type="button" disabled={isStepLoading}>
                                                                        {hourKey}
                                                                    </Button>
                                                                ))}
                                                            </div>
                                                            {form.getValues("startTime") && (<div className="text-center pt-4"><p className="text-sm text-muted-foreground">Selected time: <span className="font-bold text-primary">{format(new Date(form.getValues("startTime")), "p")}</span></p></div>)}
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
                                        <div className="mt-6 flex justify-between">
                                            <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                                            <Button type="button" onClick={() => nextStep(['doctor', 'startTime'])} disabled={!form.getValues("startTime") || isStepLoading}>Next</Button>
                                        </div>
                                    </section>
                                )}

                                {step === 3 && (
                                     <section>
                                        <h3 className="text-xl font-semibold mb-4">Step 3: Final Details</h3>
                                        <div className="space-y-4">
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
                                        <div className="mt-6 flex justify-between">
                                            <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Booking...</> : "Book Appointment"}
                                            </Button>
                                        </div>
                                    </section>
                                )}

                                {step === 4 && (
                                    <section className="text-center py-8">
                                        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h2 className="text-2xl font-bold mt-4">Appointment Confirmed!</h2>
                                        <p className="text-muted-foreground mt-2">Your booking was successful. We look forward to seeing you.</p>
                                        {selectedDoctorObj && selectedSlotObj && (
                                            <p className="mt-4">Your appointment with <span className="font-bold">{selectedDoctorObj.name}</span> on <span className="font-bold">{format(new Date(selectedSlotObj.startTime), 'PPP')}</span> at <span className="font-bold">{format(new Date(selectedSlotObj.startTime), 'p')}</span> is confirmed.</p>
                                        )}
                                        <p className="text-sm text-muted-foreground mt-2">You will receive a confirmation message shortly.</p>
                                        <Link href="/" className="mt-6 inline-block">
                                            <Button>Go to Homepage</Button>
                                        </Link>
                                    </section>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
