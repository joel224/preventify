
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
import { useState, useEffect } from "react";
import { toast } from "./ui/sonner";
import axios from "axios";

const patientDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
});

type PatientDetailsValues = z.infer<typeof patientDetailsSchema>;

export default function BookingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [patientDetails, setPatientDetails] = useState<PatientDetailsValues | null>(null);

    const form = useForm<PatientDetailsValues>({
        resolver: zodResolver(patientDetailsSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
        },
    });

    const handleNextStep = async (data: PatientDetailsValues) => {
        setPatientDetails(data);
        setIsLoading(true);
        setStep(2);
        try {
            console.log("Fetching all available slots...");
            const response = await axios.get('/api/all-available-slots');
            console.log("Response from /api/all-available-slots:", response.data);
            setAvailableDates(response.data.availableDates || []);
            toast.success("Fetched available dates.");
        } catch (error: any) {
            console.error("Failed to fetch available slots:", error);
            toast.error("Failed to fetch slots", {
                description: error.response?.data?.message || "Please try again later."
            });
            // Go back to step 1 on error
            setStep(1);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Reset state when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setIsLoading(false);
            setAvailableDates([]);
            setPatientDetails(null);
            form.reset();
        }
    }, [isOpen, form]);

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book an Appointment</DialogTitle>
                            <DialogDescription>Step 1: Tell us about yourself.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleNextStep)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 98765 43210" {...field} />
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
                                            <FormLabel>Email Address (Optional)</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : "Next: Check Availability"}
                                </Button>
                            </form>
                        </Form>
                    </>
                );
            case 2:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Available Dates</DialogTitle>
                            <DialogDescription>Step 2: For debugging, here are the available dates.</DialogDescription>
                        </DialogHeader>
                        {isLoading ? (
                             <div className="flex items-center justify-center h-40">
                                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                                <p>Checking all clinics and doctors...</p>
                            </div>
                        ) : availableDates.length > 0 ? (
                           <div className="space-y-4 max-h-80 overflow-y-auto p-4 bg-muted/50 rounded-lg">
                               <h3 className="font-semibold">Dates with open slots:</h3>
                               <ul className="list-disc pl-5 space-y-1">
                                {availableDates.map(date => (
                                    <li key={date}>{new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                ))}
                               </ul>
                           </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-8">No available slots found for the next 30 days. Please check back later.</p>
                        )}
                        <Button onClick={() => setStep(1)} variant="outline">Back</Button>
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
            <DialogContent className="sm:max-w-md">
                {renderStepContent()}
            </DialogContent>
        </Dialog>
    );
}

    