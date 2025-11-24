'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Label } from "../ui/label";


const clinicsData = [
    { id: '673d87fdaa91c2001d716c91', name: 'Padinjarangadi' },
    { id: 'some-other-clinic-id', name: 'Vattamkulam' } 
];

const PreventiveLifestyleSectionDesktop = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle form submission, e.g., send data to an API
        alert("Thank you! We will call you back shortly.");
    };

    return (
        <section ref={targetRef} className="py-16 md:py-24 relative overflow-hidden z-10" style={{ backgroundColor: '#ffffff' }}>
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto"
                        >
                            AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                        </motion.p>

                        <div className="max-w-6xl mx-auto p-6 md:p-8 rounded-xl bg-white/30 backdrop-blur-md border border-gray-200/80 shadow-lg">
                           <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                    {/* Name Input */}
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                                        <Input id="name" type="text" placeholder="Jane Smith" required className="h-12 text-base" />
                                    </div>
                                    {/* Email Input */}
                                     <div className="space-y-2 text-left">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                        <Input id="email" type="email" placeholder="jane@framer.com" required className="h-12 text-base" />
                                    </div>
                                    {/* Phone Input */}
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="(111) 111-1111" required className="h-12 text-base" />
                                    </div>
                                    {/* Clinic Select */}
                                     <div className="space-y-2 text-left">
                                         <Label htmlFor="clinic" className="text-sm font-medium text-gray-700">Clinic Location</Label>
                                         <Select required>
                                            <SelectTrigger id="clinic" className="w-full h-12 text-base">
                                                <SelectValue placeholder="Select Clinic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clinicsData.map(clinic => (
                                                    <SelectItem key={clinic.id} value={clinic.name} className="cursor-pointer hover:bg-gray-50">
                                                        {clinic.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                     {/* Submit Button */}
                                    <div>
                                        <Button type="submit" className="w-full h-12 text-base bg-preventify-dark-blue hover:bg-black text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                            Request a Callback
                                        </Button>
                                    </div>
                                </div>
                           </form>
                           <p className="text-xs text-gray-500 mt-4 text-center">
                                By submitting your contact details, you agree to receive automated SMS/MMS messages from Preventify. Message & data rates may apply.
                           </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionDesktop;
