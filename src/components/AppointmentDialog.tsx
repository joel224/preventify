
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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^[0-9+\s-]{10,15}$/, "Invalid phone number."),
  email: z.string().email("Invalid email address."),
  clinic: z.string().min(1, "Please select a clinic."),
  doctorId: z.string().min(1, "Please select a doctor."),
  message: z.string().optional(),
});

type AppointmentFormFields = z.infer<typeof appointmentSchema>;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
}

interface Clinic {
  id: string;
  name: string;
}

export default function AppointmentDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormFields>({
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch("http://localhost:3001/api/doctors-and-clinics")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if(data.doctors) setDoctors(data.doctors);
          if(data.clinics) setClinics(data.clinics);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch doctors and clinics:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  const onSubmit: SubmitHandler<AppointmentFormFields> = (data) => {
    console.log("Appointment Request:", data);
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
            <select
              id="clinic"
              {...register("clinic")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-preventify-purple"
              disabled={isLoading || clinics.length === 0}
            >
              <option value="">{isLoading ? "Loading..." : "Select a clinic"}</option>
              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.name}>
                  {clinic.name}
                </option>
              ))}
            </select>
            {errors.clinic && (
              <p className="text-sm text-red-500">{errors.clinic.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doctorId">Doctor</Label>
            <select
              id="doctorId"
              {...register("doctorId")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-preventify-purple"
              disabled={isLoading || doctors.length === 0}
            >
              <option value="">{isLoading ? "Loading..." : "Select a doctor"}</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-sm text-red-500">{errors.doctorId.message}</p>
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
