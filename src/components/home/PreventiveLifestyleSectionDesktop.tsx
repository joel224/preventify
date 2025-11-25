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
        <section ref={targetRef} className="pb-16 md:pb-24 relative overflow-hidden z-10 bg-white rounded-t-[50%_100px] md:rounded-t-[50%_150px] -mt-20 md:-mt-28">
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-24 md:pt-32 grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">

                        <div className="max-w-6xl mx-auto p-6 md:p-8 rounded-xl bg-white/30 backdrop-blur-md border border-gray-200/80 shadow-lg mb-24">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                                {/* Name Input */}
                                <div className="space-y-2 text-left">
                                    <Label htmlFor="name-desktop" className="text-xl font-medium text-gray-700">Name</Label>
                                    <Input id="name-desktop" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="h-14 text-xl" />
                                </div>
                                {/* Phone Input */}
                                <div className="space-y-2 text-left">
                                    <Label htmlFor="phone-desktop" className="text-xl font-medium text-gray-700">Phone Number</Label>
                                    <Input id="phone-desktop" type="tel" placeholder="(+91) 987-654-3210" value={phone} onChange={(e) => setPhone(e.target.value)} required className="h-14 text-xl" />
                                </div>
                                
                                    {/* Submit Button */}
                                <div>
                                    <BookingDialog
                                        initialFirstName={getProcessedNames().firstName}
                                        initialLastName={getProcessedNames().lastName}
                                        initialPhone={getSanitizedPhone()}
                                    >
                                        <Button type="button" className="w-full h-14 text-xl bg-preventify-dark-blue hover:bg-black text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                            Request Callback
                                        </Button>
                                    </BookingDialog>
                                </div>
                            </div>
                           <p className="text-sm text-gray-500 mt-4 text-center">
                                By submitting your contact details, you agree to receive automated SMS/MMS messages from Preventify. Message & data rates may apply.
                           </p>
                        </div>

                         <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <p 
                            className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto"
                        >
                            &nbsp;
                        </p>

                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionDesktop;
