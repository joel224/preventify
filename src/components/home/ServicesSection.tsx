
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";
import VideoBookingDialog from "@/components/VideoBookingDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { indiaCentenariansLongevityPost } from "@/data/blog/india-centenarians-longevity";


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
        <Card className="rounded-lg border bg-card text-card-foreground flex flex-col items-center text-center shadow-lg transition-all duration-200 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] p-6 font-['HELN.TTF']">
            <CardHeader className="items-center">
                {icon}
                <h3 className="text-2xl font-semibold leading-none tracking-tight mt-4">{title}</h3>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow items-center">
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
                <div className="w-full mt-auto">{button}</div>
            </CardContent>
        </Card>
    );

    if (link) {
        return <a href={link} className="h-full"><div className="h-full">{content}</div></a>;
    }
    
    return <div className="h-full">{content}</div>;
};


const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    return (
        <div className="group relative block h-80 overflow-hidden rounded-xl">
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
                    <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
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
                <Link href={service.link} className="flex items-center font-semibold">
                    Read More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};


const ServicesSection = () => {
  const blogPost = indiaCentenariansLongevityPost;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
             <ActionCard
                icon={<Phone className="h-8 w-8 text-red-500" />}
                title="Emergency"
                description="Urgent issue? Tap to call."
                color="red"
                link="tel:+918129334858"
                button={<Button className="bg-red-500 hover:bg-red-600 text-white w-full">Call Now</Button>}
            />
            <ActionCard
                icon={<Calendar className="h-8 w-8 text-primary" />}
                title="Book Appointment"
                description="Schedule your visit easily."
                color="orange"
                button={
                    <BookingDialog>
                        <Button className="bg-primary hover:bg-primary/90 text-white w-full">Book Now</Button>
                    </BookingDialog>
                }
            />
             <ActionCard
                icon={<Video className="h-8 w-8 text-primary" />}
                title="Virtual Consultation"
                description="Meet our doctors online."
                color="orange"
                button={
                    <VideoBookingDialog>
                        <Button variant="outline" className="w-full">Start Video Call</Button>
                    </VideoBookingDialog>
                }
            />
        </div>

        <div className="w-full border-t border-gray-200 my-20"></div>

        <Carousel className="w-full relative" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
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
            </CarouselItem>
            <CarouselItem>
                <div className="grid grid-cols-1 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-preventify-blue">
                            From Our Blog
                        </h2>
                        <h3 className="text-2xl font-semibold text-preventify-dark-blue mb-4">{blogPost.title}</h3>
                        <div className="text-preventify-dark-gray mb-6 prose lg:prose-lg max-w-none">
                          <p>
                          Meet Kerala's centenarians—those who've witnessed India's independence, survived global upheavals, and thrived into their tenth decade. They're not just survivors; they're living proof of longevity's secrets.

New research reveals their wisdom: living long and well doesn't require expensive solutions. It's built on simple, everyday habits anyone can adopt. Their lives hold timeless lessons for all of us.
                          </p>
                          <p>
                              When researchers studied centenarians across India, they found something remarkable: most of these 100-year-olds were actually in good health. Meet Kerala's 100-year-olds. They've seen decades of success, yet their secret to long life isn't magic pills or expensive treatments. New research shows their longevity comes from simple daily habits anyone can follow. Real wisdom from real lives.
                          </p>
                        </div>
                        <Link href={`/blog/${blogPost.slug}`}>
                            <Button variant="link" className="p-0 h-auto text-base">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </Link>
                    </div>
                </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md border z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md border z-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default ServicesSection;
