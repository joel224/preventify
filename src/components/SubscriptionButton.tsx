"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, FileLock, Search, Building } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

const SubscriptionButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`fixed bottom-8 right-8 z-50 transition-transform duration-300 ease-in-out ${
            isScrolled ? "scale-100" : "scale-75"
          }`}
        >
          <Button
            size="icon"
            className="w-20 h-20 rounded-full bg-gray-400/20 backdrop-blur-lg border border-gray-300/30 text-preventify-dark-gray hover:bg-gray-400/30"
            aria-label="Annual Subscription"
          >
            <div className="flex flex-col items-center">
              <Star className="h-6 w-6" />
              <span className="text-xs mt-1">Annual</span>
            </div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-4xl bg-white p-6 sm:p-8">
        <DialogHeader className="text-left mb-4">
          
          <DialogDescription>We'll Handle the Rest.</DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h3 className="text-lg font-semibold text-preventify-dark-blue text-center mb-4">
                    Simplify health, save time, save money.
                </h3>

                <div className="space-y-4 text-preventify-dark-gray max-w-md mx-auto">
                    <div className="flex items-start gap-3">
                      <Search className="h-8 w-8 text-preventify-green shrink-0"/>
                      <p className="text-sm sm:text-base">Instant access to lab results, anywhere you are.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="h-8 w-8 text-preventify-green shrink-0"/>
                      <p className="text-sm sm:text-base">Access records at clinics & partner pharmacies. Hassle-free.</p>
                    </div>
                     <div className="flex items-start gap-3">
                      <FileLock className="h-8 w-8 text-preventify-green shrink-0" />
                      <p className="text-sm sm:text-base">All your medical records files, reports, & bills. Secured online.</p>
                    </div>
                </div>
            </div>
            <div>
                <Image 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop"
                    alt="Doctor"
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full aspect-square"
                />
            </div>
        </div>
          
        <div className="bg-yellow-100/50 border border-yellow-200/80 p-4 rounded-lg text-center my-4 sm:my-6">
            <p className="font-semibold text-red-700 text-sm sm:text-base">Unlimited doctor services for just <span className="text-preventify-blue">₹730/year</span></p>
            <p className="text-xs sm:text-sm text-preventify-dark-gray">for an individual</p>
            <p className="font-semibold text-preventify-blue mt-2 text-sm sm:text-base">₹1999/year for a family.</p>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-2 sm:justify-center">
            <Button className="w-full sm:w-auto bg-preventify-green hover:bg-preventify-dark-green text-white text-base sm:text-lg py-3 sm:py-6 px-8">Claim My Peace of Mind</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;