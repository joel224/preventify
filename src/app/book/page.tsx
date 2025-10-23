'use client'
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";

const BookingPage = () => {
  return (
    <>
      <PageHeader
        title="Book an Appointment"
        subtitle="Step 1: Tell us about yourself"
      />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
