'use client';

import * as React from "react";
import Image from "next/image";
import TextShine from "../ui/TextShine";

const { useRef, useState, useEffect } = React;

/* ==============================================================
   HYBRID CONFIGURATION - "THE CONTROL PANEL"
   Adjust these values to move elements pixel-perfectly.
   ============================================================== */
const LAYOUT_CONTROLS = {
  
  // 1. HEADLINE CONTROLS (Independent for each slide)
  headline1: { // For first slide (Preventify)
    text: "Preventify",
    x: 20,
    y: -200,
    scale: 3,
    maxWidth: "100%",
    fontSize: "3.5rem",
    fontFamily: 'Medino',
    color: '#25338e',
  },
  headline2: { // For second slide (Health Starts Here)
    text: (
      <>
        Your Health Starts Here <br />ᵔ ᵕ ᵔ
      </>
    ),
    x: 50, // Different position
    y: -200, // Different position
    scale: 1, // Different scale
    maxWidth: "100%",
    fontSize: "4.3rem", // Different size
    fontFamily: 'Beona Danila ,"font-weight: bold', // Different font
    color: '#255cc9', // Different color
  },

  // 2. MIDDLE: "CLINIC" TEXT CONTROLS (Independent for each slide)
  clinicText1: { // For first slide
    text: " Your 365-Day Health Passport ",
    x: -300,
    y: -50,
    scale: 1,
    fontSize: "2.2rem",
    opacity: 1,
  },
  clinicText2: { // For second slide
    text: " ",
    x: -280, // Different position
    y: -30, // Different position
    scale: 1.1, // Different scale
    fontSize: "2.5rem", // Different size
    opacity: 0.9, // Different opacity
  },

  // 3. IMAGE CONTROLS (Independent for each image)
  image1: { // women.webp
    src: "/women.webp",
    width: "200%",
    maxWidth: "500px",
    x: -69,
    y: 161,
    scale: 3.3,
    rotate: 0,
    delay: 0,
  },
  image2: { // girl2.png
    src: "/girl2.png",
    width: "200%",
    maxWidth: "500px",
    x: -70,
    y: 86,
    scale: 2.3,
    rotate: 0,
    delay: 2,
  }
};

export default function HeroSectionContent() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);

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
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];
  const currentHeadline = headlines[currentImageIndex];
  const currentClinicText = clinicTexts[currentImageIndex];

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
              <div className="lg:col-span-5 z-20">
                <div
                  className="relative"
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
              </div>

              {/* -------------------------------------------------------
                 MIDDLE: "CLINIC" TEXT (Changes with slide)
                 ------------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-center z-10">
                <div
                  style={{
                    transform: `translate(${currentClinicText.x}px, ${currentClinicText.y}px) scale(${currentClinicText.scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  <TextShine
                    className="font-semibold select-none pointer-events-none whitespace-nowrap text-preventify-dark-gray"
                    style={{
                      fontSize: currentClinicText.fontSize,
                      opacity: currentClinicText.opacity,
                    }}
                  >
                    {currentClinicText.text}
                  </TextShine>
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