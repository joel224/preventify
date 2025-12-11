import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BookingDialog from "@/components/BookingDialog";

const PreventiveLifestyleSectionMobile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const getProcessedNames = () => {
    if (!name.trim()) return { firstName: "", lastName: "" };
    const nameParts = name.trim().split(" ");
    const firstName = nameParts.shift() || "";
    const lastName = nameParts.join(" ") || "";
    return { firstName, lastName };
  };

  const getSanitizedPhone = () => {
    if (!phone.trim()) return "";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.startsWith("91") && digitsOnly.length === 12) {
      return digitsOnly.slice(2);
    }
    if (digitsOnly.startsWith("0") && digitsOnly.length === 11) {
      return digitsOnly.slice(1);
    }
    return digitsOnly.slice(-10);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#f0f7ff] to-white pt-16 pb-10 px-4">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
      
      <div className="max-w-md mx-auto relative">
        {/* Floating Card with Subtle Shadow */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100 relative overflow-hidden">
          {/* Decorative Header */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-teal-400"></div>
          
          {/* Title */}
          <h2 className="font-bold text-2xl text-center text-gray-800 mb-2 relative z-10">
            AI Assisted <span className="text-[#004c9e]">Healthcare</span>
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6 relative z-10">
            For a preventive lifestyle
          </p>

          {/* Form Container */}
          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name-mobile" className="text-xs text-gray-500 uppercase tracking-wider">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name-mobile"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  name="name"
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#004c9e] focus:ring-1 focus:ring-[#004c9e] shadow-sm"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone-mobile" className="text-xs text-gray-500 uppercase tracking-wider">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone-mobile"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  name="tel"
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#004c9e] focus:ring-1 focus:ring-[#004c9e] shadow-sm"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
            </div>

            {/* Book Now Button */}
            <BookingDialog
              initialFirstName={getProcessedNames().firstName}
              initialPhone={getSanitizedPhone()}
            >
              <Button 
                type="button" 
                className="w-full h-12 bg-gradient-to-r from-[#004c9e] to-[#3370b1] hover:from-[#3370b1] hover:to-[#004c9e] text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] mt-2"
              >
                Book Consultation
              </Button>
            </BookingDialog>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Why Choose Preventive Care?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#004c9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-600 text-sm">Simple technology solutions that make daily life easier</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#004c9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-600 text-sm">Personalized health recommendations</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#004c9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-600 text-sm">Policies that value the contributions of our oldest citizens & AI-powered health insights</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#004c9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-600 text-sm"> Researchs on healthy aging specific to Kerala lifestyles</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          By submitting your contact details, you agree to receive automated SMS/MMS messages from Preventify. Message & data rates may apply.
        </p>
      </div>
    </section>
  );
};

export default PreventiveLifestyleSectionMobile;