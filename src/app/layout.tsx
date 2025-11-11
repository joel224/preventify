
'use client';
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";
import { useScroll, useSpring, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as React from 'react';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// This is a new component to handle the smooth scrolling logic
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // We need to know the height of the content to create a scrollable area.
  const [contentHeight, setContentHeight] = React.useState(0);
  
  useEffect(() => {
    // Measure the content height after it has rendered.
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);


  const { scrollY } = useScroll();

  // This is where you control the smoothness.
  // Lower damping/stiffness and higher mass = more "glide" and momentum.
  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const smoothY = useSpring(scrollY, springConfig);


  return (
    <>
      <motion.div 
        ref={contentRef} 
        style={{ y: smoothY }}
        className="fixed top-0 left-0 w-full will-change-transform"
      >
        {children}
      </motion.div>
       {/* This empty div takes up the actual scrollable height, 
           allowing our fixed content to have something to scroll against. */}
      <div style={{ height: contentHeight }} />
    </>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <TooltipProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
            <Sonner />
          </SmoothScroll>
        </TooltipProvider>
        <SubscriptionButton />
      </body>
    </html>
  );
}
