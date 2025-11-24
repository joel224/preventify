
'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

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
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto"
                        >
                            &nbsp;
                        </motion.p>

                        <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-xl bg-white/30 backdrop-blur-md border border-gray-200/80 shadow-lg">
                           <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    {/* Name Input */}
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="name" className="text-lg font-medium text-gray-700">Name</Label>
                                        <Input id="name" type="text" placeholder="Your Name" required className="h-14 text-lg" />
                                    </div>
                                    {/* Phone Input */}
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="(+91) 987-654-3210" required className="h-14 text-lg" />
                                    </div>
                                    
                                     {/* Submit Button */}
                                    <div>
                                        <Button type="submit" className="w-full h-14 text-lg bg-preventify-dark-blue hover:bg-black text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                            Request Callback
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
