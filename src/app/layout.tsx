// app/layout.tsx
'use client';
import React from "react";
import { Inter, Poppins } from "next/font/google";
import { Montserrat } from "next/font/google"; // We'll use Montserrat as a fallback
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";
import FixedWatermark from "@/components/home/FixedWatermark";
import MarqueeText from "@/components/home/MarqueeText";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Add Stack Sans Headline font
const stackSans = Montserrat({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-stack-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${stackSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200..700&display=swap" rel="stylesheet" />
      </head>
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
        <FixedWatermark />
        <SubscriptionButton />
      </body>
    </html>
  );
}