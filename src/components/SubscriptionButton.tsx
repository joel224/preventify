
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
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const SubscriptionButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const benefits = [
    { name: "Unlimited Doctor Visits", detail: "Consult with our General Physicians and Paediatricians as often as you need." },
    { name: "Annual Coverage", detail: "A single fee covers all your primary consultations for a full year." },
    { name: "Family Plan Available", detail: "Extend the same great benefits to your entire family for complete peace of mind." },
    { name: "Access to Specialists", detail: "Get seamless referrals to specialists within the Preventify network." },
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
      <DialogContent className="sm:max-w-3xl w-[95vw] p-0 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center">
                 <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-preventify-blue mb-2">
                        The Sugam Card
                    </DialogTitle>
                    <DialogDescription className="text-base text-preventify-dark-gray">
                        One annual fee for unlimited peace of mind. Stop paying for sick visits and start investing in your health.
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
                    src="/card.jpg"
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
