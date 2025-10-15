"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const SubscriptionButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-transform duration-300 ease-in-out ${
        isScrolled ? "scale-100" : "scale-75"
      }`}
    >
      <Button
        size="icon"
        className="w-20 h-20 rounded-full bg-gray-400/20 backdrop-blur-lg border border-gray-300/30 text-preventify-dark-gray hover:bg-gray-400/30"
        aria-label="Annual Subscription"
      >
        <div className="flex flex-col items-center">
          <Star className="h-6 w-6" />
          <span className="text-xs mt-1">Annual</span>
        </div>
      </Button>
    </div>
  );
};

export default SubscriptionButton;
