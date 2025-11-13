
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

const services = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
      title: "Primary Care",
      description: "Comprehensive healthcare services for individuals and families of all ages, including routine check-ups, and management of acute and chronic illnesses.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2755/2755513.png",
      title: "Diabetes Management",
      description: "Specialized programs for the prevention, diagnosis, and management of diabetes, including personalized diet and lifestyle plans.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2382/2382461.png",
      title: "Lifestyle Medicine",
      description: "An evidence-based approach to preventing, treating, and even reversing chronic diseases by focusing on lifestyle factors such as nutrition and physical activity.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4441/4441353.png",
      title: "Pediatric Care",
      description: "Specialized healthcare services for infants, children, and adolescents, including well-child visits, immunizations, and developmental screenings.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3588/3588693.png",
      title: "Women's Health",
      description: "Comprehensive care addressing the unique health needs of women, including gynecological exams, family planning, and prenatal care.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2491/2491749.png",
      title: "Preventive Screenings",
      description: "A range of early detection tests and health screenings to identify potential health issues before they become serious.",
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
        title: "Diagnostic Services",
        description: "Full-range of laboratory and imaging services to accurately diagnose various medical conditions.",
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/3820/3820207.png",
        title: "Vaccination Services",
        description: "Complete vaccination services for all age groups, including routine immunizations and travel vaccines.",
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
        title: "Specialist Consultations",
        description: "Access to a network of specialists in various medical fields for expert opinion and advanced care.",
    },
  ];

const ServicesPage = () => {
    return (
        <>
            <PageHeader 
                title="Our Healthcare Services"
                subtitle="Preventify offers a comprehensive range of healthcare services designed to keep you healthy and address your medical needs."
            />
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                            <img
                            src={service.icon}
                            alt={service.title}
                            className="w-20 h-20 mx-auto mb-6"
                            />
                            <h3 className="text-xl font-semibold mb-3 text-preventify-blue">{service.title}</h3>
                            <p className="text-preventify-dark-gray">{service.description}</p>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServicesPage;
