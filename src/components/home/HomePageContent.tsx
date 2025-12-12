'use client';

import { useState, useEffect } from 'react';
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import PreventiveLifestyleSection from "@/components/home/PreventiveLifestyleSection";

const HomePageContent = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="relative z-10 bg-background">
            <PreventiveLifestyleSection />
            <ServicesSection />
            <FeaturesSection />
            <BlogPreviewSection />
            <TestimonialsSection />
            <LocationsSection />
            <CtaSection />
        </div>
    );
};

export default HomePageContent;
