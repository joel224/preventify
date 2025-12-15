
'use client';

import { useState } from 'react';
import { Info, Users, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const features = [
  {
    icon: <Info className="h-8 w-8 text-preventify-blue" />,
    title: "Evidence-Based Care",
    description: "We blend today's best medical science with time-tested wisdom. Every treatment follows proven research, carefully chosen for Kerala families. Our doctors combine modern knowledge with thoughtful care—because healing works best when science and understanding walk together.",
  },
  {
    icon: <Users className="h-8 w-8 text-preventify-blue" />,
    title: "Expert Physicians",
    description: "Our doctors bring years of hands-on experience and deep knowledge. They use proven treatments backed by solid research, not just trends. Each specialist listens carefully, combines modern science with time-tested wisdom, and creates care plans that truly work for Kerala families. Real expertise, real results.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-preventify-blue" />,
    title: "Annual Memberships",
    description: "One payment covers all your doctor visits for a whole year. No surprise bills when you walk in. Individual plan costs less than ₹20 a day. Family plan protects everyone you love for just ₹1,999/y. You pay once, we care all year. Simple, predictable, and truly yours.",
  },
];

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncateLength = 150;
    const isTruncated = feature.description.length > truncateLength;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
          <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
            <div className="bg-preventify-blue/10 p-3 rounded-full">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1 text-preventify-dark-blue">{feature.title}</h3>
              <p className="text-preventify-dark-gray">
                {isExpanded || !isTruncated ? feature.description : `${feature.description.substring(0, truncateLength)}...`}
              </p>
            </div>
          </div>
          {isTruncated && (
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-preventify-blue font-semibold mt-4 ml-auto flex items-center gap-1 text-sm self-end"
            >
                {isExpanded ? "Read Less" : "Read More"}
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
    );
};


const FeaturesSection = () => {
  return (
    <section className="bg-preventify-light-gray py-16 relative overflow-hidden">
       <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-100/50 -z-0"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            Why Choose Preventify
          </h2>
          <p className="text-preventify-gray max-w-3xl mx-auto">
            Our approach to healthcare combines modern medicine with preventive strategies for optimal health outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
