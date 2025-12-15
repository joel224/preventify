
'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const PreventiveLifestyleSectionDesktop = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const [location, setLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
    
    const handleSearch = () => {
        // Construct the query parameters for the /doctors page
        const params = new URLSearchParams();
        if (location) {
            params.set('location', location);
        }
        if (searchQuery) {
            params.set('q', searchQuery);
        }
        router.push(`/doctors?${params.toString()}`);
    };

    return (
        <section ref={targetRef} className="pb-16 md:pb-24 relative z-10 bg-white rounded-t-[50%_100px] md:rounded-t-[50%_150px] -mt-20 md:-mt-25">
            <motion.div style={{ y }} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-24 md:pt-32 grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">

                        <div className="max-w-5xl mx-auto rounded-xl shadow-lg -mt-72 flex bg-[#004c9e] text-white">
                            <div className="p-8 flex-grow">
                                <h3 className="text-2xl font-bold text-left mb-6">I'm looking for</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                    {/* Location Input */}
                                    <div className="space-y-1 text-left">
                                        <Label htmlFor="location-desktop" className="text-sm font-medium text-white/90 flex items-center gap-1">
                                            Location/City
                                        </Label>
                                        <div className="relative">
                                            <Input 
                                                id="location-desktop" 
                                                type="text" 
                                                placeholder="e.g. Padinjarangadi" 
                                                value={location} 
                                                onChange={(e) => setLocation(e.target.value)} 
                                                className="h-10 text-lg bg-transparent border-0 border-b border-white/50 rounded-none focus:ring-0 focus:border-white p-0 pr-6 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                                        </div>
                                    </div>
                                    {/* Search Input */}
                                    <div className="space-y-1 text-left">
                                        <Label htmlFor="search-desktop" className="text-sm font-medium text-white/90">
                                            Search Doctors by Specialty, Condition, Doctor’s name
                                        </Label>
                                        <Input 
                                            id="search-desktop" 
                                            type="text" 
                                            placeholder="e.g., Cardiology, Dr. Rakesh" 
                                            value={searchQuery} 
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="h-10 text-lg bg-transparent border-0 border-b border-white/50 rounded-none focus:ring-0 focus:border-white p-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                             <Button 
                                type="button" 
                                onClick={handleSearch}
                                className="h-auto text-lg bg-[#3370b1] hover:bg-[#4a80c2] text-white font-semibold transition-all duration-200 rounded-l-none rounded-r-xl px-8 flex items-center justify-center gap-2"
                            >
                                <span>Search</span>
                            </Button>
                        </div>
                        
                        <p 
                            className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto mt-12"
                        >
                            &nbsp;
                        </p>

                         <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive <br className="hidden md:block" /> Lifestyle</span>
                        </h2>
                        
                        <div className="text-lg text-preventify-dark-gray mt-14 max-w-3xl mx-auto text-left">
                            <p className="font-semibold mb-2 mt-8">We need Us And We Have:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>A Community care program that honor our elders</li>
                                <li>Simple technology solutions that make daily life easier</li>
                                <li>Policies that value the contributions of our oldest citizens</li>
                                <li>Research on healthy aging specific to Kerala lifestyles</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default PreventiveLifestyleSectionDesktop;
