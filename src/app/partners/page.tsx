'use client'
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const PartnersPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission logic would go here
    console.log("Partnership inquiry submitted");
    alert("Thank you for your interest! We'll contact you soon to discuss partnership opportunities.");
  };

  return (
    <>
      <PageHeader
        title="Partner with Preventify"
        subtitle="Explore collaboration opportunities to expand quality healthcare across Kerala"
      />

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Partner with Us</h2>
              <p className="text-gray-700 mb-8">
                Preventify is looking to expand our network of healthcare services across Kerala through strategic partnerships with hospitals, clinics, and healthcare professionals who share our commitment to evidence-based medicine and preventive healthcare.
              </p>
              <div className="space-y-4">
                {[
                  "Access to Preventify's established patient network",
                  "Implementation of evidence-based protocols and standards",
                  "Staff training and development opportunities",
                  "Integration with our digital health infrastructure",
                  "Marketing and branding support",
                  "Quality improvement programs",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-preventify-purple mr-2 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1080&auto=format&fit=crop"
                alt="Scientist in a lab, representing healthcare partnership"
                width={1080}
                height={720}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partnership Models</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer flexible partnership models that can be tailored to your specific situation and goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Clinic Affiliation",
                description: "For existing clinics looking to join the Preventify network while maintaining operational independence.",
                features: [
                  "Branding and co-branding options",
                  "Quality standards implementation",
                  "Referral network access",
                  "Marketing support",
                ],
              },
              {
                title: "Joint Ventures",
                description: "Collaborative investment and management of new healthcare facilities or specialty services.",
                features: [
                  "Shared capital investment",
                  "Joint operational management",
                  "Expertise and resource sharing",
                  "Profit sharing arrangements",
                ],
              },
              {
                title: "Franchise Model",
                description: "Operate a Preventify-branded clinic using our established business model and systems.",
                features: [
                  "Complete brand identity",
                  "Operational protocols and systems",
                  "Staff training and development",
                  "Ongoing operational support",
                ],
              },
            ].map((model, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-4 text-preventify-dark-purple">
                  {model.title}
                </h3>
                <p className="text-gray-600 mb-6">{model.description}</p>
                <h4 className="font-medium mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-preventify-purple mr-2 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Inquiry Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Interested in Partnering?</h2>
              <p className="text-gray-600">
                Contact us to discuss potential collaboration opportunities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold text-center mb-6">Contact Us</h3>
                <div className="space-y-4 text-center text-lg">
                    <p className="flex items-center justify-center">
                        <MapPin className="h-5 w-5 mr-2 text-preventify-purple" />
                        Headquarters: Vattamkulam, Malappuram, Kerala, India
                    </p>
                    <p className="flex items-center justify-center">
                        <Phone className="h-5 w-5 mr-2 text-preventify-purple" />
                        +91 8129334858
                    </p>
                    <p className="flex items-center justify-center">
                        <Mail className="h-5 w-5 mr-2 text-preventify-purple" />
                        contact@preventify.me
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about partnering with Preventify.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What are the minimum requirements to partner with Preventify?",
                  answer: "Partners should have an established healthcare facility or practice, appropriate licensing, and a commitment to evidence-based medicine and preventive healthcare. Specific requirements vary by partnership model.",
                },
                {
                  question: "How long does the partnership process take?",
                  answer: "The partnership process typically takes 2-3 months from initial inquiry to implementation, depending on the partnership model and specific requirements.",
                },
                {
                  question: "Will we need to rebrand our facility?",
                  answer: "This depends on the partnership model. Some models allow co-branding, while others require full Preventify branding. We work with partners to determine the best approach.",
                },
                {
                  question: "What kind of support does Preventify provide to partners?",
                  answer: "Preventify provides various support services including staff training, operational protocols, marketing support, quality improvement programs, and access to our digital health infrastructure.",
                },
                {
                  question: "Are there any geographical restrictions for partnerships?",
                  answer: "Currently, we are focusing on partnerships within Kerala, but we are open to discussing opportunities in neighboring states as well.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersPage;
