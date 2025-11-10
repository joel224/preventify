
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, AlertTriangle } from "lucide-react";

const EmergencyPage = () => {
  const emergencyNumber = "+918129334858";
  const telLink = `tel:${emergencyNumber}`;

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
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
                <CardTitle className="text-2xl font-bold text-red-700 mt-2">
                  In Case of Emergency
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-preventify-dark-gray mb-6">
                  Please call the number below directly for immediate attention.
                </p>
                <div className="bg-red-50 p-6 rounded-lg mb-6">
                  <p className="text-sm font-semibold text-red-800">
                    Emergency Hotline
                  </p>
                  <p className="text-4xl font-bold my-2 text-red-900 tracking-wider">
                    {emergencyNumber}
                  </p>
                </div>
                <a href={telLink}>
                  <Button
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-8 flex items-center gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center text-preventify-gray">
                <p>This number is for our 24/7 emergency services at our Vattamkulam and Padinjarangadi locations.</p>
                <p className="mt-2 font-semibold">Please do not hesitate to call for urgent medical situations.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmergencyPage;
