
import { Button } from "@/components/ui/button"
import BookingDialog from "../BookingDialog"
import Link from "next/link"

const PreventiveLifestyleSection = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-preventify-dark-blue">
                            AI assisted Modern Healthcare for a <span className="text-primary">Preventive Lifestyle</span>
                        </h2>
                        <p className="text-lg text-preventify-dark-gray mb-8 max-w-3xl mx-auto">
                            AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <BookingDialog>
                                <Button className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8">
                                    Book an Appointment
                                </Button>
                            </BookingDialog>
                            <Link href="/services">
                                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 text-lg py-6 px-8">
                                    Our Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventiveLifestyleSection;
