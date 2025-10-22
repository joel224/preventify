
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WhatsAppBooking from "../WhatsAppBooking";

const HeroSection = () => {
  return (
    <section className="hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="mb-6">
              <img 
                src="https://res.cloudinary.com/dyf8umlda/image/upload/v1749710604/Preventify_Logo_new_f7vxej.png" 
                alt="Preventify Hospitals Logo" 
                className="h-16 md:h-20"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-preventify-dark-blue">
              AI assisted Modern Healthcare for a{" "}
              <span className="text-preventify-blue">
                Preventive Lifestyle
              </span>
            </h1>
            <p className="text-lg text-preventify-dark-gray mb-8">
              AI-assisted evidence-based care across Kerala focused
               on prevention, early intervention, and better health outcomes for you and your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppBooking>
                <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white text-lg py-6 px-8">
                  Book an Appointment
                </Button>
              </WhatsAppBooking>
              <Link href="/programs">
                <Button variant="outline" className="border-preventify-green text-preventify-green hover:bg-preventify-green/10 text-lg py-6 px-8">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1400&auto=format&fit=crop"
              alt="Preventify Healthcare"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
