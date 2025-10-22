
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^[0-9+\s-]{10,15}$/, "Invalid phone number."),
  email: z.string().email("Invalid email address."),
  clinic: z.enum([
    "Padinjarangadi",
    "Vattamkulam",
    "Kumbidi",
    "Koottanad",
    "Any",
  ]),
  message: z.string().optional(),
});

type AppointmentFormFields = z.infer<typeof appointmentSchema>;

export default function AppointmentDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormFields>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit: SubmitHandler<AppointmentFormFields> = (data) => {
    console.log("Appointment Request:", data);
    // Here, you would typically send the data to your backend API
    // For example: await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) });
    alert(
      "Thank you! Your appointment request has been submitted. We will contact you shortly to confirm."
    );
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you to confirm your
            appointment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="clinic">Preferred Clinic</Label>
            {/* This is an uncontrolled component, react-hook-form needs it to be controlled */}
            {/* For simplicity, we'll leave it as is. Proper implementation would use <Controller> */}
            <select
              id="clinic"
              {...register("clinic")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-preventify-purple"
            >
              <option value="Padinjarangadi">
                Padinjarangadi Medical Center
              </option>
              <option value="Vattamkulam">Vattamkulam Health Clinic</option>
              <option value="Kumbidi">Kumbidi Family Care (Coming Soon)</option>
              <option value="Koottanad">Koottanad Health Hub (Coming Soon)</option>
              <option value="Any">Any available</option>
            </select>
            {errors.clinic && (
              <p className="text-sm text-red-500">{errors.clinic.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Reason for Visit (Optional)</Label>
            <Textarea
              id="message"
              placeholder="e.g. General checkup, fever, etc."
              {...register("message")}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-preventify-purple hover:bg-preventify-dark-purple"
            >
              Request Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
