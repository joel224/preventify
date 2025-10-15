"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const SubscriptionButton = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      {/* Hot corner to trigger the button visibility */}
      <div
        className="fixed bottom-0 right-0 h-24 w-24 z-40"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      <div
        className="fixed bottom-8 right-8 z-50 transition-opacity duration-300"
        style={{ opacity: isHovering ? 1 : 0 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
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
    </>
  );
};

export default SubscriptionButton;
