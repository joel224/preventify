
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-white">
      <div className="absolute inset-0">
          <Image
            src="/edit2.png"
            alt="Abstract background"
            fill
            className="object-cover object-center opacity-30"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              One Network. One Standard. Global Accreditation.
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We are proud to be the first hospital chain in India to receive the JCI Enterprise Accreditation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8">
                  Click here to hear from our leaders
                </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center">
             <Image
                src="/edit.png"
                alt="JCI Enterprise Accreditation"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="text-center mt-4">
                  <h3 className="font-bold text-primary">Joint Commission International</h3>
                  <p className="font-semibold text-slate-700">Enterprise Accreditation</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
