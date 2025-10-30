
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";
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

  const benefits = [
    { name: "General physician consultations", detail: "No per visit charge" },
    { name: "Paediatrician consultations", detail: "No per visit charge" },
    { name: "Medicines and vaccines", detail: "Save 25%*" },
    { name: "Other OPD consultations", detail: "view details", isLink: true },
    { name: "Lab tests", detail: "view details", isLink: true },
  ];

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
      <DialogContent className="w-[95vw] sm:max-w-md bg-off-white p-0 rounded-lg">
         <DialogHeader className="sr-only">
          <DialogTitle>One Health Member Plan</DialogTitle>
        </DialogHeader>

        <div>
            <div className="relative w-full aspect-[4/3] md:aspect-video">
              <Image
                src="/card.jpg"
                alt="One Health Member Plan Card"
                fill
                className="rounded-t-lg object-contain"
              />
            </div>

          <div className="p-6">
             <div className="space-y-3 text-dark-gray mb-6">
                {benefits.map((benefit) => (
                    <div key={benefit.name} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4 text-soft-teal shrink-0" />
                           <p className="text-sm">{benefit.name}</p>
                        </div>
                        {benefit.isLink ? (
                           <Link href="/savings" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-soft-teal underline whitespace-nowrap hover:text-soft-teal/80">
                             {benefit.detail}
                           </Link>
                         ) : (
                           <p className="text-sm font-semibold text-right whitespace-nowrap">{benefit.detail}</p>
                         )}
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 border-t border-gray-200">
            <div className="text-center hidden sm:block">
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
                  Subscribe Now
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
