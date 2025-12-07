'use client'
import PageHeader from "@/components/PageHeader";
import ProgramCard from "@/components/ProgramCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const ProgramsPage = () => {
  const diabetesPrograms = [
    {
      title: "Diabetes Prevention Program",
      description: "A structured program designed to prevent or delay the onset of type 2 diabetes in individuals at high risk.",
      features: [
        "Risk assessment and screening",
        "Personalized nutrition plan",
        "Supervised exercise regimen",
        "Regular monitoring and follow-ups",
        "Group support sessions",
      ],
    },
    {
      title: "Diabetes Management",
      description: "Comprehensive care for individuals diagnosed with diabetes to effectively manage their condition and prevent complications.",
      features: [
        "Medication management",
        "Blood glucose monitoring",
        "Diet and lifestyle counseling",
        "Complication screening",
        "Self-management education",
      ],
    },
    {
      title: "Gestational Diabetes Care",
      description: "Specialized care for expecting mothers diagnosed with gestational diabetes to ensure maternal and fetal health.",
      features: [
        "Regular blood glucose monitoring",
        "Nutritional guidance",
        "Safe exercise recommendations",
        "Fetal monitoring",
        "Postpartum follow-up",
      ],
    },
  ];

  const lifestylePrograms = [
    {
      title: "Weight Management",
      description: "A personalized program to help individuals achieve and maintain a healthy weight through sustainable lifestyle changes.",
      features: [
        "Body composition analysis",
        "Personalized nutrition plan",
        "Exercise prescription",
        "Behavioral counseling",
        "Regular progress monitoring",
      ],
    },
    {
      title: "Heart Health Program",
      description: "A comprehensive program aimed at reducing cardiovascular risk factors and promoting heart health.",
      features: [
        "Cardiovascular risk assessment",
        "Blood pressure management",
        "Cholesterol management",
        "Heart-healthy diet planning",
        "Stress management techniques",
      ],
    },
    {
      title: "Senior Wellness",
      description: "A program designed to address the unique health needs of older adults and promote healthy aging.",
      features: [
        "Comprehensive geriatric assessment",
        "Fall prevention strategies",
        "Memory and cognitive health",
        "Nutrition for healthy aging",
        "Social engagement activities",
      ],
    },
  ];

  const specializedPrograms = [
    {
      title: "Maternal & Child Health",
      description: "Comprehensive care for mothers and children to ensure optimal health during pregnancy, infancy, and childhood.",
      features: [
        "Prenatal care and education",
        "Childhood immunizations",
        "Growth and development monitoring",
        "Breastfeeding support",
        "Parenting guidance",
      ],
    },
    {
      title: "Corporate Wellness",
      description: "Customized wellness programs for organizations to improve employee health and productivity.",
      features: [
        "Health risk assessments",
        "On-site health screenings",
        "Wellness workshops",
        "Stress management programs",
        "Health coaching",
      ],
    },
    {
      title: "Chronic Disease Management",
      description: "Integrated care for individuals with chronic conditions to improve quality of life and reduce complications.",
      features: [
        "Condition-specific care plans",
        "Medication management",
        "Remote monitoring options",
        "Self-management education",
        "Regular follow-ups",
      ],
    },
  ];

  const programBenefits = [
    {
      title: "Personalized Approach",
      description: "Programs tailored to individual health needs and goals.",
    },
    {
      title: "Expert Guidance",
      description: "Led by healthcare professionals with specialized training.",
    },
    {
      title: "Sustainable Results",
      description: "Focus on long-term lifestyle changes, not quick fixes.",
    },
    {
      title: "Holistic Support",
      description: "Addressing physical, emotional, and social aspects of health.",
    },
    {
      title: "Regular Monitoring",
      description: "Continuous assessment and adjustment of your health plan.",
    },
    {
      title: "Group Support",
      description: "Community of individuals with similar health goals.",
    },
    {
      title: "Evidence-Based Methods",
      description: "Practices supported by medical research and clinical guidelines.",
    },
    {
      title: "Integrated Care",
      description: "Coordination with your primary care and specialist providers.",
    },
  ];


  return (
    <>
      <PageHeader
        title="Health & Lifestyle Programs"
        subtitle="Evidence-based programs designed to prevent disease and promote overall wellbeing"
      />

      {/* Programs Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="diabetes" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-preventify-light-gray">
                <TabsTrigger value="diabetes" className="text-base px-6">Diabetes Care</TabsTrigger>
                <TabsTrigger value="lifestyle" className="text-base px-6">Lifestyle Medicine</TabsTrigger>
                <TabsTrigger value="specialized" className="text-base px-6">Specialized Programs</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="diabetes">
              <div className="mb-8 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Diabetes Care Programs</h2>
                <p className="text-gray-600">
                  Our specialized diabetes programs are designed to prevent, manage, and control diabetes through evidence-based approaches that address all aspects of the condition.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {diabetesPrograms.map((program, index) => (
                  <ProgramCard
                    key={index}
                    title={program.title}
                    description={program.description}
                    features={program.features}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lifestyle">
              <div className="mb-8 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Lifestyle Medicine Programs</h2>
                <p className="text-gray-600">
                  Our lifestyle medicine programs focus on modifiable behaviors that impact health, helping individuals make sustainable changes for better health outcomes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {lifestylePrograms.map((program, index) => (
                  <ProgramCard
                    key={index}
                    title={program.title}
                    description={program.description}
                    features={program.features}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialized">
              <div className="mb-8 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Specialized Programs</h2>
                <p className="text-gray-600">
                  Our specialized programs cater to specific health needs and populations, providing targeted interventions for optimal outcomes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specializedPrograms.map((program, index) => (
                  <ProgramCard
                    key={index}
                    title={program.title}
                    description={program.description}
                    features={program.features}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop"
                    alt="Group of people in a health program"
                    fill
                    className="object-cover"
                />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-preventify-blue">A Foundation for Lasting Health</h2>
              <p className="text-gray-600 max-w-3xl">
                Each of our programs is built on a core set of principles designed to empower you, deliver measurable results, and foster a supportive community on your journey to wellness.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-2 text-preventify-dark-purple">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Real experiences from individuals who have benefited from our health programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The Diabetes Prevention Program gave me the tools and knowledge to make lasting lifestyle changes. After six months, my blood sugar levels normalized.",
                name: "Rajesh M.",
                program: "Diabetes Prevention Program",
              },
              {
                quote: "The Weight Management program helped me lose 15kg in a healthy, sustainable way. The support from the team kept me motivated throughout my journey.",
                name: "Meera T.",
                program: "Weight Management Program",
              },
              {
                quote: "The Heart Health Program helped me understand my risk factors and make changes that lowered my blood pressure and cholesterol levels significantly.",
                name: "Thomas J.",
                program: "Heart Health Program",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <svg className="h-8 w-8 text-preventify-purple mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-preventify-purple text-sm">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramsPage;
