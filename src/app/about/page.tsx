
'use client';

import PageHeader from "@/components/PageHeader";
import { Award, HeartHandshake, Microscope, Target, Users, Gem } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <PageHeader
        title="About Preventify"
        subtitle="Leading the way in evidence-based healthcare across Kerala"
        backgroundClass="bg-striped-glass"
      />

      {/* Vision and Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-preventify-blue">Our Guiding Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Vision */}
              <div className="md:pr-8 md:border-r md:border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-preventify-blue/10 p-3 rounded-full">
                    <Target className="w-7 h-7 text-preventify-blue" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-preventify-dark-blue">
                    Our Vision
                  </h3>
                </div>
                <p className="text-preventify-dark-gray text-lg">
                  To create a patient-centered, outcome-driven, cost-effective, scientifically updated healthcare ecosystem across suburban and semi-urban India, where trust is rebuilt into primary and preventive care.
                </p>
              </div>

              {/* Mission */}
              <div className="md:pl-8">
                 <div className="flex items-center gap-4 mb-4">
                  <div className="bg-preventify-purple/10 p-3 rounded-full">
                    <HeartHandshake className="w-7 h-7 text-preventify-purple" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-preventify-dark-blue">
                    Our Mission
                  </h3>
                </div>
                <p className="text-preventify-dark-gray text-lg">
                  Preventify is committed to delivering comprehensive healthcare services that combine modern medical practices with preventive approaches, empowering individuals to take control of their health and live fuller lives.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-preventify-blue/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
            <p className="text-[20vw] md:text-[15vw] font-bold text-preventify-blue/10 select-none animate-pulse">
                Preventify
            </p>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-preventify-blue">Our Story</h2>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border">
              <p className="text-preventify-dark-gray mb-4">
                Preventify was founded in 2024 by Dr. Rakesh who recognized a critical gap in Kerala's healthcare system. While the state had a robust medical infrastructure, there was a need for healthcare services that focused more on prevention rather than just treatment.
              </p>
              <p className="text-preventify-dark-gray mb-4">
                Starting with a single clinic in Padinjarangadi, Palakkad District of Kerala, Preventify introduced a new healthcare model that emphasized preventive care, regular screenings, and lifestyle modifications. Our approach resonated with patients, leading to improved health outcomes and reduced healthcare costs.
              </p>
              <p className="text-preventify-dark-gray">
                Our journey is driven by our passion for improving public health in Kerala and our vision of creating healthier communities through accessible, high-quality healthcare services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-preventify-blue">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Microscope className="w-8 h-8 text-preventify-green" />,
                title: "Evidence-Based Medicine",
                description: "We ground all our medical practices in scientific research and established clinical guidelines.",
              },
              {
                icon: <Users className="w-8 h-8 text-preventify-green" />,
                title: "Patient-Centered Care",
                description: "Our patients are at the heart of everything we do, with care tailored to individual needs.",
              },
              {
                icon: <Award className="w-8 h-8 text-preventify-green" />,
                title: "Prevention First",
                description: "We prioritize preventive measures to avoid disease rather than just treating symptoms.",
              },
              {
                icon: <Gem className="w-8 h-8 text-preventify-green" />,
                title: "Continuous Innovation",
                description: "We constantly seek to improve our services through new medical knowledge and technologies.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-preventify-light-gray p-6 rounded-lg shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start gap-4">
                    <div className="bg-preventify-green/10 p-3 rounded-full">
                        {value.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1 text-preventify-dark-blue">
                        {value.title}
                        </h3>
                        <p className="text-preventify-dark-gray">{value.description}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-preventify-blue">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {[
              {
                name: "Nirmal N R",
                role: "Co-Founder",
                image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748253061/850_3463_pp_1_ifukny.jpg",
                bio: "Nirmal brings in two decades of operating experiences across startups like OYO and Zoomcar and has served as the CEO for Zoomcar India and 3W business of Greaves Electric.",
              },
              {
                name: "Dr. Rakesh K R",
                role: "Co-Founder",
                image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_2_pms2pf.jpg",
                bio: "Dr.Rakesh brings decades of experience in primary and preventive care and is a physician who brings Technology to his practice",
              },
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                <div className="relative w-full h-80">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-preventify-dark-blue">{leader.name}</h3>
                  <p className="text-preventify-purple mb-3 font-medium">{leader.role}</p>
                  <p className="text-preventify-dark-gray text-sm">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
