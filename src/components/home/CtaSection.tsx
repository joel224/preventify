
import { Button } from "@/components/ui/button";
import AppointmentDialog from "../AppointmentDialog";

const CtaSection = () => {
  return (
    <section className="bg-preventify-blue text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8">
            Schedule your appointment today and start your journey towards better health with Preventify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppointmentDialog>
              <Button className="bg-white text-preventify-blue hover:bg-preventify-light-gray text-lg py-6 px-8">
                Book an Appointment
              </Button>
            </AppointmentDialog>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
