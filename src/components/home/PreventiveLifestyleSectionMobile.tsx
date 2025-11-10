'use client';

import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import BookingDialog from "../BookingDialog";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollRevealText from "../ScrollRevealText";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";


const clinicsData = [
    { id: '673d87fdaa91c2001d716c91', name: 'Padinjarangadi' },
    { id: 'some-other-clinic-id', name: 'Vattamkulam' } 
];

const PreventiveLifestyleSectionMobile = () => {
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
        <section ref={targetRef} className="bg-white py-16 md:py-24 relative -mt-20 rounded-t-2xl shadow-xl z-10 overflow-hidden">
             <div className="absolute -top-12 left-4 sm:left-6 lg:left-8 z-20">
                    <div className="inline-flex items-center justify-center bg-white rounded-3xl p-4 shadow-sm border border-gray-200/80 w-24 h-24">
                        <Image src="/logo.png" alt="Preventify Logo" width={64} height={64} />
                    </div>
                </div>
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                
                <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive Lifestyle</span>
                        </h2>
                        
                        <ScrollRevealText className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto">
                           AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                        </ScrollRevealText>

                        <div className="max-w-2xl mx-auto p-4 rounded-lg">
                            <div className="relative group">
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                     <motion.div layout onHoverStart={() => handleClinicOpen(true)} className="w-full sm:w-auto">
                                        <Select onValueChange={handleClinicChange} value={selectedClinic} onOpenChange={handleClinicOpen}>
                                            <SelectTrigger className={`w-full h-12 text-base bg-preventify-subtle-blue text-white ${isSplit ? 'sm:min-w-[200px]' : 'sm:min-w-[416px]'}`}>
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
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="w-full"
                                            >
                                                <BookingDialog>
                                                    <Button className="w-full h-12 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground">
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

export default PreventiveLifestyleSectionMobile;
