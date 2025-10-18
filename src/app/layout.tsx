import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";
import { AiContextProvider } from "@/context/ai-context";
import AiActionMenu from "@/components/ai-action-menu";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <AiContextProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <SubscriptionButton />
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
          <AiActionMenu />
        </AiContextProvider>
      </body>
    </html>
  );
}
