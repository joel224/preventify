
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
import { Wallet, Stethoscope, Pill, ChevronDown, CheckCircle, Hospital, UserMd, ClipboardList, ShieldCheck, HeartHandshake, Sparkles, Smile, Shield, Users, Lock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


const MagneticButton = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const button = buttonRef.current;
        const hero = heroRef.current;
        if (!button || !hero) return;

        const heroRect = hero.getBoundingClientRect();
        
        // Calculate position relative to the hero container
        const x = e.clientX - heroRect.left;
        const y = e.clientY - heroRect.top;

        const strength = 1.0; // Increased strength for direct follow
        
        // Use top/left for positioning instead of transform for smoother movement within the container
        button.style.left = `${x * strength}px`;
        button.style.top = `${y * strength}px`;
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        if (!button) return;
        // Reset to a default position (e.g., center) or hide it
        button.style.left = '50%';
        button.style.top = '85%';
        button.style.transform = 'translate(-50%, -50%)';
    };

    return (
        <div
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 z-10" // Container now covers the whole hero section
        >
            <a 
                href="#savings-details" 
                ref={buttonRef} 
                className="absolute transition-all duration-75 ease-out"
                style={{ top: '85%', left: '50%', transform: 'translate(-50%, -50%)' }} // Initial centered position
            >
                <Button variant="outline" size="icon" className="rounded-full animate-bounce w-14 h-14 bg-white/50 backdrop-blur-sm">
                    <ChevronDown className="h-6 w-6" />
                    <span className="sr-only">Scroll to details</span>
                </Button>
            </a>
        </div>
    );
};


const SavingsPage = () => {
    const [language, setLanguage] = useState('ml');

    const content = {
        en: {
            strategy: 'The Annual Care Shield',
            planTitle: 'Sugam Card',
            catchphrase: 'One  Annual  Fee. Your  Visits  Are  Covered.',
            individual: {
                headline: 'Stop Paying for Sick Visits. Start Paying for Peace.',
                body: 'The Individual Sukham Card gives you Unlimited access to our General Physicians and Paediatricians for a full year.',
                relief: { title: 'The Relief', text: 'Never worry about a consultation bill again. Just walk in.' },
                value: { title: 'The Value', text: 'For less than ₹20 per day, your care is covered.' },
                simplicity: { title: 'The Simplicity', text: 'The card pays for itself in just 2 standard visits. After that, every visit is free.' },
                cta: '₹730. Your Health, Secured for a Year.'
            },
            family: {
                headline: 'One Family. One Fee. Unlimited Protection.',
                body: 'Protect everyone you love with the Sukham Family Plan. Unlimited access for every family member to our General Physicians and Paediatricians for a full year.',
                relief: { title: 'The Relief', text: 'Never hesitate to bring your child in—whether it\'s the first cough or the fifth follow-up. The bill is always ₹0.' },
                security: { title: 'The Security', text: 'Enjoy Predictable Costs:  Your doctor visits are pre-paid.' },
                simplicity: { title: 'The Simplicity', text: 'You cover the entire family for the year for the price of just 4 individual visits.' },
                cta: '₹1,999. Get Your Family\'s Peace of Mind.'
            }
        },
        ml: {
            strategy: 'പുതിയ മാർക്കറ്റിംഗ് സ്ട്രാറ്റജി',
            planTitle: 'The Peace of Mind Plan',
            catchphrase: 'ഒറ്റ തവണ ഫീസ്. പിന്നെ ഫ്രീ!',
            individual: {
                headline: 'മടിക്കാതെ ഡോക്ടറെ കാണാം!',
                body: 'നിങ്ങളുടെ കൺസൾട്ടേഷൻ ഫീസ് ഇനി ഞങ്ങളേറ്റു. വെറും ₹730 രൂപയ്ക്ക്, ജനറൽ ഡോക്ടർമാരെയും പീഡിയാട്രീഷ്യനെയും ഒരു വർഷത്തേക്ക് എത്ര തവണ വേണമെങ്കിലും കാണാം, ഫീസ് ഇല്ലാതെ!',
                relief: { title: 'ആശ്വാസം', text: 'ചെറിയ അസുഖങ്ങൾക്ക് ഇനി ബില്ലെത്ര വരുമെന്ന് ആലോചിച്ച് ടെൻഷൻ അടിക്കണ്ട.' },
                value: { title: 'വാല്യൂ', text: 'നിങ്ങൾ സാധാരണ കൊടുക്കുന്ന 2 കൺസൾട്ടേഷൻ ഫീസിൽ, ഒരു വർഷം മുഴുവൻ ചികിത്സ സൗജന്യം!' },
                cta: '₹730. നിങ്ങളുടെ ആരോഗ്യം, ഈ വർഷം ഫുൾ സുരക്ഷിതം.'
            },
            family: {
                headline: 'ഒന്നാണ് കുടുംബം. ഒരൊറ്റ ഫീസ്. പരിധിയില്ലാത്ത സംരക്ഷണം.',
                body: 'സുഖം ഫാമിലി പ്ലാൻ എടുത്താൽ, ₹1,999 രൂപയ്ക്ക് വീട്ടിലെ എല്ലാവർക്കും ഒരു വർഷത്തേക്ക് ജനറൽ ഡോക്ടർമാരുടെയും പീഡിയാട്രീഷ്യന്റെയും പരിധിയില്ലാത്ത സേവനം ഉറപ്പാണ്!',
                relief: { title: 'ആശ്വാസം', text: 'കുഞ്ഞിന് ചെറിയൊരു പനിയോ ജലദോഷമോ വന്നാൽ ഇനി രണ്ടാമതൊന്ന് ആലോചിക്കാതെ ഡോക്ടറെ കാണിക്കാം.' },
                security: { title: 'സുരക്ഷ', text: 'നിങ്ങൾ സാധാരണ കൊടുക്കുന്ന 4 കൺസൾട്ടേഷൻ ഫീസിന്റെ വിലയ്ക്ക്, ഒരു വർഷം മുഴുവൻ കുടുംബം സേഫ്!' },
                cta: '₹1,999. സുഖമായിട്ട് ജീവിക്കാം.'
            }
        }
    };
    
    const currentContent = content[language as keyof typeof content];
    const individualContent = currentContent.individual;
    const familyContent = currentContent.family;

    const doctors = [
        { department: 'General (ജനറൽ വിഭാഗം)', name: 'ഡോ.രാകേഷ് കെ.ആർ (Dr. Rakesh K.R.)', details: 'MBBS, MD, Chief Care Coordinator' },
        { department: 'General (ജനറൽ വിഭാഗം)', name: 'ഡോ.മഷൂദ ബാനു പി പി (Dr. Mashooda Banu P P)', details: 'MBBS, DFAM (NBE), Family Physician' },
        { department: 'General (ജനറൽ വിഭാഗം)', name: 'ഡോ. മിമിതാ എ എം (Dr. Mimitha A M)', details: 'MBBS, MD, Consultant Physician' },
        { department: 'Paediatrics (ശിശു രോഗ വിഭാഗം)', name: 'ഡോ. മുഹമ്മദ് ఫൈസൽ ഒ.എസ് (Dr. Muhammed Faisal O.S.)', details: 'MBBS, Resident Medical Officer' },
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
       <div className="bg-preventify-blue/10 py-12 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left z-20">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-preventify-blue">
                           Your 365-Day Health Passport
                        </h1>
                        <p className="mt-4 text-lg max-w-xl text-preventify-dark-gray">
                            Predictable Health. Unpredictable Savings. Explore the detailed benefits of our membership.
                        </p>
                    </div>
                    <div className="relative aspect-[3/3] rounded-lg overflow-hidden z-0">
                        <Image
                            src="/cardX1.webp"
                            alt="One Health Member Card"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
            <MagneticButton />
        </div>

        <section id="savings-details" className="relative py-16 md:py-24 bg-peace-of-mind-gray overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
              <p className="text-sm uppercase tracking-widest text-peace-of-mind-gray mb-2">{currentContent.strategy}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-peace-of-mind-green-dark mb-3">{currentContent.planTitle}</h2>
              <p className="text-lg md:text-xl font-semibold uppercase tracking-wider text-peace-of-mind-dark-gray">{currentContent.catchphrase}</p>
          </div>

          <div className="flex justify-start space-x-2 mb-12">
            <Button
                onClick={() => setLanguage('ml')}
                variant={language === 'ml' ? 'default' : 'outline'}
                className="font-bold"
            >
                മലയാളം
            </Button>
            <Button
                onClick={() => setLanguage('en')}
                variant={language === 'en' ? 'default' : 'outline'}
            >
                English
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Individual Plan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="p-8">
                      <div className="flex justify-start mb-6">
                          <div className="w-16 h-16 bg-peace-of-mind-green/10 rounded-full flex items-center justify-center border-2 border-peace-of-mind-green">
                              <Shield className="h-8 w-8 text-peace-of-mind-green-dark" />
                          </div>
                      </div>
                      <h3 className="text-2xl font-bold text-peace-of-mind-green-dark mb-2">{individualContent.headline}</h3>
                      <p className="text-peace-of-mind-dark-gray mb-6">{individualContent.body}</p>
                      <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                              <Smile className="h-5 w-5 text-peace-of-mind-green-dark mt-0.5"/>
                              <div><strong className="font-semibold text-gray-800">{individualContent.relief.title}:</strong> {individualContent.relief.text}</div>
                          </li>
                          <li className="flex items-start gap-3">
                              <Wallet className="h-5 w-5 text-peace-of-mind-green-dark mt-0.5"/>
                              <div><strong className="font-semibold text-gray-800">{individualContent.value.title}:</strong> {individualContent.value.text}</div>
                          </li>
                         
                      </ul>
                  </div>
                  <div className="mt-auto bg-peace-of-mind-green text-white p-4 text-center">
                      <span className="font-bold text-lg">{individualContent.cta}</span>
                  </div>
              </div>

              {/* Family Plan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="p-8">
                      <div className="flex justify-start mb-6">
                           <div className="w-16 h-16 bg-preventify-blue/10 rounded-full flex items-center justify-center border-2 border-preventify-blue">
                              <Users className="h-8 w-8 text-preventify-dark-blue" />
                          </div>
                      </div>
                      <h3 className="text-2xl font-bold text-preventify-dark-blue mb-2">{familyContent.headline}</h3>
                      <p className="text-peace-of-mind-dark-gray mb-6">{familyContent.body}</p>
                      <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <HeartHandshake className="h-5 w-5 text-preventify-dark-blue mt-0.5"/>
                              <div><strong className="font-semibold text-gray-800">{familyContent.relief.title}:</strong> {familyContent.relief.text}</div>
                          </li>
                          <li className="flex items-start gap-3">
                              <Lock className="h-5 w-5 text-preventify-dark-blue mt-0.5"/>
                              <div><strong className="font-semibold text-gray-800">{familyContent.security.title}:</strong> {familyContent.security.text}</div>
                          </li>
                          
                      </ul>
                  </div>
                  <div className="mt-auto bg-preventify-blue text-white p-4 text-center">
                      <span className="font-bold text-lg">{familyContent.cta}</span>
                  </div>
              </div>
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
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-preventify-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="m22 22-1-10-3.5 3.5" /><path d="M14 14S9 19 5 22" /></svg>
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

    

    

    
