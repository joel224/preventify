
'use client';
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
    title: "Primary Care",
    description: "Comprehensive healthcare services for individuals and families.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/9354/9354551.png",
    title: "Diabetes Management",
    description: "AI Specialized programs for prevention and management of diabetes.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2382/2382461.png",
    title: "Lifestyle Medicine",
    description: "Evidence-based approach to treating and preventing chronic diseases.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/17774/17774825.png",
    title: "Pediatric Care",
    description: "Specialized healthcare services for infants, children, and adolescents.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/8657/8657426.png",
    title: "Women's Health",
    description: "Comprehensive care addressing women's unique health needs.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4087/4087640.png",
    title: "Preventive Screenings",
    description: "Early detection tests to identify potential health issues.",
  },
];

const ServicesSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const primaryCareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTransform = () => {
    if (primaryCareRef.current) {
      const rect = primaryCareRef.current.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const start = elementTop - window.innerHeight;
      const end = elementTop + rect.height;

      if (scrollY > start && scrollY < end) {
        const progress = (scrollY - start) / (end - start);
        // Start from -100px and move to 0px. The multiplier makes it slow.
        const translation = -100 + progress * 100 * 0.5;
        return `translateX(${Math.min(translation, 0)}px)`;
      }
    }
    return 'translateX(-50px)';
  };
  
  return (
    <section className="bg-white py-16 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            Our Healthcare Services
          </h2>
          <p className="text-preventify-gray max-w-3xl mx-auto">
            Preventify offers a comprehensive range of healthcare services designed to keep you healthy and address your medical needs.
          </p>
        </div>
        <div className="animate-fade-in">
          {/* Mobile View: Horizontal Scroll */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mb-4 touch-pan-x">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow w-64 flex-shrink-0">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-preventify-blue">{service.title}</h3>
                    <p className="text-preventify-dark-gray text-sm">{service.description}</p>
                  </CardContent>
                </Card>
            ))}
          </div>

          {/* Desktop View: Custom Grid */}
          <div className="hidden md:flex flex-col gap-8">
            {/* First Card in its own row, with video */}
            <div 
              ref={primaryCareRef}
              style={{ transform: getTransform() }}
              className="transition-transform duration-300 ease-out"
            >
                <Card className="h-full border-transparent">
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="text-center">
                        <img
                          src={services[0].icon}
                          alt={services[0].title}
                          className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-preventify-blue">{services[0].title}</h3>
                        <p className="text-preventify-dark-gray">{services[0].description}</p>
                      </div>
                      <div className="relative">
                        <iframe src="https://player.mux.com/022nTfgg1XsP0100V5mVYunDNi3crJuQuN00P2KFqn49B00Y?loop=true&autoplay=muted&controls=false" style={{width: '100%', border: 'none', aspectRatio: '16/9', borderRadius: '0.5rem'}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"></iframe>
                      </div>
                    </CardContent>
                  </Card>
            </div>
             {/* Second Card in its own row */}
             <div className="grid grid-cols-1">
                 <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <img
                        src={services[1].icon}
                        alt={services[1].title}
                        className="w-16 h-16 mx-auto mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2 text-preventify-blue">{services[1].title}</h3>
                      <p className="text-preventify-dark-gray">{services[1].description}</p>
                    </CardContent>
                  </Card>
            </div>

            {/* Remaining 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {services.slice(2).map((service, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-16 h-16 mx-auto mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2 text-preventify-blue">{service.title}</h3>
                      <p className="text-preventify-dark-gray">{service.description}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
