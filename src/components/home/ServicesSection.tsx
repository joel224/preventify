
'use client';
import { Card, CardContent } from "@/components/ui/card";
import FadeInWhenVisible from "../FadeInWhenVisible";

const services = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
    title: "Primary Care",
    description: "Comprehensive healthcare services for individuals and families.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2755/2755513.png",
    title: "Diabetes Management",
    description: "Specialized programs for prevention and management of diabetes.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2382/2382461.png",
    title: "Lifestyle Medicine",
    description: "Evidence-based approach to treating and preventing chronic diseases.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4441/4441353.png",
    title: "Pediatric Care",
    description: "Specialized healthcare services for infants, children, and adolescents.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3588/3588693.png",
    title: "Women's Health",
    description: "Comprehensive care addressing women's unique health needs.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2491/2491749.png",
    title: "Preventive Screenings",
    description: "Early detection tests to identify potential health issues.",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            Our Healthcare Services
          </h2>
          <p className="text-preventify-gray max-w-3xl mx-auto">
            Preventify offers a comprehensive range of healthcare services designed to keep you healthy and address your medical needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeInWhenVisible key={index}>
              <Card className="h-full hover:shadow-lg transition-shadow">
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
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
