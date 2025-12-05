'use client';
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, AlertTriangle, User, Stethoscope, Hospital } from "lucide-react";
import Link from 'next/link';
import BookingDialog from "@/components/BookingDialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const EmergencyDoctorCard = ({ doctor }: { doctor: any }) => {
  const telLink = `tel:+918129334858`;
  return (
    <div className="border bg-white rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-lg">{doctor.name}</h4>
          <p className="text-gray-600 text-sm">{doctor.specialty}</p>
        </div>
        <div className="flex flex-col gap-2">
            <BookingDialog>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">Book Appointment</Button>
            </BookingDialog>
            <a href={telLink}>
                <Button size="sm" variant="outline" className="w-full">
                    <Phone className="h-4 w-4" />
                    <span className="sr-only">Call</span>
                </Button>
            </a>
        </div>
      </div>
      <div className="border-t mt-4 pt-4">
          <p className="text-sm text-gray-500">{doctor.qualification}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Hospital className="w-4 h-4" />
            <span>{doctor.location}</span>
          </div>
      </div>
    </div>
  );
};


const EmergencyPage = () => {
  const emergencyNumber = "+918129334858";
  const telLink = `tel:${emergencyNumber}`;

  const emergencyDoctors = [
    {
      id: 15,
      name: "Dr. Reshma K.R.",
      specialty: "Casuality Medical Officer",
      qualification: "MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1756899659/Dr_Reshma_oldwdx.jpg",
    },
    {
      id: 1,
      name: "Dr. Rakesh K R",
      specialty: "Chief Medical Officer",
      qualification: "MD, MBBS",
      location: "Padinjarangadi",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
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
      id: 12,
      name: "Dr. Ajay Biju",
      specialty: "Resident Medical Officer",
      qualification: "MBBS",
      location: "Vattamkulam",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1756810837/IMG_2494_rfsdob.jpg",
    },
  ];

  return (
    <>
      <PageHeader
        title="Emergency Contact Information"
        subtitle="For immediate medical assistance, please use the number below."
        backgroundClass="bg-red-50"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-red-500/50">
              <CardHeader className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
                <CardTitle className="text-2xl font-bold text-red-700 mt-2">
                  In Case of Emergency
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-preventify-dark-gray mb-6">
                  Press the button below for immediate assistance.
                </p>
                
                <a href={telLink} className="inline-block mb-6">
                  <Button
                    size="lg"
                    className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-700 text-white text-xl flex flex-col items-center justify-center gap-2"
                  >
                    <Phone className="h-10 w-10" />
                    <span className="animate-emergency-blink">Call Now</span>
                  </Button>
                </a>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-red-800">
                    Or dial our Emergency Hotline
                  </p>
                  <p className="text-3xl font-bold my-1 text-red-900 tracking-wider">
                    {emergencyNumber}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center text-preventify-gray">
                <p>This number is for our emergency services at our Vattamkulam and Padinjarangadi locations.</p>
                <p className="mt-2 font-semibold">Please do not hesitate to call for urgent medical situations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-preventify-blue">Our Emergency Medicine Doctors</h2>
            <Link href="/doctors" className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {emergencyDoctors.map((doctor) => (
                <CarouselItem key={doctor.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <EmergencyDoctorCard doctor={doctor} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default EmergencyPage;
