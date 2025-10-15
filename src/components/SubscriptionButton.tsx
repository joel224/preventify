"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

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
      <DialogContent className="sm:max-w-[625px] bg-preventify-light-gray">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-preventify-blue">Annual Subscription Offers</DialogTitle>
          <DialogDescription>
            Choose a plan that works best for you and your family.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-preventify-dark-gray mb-2">Individual Plan</h3>
            <p className="text-3xl font-bold mb-4">₹2,999 <span className="text-sm font-normal text-muted-foreground">/year</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>Unlimited Consultations</li>
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>Annual Health Checkup</li>
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>20% off on Diagnostics</li>
            </ul>
            <Button className="w-full mt-6 bg-preventify-green hover:bg-preventify-dark-green">Choose Plan</Button>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-preventify-blue relative">
            <div className="absolute top-0 -translate-y-1/2 bg-preventify-blue text-white px-3 py-1 text-sm rounded-full">Most Popular</div>
            <h3 className="text-xl font-semibold text-preventify-dark-gray mb-2">Family Plan</h3>
            <p className="text-3xl font-bold mb-4">₹5,999 <span className="text-sm font-normal text-muted-foreground">/year</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>For up to 4 members</li>
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>Unlimited Consultations</li>
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>Annual Health Checkup</li>
              <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-preventify-green"/>30% off on Diagnostics</li>
            </ul>
            <Button className="w-full mt-6 bg-preventify-blue hover:bg-preventify-dark-blue">Choose Plan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;
