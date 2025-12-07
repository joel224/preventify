import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  features: string[];
}

const ProgramCard = ({ 
  title, 
  description, 
  features 
}: ProgramCardProps) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-preventify-blue">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-preventify-green mr-3 mt-0.5 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-preventify-blue hover:bg-preventify-dark-blue text-white">
          Join Program
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
