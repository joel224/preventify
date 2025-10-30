
import Link from "next/link";
import { Button } from "@/components/ui/button";

const locations = [
  {
    city: "Padinjarangadi",
    name: "Preventify Medical Center - Padinjarangadi",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "Vattamkulam",
    name: "Preventify Health Clinic - Vattamkulam ",
    image: "https://res.cloudinary.com/dyf8umlda/image/upload/c_fill,ar_1:1/v1749384223/WhatsApp_Image_2025-06-05_at_11.39.51_AM_1_wceibo.jpg",
  },
  {
    city: "Kumbidi",
    name: "Preventify Family Care - Kumbidi( Coming soon)",
    image: "/clcinic.jpg",
  },
  {
    city: "Koottanad",
    name: "Preventify Health Hub - Koottanad( Coming soon)",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=800&auto=format&fit=crop",
  },
];

const LocationsSection = () => {
  return (
    <section className="bg-white py-16" id="locations-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            Our Clinics Across Kerala
          </h2>
          <p className="text-preventify-gray max-w-3xl mx-auto">
            Find a Preventify clinic near you for quality healthcare services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <Link key={index} href="/clinics" className="group">
              <div className="relative overflow-hidden rounded-lg h-64">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-xl font-semibold">
                      {location.name}
                    </h3>
                    <p className="text-white/80">View Clinics →</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/clinics">
            <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white">
              View All Locations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
