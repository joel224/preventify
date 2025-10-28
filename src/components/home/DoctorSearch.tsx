
'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const DoctorSearch = () => {
    return (
        <section className="bg-primary -mt-1 relative z-10 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">I'm looking for</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-1">
                            <label htmlFor="location" className="text-white text-sm mb-2 block">Location/City</label>
                             <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Bangalore" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bangalore">Bangalore</SelectItem>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                    <SelectItem value="mumbai">Mumbai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2">
                             <label htmlFor="doctor-search" className="text-white text-sm mb-2 block">Search Doctors by</label>
                             <Input id="doctor-search" placeholder="Specialty, Condition, Doctor's name" />
                        </div>
                        <div className="md:col-span-1">
                             <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DoctorSearch
