
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Preventify",
  description: "AI assisted Modern Healthcare for a Preventive Lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body>
        <div id="scale-wrapper">
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="h-24" /> 
              <div className="relative -mt-24">
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </div>
        <SubscriptionButton />
      </body>
    </html>
  );
}
