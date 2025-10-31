
'use client';

import { useState, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Wallet, Stethoscope, Pill, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";


const MagneticButton = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        const button = buttonRef.current;
        if (!container || !button) return;

        const { left, top, width, height } = container.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);

        const strength = 0.4;
        
        button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        if (!button) return;
        button.style.transform = 'translate(0, 0)';
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mt-8 flex justify-start items-center h-24 w-24"
        >
            <a href="#savings-details" ref={buttonRef} className="transition-transform duration-200 ease-out">
                <Button variant="outline" size="icon" className="rounded-full animate-bounce">
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Scroll to details</span>
                </Button>
            </a>
        </div>
    );
};

const ValueCard = ({ title, annualFee, feeDetail, visitsToSave, savings, description, family = false }: any) => {

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-preventify-blue">{title}</CardTitle>
                <CardDescription>{annualFee} <span className="font-semibold">{feeDetail}</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <div className="bg-preventify-blue/5 p-4 rounded-lg">
                    <p className="font-semibold">GP/Paediatrics Consults</p>
                    <p className="text-preventify-dark-gray">Unlimited Access {family && "for the Whole Family"}</p>
                </div>
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-sm text-preventify-gray">Standard Cost</p>
                        <p className="font-bold text-lg">₹800 - ₹1,500</p>
                    </div>
                    <div>
                        <p className="text-sm text-preventify-gray">Sukham Card Price</p>
                        <p className="font-bold text-lg text-preventify-green">₹0 Per Visit</p>
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                       <p className="text-preventify-dark-gray">Plan Pays for Itself In:</p>
                       <p className="font-bold">{visitsToSave}</p>
                   </div>
                    <div className="flex justify-between items-center">
                       <p className="text-preventify-dark-gray">Estimated Annual Savings ({family ? "8" : "4"} visits):</p>
                       <p className="font-bold text-preventify-green">{savings}</p>
                   </div>
                </div>
                 <p className="text-sm text-preventify-dark-gray pt-2">{description}</p>
            </CardContent>
            <CardFooter>
                 <div className="w-full text-center py-2 px-4 rounded-md bg-preventify-green text-white text-sm font-medium">
                    Visit your nearest Preventify hospital to subscribe.
                 </div>
            </CardFooter>
        </Card>
    )
}

const SavingsPage = () => {

  return (
    <>
       <div className="bg-preventify-blue/10 py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-preventify-blue">
                           Your 365-Day Health Passport
                        </h1>
                        <p className="mt-4 text-lg max-w-xl text-preventify-dark-gray">
                            Predictable Health. Unpredictable Savings. Explore the detailed benefits of our membership.
                        </p>
                        <MagneticButton />
                    </div>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="/cardX.jpg"
                            alt="One Health Member Card"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>

      <section id="savings-details" className="py-16 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ValueCard 
                title="Individual Plan"
                annualFee="₹730"
                feeDetail="(Less than ₹2 per day!)"
                visitsToSave="Two Visits"
                savings="₹2,470 - ₹5,270 Saved"
                description="Stop waiting for symptoms to get severe. With the Sukham Card, you can consult our General Physicians or Pediatricians for minor worries and preventive checks without worrying about the bill."
            />
             <ValueCard 
                title="Family Plan"
                family
                annualFee="₹1,999"
                feeDetail="(All members covered!)"
                visitsToSave="Three Visits"
                savings="₹4,401 - ₹10,001 Saved"
                description="For less than the cost of one major specialist visit, your entire family is covered for a whole year! Protect your loved ones with guaranteed, unlimited access to daily care."
            />
          </div>

          <div className="text-center">
             <h2 className="text-2xl font-bold text-preventify-dark-blue">Health is Now Unlimited.</h2>
             <p className="text-preventify-gray">Get a consultation for just ₹0.</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default SavingsPage;
