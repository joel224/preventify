'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin } from "lucide-react";


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

                        <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-xl bg-white/30 backdrop-blur-md border border-gray-200/80 shadow-lg">
                           <h3 className="text-2xl font-semibold text-preventify-dark-blue mb-6">Take the First Step to Better Health</h3>
                           <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input type="text" placeholder="Name" required className="pl-10 h-12 text-base" />
                                    </div>
                                    {/* Email Input */}
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input type="email" placeholder="Email" required className="pl-10 h-12 text-base" />
                                    </div>
                                    {/* Phone Input */}
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input type="tel" placeholder="Phone Number" required className="pl-10 h-12 text-base" />
                                    </div>
                                    {/* Clinic Select */}
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                                         <Select required>
                                            <SelectTrigger className="w-full h-12 text-base pl-10">
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
                                </div>
                                <Button type="submit" className="w-full h-12 text-base bg-preventify-blue hover:bg-preventify-dark-blue text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                    Request a Callback
                                </Button>
                           </form>
                           <p className="text-xs text-gray-500 mt-4 text-center">
                                By submitting this form, you agree to be contacted by Preventify.
                           </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionDesktop;
