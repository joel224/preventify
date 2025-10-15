
import { Info, Users, Calendar } from "lucide-react";

const features = [
  {
    icon: <Info className="h-10 w-10 text-preventify-green" />,
    title: "Evidence-Based Care",
    description: "Treatment protocols based on the latest medical research and guidelines.",
  },
  {
    icon: <Users className="h-10 w-10 text-preventify-green" />,
    title: "Expert Physicians",
    description: "Experienced doctors specialized in various fields of medicine.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-preventify-green" />,
    title: "Annual Memberships",
    description: "Lower costs for you and your family.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-preventify-light-gray py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            Why Choose Preventify
          </h2>
          <p className="text-preventify-gray max-w-3xl mx-auto">
            Our approach to healthcare combines modern medicine with preventive strategies for optimal health outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-preventify-blue">{feature.title}</h3>
              <p className="text-preventify-dark-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
