// app/layout.tsx (UNCHANGED - Your code is fine as-is)
'use client';
import React from "react";
import { Inter, Poppins } from "next/font/google";
import '@/globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";
import MarqueeText from "@/components/home/MarqueeText";
import WebsiteSharpener from '@/components/WebsiteSharpener';
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <MarqueeText />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
        <SubscriptionButton />
        <WebsiteSharpener />
        <Script 
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js" 
          type="module"
        />
      </body>
    </html>
  );
}
