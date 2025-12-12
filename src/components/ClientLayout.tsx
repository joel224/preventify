
'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";
import MarqueeText from "@/components/home/MarqueeText";
import WebsiteSharpener from '@/components/WebsiteSharpener';
import Script from "next/script";
import HeroSection from "@/components/home/HeroSection";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {isHomePage && <HeroSection />}
          {children}
        </main>
        <Footer />
        <MarqueeText />
      </div>
      <Toaster />
      <Sonner />
      <SubscriptionButton />
      <WebsiteSharpener />
      <Script 
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js" 
        type="module"
      />
    </TooltipProvider>
  );
}
