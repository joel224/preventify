
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppBooking from "./WhatsAppBooking";

interface ClinicCardProps {
  name: string;
  location: string;
  address: string;
  phone: string;
  image: string;
}

const ClinicCard = ({ name, location, address, phone, image }: ClinicCardProps) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-display font-semibold text-xl mb-2 text-preventify-blue">{name}</h3>
        <div className="flex items-start mb-4">
          <MapPin className="h-5 w-5 mr-2 text-preventify-green shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{location}</p>
            <p className="text-preventify-gray text-sm">{address}</p>
          </div>
        </div>
        <p className="text-preventify-dark-gray mb-4">{phone}</p>
        <div className="flex space-x-3">
          <WhatsAppBooking>
            <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white">
              Book Appointment
            </Button>
          </WhatsAppBooking>
          <Button variant="outline" className="border-preventify-green text-preventify-green hover:bg-preventify-green/10">
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicCard;
