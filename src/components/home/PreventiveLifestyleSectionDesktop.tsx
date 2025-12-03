'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import BookingDialog from "../BookingDialog";

const PreventiveLifestyleSectionDesktop = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
    
    const getProcessedNames = () => {
        if (!name.trim()) return { firstName: '', lastName: '' };
        const nameParts = name.trim().split(' ');
        const firstName = nameParts.shift() || '';
        const lastName = nameParts.join(' ') || ''; // Handle names with multiple parts
        return { firstName, lastName };
    };

    const getSanitizedPhone = () => {
        if (!phone.trim()) return '';
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
            return digitsOnly.slice(2);
        }
        if (digitsOnly.startsWith('0') && digitsOnly.length === 11) {
            return digitsOnly.slice(1);
        }
        return digitsOnly.slice(-10);
    };

    return (
        <section ref={targetRef} className="pb-16 md:pb-24 relative z-10 bg-white rounded-t-[50%_100px] md:rounded-t-[50%_150px] -mt-20 md:-mt-25">
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-24 md:pt-32 grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">

                        <div className="max-w-5xl mx-auto rounded-xl shadow-lg -mt-72 flex">
                            <div className="bg-[#004c9e] text-white p-5 rounded-l-xl flex-grow">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    {/* Name Input */}
                                    <div className="space-y-1">
                                        <Label htmlFor="name-desktop" className="text-sm font-medium text-white/90">Name</Label>
                                        <Input 
                                            id="name-desktop" 
                                            type="text" 
                                            placeholder="Your Name" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            required 
                                            autoComplete="name"
                                            className="h-10 text-lg bg-transparent border-0 border-b-2 border-white/50 rounded-none focus:ring-0 focus:border-white p-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                    {/* Phone Input */}
                                    <div className="space-y-1">
                                        <Label htmlFor="phone-desktop" className="text-sm font-medium text-white/90">Phone Number</Label>
                                        <Input 
                                            id="phone-desktop" 
                                            type="tel" 
                                            placeholder="Your Number" 
                                            value={phone} 
                                            onChange={(e) => setPhone(e.target.value)} 
                                            required
                                            autoComplete="tel"
                                            className="h-10 text-lg bg-transparent border-0 border-b-2 border-white/50 rounded-none focus:ring-0 focus:border-white p-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <BookingDialog
                                initialFirstName={getProcessedNames().firstName}
                                initialLastName={getProcessedNames().lastName}
                                initialPhone={getSanitizedPhone()}
                            >
                                <Button 
                                    type="button" 
                                    className="h-auto text-lg bg-[#3370b1] hover:bg-[#4a80c2] text-white font-semibold transition-all duration-200 rounded-l-none rounded-r-xl px-8"
                                >
                                    Book Now
                                </Button>
                            </BookingDialog>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center max-w-4xl mx-auto">
                            By submitting your contact details, you agree to receive automated SMS/MMS messages from Preventify. Message & data rates may apply.
                        </p>
                        
                        <p 
                            className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto mt-12"
                        >
                            &nbsp;
                        </p>

                         <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>

                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionDesktop;
