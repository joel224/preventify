
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ProgramCard = ({ 
  title, 
  description, 
  icon, 
  features 
}: ProgramCardProps) => {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 text-preventify-purple">
          <img src={icon} alt={title} className="w-16 h-16" />
        </div>
        <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-preventify-purple mr-2 mt-0.5 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full bg-preventify-purple hover:bg-preventify-dark-purple text-white">
          Join Program
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
