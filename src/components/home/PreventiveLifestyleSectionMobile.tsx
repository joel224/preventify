

'use client';

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button"
import BookingDialog from "../BookingDialog"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Data should ideally be fetched from an API, but using the hardcoded list for now
// as it's consistent with the existing BookingDialog.
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
    // Assuming a second clinic ID based on other parts of the app
    { id: 'some-other-clinic-id', name: 'Vattamkulam' } 
];

const PreventiveLifestyleSection = () => {
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const availableSpecialties = useMemo(() => {
        if (!selectedClinic) return [];
        // This logic needs to be more robust if clinics have different doctors.
        // For now, we assume specialties are universal or tied to the available doctors list.
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
        <section className="bg-white py-16 md:py-24 relative -mt-20 rounded-t-2xl shadow-xl">
             <div className="absolute -top-12 left-4 sm:left-6 lg:left-8 z-10">
                    <div className="inline-flex items-center gap-2 bg-white rounded-full p-8 shadow border border-gray-200/80">
                        <Image src="/logo.png" alt="Preventify Logo" width={88} height={88} />
                    </div>
                </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <p className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto">
                           AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                        </p>

                        <div className="max-w-2xl mx-auto p-6 rounded-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <Select onValueChange={handleClinicChange} value={selectedClinic}>
                                        <SelectTrigger className="w-full h-12 text-base bg-primary text-primary-foreground">
                                            <SelectValue placeholder="Select Clinic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clinicsData.map(clinic => (
                                                <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select onValueChange={handleSpecialtyChange} value={selectedSpecialty} disabled={!selectedClinic}>
                                        <SelectTrigger className="w-full h-12 text-base border-primary text-primary bg-white">
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
                                            <Button className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8">
                                                Book Now
                                            </Button>
                                        </BookingDialog>
                                     </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventiveLifestyleSection;