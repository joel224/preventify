
'use client';

import { useState, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, Stethoscope, Pill, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const savingsData = [
    { service: "Complete Blood Count (CBC)", nonMember: 770, member: 300, save: 470 },
    { service: "HbA1c", nonMember: 1550, member: 425, save: 1125 },
    { service: "Lipid Profile (Chol, Trig, HDL, LDL, VLDL)", nonMember: 1900, member: 550, save: 1350 },
    { service: "Fasting Blood Sugar (FBS)", nonMember: 350, member: 80, save: 270 },
    { service: "Thyroid Stimulating Hormone (TSH)", nonMember: 920, member: 275, save: 645 },
    { service: "Liver Function Test (LFT)", nonMember: 1750, member: 575, save: 1175 },
    { service: "C-Reactive Protein (CRP)", nonMember: 1050, member: 425, save: 625 },
    { service: "Post Prandial Blood Sugar (PPBS)", nonMember: 330, member: 80, save: 250 },
    { service: "Vitamin B-12", nonMember: 2400, member: 950, save: 1450 },
    { service: "Serum Creatinine", nonMember: 520, member: 190, save: 330 },
    { service: "Vitamin D 25 Hydroxy (Vitamin D Total)", nonMember: 2800, member: 975, save: 1825 },
    { service: "Thyroid Profile (T3, T4, TSH)", nonMember: 1670, member: 600, save: 1070 },
    { service: "Erythrocyte Sedimentation Rate (ESR)", nonMember: 480, member: 150, save: 330 },
    { service: "ECG", nonMember: 710, member: 350, save: 360 },
    { service: "Echo Color Doppler", nonMember: 2590, member: 1750, save: 840 },
    { service: "USG Abdomen & Pelvis", nonMember: 2840, member: 2050, save: 790 },
    { service: "X-Ray Chest PA", nonMember: 650, member: 400, save: 250 },
];


const SavingsTable = ({ data, offset = 0 }: { data: typeof savingsData; offset?: number }) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-preventify-blue/5 hover:bg-preventify-blue/10">
              <TableHead>Service Name</TableHead>
              <TableHead className="text-right font-bold text-preventify-green">You save</TableHead>
              <TableHead className="text-right">Non-member</TableHead>
              <TableHead className="text-right">Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow 
                key={index} 
                className="relative overflow-hidden even:bg-preventify-green/5 animate-shimmer-reveal"
                style={{ animationDelay: `${(index + offset) * 100}ms` }}
              >
                <TableCell className="font-medium">{item.service}</TableCell>
                <TableCell className="text-right font-extrabold text-preventify-green relative overflow-hidden">
                  <span className="relative z-10">
                    ₹{item.save.toLocaleString()}
                  </span>
                  <span 
                    className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer"
                  />
                </TableCell>
                <TableCell className="text-right">₹{item.nonMember.toLocaleString()}</TableCell>
                <TableCell className="text-right">₹{item.member.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
);

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

        // Strength of the magnetic effect
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


const SavingsPage = () => {
  const half = Math.ceil(savingsData.length / 2);
  const firstHalf = savingsData.slice(0, half);
  const secondHalf = savingsData.slice(half);

  return (
    <>
       <div className="bg-preventify-blue/10 py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-preventify-blue">
                            How much can you save with the One Health Member Plan?
                        </h1>
                        <p className="mt-4 text-lg max-w-xl text-preventify-dark-gray">
                            Explore the detailed savings and benefits of our membership.
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
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Wallet className="w-8 h-8 text-preventify-green" />
                <CardTitle>The proof is in the saving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-preventify-dark-gray mb-4">
                  Most recovered more than their membership fee - many saved much more.
                </p>
                <div className="flex justify-between border-t pt-4">
                    <div>
                        <p className="font-bold text-preventify-blue">90% members saved</p>
                        <p className="text-sm text-preventify-gray">₹2,000+ in a year</p>
                    </div>
                    <div>
                        <p className="font-bold text-preventify-blue">50% saved</p>
                        <p className="text-sm text-preventify-gray">₹17,000+ in a year</p>
                    </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Stethoscope className="w-8 h-8 text-preventify-green" />
                <CardTitle>Plan pays for itself in two visits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-preventify-dark-gray mb-4">
                  2 visits = membership fee covered. Rest is pure savings.
                </p>
                <div className="flex justify-between border-t pt-4">
                    <div className="space-y-2">
                        <div>
                            <p className="font-bold text-preventify-blue">GP/Paediatrics visit</p>
                            <p className="text-sm text-preventify-gray">₹800-₹1,500</p>
                        </div>
                        <div>
                           <p className="font-bold text-preventify-blue">Average family consults</p>
                            <p className="text-sm text-preventify-gray">4 visits/year = ₹1,600-₹3,000 saved</p>
                        </div>
                         <div>
                           <p className="font-bold text-preventify-blue">GP/Paediatric consults</p>
                            <p className="text-sm text-preventify-gray">no charge per visit</p>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Pill className="w-8 h-8 text-preventify-green" />
                <CardTitle>Save more on medicines, every time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-preventify-dark-gray mb-4">
                  That's just on medicines. Everything else is extra savings.
                </p>
                <div className="flex justify-between border-t pt-4">
                    <div>
                        <p className="font-bold text-preventify-blue">Average monthly medicines bill = ₹1,000</p>
                        <p className="text-sm text-preventify-gray">15% off + 10% Health Credits = ₹235/month</p>
                    </div>
                    <div>
                        <p className="font-bold text-preventify-blue">x 12 months</p>
                        <p className="text-sm text-preventify-gray">₹2,820 saved/year</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Savings Tables */}
          <div className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Service-wise Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <SavingsTable data={firstHalf} />
                      <SavingsTable data={secondHalf} offset={firstHalf.length} />
                  </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavingsPage;

    

    

    
