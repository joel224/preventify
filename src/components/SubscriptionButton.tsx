
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const SubscriptionButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const benefits = [
    { name: "All Doctor Visits", detail: "See doctors anytime you need." },
    { name: "Full Year Cover", detail: "One payment covers your whole year." },
    { name: "Family Plans", detail: "Cover your whole family too." },
    { name: "Specialist Access", detail: "Easy visits to specialists." },
  ];

  // Auto-open after 60 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 60000); // 60 seconds

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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

  const handleMouseEnter = () => {
    setIsOpen(true);
    // Clear the auto-open timer if user interacts with it first
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={`fixed bottom-4 right-4 z-50 origin-bottom-right transition-transform duration-300 ease-in-out ${
          isScrolled ? "scale-75" : "scale-100"
        }`}
        style={{ backfaceVisibility: 'hidden' }}
        onMouseEnter={handleMouseEnter}
      >
        <Button
          className="w-24 h-24 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl border-2 border-white/50 flex-col gap-1 animate-vibrate"
          aria-label="Annual Subscription"
          onClick={(e) => {
              if (isOpen) {
                  e.preventDefault();
              }
          }}
        >
            <Star className="h-7 w-7" />
            <span className="text-xs font-medium -mt-1">Annual<br/>Subscription</span>
        </Button>
      </div>
      <DialogContent className="sm:max-w-3xl w-[95vw] p-0 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center">
                 <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-preventify-blue mb-2">
                        The Sugam Card
                    </DialogTitle>
                    <DialogDescription className="text-base text-preventify-dark-gray">
                        One fee. One year. All doctor visits.
                    </DialogDescription>
                </DialogHeader>

                <div className="my-8 space-y-4">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-preventify-green mt-1 shrink-0" />
                            <div>
                                <p className="font-semibold text-preventify-dark-blue">{benefit.name}</p>
                                <p className="text-sm text-preventify-gray">{benefit.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter className="mt-auto">
                    <Link href="/savings" onClick={() => setIsOpen(false)} className="w-full">
                        <Button className="w-full bg-preventify-blue hover:bg-preventify-dark-blue text-white text-base py-3 px-6 rounded-lg h-12">
                            Learn More & Subscribe
                        </Button>
                    </Link>
                </DialogFooter>
            </div>
            <div className="relative aspect-square md:aspect-auto hidden md:block">
                <Image
                    src="/card.webp"
                    alt="One Health Member Plan Card"
                    fill
                    className="rounded-r-lg object-cover"
                />
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionButton;
