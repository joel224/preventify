'use client';

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import BookingDialog from "../BookingDialog";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollRevealText from "../ScrollRevealText";


const doctorsData = [
    { id: '173208576372747', name: 'Dr. Rakesh K R', specialty: 'General Physician', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '173208610763786', name: 'Dr. Mohammed Faisal', specialty: 'General Practitioner', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '174497110921725', name: 'Dr. Hafsa Hussain', specialty: 'Pediatrics', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '173771631358722', name: 'Dr. Krishnendu U K', specialty: 'General Practitioner', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175931883083616', name: 'Dr. Girish U', specialty: 'Dermatology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949148741914', name: 'Dr. Ijas V. I.', specialty: 'Pulmonology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949141398449', name: 'Dr. Husna V.', specialty: 'Gynecology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175931888074630', name: 'Dr. Neeharika V.', specialty: 'ENT', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175931864615485', name: 'Dr. Sreedev N', specialty: 'Pulmonology', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949158258558', name: 'Dr. Ajay Biju', specialty: 'Resident Medical Officer', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949152812334', name: 'Dr. Renjith A.', specialty: 'Orthopedics', clinicId: '673d87fdaa91c2001d716c91'},
    { id: '175949162376135', name: 'Dr. K.Y.Sanjay', specialty: 'Orthopedics', clinicId: '673d87fdaa91c2001d716c91'},
];

const clinicsData = [
    { id: '673d87fdaa91c2001d716c91', name: 'Padinjarangadi' },
    { id: 'some-other-clinic-id', name: 'Vattamkulam' } 
];

const PreventiveLifestyleSectionMobile = () => {
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const availableSpecialties = useMemo(() => {
        if (!selectedClinic) return [];
        const allSpecialties = doctorsData.map(d => d.specialty);
        return [...new Set(allSpecialties)];
    }, [selectedClinic]);

    const handleClinicChange = (clinicId: string) => {
        setSelectedClinic(clinicId);
        setSelectedSpecialty('');
    };

    const handleSpecialtyChange = (specialty: string) => {
        setSelectedSpecialty(specialty);
    };

    return (
        <section className="bg-white py-16 md:py-24 relative -mt-20 rounded-t-2xl shadow-xl z-10">
             <div className="absolute -top-12 left-4 sm:left-6 lg:left-8 z-20">
                    <div className="inline-flex items-center gap-2 bg-white rounded-full p-2 shadow-md border border-gray-200/80">
                        <Image src="/logo.png" alt="Preventify Logo" width={44} height={44} />
                    </div>
                </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="text-center">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                        AI assisted Modern Healthcare for a <span className="text-primary">Preventive Lifestyle</span>
                    </h2>

                    <div className="max-w-2xl mx-auto p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Select onValueChange={handleClinicChange} value={selectedClinic}>
                                <SelectTrigger className="w-full h-12 text-base">
                                    <SelectValue placeholder="Select Clinic" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clinicsData.map(clinic => (
                                        <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select onValueChange={handleSpecialtyChange} value={selectedSpecialty} disabled={!selectedClinic}>
                                <SelectTrigger className="w-full h-12 text-base">
                                    <SelectValue placeholder="Select Specialty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSpecialties.map(specialty => (
                                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedSpecialty && (
                            <div className="mt-4">
                                <BookingDialog>
                                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6 px-8">
                                        Book Now
                                    </Button>
                                </BookingDialog>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PreventiveLifestyleSectionMobile;
