
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-white w-full">
      <div className="container mx-auto px-0 sm:px-0 lg:px-0 max-w-full">
        <div className="relative w-full aspect-[2/1] md:aspect-[3/1]">
           <Image
            src="/edit.png"
            alt="One Network. One Standard. Global Accreditation."
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
