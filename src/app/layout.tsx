
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
import { useEffect, useRef } from "react";

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
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { damping: 20, stiffness: 100, mass: 0.1 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  useEffect(() => {
    // This part is crucial to make the smooth scroll work
    const unsubscribe = smoothProgress.onChange(latest => {
      if (contentRef.current) {
        // We're essentially moving the content up and down with a spring effect
        // instead of relying on the browser's native harsh scroll.
        contentRef.current.style.transform = `translateY(-${(latest * (contentRef.current.scrollHeight - window.innerHeight))}px)`;
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <>
      <div ref={contentRef} className="fixed top-0 left-0 w-full will-change-transform">
        {children}
      </div>
       {/* This empty div takes up the actual scrollable height, 
           allowing our fixed content to have something to scroll against. */}
      <div style={{ height: contentRef.current?.scrollHeight || '100vh' }} />
    </>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
        <SubscriptionButton />
      </body>
    </html>
  );
}
