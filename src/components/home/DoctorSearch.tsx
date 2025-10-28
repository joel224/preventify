
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"

const DoctorSearch = () => {
    const router = useRouter();
    const [location, setLocation] = useState("padinjarangadi");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        router.push(`/doctors?location=${location}&q=${searchTerm}`);
    };

    return (
        <section className="bg-primary -mt-1 relative z-10 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-1">
                            <Label htmlFor="location" className="text-white text-sm mb-2 block">Location/City</Label>
                             <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger id="location" className="w-full">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="padinjarangadi">Padinjarangadi</SelectItem>
                                    <SelectItem value="vattamkulam">Vattamkulam</SelectItem>
                                    <SelectItem value="kumbidi">Kumbidi</SelectItem>
                                    <SelectItem value="koottanad">Koottanad</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2">
                             <Label htmlFor="doctor-search" className="text-white text-sm mb-2 block">Search Doctors by</Label>
                             <Input 
                                id="doctor-search" 
                                placeholder="Specialty, Condition, Doctor's name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                             />
                        </div>
                        <div className="md:col-span-1">
                             <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white" onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DoctorSearch
