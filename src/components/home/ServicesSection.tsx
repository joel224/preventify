'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Primary Care",
    description: "Comprehensive healthcare services for individuals and families, focusing on long-term health and wellness.",
    image: "/service/family-care.webp",
    link: "/services#primary-care"
  },
  {
    title: "Diabetes Management",
    description: "AI-driven specialized programs for the prevention, monitoring, and management of diabetes.",
    image: "/service/diabetes.webp",
    link: "/services#diabetes"
  },
  
  {
    title: "Pediatric Care",
    description: "Specialized, compassionate healthcare services tailored for infants, children, and adolescents.",
    image: "/service/pediatrics.webp",
    link: "/services#pediatrics"
  },
  {
    title: "Women's Health",
    description: "Comprehensive care addressing women's unique health needs at every stage of life.",
    image: "/service/womens-health.webp",
    link: "/services#womens-health"
  },
  {
    title: "Preventive Screenings",
    description: "Advanced early detection tests to identify potential health issues before they become serious.",
    image: "/service/preventive.webp",
    link: "/services#preventive"
  },
];

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    return (
        <Link href={service.link} className="group relative block h-64 md:h-80 overflow-hidden rounded-xl">
            {/* Background pattern and gradient */}
            <div
                className="absolute inset-0 bg-preventify-light-gray bg-opacity-50"
                style={{
                    backgroundImage: 'url("/service/bg-pattern.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Content: Default State */}
            <div className="relative z-10 flex flex-col justify-end items-start h-full p-6 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                <div className="w-2/3">
                    <h3 className="text-2xl font-bold text-preventify-blue mb-4">
                        {service.title}
                    </h3>
                </div>
                 <div className="absolute -right-4 -bottom-4 w-1/2 h-1/2">
                    <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-contain object-right-bottom"
                    />
                </div>
            </div>

            {/* Content: Hover State */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start h-full p-6 bg-preventify-blue bg-opacity-95 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-base mb-6 text-gray-200">
                    {service.description}
                </p>
                <div className="flex items-center font-semibold">
                    Read More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};


const ServicesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-blue">
            Our Healthcare Services
          </h2>
          <p className="text-lg md:text-xl text-preventify-dark-gray max-w-3xl mx-auto">
            Preventify offers a comprehensive range of healthcare services designed to keep you healthy and address your medical needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
