
'use client'

import React, { useState, useEffect } from "react";
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

// This is required to make TypeScript happy about using the web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        autoplay?: boolean;
        loop?: boolean;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only once on the client after the component mounts.
    // We can consider the initial "loading" to be done at this point.
    // A timeout can be added for a smoother perceived transition if needed, but this is the simplest approach.
    setIsLoading(false);
  }, []);

  return (
    <TooltipProvider>
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white">
          <dotlottie-wc 
            src="https://lottie.host/0083ce0e-679f-4d56-ba14-06430aaf6d50/Gj92cCYgEe.lottie" 
            style={{ width: '300px', height: '300px' }}
            autoplay 
            loop>
          </dotlottie-wc>
        </div>
      )}
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
