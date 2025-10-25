
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, FileLock, Search, Building, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";
import ShimmerText from "./ShimmerText";
import Link from "next/link";

const SubscriptionButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeShimmerLine, setActiveShimmerLine] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const shimmerLines = 6; // Total number of lines to animate

  useEffect(() => {
    if (isOpen) {
      setActiveShimmerLine(0); // Start animation when dialog opens
      const shimmerInterval = setInterval(() => {
        setActiveShimmerLine((prevLine) => (prevLine + 1) % shimmerLines);
      }, 1500); // Shimmer next line every 1.5 seconds

      return () => clearInterval(shimmerInterval);
    } else {
      setActiveShimmerLine(-1); // Reset when dialog closes
    }
  }, [isOpen]);


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
      <DialogContent className="w-[95vw] max-w-4xl bg-white p-0 rounded-lg">
        <DialogHeader>
          <DialogTitle className="sr-only">One Health Member Plan</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary z-10">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 p-6">
            <ShimmerText isActive={activeShimmerLine === 0}>
              <h3 className="tracking-tight text-2xl sm:text-3xl font-bold text-preventify-dark-blue mb-4 text-center md:text-left">
                Simplify health, save time, save money.
              </h3>
            </ShimmerText>

            <div className="space-y-4 text-preventify-dark-gray">
              <div className="flex items-start gap-3">
                <Search className="h-8 w-8 text-preventify-green shrink-0" />
                <ShimmerText isActive={activeShimmerLine === 1}>
                  <p className="text-sm sm:text-base">
                    Instant access to lab results, anywhere you are.
                  </p>
                </ShimmerText>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-8 w-8 text-preventify-green shrink-0" />
                <ShimmerText isActive={activeShimmerLine === 2}>
                <p className="text-sm sm:text-base">
                  Access records at clinics & partner pharmacies. Hassle-free.
                </p>
                </ShimmerText>
              </div>
              <div className="flex items-start gap-3">
                <FileLock className="h-8 w-8 text-preventify-green shrink-0" />
                <ShimmerText isActive={activeShimmerLine === 3}>
                <p className="text-sm sm:text-base">
                  All your medical records files, reports, & bills. Secured
                  online.
                </p>
                </ShimmerText>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative w-full aspect-[16/10] md:h-full">
              <Image
                src="/family.png"
                alt="Family"
                fill
                className="rounded-t-lg md:rounded-none md:rounded-r-lg object-cover"
              />
            </div>
          </div>
        </div>

        <div 
          className="p-4 rounded-b-lg text-center"
          style={{
            background: 'linear-gradient(to right, #FDF5ED, #F5ECE5, #E4DBCC)',
          }}
        >
          <ShimmerText isActive={activeShimmerLine === 4}>
            <p className="font-semibold text-red-700 text-sm sm:text-base">
              Unlimited doctor services for just{" "}
              <span className="text-preventify-blue">₹730/year</span>
            </p>
          </ShimmerText>
          <p className="text-xs text-preventify-dark-gray">for an individual</p>
          <ShimmerText isActive={activeShimmerLine === 5}>
            <p className="font-semibold text-preventify-blue mt-1 text-sm sm:text-base">
              ₹1999/year for a family.
            </p>
          </ShimmerText>
        
            <DialogFooter className="sm:justify-center mt-4">
              <Link href="/savings" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-preventify-green hover:bg-preventify-dark-green text-white text-base py-3 px-6">
                    Claim My Peace of Mind
                </Button>
              </Link>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;
