
import PageHeader from "@/components/PageHeader";
import ClinicCard from "@/components/ClinicCard";

const ClinicsPage = () => {
  const clinics = [
    {
      id: 1,
      name: "Preventify Medical Center - Padinjarangadi",
      location: "Padinjarangadi",
      address: "Near Bus Stand, Padinjarangadi, Malappuram 676519",
      phone: "+91 496 123 4567",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Preventify Health Clinic - Vattamkulam",
      location: "Vattamkulam",
      address: "Main Road, Vattamkulam, Malappuram 679551",
      phone: "+91 496 234 5678",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/c_fill,ar_1:1/v1749384223/WhatsApp_Image_2025-06-05_at_11.39.51_AM_1_wceibo.jpg",
    },
    {
      id: 3,
      name: "Peekay's Preventify Clinic - Kanjirathani",
      location: "Kumbidi",
      address: "Near Panchayat Office, Kumbidi, Palakkad 679563",
      phone: "+91 466 345 6789",
      image: "/clcinic.jpg",
    },
    {
      id: 4,
      name: "Preventify Health Hub - Koottanad",
      location: "Koottanad",
      address: "Main Road, Koottanad, Palakkad 679533",
      phone: "+91 466 456 7890",
      image: "https://images.unsplash.com/photo-1629901925121-8cfea63bd5dd?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <PageHeader
        title="Our Clinic Locations"
        subtitle="Find a Preventify clinic near you for quality healthcare services across Kerala"
      />

      {/* Clinics Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clinics.map((clinic) => (
              <ClinicCard
                key={clinic.id}
                name={clinic.name}
                location={clinic.location}
                address={clinic.address}
                phone={clinic.phone}
                image={clinic.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Kerala Map Section */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-preventify-blue">Our Presence in Kerala</h2>
            <p className="text-preventify-dark-gray max-w-3xl mx-auto">
              With multiple clinics across Kerala, Preventify is bringing quality healthcare closer to you. Find your nearest location on the map.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="aspect-video relative">
              <img 
                src="https://www.mapsofindia.com/maps/kerala/kerala-district.jpg" 
                alt="Kerala Map with Preventify Locations" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-preventify-blue">Services Available at All Clinics</h2>
            <p className="text-preventify-dark-gray max-w-3xl mx-auto">
              Every Preventify clinic offers a comprehensive range of healthcare services to meet your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "https://cdn-icons-png.flaticon.com/512/3022/3022552.png",
                title: "General Consultations",
                description: "Primary healthcare services for all age groups."
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
                title: "Diagnostic Tests",
                description: "Comprehensive range of laboratory and imaging services."
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2382/2382461.png",
                title: "Preventive Health Check-ups",
                description: "Customized packages for early detection of health issues."
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2755/2755513.png",
                title: "Diabetes Management",
                description: "Specialized care for diabetes prevention and management."
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/3820/3820207.png",
                title: "Vaccination Services",
                description: "Routine and travel vaccinations for all age groups."
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2491/2491749.png",
                title: "Specialist Consultations",
                description: "Access to specialists in various medical fields."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-preventify-blue">
                  {service.title}
                </h3>
                <p className="text-preventify-dark-gray">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClinicsPage;
