'use client';

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ScrollRevealText from "../ScrollRevealText";
import { useWindowSize } from "@/hooks/use-window-size";
import FixedWatermark from "@/components/home/FixedWatermark";
const { useRef, useState, useMemo, useEffect } = React;

/* ==============================================================
   REFERENCE LAYOUT – Based on 1366x768 screen
   ============================================================== */
const refWidth = 1366;
const refHeight = 768;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

/* ==============================================================
   DYNAMIC CONFIGURATION – Calculates layout based on screen size
   ============================================================== */
const getDynamicConfig = (width: number, height: number) => {
    // Fixed aspect ratios for images
    const jarAspectRatio = 250 / 250; // square
    
    // Base sizes adjustable here
    const baseJarWidth = 300;

    if (!width || !height) {
        return {
            totalHeightVh: 100,
            headlineExitStart: 0,
            headlineExitEnd: 0.5,
            headlineY: "-100%",
            headlineOpacityEnd: 0.2,
            subHeadlineExitStart: 0,
            subHeadlineExitEnd: 0.6,
            subHeadlineY: "-500%",
            subHeadlineOpacityEnd: 0.25,
            jarExitStart: 0,
            jarExitEnd: 0.7,
            jarY: "-100%",
            jarOpacityEnd: 0.25,
            jar: {
                leftPct: 10,
                topPct: 0,
                widthPct: (baseJarWidth / refWidth) * 100,
                paddingBottomPct: jarAspectRatio * 100,
            },
            socialProof: {  // Renamed to passportText for clarity
                leftPct: 0,
                topPct: (-75 / refHeight) * 100,
            },
        };
    }
    
    // Calculate percentages based on current screen size (positions scale with screen)
    const jarLeftPct = (-50 / refWidth) * 100;
    const jarTopPct = (0 / refHeight) * 100;
    const jarWidthPct = (baseJarWidth / refWidth) * 100;
    
    const socialLeftPct = (180 / refWidth) * 100;  // Position controls for passport text
    const socialTopPct = (-200 / refHeight) * 100;

    return {
        totalHeightVh: 100,

        /** ---- PHASE 1 (Essentia exit) ---- */
        // headline
        headlineExitStart: 0,
        headlineExitEnd: 0.5, // Increased to slow down animation
        headlineY: "-100%",
        headlineOpacityEnd: 0.2,

        // sub-headline
        subHeadlineExitStart: 0,
        subHeadlineExitEnd: 0.6, // Increased to slow down animation
        subHeadlineY: "-100%",
        subHeadlineOpacityEnd: 0.25,

        // product jar
        jarExitStart: 0,
        jarExitEnd: 0.7, // Increased to slow down animation
        jarY: "-100%",
        jarOpacityEnd: 0.25,

        /** ---- JAR POSITION & SIZE (% of vw/vh) ---- */
        jar: {
            leftPct: jarLeftPct,
            topPct: jarTopPct,
            widthPct: jarWidthPct,
            paddingBottomPct: jarAspectRatio * 100, // Fixed aspect ratio
        },

        /** ---- PASSPORT TEXT POSITION (% of vw/vh) ---- */
        socialProof: {  // Maintains same positioning system
            leftPct: socialLeftPct,
            topPct: socialTopPct,
        },
    };
};

/* ==============================================================
   END OF DYNAMIC CONFIGURATION
   ============================================================== */

const customerImages = [
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg",

  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_Krishnendhu_dxtah5.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_girish_wcph4p.jpg",
].map((url) => url.trim());

export default function HeroSectionContent() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { width, height } = useWindowSize();

  // Your entire CONFIG is now recalculated whenever the window size changes
  const CONFIG = useMemo(() => getDynamicConfig(width || 1366, height || 768), [width, height]);

  // Dynamic grid spans (total 12 columns) - adjusted for better jar space on smaller screens
  const leftSpan = useMemo(() => width && width < 1280 ? 4 : 5, [width]);
  const middleSpan = useMemo(() => width && width < 1280 ? 4 : 3, [width]); // Increased middle span slightly for more jar room
  const rightSpan = useMemo(() => 12 - leftSpan - middleSpan, [leftSpan, middleSpan]);
  const middleStart = useMemo(() => leftSpan + 1, [leftSpan]);

  // Get navbar height on mount
  useEffect(() => {
    const navbar = document.querySelector('header[data-navbar="main"]');
    if (navbar) {
      const height = navbar.getBoundingClientRect().height;
      setNavbarHeight(height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [`start ${navbarHeight}px`, `end 0.1`], // Changed offset to make it shorter
  });

  /* -------------------- PHASE 1 TRANSFORMS -------------------- */
  const headlineY = useTransform(
    scrollYProgress,
    [CONFIG.headlineExitStart, CONFIG.headlineExitEnd],
    ["0%", CONFIG.headlineY]
  );
  const headlineOpacity = useTransform(
    scrollYProgress,
    [CONFIG.headlineExitStart, CONFIG.headlineExitEnd],
    [1, 0]
  );
  const subHeadlineY = useTransform(
    scrollYProgress,
    [CONFIG.subHeadlineExitStart, CONFIG.subHeadlineExitEnd],
    ["0%", CONFIG.subHeadlineY]
  );
  const subHeadlineOpacity = useTransform(
    scrollYProgress,
    [CONFIG.subHeadlineExitStart, CONFIG.subHeadlineExitEnd],
    [1, 0]
  );
  const jarY = useTransform(
    scrollYProgress,
    [CONFIG.jarExitStart, CONFIG.jarExitEnd],
    ["-20%", "0%"]
  );
  const jarOpacity = useTransform(
    scrollYProgress,
    [CONFIG.jarExitStart, CONFIG.jarExitEnd],
    [1, 0]
  );

  return (
    <section
      ref={targetRef}
      style={{ 
        backgroundColor: "#f8f5f0",
        height: `${CONFIG.totalHeightVh}vh`   // Now 100vh
      }}
      className="relative"
    >
      {/* STICKY CONTAINER */}
      <div className="h-screen sticky top-0 overflow-hidden flex items-center">
        {/* -------------------- PHASE 1 (EXIT) -------------------- */}
        <div className="absolute inset-0 px-6 z-10 pointer-events-none">
          <div className="container mx-auto h-full">
            <div className="grid grid-cols-12 gap-x-8 h-full items-center">
              {/* LEFT – HEADLINE + PASSPORT TEXT */}
              <motion.div
                style={{
                  y: headlineY,
                  opacity: headlineOpacity,
                  gridColumn: `span ${leftSpan}`,
                }}
                className="space-y-8"
              >
                <motion.h1
                  initial={{ y: 0, x: 0, scale: 1 }}
                  animate={{ y: "-80%", x: "9%", scale: 1.1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-5x2 lg:text-6xl  text-[#25338e] leading-tight text-left "
                  style={{ fontSize: '140px', lineHeight: '1.1',padding: '0 4px',fontFamily: 'Medino' }}
                >
                  {/*
                  To use this font...,Use this CSS property...
Beona Danila.ttf,font-family: 'Beona Danila';
Medino.otf,font-family: 'Medino';
Mocktaile Typeface PERSONAL USE ONLY.otf,font-family: 'Mocktaile Typeface';
Rebeqa-Bold.ttf,font-family: 'Rebeqa'; font-weight: bold;
                  */}
                  <span 
                  className="inline-block bg-[#255cc9] " 
                style={{ padding: '0 4px', borderRadius: '0px' }}
                    >
                     
                  </span> Preventify
                </motion.h1>
                {/* PASSPORT TEXT – custom position (vh/vw responsive) */}
                <div
                  style={{
                    position: "relative",
                    left: `${CONFIG.socialProof.leftPct}vw`,  // Top position control
                    top: `${CONFIG.socialProof.topPct}vh`,   // Left position control
                    zIndex: 10,
                  }}
                >
                  <p 
                    className="text-xl md:text-2xl font-bold text-[#3d3d3d] leading-tight"
                    style={{ fontSize: '27px' }}  // Size control
                  >
                    Your 365-Day Health Passport
                  </p>
                </div>
              </motion.div>
              {/* MIDDLE – JAR */}
              <motion.div
                style={{
                  y: jarY,
                  opacity: jarOpacity,
                  gridColumn: `${middleStart} / span ${middleSpan}`,
                }}
                className="flex justify-center items-center"
              >
                <div
                  style={{
                    position: "relative",
                    left: `${CONFIG.jar.leftPct}vw`,
                    top: `calc(${CONFIG.jar.topPct}vh -60px)`,
                    width: `${CONFIG.jar.widthPct}vw`,
                    paddingBottom: `${CONFIG.jar.paddingBottomPct}%`,
                    zIndex: 10,
                  }}
                >
                  <Image
                    src="/RAW_IMG/11475317.png"
                    alt="Skincare cream jar"
                    fill
                    sizes={`${CONFIG.jar.widthPct}vw`}
                    className="object-contain"
                  />
                </div>
              </motion.div>
              {/* RIGHT – SUB-HEADLINE */}
              <motion.div
                style={{
                  y: subHeadlineY,
                  opacity: subHeadlineOpacity,
                  gridColumn: `span ${rightSpan} / -1`,
                }}
                className="max-w-md text-right ml-auto"
              >
                <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
                  We strip away the unnecessary to focus on what truly works.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <FixedWatermark />
      </div>
    </section>
   
  );
}