
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, FileLock, Search, Building, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const SubscriptionButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`fixed bottom-4 right-4 z-50 origin-bottom-right transition-transform duration-300 ease-in-out ${
            isScrolled ? "scale-75" : "scale-100"
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Button
            size="icon"
            className="w-20 h-20 rounded-full bg-gray-400/20 backdrop-blur-lg border border-gray-300/30 text-preventify-dark-gray hover:bg-gray-400/30 animate-vibrate"
            aria-label="Annual Subscription"
          >
            <div className="flex flex-col items-center">
              <Star className="h-8 w-8" />
              <span className="text-xs mt-1">Annual</span>
            </div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-4xl bg-off-white p-0 rounded-lg">
         <DialogHeader className="sr-only">
          <DialogTitle>One Health Member Plan</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1 p-6 md:p-8">
            <div className="space-y-4 text-dark-gray mt-4">
              <div className="flex items-start gap-3">
                <Search className="h-8 w-8 text-soft-teal shrink-0" />
                <p className="text-sm sm:text-base">
                  Instant access to lab results, anywhere you are.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-8 w-8 text-soft-teal shrink-0" />
                <p className="text-sm sm:text-base">
                  Access records at clinics & partner pharmacies.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FileLock className="h-8 w-8 text-soft-teal shrink-0" />
                <p className="text-sm sm:text-base">
                  All your medical records files, reports, & bills. Secured online.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
             <div className="relative w-full aspect-[16/10] lg:h-full">
              <Image
                src="/card.jpg"
                alt="One Health Member Plan Card"
                fill
                className="rounded-t-lg lg:rounded-none lg:rounded-r-lg object-contain"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
            <div className="text-center">
                 <p className="font-semibold text-dark-gray text-base">
                    Unlimited doctor services for just <span className="text-warm-coral">₹730/year</span>
                </p>
                <p className="text-xs text-light-gray">for an individual</p>
                 <p className="font-semibold text-dark-gray mt-2 text-base">
                    <span className="text-warm-coral">₹1999/year</span> for a family
                </p>
                <p className="text-xs text-light-gray">includes 4 members</p>
            </div>
            
            <DialogFooter className="sm:justify-center mt-4">
               <Link href="/savings" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full bg-soft-teal hover:bg-soft-teal/90 text-white text-base py-3 px-6 rounded-lg">
                  Claim My Peace of Mind
                </Button>
              </Link>
            </DialogFooter>
             <p className="text-xs text-center text-light-gray mt-4">Join 50,000+ members who never miss a dose or a check-up.</p>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;
