
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Paperclip, FlaskConical, FileText } from "lucide-react";
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
      <DialogContent className="sm:max-w-md bg-preventify-light-gray p-8">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-preventify-blue mb-2">Find Your Peace of Mind. We'll Handle the Rest.</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4 text-center">
            <ul className="space-y-3 text-muted-foreground text-left">
              <li className="flex items-start">
                <FileText className="h-5 w-5 mr-3 text-preventify-green shrink-0 mt-1"/>
                <span>No more carrying bulky files. We keep your reports, bills, and X-rays safe online.</span>
              </li>
              <li className="flex items-start">
                <FlaskConical className="h-5 w-5 mr-3 text-preventify-green shrink-0 mt-1"/>
                <span>Lab results are instantly available online, so you can see them anytime.</span>
              </li>
              <li className="flex items-start">
                <Paperclip className="h-5 w-5 mr-3 text-preventify-green shrink-0 mt-1"/>
                <span>Access your records anywhere—at our clinics or partner pharmacies. No memorizing needed!</span>
              </li>
            </ul>

            <div className="bg-white p-4 rounded-lg border my-4">
              <p className="font-bold text-preventify-dark-gray">Unlimited doctor services for just <span className="text-preventify-blue">₹730/year</span> for an individual, or <span className="text-preventify-blue">₹1999/year</span> for a family.</p>
            </div>
          </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:gap-2">
            <Button className="w-full bg-preventify-green hover:bg-preventify-dark-green text-lg py-6">Claim My Peace of Mind</Button>
            <DialogClose asChild>
                <Button type="button" variant="ghost" className="text-xs text-muted-foreground">
                    I'm Not Ready to Stop Worrying
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;
