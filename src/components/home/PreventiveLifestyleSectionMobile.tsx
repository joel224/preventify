
'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import BookingDialog from "../BookingDialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';

const clinicsData = [
    { id: '673d87fdaa91c2001d716c91', name: 'Padinjarangadi' },
    { id: 'some-other-clinic-id', name: 'Vattamkulam' } 
];

const PreventiveLifestyleSectionMobile = () => {
    const [selectedClinic, setSelectedClinic] = useState('');
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
    
    const handleClinicChange = (clinicId: string) => {
        setSelectedClinic(clinicId);
    };

    return (
        
        <section className="bg-white py-16 md:py-24 relative -mt-20 rounded-t-2xl shadow-xl">
            <div className="absolute -top-12 left-4 sm:left-6 lg:left-8 z-10">
                <div className="inline-flex items-center gap-2 bg-white rounded-full p-8 shadow border border-gray-200/80">
                    <Image src="/logo.png" alt="Preventify Logo" width={88} height={88} />
                </div>
            </div>
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <div className="text-base text-preventify-dark-gray mt-6 max-w-3xl mx-auto text-left">
                            <p className="font-semibold mb-2">We need:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Community care programs that honor our elders</li>
                                <li>Simple technology solutions that make daily life easier</li>
                                <li>Policies that value the contributions of our oldest citizens</li>
                                <li>More research on healthy aging specific to Indian lifestyles</li>
                            </ul>
                        </div>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-lg text-preventify-dark-gray my-8 max-w-3xl mx-auto"
                        >
                            AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                        </motion.p>

                        <div className="max-w-3xl mx-auto p-4 md:p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <div className="w-full sm:w-auto">
                                    <Select onValueChange={handleClinicChange} value={selectedClinic}>
                                        <SelectTrigger className="w-full h-12 text-base bg-preventify-blue hover:bg-preventify-dark-blue text-white font-medium transition-colors duration-200">
                                            <SelectValue placeholder="Select Clinic Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clinicsData.map(clinic => (
                                                <SelectItem key={clinic.id} value={clinic.id} className="cursor-pointer hover:bg-gray-50">
                                                    {clinic.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-full sm:w-auto">
                                    <BookingDialog>
                                        <Button className="w-full sm:min-w-[180px] h-12 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                                            Book Appointment
                                        </Button>
                                    </BookingDialog>
                                </div>
                            </div>

                            {selectedClinic && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="mt-4 text-sm text-preventify-dark-gray/80"
                                >
                                    <span className="font-medium text-preventify-dark-blue">Selected:</span> {clinicsData.find(c => c.id === selectedClinic)?.name} clinic
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionMobile;
