'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  quote: string;
  name: string;
  program: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewProgram, setReviewProgram] = useState('');
  const [reviewStory, setReviewStory] = useState('');

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
      toast({
        title: "Error",
        description: "Could not load testimonials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const newTestimonial: Testimonial = {
      name: reviewName,
      program: reviewProgram,
      quote: reviewStory,
    };

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTestimonial),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Thank you for sharing your story. It has been submitted and will appear after review.",
        });
        // Clear form and close dialog
        setReviewName('');
        setReviewProgram('');
        setReviewStory('');
        setIsFormOpen(false);
        // Refresh testimonials to show the new one if desired
        fetchTestimonials(); 
      } else {
        throw new Error('Failed to submit story');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your story. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            What Our Patients Say
          </h2>
          <p className="text-preventify-dark-gray max-w-3xl mx-auto">
            Real stories from people who have transformed their health with Preventify.
          </p>
        </div>

        {isLoading ? (
          <p className="text-center">Loading testimonials...</p>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <div className="bg-preventify-light-gray p-8 rounded-lg shadow-sm h-full flex flex-col cursor-grab">
                      <svg className="h-8 w-8 text-preventify-purple mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-700 mb-6 italic flex-grow">"{testimonial.quote}"</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-preventify-dark-blue">{testimonial.name}</p>
                        <p className="text-preventify-purple text-sm">{testimonial.program}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            
          </Carousel>
        )}

        <div className="text-center mt-12">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white text-lg py-3 px-6">
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share Your Success Story</DialogTitle>
                <DialogDescription>
                  Your story can inspire others to take the first step towards better health.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleReviewSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="col-span-3" placeholder="e.g., Manu S." required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program" className="text-right">
                      Program
                    </Label>
                    <Input id="program" value={reviewProgram} onChange={(e) => setReviewProgram(e.target.value)} className="col-span-3" placeholder="e.g., Diabetes Prevention" required />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="story" className="text-right">
                      Your Story
                    </Label>
                    <Textarea
                        id="story"
                        placeholder="Share your experience with our program..."
                        className="col-span-3"
                        value={reviewStory}
                        onChange={(e) => setReviewStory(e.target.value)}
                        required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">Submit Story</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

           <a href="/programs" className="inline-flex items-center text-preventify-purple font-semibold group mt-4 ml-6">
                <span>View All Programs</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
