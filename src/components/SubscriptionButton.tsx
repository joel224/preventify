
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
      <DialogContent className="sm:max-w-xl bg-white p-8">
        <DialogHeader className="text-left">
          <DialogTitle className="text-3xl font-bold text-preventify-blue mb-4">Find Your Peace of Mind. We'll Handle the Rest.</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="grid grid-cols-3 items-start text-preventify-dark-gray mb-6">
            <div className="col-span-2 flex items-start gap-3">
              <CloudUpload className="h-6 w-6 text-preventify-green shrink-0 mt-1"/>
              <p>All your medical records files, reports, & bills. Secured online.</p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <div className="relative">
                    <CheckCircle2 className="h-20 w-20 text-preventify-green" strokeWidth={1} />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center text-sm text-preventify-dark-gray">
              <div>
                  <CloudUpload className="h-8 w-8 mx-auto text-preventify-green mb-2"/>
                  <p>All your medical reports & bills. Secured online.</p>
              </div>
              <div>
                  <Search className="h-8 w-8 mx-auto text-preventify-green mb-2"/>
                  <p>Instant access lab results. anywhere.</p>
              </div>
              <div>
                  <Building className="h-8 w-8 mx-auto text-preventify-green mb-2"/>
                  <p>Access records at clinics & partner pharmacies. Hassle-free.</p>
              </div>
          </div>
          
          <div className="bg-yellow-100/50 border border-yellow-200/80 p-4 rounded-lg text-center my-4">
            <p className="font-semibold text-preventify-dark-gray">Unlimited doctor services for just <span className="text-preventify-blue">₹730/year</span></p>
            <p className="text-sm text-preventify-dark-gray">for an individual</p>
            <p className="font-semibold text-preventify-blue mt-2">₹1999/year for a family.</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:gap-2">
            <Button className="w-full bg-preventify-green hover:bg-preventify-dark-green text-white text-lg py-6">Claim My Peace of Mind</Button>
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
