
'use client';

import { useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"
import BookingDialog from "../BookingDialog"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollRevealText from "../ScrollRevealText";

const clinicsData = [
    { id: '673d87fdaa91c2001d716c91', name: 'Padinjarangadi' },
    // Assuming a second clinic ID based on other parts of the app
    { id: 'some-other-clinic-id', name: 'Vattamkulam' } 
];

const PreventiveLifestyleSectionDesktop = () => {
    const [selectedClinic, setSelectedClinic] = useState('');
    const [isSplit, setIsSplit] = useState(false);

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
    
    const handleClinicChange = (clinicId: string) => {
        setSelectedClinic(clinicId);
        if (clinicId && !isSplit) {
            setIsSplit(true);
        }
    };

    const handleClinicOpen = (open: boolean) => {
        if (open && !isSplit) {
            setIsSplit(true);
        }
    }

    return (
        <section ref={targetRef} className="bg-white py-16 md:py-24 relative overflow-hidden z-10">
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <ScrollRevealText className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto">
                           AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                        </ScrollRevealText>

                        <div className="max-w-2xl mx-auto p-6 rounded-lg">
                            <div className="relative group">
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                     <motion.div layout onHoverStart={() => handleClinicOpen(true)} className="w-full sm:w-auto">
                                        <Select onValueChange={handleClinicChange} value={selectedClinic} onOpenChange={handleClinicOpen}>
                                            <SelectTrigger className={`w-full h-12 text-base bg-preventify-cta-primary hover:bg-preventify-cta-primary/90 text-white ${isSplit ? 'sm:min-w-[200px]' : 'sm:min-w-[416px]'}`}>
                                                <SelectValue placeholder="Select Clinic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clinicsData.map(clinic => (
                                                    <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                     </motion.div>

                                    <AnimatePresence>
                                        {isSplit && (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="w-full sm:w-auto"
                                            >
                                                <BookingDialog>
                                                    <Button className="w-full sm:min-w-[200px] h-12 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                                                        Book Now
                                                    </Button>
                                                </BookingDialog>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <p className="mt-3 text-sm text-preventify-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Get started with an AI-powered booking
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionDesktop;
