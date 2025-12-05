'use client';

import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, Video, LogIn } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";


const services = [
  {
    title: "Primary Care",
    description: "Comprehensive healthcare services for individuals and families, focusing on long-term health and wellness.",
    image: "/service/Primary Care.webp",
    link: "/services#primary-care"
  },
  {
    title: "Diabetes Management",
    description: "AI-driven specialized programs for the prevention, monitoring, and management of diabetes.",
    image: "/service/Diabetes Management.webp",
    link: "/services#diabetes"
  },
  
  {
    title: "Pediatric Care",
    description: "Specialized, compassionate healthcare services tailored for infants, children, and adolescents.",
    image: "/service/Pediatric Care.webp",
    link: "/services#pediatrics"
  },
  {
    title: "Women's Health",
    description: "Comprehensive care addressing women's unique health needs at every stage of life.",
    image: "/service/Women's Health.webp",
    link: "/services#womens-health"
  },
  {
    title: "Preventive Screenings",
    description: "Advanced early detection tests to identify potential health issues before they become serious.",
    image: "/service/Preventive Screenings.webp",
    link: "/services#preventive"
  },
];

const ActionCard = ({ icon, title, description, button, color, link }: { icon: React.ReactNode, title: string, description: string, button: React.ReactNode, color: 'red' | 'orange' | 'outline', link?: string }) => {
    const content = (
        <Card className="text-center p-6 aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-shadow">
            <div className={`mb-3 ${color === 'red' ? 'text-red-500' : 'text-orange-500'}`}>{icon}</div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-gray-500 mb-4 text-sm">{description}</p>
            {button}
        </Card>
    );

    if (link) {
        return <a href={link}>{content}</a>;
    }
    
    return content;
};


const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    return (
        <Link href={service.link} className="group relative block h-80 overflow-hidden rounded-xl">
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
                <div className="relative z-10 w-2/3">
                    <h3 className="text-2xl font-bold text-preventify-blue mb-4">
                        {service.title}
                    </h3>
                </div>
                 <div className="absolute w-full h-full right-0 bottom-0">
                    <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-contain object-right-bottom grayscale group-hover:grayscale-0 transition-all duration-300"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
             <ActionCard
                icon={<Phone className="h-7 w-7" />}
                title="Emergency"
                description="Urgent issue? Tap to call."
                color="red"
                link="tel:+918129334858"
                button={<Button className="bg-red-500 hover:bg-red-600 text-white w-full">Call Now</Button>}
            />
             <BookingDialog>
                 <ActionCard
                    icon={<Calendar className="h-7 w-7" />}
                    title="Book Appointment"
                    description="Schedule your visit easily."
                    color="orange"
                    button={<Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">Book Now</Button>}
                />
            </BookingDialog>
             <BookingDialog>
                <ActionCard
                    icon={<Video className="h-7 w-7" />}
                    title="Virtual Consultation"
                    description="Meet our doctors online."
                    color="orange"
                    button={<Button variant="outline" className="w-full">Start Video Call</Button>}
                />
            </BookingDialog>
            <BookingDialog>
                <ActionCard
                    icon={<LogIn className="h-7 w-7" />}
                    title="Patient Login"
                    description="Access records & payments."
                    color="orange"
                    button={<Button variant="outline" className="w-full">Login</Button>}
                />
            </BookingDialog>
        </div>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-preventify-blue">
            Our Healthcare Services
          </h2>
          <p className="text-lg md:text-xl text-preventify-dark-gray max-w-3xl mx-auto">
            
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
