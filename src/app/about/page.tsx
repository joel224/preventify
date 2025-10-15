
import PageHeader from "@/components/PageHeader";

const AboutPage = () => {
  return (
    <>
      <PageHeader
        title="About Preventify"
        subtitle="Leading the way in evidence-based healthcare across Kerala"
      />

      {/* Vision and Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision & Mission</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-preventify-purple">Our Vision</h3>
                  <p className="text-gray-700">
                    To create a patient-centered, outcome-driven, cost-effective, scientifically updated healthcare ecosystem across suburban and semi-urban India, where trust is rebuilt into primary and preventive care.
                  </p>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-preventify-purple">Our Mission</h3>
                  <p className="text-gray-700">
                    Preventify is committed to delivering comprehensive healthcare services that combine modern medical practices with preventive approaches, empowering individuals to take control of their health and live fuller lives.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1080&auto=format&fit=crop"
                alt="Preventify Healthcare"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-4">
                Preventify was founded in 2024 by Dr. Rakesh who recognized a critical gap in Kerala's healthcare system. While the state had a robust medical infrastructure, there was a need for healthcare services that focused more on prevention rather than just treatment.
              </p>
              <p className="text-gray-700 mb-4">
                Starting with a single clinic in Padinjarangadi, Palakkad District of Kerala, Preventify introduced a new healthcare model that emphasized preventive care, regular screenings, and lifestyle modifications. Our approach resonated with patients, leading to improved health outcomes and reduced healthcare costs.
              </p>
              <p className="text-gray-700 mb-4">
               Preventify has expanded to multiple locations across Kerala, bringing our unique model of care to more communities. Today, we continue to innovate and expand our services, always guided by our commitment to evidence-based medicine and preventive healthcare.
              </p>
              <p className="text-gray-700">
                Our journey is driven by our passion for improving public health in Kerala and our vision of creating healthier communities through accessible, high-quality healthcare services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "https://cdn-icons-png.flaticon.com/512/4185/4185513.png",
                title: "Evidence-Based Medicine",
                description: "We ground all our medical practices in scientific research and established clinical guidelines.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/3176/3176349.png",
                title: "Patient-Centered Care",
                description: "Our patients are at the heart of everything we do, with care tailored to individual needs.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/5949/5949270.png",
                title: "Prevention First",
                description: "We prioritize preventive measures to avoid disease rather than just treating symptoms.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/3596/3596091.png",
                title: "Continuous Innovation",
                description: "We constantly seek to improve our services through new medical knowledge and technologies.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/1086/1086741.png",
                title: "Accessibility",
                description: "We strive to make quality healthcare accessible to all segments of the community.",
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2476/2476227.png",
                title: "Integrity",
                description: "We maintain the highest standards of professional conduct and ethical practice.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <img
                  src={value.icon}
                  alt={value.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-preventify-dark-purple">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Nirmal N R",
                role: "Co-Founder",
                image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748253061/850_3463_pp_1_ifukny.jpg",
                bio: "Nirmal brings in two decades of operating experiences across startups like OYO and Zoomcar and has served as the CEO for Zoomcar India and 3W business of Greaves Electric.",
              },
              {
                name: "Dr. Rakesh K R",
                role: "Co-Founder",
                image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_2_pms2pf.jpg",
                bio: "Dr.Rakesh brings decades of experience in primary and preventive care and is a physician who brings Technology to his practice",
              },
              
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{leader.name}</h3>
                  <p className="text-preventify-purple mb-2">{leader.role}</p>
                  <p className="text-gray-600 text-sm">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
