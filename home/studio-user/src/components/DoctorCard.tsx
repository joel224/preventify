
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DoctorCardProps {
  name: string;
  specialty: string;
  qualification: string;
  image: string;
  location?: string;
}

const DoctorCard = ({ 
  name, 
  specialty, 
  qualification, 
  image, 
  location 
}: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <div className="aspect-square relative overflow-hidden bg-preventify-light-green/20">
        <img 
          src={image} 
          alt={`Dr. ${name}`} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-display font-semibold text-xl text-preventify-blue">{name}</h3>
        <p className="text-preventify-green font-medium">{specialty}</p>
        <p className="text-preventify-dark-gray text-sm mb-3">{qualification}</p>
        {location && <p className="text-preventify-gray mb-3">{location}</p>}
        <Link href="/book-appointment">
          <Button className="w-full bg-preventify-blue hover:bg-preventify-dark-blue text-white">
            Book Appointment
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
