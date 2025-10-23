
'use client'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  dob: z.date({ required_error: "Please select your date of birth." }),
  gender: z.enum(["M", "F", "O"], { required_error: "Please select a gender." }),
  clinic: z.string().min(1, { message: "Please select a clinic." }),
  doctor: z.string().min(1, { message: "Please select a doctor." }),
  appointmentDate: z.date({ required_error: "Please select a date." }),
  startTime: z.string().min(1, { message: "Please select an available time slot."}),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

type Slot = {
    s: string; // Start time
    e: string; // End time
    available: boolean;
};

const clinics = [
    { name: "Preventify Medical Center - Padinjarangadi", id: "673d87fdaa91c2001d716c91" },
    { name: "Preventify Health Clinic - Vattamkulam", id: "684043d6f138d3001dd5e995" },
];

const doctors = [
  { name: "Any Available Doctor", id: "any" },
  { name: "Dr. Rakesh K R", id: "173208576372747" },
  { name: "Dr. Mohammed Faisal", id: "175949152812334" },
  { name: "Dr. Hafsa Hussain", id: "174497110921725" },
  { name: "Dr. Krishnendu U K", id: "175931888074630" },
  { name: "Dr. Girish U", id: "175949141398449" },
  { name: "Dr. Ijas V. I.", id: "175931883083616" },
  { name: "Dr. Husna V.", id: "175949169261621" },
  { name: "Dr. Md. Abdurahiman", id: "174306088551114" },
  { name: "Dr. Neeharika V.", idd: "173771631358722" },
  { name: "Dr. Ashwin T.R.", id: "175949162376135" },
  { name: "Dr. Sreedev N", id: "175949148741914" },
  { name: "Dr. Ajay Biju", id: "174297264958992" },
  { name: "Dr. Renjith A.", id: "174306005828928" },
  { name: "Dr. K.Y.Sanjay", id: "175931864615485" },
  { name: "Dr. Reshma K.R.", id: "175949173084453" },
];

export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            doctor: "any"
        },
    });

    const clinicId = form.watch("clinic");
    const doctorId = form.watch("doctor");
    const appointmentDate = form.watch("appointmentDate");

    useEffect(() => {
        if (clinicId && doctorId && doctorId !== 'any' && appointmentDate) {
            const fetchSlots = async () => {
                setIsFetchingSlots(true);
                setAvailableSlots([]);
                form.resetField("startTime");
                try {
                    const dateString = format(appointmentDate, "yyyy-MM-dd");
                    const response = await fetch(`/api/available-slots?doctorId=${doctorId}&clinicId=${clinicId}&date=${dateString}`);
                    if (!response.ok) throw new Error("Failed to fetch slots");
                    const slotsData = await response.json();
                    
                    const allSlots: Slot[] = Object.values(slotsData)
                      .flatMap((schedule: any) => schedule.flatMap((s: any) => s.slots));
                      
                    const available = allSlots.filter(slot => slot.available);
                    setAvailableSlots(available);

                } catch (error) {
                    toast.error("Could not fetch slots", { description: "Please try a different date or contact us directly." });
                } finally {
                    setIsFetchingSlots(false);
                }
            };
            fetchSlots();
        }
    }, [clinicId, doctorId, appointmentDate, form]);

    async function handleNextStep() {
        let fieldsToValidate: (keyof BookingFormValues)[] = [];
        if (step === 1) {
            fieldsToValidate = ["fullName", "phone", "email", "dob", "gender"];
        } else if (step === 2) {
            fieldsToValidate = ["clinic", "doctor", "appointmentDate"];
        }
        
        const isStepValid = await form.trigger(fieldsToValidate);
        if (isStepValid) {
            setStep(prev => prev + 1);
        }
    }

    async function onSubmit(data: BookingFormValues) {
        setIsLoading(true);
        try {
            const [firstName, ...lastNameParts] = data.fullName.split(' ');
            const lastName = lastNameParts.join(' ');

            const payload = {
                patient: {
                    fullName: data.fullName,
                    firstName,
                    lastName: lastName || firstName,
                    phone: data.phone,
                    email: data.email,
                    dob: format(data.dob, "yyyy-MM-dd"),
                    gender: data.gender,
                },
                appointment: {
                    clinicId: data.clinic,
                    doctorId: data.doctor,
                    startTime: data.startTime,
                }
            };
            
            const response = await fetch('/api/book-appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit appointment request.');
            }

            toast.success("Appointment Request Submitted!", {
                description: `Thank you, ${data.fullName}. We will contact you shortly to confirm your booking.`,
            });
            form.reset();
            setStep(1);
            setOpen(false);

        } catch (error: any) {
             toast.error("Submission Failed", {
                description: error.message || "There was a problem. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <>
                    <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl> <Input placeholder="John Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl> <Input placeholder="+91 98765 43210" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address (Optional)</FormLabel> <FormControl> <Input type="email" placeholder="you@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="dob" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Date of Birth</FormLabel> <Popover> <PopoverTrigger asChild> <FormControl> <Button variant={"outline"} className={cn( "w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground" )}> {field.value ? format(field.value, "PPP") : <span>Pick a date</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown-buttons" fromYear={1930} toYear={new Date().getFullYear()} disabled={(date) => date > new Date()} initialFocus /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem className="space-y-3"> <FormLabel>Gender</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4 pt-2"> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl> <RadioGroupItem value="M" /> </FormControl> <FormLabel className="font-normal">Male</FormLabel> </FormItem> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl> <RadioGroupItem value="F" /> </FormControl> <FormLabel className="font-normal">Female</FormLabel> </FormItem> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl> <RadioGroupItem value="O" /> </FormControl> <FormLabel className="font-normal">Other</FormLabel> </FormItem> </RadioGroup> </FormControl> <FormMessage /> </FormItem> )}/>
                    </div>
                </>;
            case 2:
                return <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="clinic" render={({ field }) => ( <FormItem> <FormLabel>Preferred Clinic</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a clinic" /> </SelectTrigger> </FormControl> <SelectContent> {clinics.map(clinic => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name="doctor" render={({ field }) => ( <FormItem> <FormLabel>Doctor</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a doctor" /> </SelectTrigger> </FormControl> <SelectContent> {doctors.map(doctor => <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
                    </div>
                     <FormField control={form.control} name="appointmentDate" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Preferred Appointment Date</FormLabel> <Popover> <PopoverTrigger asChild> <FormControl> <Button variant={"outline"} className={cn( "w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground" )}> {field.value ? format(field.value, "PPP") : <span>Pick a date</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) } initialFocus /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )}/>
                </>;
            case 3:
                if (isFetchingSlots) {
                    return <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>;
                }
                if (availableSlots.length === 0) {
                    return <p className="text-sm text-muted-foreground text-center py-10">No available slots for this day. Please select a different date, doctor, or clinic.</p>
                }
                return (
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Available Time Slots</FormLabel>
                          <FormControl>
                            <ScrollArea className="h-40 rounded-md border">
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-3 gap-2 p-4"
                                >
                                    {availableSlots.map((slot) => (
                                    <FormItem key={slot.s} className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value={slot.s} id={slot.s} className="sr-only" />
                                        </FormControl>
                                        <Label
                                            htmlFor={slot.s}
                                            className="w-full cursor-pointer rounded-md border-2 border-muted bg-popover p-2 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:border-primary"
                                        >
                                            {format(new Date(slot.s), 'hh:mm a')}
                                        </Label>
                                    </FormItem>
                                    ))}
                                </RadioGroup>
                            </ScrollArea>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                );
        }
    };
    
    const getDialogDescription = () => {
        switch (step) {
            case 1: return "Step 1 of 3: Your contact details.";
            case 2: return "Step 2 of 3: Appointment details.";
            case 3: return "Step 3 of 3: Select an available time slot.";
            default: return "";
        }
    }


    return (
        <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) { form.reset(); setStep(1); setAvailableSlots([]); }}}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                    <DialogDescription>{getDialogDescription()}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {renderStepContent()}
                             <DialogFooter className="pt-4">
                                <div className="flex w-full gap-4">
                                    {step > 1 && (
                                         <Button type="button" variant="outline" onClick={() => setStep(prev => prev - 1)} className="w-1/3">
                                            Back
                                        </Button>
                                    )}
                                    {step < 3 && (
                                        <Button type="button" onClick={handleNextStep} className="w-full bg-preventify-blue hover:bg-preventify-dark-blue text-white" size="lg">
                                            Next
                                        </Button>
                                    )}
                                    {step === 3 && (
                                        <Button type="submit" className="w-full bg-preventify-blue hover:bg-preventify-dark-blue text-white" size="lg" disabled={isLoading || !form.getValues('startTime')}>
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Submit Request
                                        </Button>
                                    )}
                                </div>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

    