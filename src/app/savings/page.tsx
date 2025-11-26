
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
import { Wallet, Stethoscope, Pill, ChevronDown, CheckCircle, Hospital, UserMd, ClipboardList, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
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


const SavingsPage = () => {
    const doctors = [
        { department: 'General (ജനറൽ വിഭാഗം)', name: 'ഡോ.രാകേഷ് കെ.ആർ (Dr. Rakesh K.R.)', details: 'MBBS, MD, Chief Care Coordinator' },
        { department: 'General (ജനറൽ വിഭാഗം)', name: 'ഡോ.മഷൂദ ബാനു പി പി (Dr. Mashooda Banu P P)', details: 'MBBS, DFAM (NBE), Family Physician' },
        { department: 'General (ജനറൽ വിഭാഗം)', name: 'ഡോ. മിമിതാ എ എം (Dr. Mimitha A M)', details: 'MBBS, MD, Consultant Physician' },
        { department: 'Paediatrics (ശിശു രോഗ വിഭാഗം)', name: 'ഡോ. മുഹമ്മദ് ഫൈസൽ ഒ.എസ് (Dr. Muhammed Faisal O.S.)', details: 'MBBS, Resident Medical Officer' },
        { department: 'Paediatrics (ശിശു രോഗ വിഭാഗം)', name: 'ഡോ.ഹഫ്സ ഹുസൈൻ (Dr. Hafsa Husain)', details: 'MBBS, DNB, PEDIATRICIAN' },
        { department: 'Dermatology (ത്വക്ക് രോഗ വിഭാഗം)', name: 'ഡോ.രേഷ്‌മ കെ.ആർ. (Dr. Reshma K.R.)', details: 'MBBS, Casualty Medical Officer' },
        { department: 'Dermatology (ത്വക്ക് രോഗ വിഭാഗം)', name: 'ഡോ. ഗിരീഷ് .യു (Dr. Gireesh U.)', details: 'MBBS, MD, DVL, DERMATOLOGY' },
        { department: 'Pulmonology (ശ്വാസകോശരോഗ വിഭാഗം)', name: 'ഡോ. കൃഷ്ണന്ദു യു.കെ (Dr. Krishnandu U.K.)', details: 'MBBS, Casualty Medical Officer' },
        { department: 'Pulmonology (ശ്വാസകോശരോഗ വിഭാഗം)', name: 'ഡോ. ശ്രീദേവ് നാരായണൻ (Dr. Sreedev Narayanan)', details: 'MBBS, DNB, PULMONOLOGIST' },
        { department: 'Pulmonology (ശ്വാസകോശരോഗ വിഭാഗം)', name: 'ഡോ. ഇജാസ് വി.ഐ (Dr. Ejas V.I.)', details: 'MBBS, MD, PULMONOLOGIST' },
        { department: 'Gynaecology (സ്ത്രീരോഗ വിഭാഗം)', name: 'ഡോ. അജയ് ബിജു (Dr. Ajay Biju)', details: 'MBBS, Casualty Medical Officer' },
        { department: 'Gynaecology (സ്ത്രീരോഗ വിഭാഗം)', name: 'ഡോ. ഹുസ്ന .വി (Dr. Husna V.)', details: 'MBBS, DGO, DNB, GYNAECOLOGIST' },
        { department: 'Orthopaedics (എല്ല് രോഗ വിഭാഗം)', name: 'ഡോ. കെ വൈ സഞ്ജയ് (Dr. K Y Sanjay)', details: 'MBBS, D.ortho, FIJR, JOINT REPLACEMENT SURGEON' },
        { department: 'Orthopaedics (എല്ല് രോഗ വിഭാഗം)', name: 'ഡോ. രഞ്ജിത്ത്. എ (Dr. Renjith A.)', details: 'MBBS, MS, ORTHOPEADICS' },
        { department: 'Other Departments', name: 'അഞ്ജന എൻ.എസ്. (Anjana N.S.)', details: 'DIETITIAN' },
        { department: 'Other Departments', name: 'ഡോ.കിസ്മ ടി.എം (Dr. Kisma T.M.)', details: 'PHYSIOTHERAPIST' },
    ];

    const departments = [
        "General (ജനറൽ വിഭാഗം)",
        "Paediatrics (ശിശു രോഗ വിഭാഗം)",
        "Dermatology (ത്വക്ക് രോഗ വിഭാഗം)",
        "Pulmonology (ശ്വാസകോശരോഗ വിഭാഗം)",
        "Gynaecology (സ്ത്രീരോഗ വിഭാഗം)",
        "Orthopaedics (എല്ല് രോഗ വിഭാഗം)",
        "Dietitian (ഡയറ്റീഷ്യൻ)",
        "Physiotherapy (ഫിസിയോതെറാപ്പി)"
    ];

    const locations = [
        "Preventify Hospital (Dr.Rakesh's Preventify.me Hospital)",
        "Preventify Clinic",
        "Pee kay's Preventify Clinic"
    ];

    const groupedDoctors = doctors.reduce((acc, doctor) => {
        (acc[doctor.department] = acc[doctor.department] || []).push(doctor);
        return acc;
    }, {} as Record<string, typeof doctors>);

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
                            src="/cardX1.webp"
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
          
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">One Fixed Fee. Zero Sick Bills.</h2>
            <p className="text-preventify-gray max-w-3xl mx-auto">Choose your plan and get peace of mind for a full year. Visit any Preventify hospital to subscribe.</p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* INDIVIDUAL PLAN */}
            <Card className="flex flex-col border-preventify-green border-2">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-preventify-dark-blue">Stop Paying for Sick Visits.<br />Start Paying for Peace.</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                    <p className="text-preventify-dark-gray">The Individual Sukham Card gives you Unlimited access to our General Physicians and Paediatricians for a full year.</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <HeartHandshake className="h-5 w-5 text-preventify-green shrink-0 mt-1" />
                            <div><strong className="text-preventify-dark-blue">The Relief:</strong> Never worry about a consultation bill again. Just walk in.</div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Wallet className="h-5 w-5 text-preventify-green shrink-0 mt-1" />
                            <div><strong className="text-preventify-dark-blue">The Value:</strong> For less than ₹2 per day, your care is covered.</div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-preventify-green shrink-0 mt-1" />
                            <div><strong className="text-preventify-dark-blue">The Simplicity:</strong> The card pays for itself in just 2 standard visits. After that, every visit is free.</div>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <div className="w-full text-center py-3 px-4 rounded-md bg-preventify-green text-white font-bold text-lg">
                        ₹730. Your Health, Secured for a Year.
                    </div>
                </CardFooter>
            </Card>

            {/* FAMILY PLAN */}
            <Card className="flex flex-col border-preventify-blue border-2">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-preventify-dark-blue">One Family. One Fee.<br />Unlimited Protection.</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                    <p className="text-preventify-dark-gray">Protect everyone you love with the Sukham Family Plan. Unlimited access for every family member to our General Physicians and Paediatricians for a full year.</p>
                     <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <HeartHandshake className="h-5 w-5 text-preventify-blue shrink-0 mt-1" />
                            <div><strong className="text-preventify-dark-blue">The Relief:</strong> Never hesitate to bring your child in—whether it's the first cough or the fifth follow-up. The bill is always ₹0.</div>
                        </li>
                        <li className="flex items-start gap-3">
                             <ShieldCheck className="h-5 w-5 text-preventify-blue shrink-0 mt-1" />
                            <div><strong className="text-preventify-dark-blue">The Security:</strong> Stop paying doctor fees every time someone is sick.</div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-preventify-blue shrink-0 mt-1" />
                            <div><strong className="text-preventify-dark-blue">The Simplicity:</strong> You cover the entire family for the year for the price of just 4 individual visits.</div>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <div className="w-full text-center py-3 px-4 rounded-md bg-preventify-blue text-white font-bold text-lg">
                        ₹1,999. Get Your Family's Peace of Mind.
                    </div>
                </CardFooter>
            </Card>

          </div>

        </div>
      </section>

      <section id="more-details" className="py-16 bg-preventify-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
                      Our Comprehensive Healthcare Ecosystem
                  </h2>
                  <p className="text-preventify-gray max-w-3xl mx-auto">
                      Beyond our subscription plans, we offer a wide range of specialized medical services and expert professionals.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Locations Card */}
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                              <Hospital className="h-5 w-5 text-preventify-green" />
                              Our Locations
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-3">
                              {locations.map((location, index) => (
                                  <li key={index} className="flex items-start">
                                      <CheckCircle className="h-4 w-4 text-preventify-green mr-2 mt-1 shrink-0" />
                                      <span>{location}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>

                  {/* Departments Card */}
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                              <ClipboardList className="h-5 w-5 text-preventify-green" />
                              Medical Departments
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-3">
                              {departments.map((dept, index) => (
                                  <li key={index} className="flex items-start">
                                      <CheckCircle className="h-4 w-4 text-preventify-green mr-2 mt-1 shrink-0" />
                                      <span>{dept}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
                  
                  {/* Bilingual Note Card */}
                  <Card>
                      <CardHeader>
                           <CardTitle className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-preventify-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-1-10-3.5 3.5" /><path d="M14 14S9 19 5 22" /></svg>
                              Bilingual Communication
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-preventify-dark-gray">We proudly serve our community in both English and Malayalam (പ്രിവെന്റിഫൈ), ensuring clear and comfortable communication for all our patients.</p>
                      </CardContent>
                  </Card>
              </div>

              {/* Doctors Section */}
              <div className="mt-16">
                  <div className="text-center mb-8">
                       <h3 className="text-2xl font-bold text-preventify-blue">Meet Our Medical Team</h3>
                  </div>
                  <div className="space-y-8">
                      {Object.entries(groupedDoctors).map(([department, doctorsInDept]) => (
                          <Card key={department}>
                              <CardHeader>
                                  <CardTitle className="text-xl">{department}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                      {doctorsInDept.map((doctor, index) => (
                                          <div key={index} className="p-3 rounded-md bg-white border">
                                              <p className="font-semibold text-preventify-dark-blue">{doctor.name}</p>
                                              <p className="text-sm text-preventify-gray">{doctor.details}</p>
                                          </div>
                                      ))}
                                  </div>
                              </CardContent>
                          </Card>
                      ))}
                  </div>
              </div>
          </div>
      </section>
    </>
  );
};

export default SavingsPage;

    

    



    