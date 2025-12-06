
'use client';

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const { useRef, useState, useEffect } = React;

/* ==============================================================
   HYBRID CONFIGURATION - "THE CONTROL PANEL"
   Adjust these values to move elements pixel-perfectly.
   ============================================================== */
const LAYOUT_CONTROLS = {
  
  // 1. HEADLINE CONTROLS (Independent for each slide)
  headline1: { 
    text: "Preventify",
    x: 20,
    y: -200,
    scale: 2.9,
    maxWidth: "100%",
    fontSize: "3.5rem",
    fontFamily: 'Medino',
    color: '#25338e',
  },
  headline2: { 
    text: (
      <>
        Your Health Starts Here <br />ᵔ ᵕ ᵔ
      </>
    ),
    x: 50, 
    y: -200, 
    scale: 1, 
    maxWidth: "100%",
    fontSize: "4.3rem", 
    fontFamily: 'Beona Danila ,"font-weight: bold', 
    color: '#255cc9', 
  },

  // 2. MIDDLE: "CLINIC" TEXT CONTROLS (Independent for each slide)
  clinicText1: { 
    text: " Your 365-Day Health Passport ",
    x: -300,
    y: -50,
    scale: 1,
    fontSize: "2.1rem",
    opacity: 1,
  },
  clinicText2: { 
    text: " ",
    x: -280, 
    y: -30, 
    scale: 1.1, 
    fontSize: "2.5rem", 
    opacity: 0.9, 
  },

  // 3. IMAGE CONTROLS (Independent for each image)
  image1: { 
    src: "/women.webp",
    width: "200%",
    maxWidth: "500px",
    x: -69,
    y: 156,
    scale: 2.9,
    rotate: 0,
    delay: 0,
  },
  image2: { 
    src: "/girl2.png",
    width: "200%",
    maxWidth: "500px",
    x: -74,
    y: 50,
    scale: 2.2,
    rotate: 0,
    delay: 2,
  },

  // 4. NEW BACKGROUND GRAPHIC CONTROLS
  backgroundGraphic: {
    src: "/December/idqzew21e9mhrphcvden.webp", // The source for your new background image
    x: 150, // Horizontal position adjustment
    y: -310, // Vertical position adjustment
    scale: 1.1, // Size of the image
    rotate: 0, // Rotation in degrees
    opacity: 0.3, // Transparency of the image
    width: "100%", // CSS width
    maxWidth: "800px", // CSS max-width
  }
};

export default function HeroSectionContent() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [isGraphicHovered, setIsGraphicHovered] = useState(false);

  // All content arrays - easy to expand to 10 slides later
  const images = [
    LAYOUT_CONTROLS.image1,
    LAYOUT_CONTROLS.image2,
  ];

  const headlines = [
    LAYOUT_CONTROLS.headline1,
    LAYOUT_CONTROLS.headline2,
  ];

  const clinicTexts = [
    LAYOUT_CONTROLS.clinicText1,
    LAYOUT_CONTROLS.clinicText2,
  ];

  useEffect(() => {
    const navbar = document.querySelector('header[data-navbar="main"]');
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }
  }, []);

  // Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
        setShowImage(true);
      }, 50);
    }, 9000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];
  const currentHeadline = headlines[currentImageIndex];
  const currentClinicText = clinicTexts[currentImageIndex];
  const bgGraphic = LAYOUT_CONTROLS.backgroundGraphic; // Get the background graphic config

  return (
    <section
      ref={targetRef}
      style={{ backgroundColor: "#f8ffff", height: "100vh" }}
      className="relative"
    >
      <div className="h-screen sticky top-0 overflow-hidden flex items-center">
        
        {/* MAIN CONTENT LAYER */}
        <div className="absolute inset-0 px-6 z-10 pointer-events-none flex items-center">
          <div className="container mx-auto">
            
            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* -------------------------------------------------------
                 LEFT: HEADLINE (Changes with slide)
                 ------------------------------------------------------- */}
              <div 
                className="lg:col-span-5 z-20 relative"
              >

                {/* BACKGROUND GRAPHIC (Visible on hover) */}
                <div
                  className="absolute inset-0 z-[-1] pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isGraphicHovered ? bgGraphic.opacity : 0,
                    transform: `translate(${bgGraphic.x}px, ${bgGraphic.y}px) scale(${bgGraphic.scale}) rotate(${bgGraphic.rotate}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  <div 
                    className="relative" 
                    style={{ 
                      width: bgGraphic.width,
                      maxWidth: bgGraphic.maxWidth,
                      aspectRatio: '1/1' // Assuming square graphic
                    }}
                  >
                    <Image
                      src={bgGraphic.src}
                      alt="Background Graphic"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                {/* INVISIBLE HOVER TRIGGER CIRCLE */}
                <div
                  className="absolute rounded-full pointer-events-auto"
                  style={{
                    width: bgGraphic.maxWidth,
                    height: bgGraphic.maxWidth,
                    transform: `translate(${bgGraphic.x}px, ${bgGraphic.y}px) scale(${bgGraphic.scale})`,
                    transformOrigin: "center center",
                  }}
                  onMouseEnter={() => setIsGraphicHovered(true)}
                  onMouseLeave={() => setIsGraphicHovered(false)}
                ></div>


                <div
                  className="relative pointer-events-none"
                  style={{
                    transform: `translate(${currentHeadline.x}px, ${currentHeadline.y}px) scale(${currentHeadline.scale})`,
                    maxWidth: currentHeadline.maxWidth,
                    transformOrigin: "left center",
                  }}
                >
                  <h1 
                    className="leading-[0.9] text-left font-serif"
                    style={{ 
                      fontFamily: currentHeadline.fontFamily,
                      padding: '0 4px', 
                      lineHeight: '1.1',
                      fontSize: currentHeadline.fontSize,
                      whiteSpace: 'nowrap',
                      color: currentHeadline.color,
                    }}
                  >
                    {currentHeadline.text}
                  </h1>
                </div>

                {/* Conditionally rendered button for the second slide */}
                {currentImageIndex === 1 && (
                  <div className="absolute top-1/2 left-0 pointer-events-auto" style={{ transform: `translate(60px, -60px)` }}>
                      <Link href="/savings">
                        <Button
                            size="lg"
                            className="bg-preventify-blue hover:bg-[#c8804c] text-white font-semibold text-lg py-6 px-8 rounded-full shadow-lg"
                        >
                            Sugam Card
                        </Button>
                      </Link>
                  </div>
                )}
              </div>

              {/* -------------------------------------------------------
                 MIDDLE: "CLINIC" TEXT (Changes with slide)
                 ------------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-center z-10 pointer-events-auto">
                <div
                  style={{
                    transform: `translate(${currentClinicText.x}px, ${currentClinicText.y}px) scale(${currentClinicText.scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  {currentImageIndex === 0 ? (
                     <Link href="/savings" className="flex items-center group">
                        <span 
                           className="font-semibold whitespace-nowrap text-[#bd8053] transition-colors group-hover:text-[#111b5c]"
                           style={{
                              fontSize: currentClinicText.fontSize,
                              opacity: currentClinicText.opacity,
                           }}
                        >
                            {currentClinicText.text}
                        </span>
                        <ChevronRight className="w-8 h-8 text-preventify-dark-blue animate-subtle-move-right pr-2" />
                     </Link>
                   ) : (
                      <span
                        className="font-semibold select-none pointer-events-none whitespace-nowrap text-preventify-dark-gray"
                        style={{
                            fontSize: currentClinicText.fontSize,
                            opacity: currentClinicText.opacity,
                        }}
                      >
                         {currentClinicText.text}
                      </span>
                  )}
                </div>
              </div>

              {/* -------------------------------------------------------
                 RIGHT: IMAGE SLIDESHOW (Independent Images)
                 ------------------------------------------------------- */}
              <div className="lg:col-span-4 flex justify-end items-center">
                <div 
                  className="relative"
                  style={{
                    width: currentImage.width,
                    maxWidth: currentImage.maxWidth,
                    transform: `translate(${currentImage.x}px, ${currentImage.y}px) scale(${currentImage.scale}) rotate(${currentImage.rotate}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  <div 
                    className="w-full h-auto aspect-[3/4] flex items-center justify-center"
                    style={{ maxHeight: '500px' }}
                  >
                    <Image
                      src={currentImage.src}
                      alt={`Slide ${currentImageIndex + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.05)] transition-opacity duration-500 ${
                        showImage ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
