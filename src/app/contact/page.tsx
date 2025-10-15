'use client'
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Youtube } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission logic would go here
    console.log("Contact form submitted");
    alert(
      "Thank you for reaching out! We'll respond to your inquiry as soon as possible."
    );
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Reach out to us for appointments, inquiries, or feedback"
      />

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-preventify-purple mr-4 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">
                      Padinjarangadi: +91 9383437105
                    </p>
                    <p className="text-gray-600">
                      Vattamkulam: +91 8129334858
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-preventify-purple mr-4 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      General Inquiries: contact@preventify.me
                    </p>
                    <p className="text-gray-600">
                      Appointments: contact@preventify.me
                    </p>
                    <p className="text-gray-600">
                      Feedback: contact@preventify.me
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-preventify-purple mr-4 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Hours of Operation
                    </h3>
                    <p className="text-gray-600">
                      24 X 7 Operations 
                    </p>
                    
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-preventify-purple mr-4 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Head Office</h3>
                    <p className="text-gray-600">HomoRx Healthtech Private Limited</p>
                    <p className="text-gray-600">Thottupadath Valappil, Door No:71/A,Ward No:14, Vattamkulam</p>
                    <p className="text-gray-600">Malappuram,Ponnani,Kerala,679578</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-preventify-purple hover:text-preventify-dark-purple transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-preventify-purple hover:text-preventify-dark-purple transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-preventify-purple hover:text-preventify-dark-purple transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-preventify-purple hover:text-preventify-dark-purple transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-preventify-purple hover:text-preventify-dark-purple transition-colors"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Last name" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Your phone number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Subject of your message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-preventify-purple hover:bg-preventify-dark-purple text-white"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-preventify-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find a Preventify clinic near you across Kerala.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-video relative rounded-md overflow-hidden shadow-md border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d489.91458054112263!2d76.0675154!3d10.7870424!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b9f2a0c650cb%3A0x3b26acf0d5721cbd!2sDr%20Rakesh&#39;s%20Preventify.Me%20Hospital!5e0!3m2!1sen!2sin!4v1747716276439!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="aspect-video relative rounded-md overflow-hidden shadow-md border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.348160943641!2d76.0180613!3d10.7846239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b90b671ae7ad%3A0x578848312f43e2e0!2sPreventify%20Hospital%20Clinic!5e0!3m2!1sen!2sin!4v1747716474838!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How do I schedule an appointment?",
                  answer:
                    "You can schedule an appointment by calling our appointment line at +91 123 456 7891, using our online booking system on the website, or visiting any of our clinics in person.",
                },
                {
                  question: "What should I bring to my first appointment?",
                  answer:
                    "Please bring your ID, insurance information (if applicable), any relevant medical records or test results, and a list of current medications you're taking.",
                },
                {
                  question: "Do you accept insurance?",
                  answer:
                    "Yes, we accept most major insurance plans. Please contact our office to verify if we accept your specific insurance provider.",
                },
                {
                  question: "What are your payment options?",
                  answer:
                    "We accept cash, credit/debit cards, and online payments. We also offer various payment plans for certain services.",
                },
                {
                  question: "How can I access my medical records?",
                  answer:
                    "You can access your medical records through our patient portal. Alternatively, you can submit a written request to our medical records department.",
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

export default ContactPage;
