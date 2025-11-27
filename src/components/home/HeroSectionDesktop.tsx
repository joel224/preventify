'use client';

import * as React from "react";
import Image from "next/image";
import FixedWatermark from "@/components/home/FixedWatermark";

const { useRef, useState, useEffect } = React;

/* ==============================================================
   HYBRID CONFIGURATION - "THE CONTROL PANEL"
   Adjust these values to move elements pixel-perfectly.
   ============================================================== */
const LAYOUT_CONTROLS = {
  
  // 1. LEFT: HEADLINE CONTROLS
  headline: {
    x: 20,
    y: -200,
    scale: 3,
    maxWidth: "100%",
    fontSize: "3.5rem",
  },

  // 2. MIDDLE: "CLINIC" TEXT CONTROLS
  clinicText: {
    text: " Your 365-Day Health Passport ",
    x: -300,
    y: -50,
    scale: 1,
    fontSize: "2.2rem",
    opacity: 1,
  },

  // 3. RIGHT: GIRL IMAGE CONTROLS
  girlImage: {
    width: "200%",      // Base width relative to column
    maxWidth: "500px",  // Maximum pixel width
    x: 50,
    y: 160,
    scale: 8.2,
    rotate: 0,
  }
};

export default function HeroSectionContent() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector('header[data-navbar="main"]');
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }
  }, []);

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
                 LEFT: HEADLINE
                 ------------------------------------------------------- */}
              <div className="lg:col-span-5 z-20">
                <div
                  className="relative"
                  style={{
                    transform: `translate(${LAYOUT_CONTROLS.headline.x}px, ${LAYOUT_CONTROLS.headline.y}px) scale(${LAYOUT_CONTROLS.headline.scale})`,
                    maxWidth: LAYOUT_CONTROLS.headline.maxWidth,
                    transformOrigin: "left center",
                  }}
                >
                  <h1 
                    className="text-[#25338e] leading-[0.9] text-left font-serif"
                    style={{ fontFamily: 'Medino',padding: '0 4px', lineHeight: '1.1',fontSize: LAYOUT_CONTROLS.headline.fontSize,whiteSpace: 'nowrap' }}
                    
                  >
                    
                    Preventify
                  </h1>
                </div>
              </div>
 {/*
                  To use this font...,Use this CSS property...
Beona Danila.ttf,font-family: 'Beona Danila';
Medino.otf,font-family: 'Medino';
Mocktaile Typeface PERSONAL USE ONLY.otf,font-family: 'Mocktaile Typeface';
Rebeqa-Bold.ttf,font-family: 'Rebeqa'; font-weight: bold;
                  */}
              {/* -------------------------------------------------------
                 MIDDLE: "CLINIC" TEXT
                 ------------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-center z-10">
                <div
                  style={{
                    transform: `translate(${LAYOUT_CONTROLS.clinicText.x}px, ${LAYOUT_CONTROLS.clinicText.y}px) scale(${LAYOUT_CONTROLS.clinicText.scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  <h2 
                    className="font-semibold select-none pointer-events-none whitespace-nowrap"
                    style={{
                      fontSize: LAYOUT_CONTROLS.clinicText.fontSize,
                      opacity: LAYOUT_CONTROLS.clinicText.opacity,
                    }}
                  >
                    {LAYOUT_CONTROLS.clinicText.text}
                  </h2>
                </div>
              </div>

              {/* -------------------------------------------------------
                 RIGHT: GIRL IMAGE (NO BOX, NO SHADOW, TRANSPARENT BG)
                 ------------------------------------------------------- */}
              <div 
                  className="relative"
                  style={{
                    width: LAYOUT_CONTROLS.girlImage.width,
                    maxWidth: LAYOUT_CONTROLS.girlImage.maxWidth,
                    transform: `translate(${LAYOUT_CONTROLS.girlImage.x}px, ${LAYOUT_CONTROLS.girlImage.y}px) scale(${LAYOUT_CONTROLS.girlImage.scale}) rotate(${LAYOUT_CONTROLS.girlImage.rotate}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  <div 
                    className="w-full h-auto aspect-[3/4] flex items-center justify-center"
                    style={{ maxHeight: '500px' }}
                  >
                    <Image
                      src="/women.webp"
                      alt="Clinic Aesthetics"
                      fill
                      className="object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.05)]"
                      priority
                    />
                  </div>
                </div>
              

            </div>
          </div>
        </div>

        <FixedWatermark />
      </div>
    </section>
  );
}