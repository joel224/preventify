
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import PageHeader from "@/components/PageHeader";
import DoctorCard from "@/components/DoctorCard";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const doctors = [
    {
      id: 1,
      name: "Dr. Rakesh K R",
      specialty: "Chief Medical Officer",
      qualification: "MD, MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
    },
    {
      id: 2,
      name: "Dr. Mohammed Faisal",
      specialty: "General Practitioner",
      qualification: "MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
    },
    {
      id: 3,
      name: "Dr. Hafsa Hussain",
      specialty: "Pediatrics",
      qualification: "MBBS, DNB",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg",
    },
    {
      id: 4,
      name: "Dr. Krishnendu U K ",
      specialty: "General Practitioner",
      qualification: "MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_Krishnendhu_dxtah5.jpg",
    },
    {
      id: 5,
      name: "Dr. Girish U ",
      specialty: "Dermatology",
      qualification: "MBBS,MD, DVL",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_girish_wcph4p.jpg",
    },
    {
      id: 6,
      name: "Dr. Ijas V. I. ",
      specialty: "Pulmonology",
      qualification: "MBBS, MD ",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255861/Dr._Ijas_qquwhv.jpg",
    },
    {
      id: 7,
      name: "Dr. Husna V.",
      specialty: "Gynecology",
      qualification: "MBBS, DNB",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255658/Dr_Husna_sk6zff.png",
    },
    {
      id: 8,
      name: "Dr. Md. Abdurahiman",
      specialty: "Minor Surgeries",
      qualification: "MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748260270/Dr_Abdurahiman_mct6bx.jpg",
    },
    
    {
      id: 9,
      name: "Dr. Neeharika V.",
      specialty: "ENT",
      qualification: "MBBS,MS(Master of Surgery)",
      location: "Vattamkulam",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748327293/Dr_Neeharika_uisond.jpg",
    },
    {
      id: 10,
      name: "Dr. Ashwin T.R.",
      specialty: "Resident Medical Officer",
      qualification: "MBBS",
      location: "Vattamkulam",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748676530/IMG_0124_gy9hlx.jpg",
    },
    {
      id: 11,
      name: "Dr. Sreedev N",
      specialty: "Pulmonology",
      qualification: "MBBS, MD",
      location: "Padinjarangadi & Vattamkulam",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748676529/WhatsApp_Image_2025-05-27_at_11.31.44_PM_radaxw.jpg",
    },
     {
      id: 12,
      name: "Dr. Ajay Biju",
      specialty: "Resident Medical Officer",
      qualification: "MBBS",
      location: "Vattamkulam",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1756810837/IMG_2494_rfsdob.jpg",
    },
     {
      id: 13,
      name: "Dr. Renjith A.",
      specialty: "Orthopedics",
      qualification: "MBBS, MS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1756899661/Dr_Renjith_qotneu.jpg",
    },
     {
      id: 14,
      name: "Dr. K.Y.Sanjay",
      specialty: "Orthopedics",
      qualification: "MBBS, D.Ortho,FIJR",
      location: "Padinjarangadi & Vattamkulam",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1756899659/Dr_K_Y_Sanjay_s5xuir.jpg",
    },
    {
      id: 15,
      name: "Dr. Reshma K.R.",
      specialty: "Casuality Medical Officer",
      qualification: "MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1756899659/Dr_Reshma_oldwdx.jpg",
    },
  ];

  const specialties = ["All", "Cardiology", "Family Medicine", "Endocrinology", "Pediatrics", "Orthopedics", "Dermatology", "Internal Medicine", "Gynecology"];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Our Medical Professionals"
        subtitle="Meet the expert tech-enabled doctors who provide quality care at Preventify"
      />

      {/* Search and Filter Section */}
      <section className="py-8 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, specialty or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-preventify-purple"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  qualification={doctor.qualification}
                  image={doctor.image}
                  location={doctor.location}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-preventify-purple text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join Our Medical Team</h2>
              <p className="mb-6">
                Preventify is always looking for talented and passionate healthcare professionals to join our growing team. If you're committed to evidence-based medicine and preventive healthcare, we'd love to hear from you.
              </p>
              <button className="bg-white text-preventify-purple hover:bg-preventify-light-gray py-2 px-6 rounded-md font-medium">
                View Career Opportunities
              </button>
            </div>
            <div className="md:text-right">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1080&auto=format&fit=crop"
                alt="Medical Team"
                className="rounded-lg inline-block max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DoctorsPage;
