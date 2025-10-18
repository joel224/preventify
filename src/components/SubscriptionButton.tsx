
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, CloudUpload, Search, Building, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
      <DialogContent className="w-[80vw] max-w-xl bg-white p-6 sm:p-8">
        <DialogHeader className="text-left mb-4">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-preventify-blue mb-2">Find Your Peace of Mind.</DialogTitle>
          <DialogDescription>We'll Handle the Rest.</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div className="space-y-4 text-preventify-dark-gray">
                <div className="flex items-start gap-3">
                  <CloudUpload className="h-6 w-6 sm:h-8 sm:w-8 text-preventify-green shrink-0"/>
                  <p className="text-sm sm:text-base">All your medical records files, reports, & bills. Secured online.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-preventify-green shrink-0"/>
                  <p className="text-sm sm:text-base">Instant access to lab results, anywhere you are.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-6 w-6 sm:h-8 sm:w-8 text-preventify-green shrink-0"/>
                  <p className="text-sm sm:text-base">Access records at clinics & partner pharmacies. Hassle-free.</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="relative">
                    <CheckCircle2 className="h-24 w-24 sm:h-32 sm:w-32 text-preventify-green" strokeWidth={1} />
                </div>
            </div>
        </div>
          
        <div className="bg-yellow-100/50 border border-yellow-200/80 p-4 rounded-lg text-center my-4 sm:my-6">
            <p className="font-semibold text-red-700 text-sm sm:text-base">Unlimited doctor services for just <span className="text-preventify-blue">₹730/year</span></p>
            <p className="text-xs sm:text-sm text-preventify-dark-gray">for an individual</p>
            <p className="font-semibold text-preventify-blue mt-2 text-sm sm:text-base">₹1999/year for a family.</p>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:gap-2">
            <Button className="w-full bg-preventify-green hover:bg-preventify-dark-green text-white text-base sm:text-lg py-3 sm:py-6">Claim My Peace of Mind</Button>
            <DialogClose asChild>
                <Button type="button" variant="ghost" className="text-xs text-muted-foreground">
                    No thanks, I prefer to Stop Worrying
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;
