'use client';

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import ScrollRevealText from "../ScrollRevealText";
import { useWindowSize } from "@/hooks/use-window-size";

/* ==============================================================
   REFERENCE LAYOUT – Based on 1366x768 screen
   ============================================================== */
const refWidth = 1366;
const refHeight = 768;

/* ==============================================================
   DYNAMIC CONFIGURATION – Calculates layout based on screen size
   ============================================================== */
const getDynamicConfig = (width: number, height: number) => {
    if (!width || !height) {
        // Return a default config for the server render or if window size is not available
        return {
            totalHeightVh: 300,
            headlineExitStart: 0,
            headlineExitEnd: 100,
            headlineY: "-100%",
            headlineOpacityEnd: 0,
            headlineAnimateX: '0px',
            headlineAnimateY: '0px',
            subHeadlineExitStart: 0,
            subHeadlineExitEnd: 100,
            subHeadlineY: "-100%",
            subHeadlineOpacityEnd: 0,
            jarExitStart: 0,
            jarExitEnd: 100,
            jarY: "-100%",
            jarOpacityEnd: 0,
            handExitStart: 0,
            handExitEnd: 150,
            handY: "180%",
            handOpacityEnd: 1,
            text: {
                appearStart: 100,
                appearEnd: 150,
                blurAmount: 12,
                yPosition: "50vh",
            },
            hand: { left: 0, top: 0, width: 1, height: 1 },
            jar: { left: 0, top: 0, width: 1, height: 1 },
            socialProof: { left: 0, top: 0 },
        };
    }
    
    const scaleFactor = width / refWidth;

    return {
        /** How tall the whole scroll-area is (vh) */
        totalHeightVh: 300,

        /** ---- PHASE 1 (Essentia exit) ---- */
        // headline
        headlineExitStart: 0, // Starts animating at scroll 0vh
        headlineExitEnd: 100, // Finishes exiting at scroll 100vh
        headlineY: "-100%",
        headlineOpacityEnd: 0, // Fade out completely
        headlineAnimateX: `${(3 / 100) * width}px`,
        headlineAnimateY: `${(-20 / 100) * height}px`,

        // sub-headline
        subHeadlineExitStart: 0,
        subHeadlineExitEnd: 100,
        subHeadlineY: "-100%",
        subHeadlineOpacityEnd: 0,

        // product jar (exits faster)
        jarExitStart: 0,
        jarExitEnd: 100,
        jarY: "-100%",
        jarOpacityEnd: 0,

        // hand (moves down continuously)
        handExitStart: 0, // Starts moving at 0vh
        handExitEnd: 150, // Finishes moving at 150vh
        handY: "180%", // Moves down by 180% of its height
        handOpacityEnd: 1, // Doesn't fade

        /** ---- FINAL TEXT CONTROLS ---- */
        text: {
            appearStart: 100, // Text starts appearing after 100vh of scroll
            appearEnd: 150,   // Fully visible after 150vh of scroll
            blurAmount: 12,
            yPosition: "50vh", // Final position is centered vertically
        },

        /** ---- HAND POSITION & SIZE (Dynamic) ---- */
        hand: {
            left: (350 / refWidth) * width,
            top: (110 / refHeight) * height,
            width: 550 * scaleFactor,
            height: 400 * scaleFactor,
        },

        /** ---- JAR POSITION & SIZE (Dynamic) ---- */
        jar: {
            left: 0,
            top: 0,
            width: 250 * scaleFactor,
            height: 250 * scaleFactor,
        },

        /** ---- SOCIAL PROOF POSITION (Dynamic) ---- */
        socialProof: {
            left: 0,
            top: -75 * scaleFactor,
        },
    };
};

/* ==============================================================
   END OF DYNAMIC CONFIGURATION
   ============================================================== */

const customerImages = [
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_tq7r.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_Krishnendhu_dxtah5.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_girish_wcph4p.jpg",
].map((url) => url.trim());

export default function HeroSectionDesktop() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { width, height } = useWindowSize();

  const CONFIG = useMemo(() => getDynamicConfig(width!, height!), [width, height]);

  useEffect(() => {
    const navbar = document.querySelector('header[data-navbar="main"]');
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [`start ${navbarHeight}px`, `end end`],
  });

  const scrollVh = useTransform(scrollYProgress, [0, 1], [0, CONFIG.totalHeightVh]);
  
  const smooth = useSpring(scrollVh, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* -------------------- PHASE 1 TRANSFORMS -------------------- */
  const headlineY = useTransform(
    smooth,
    [CONFIG.headlineExitStart, CONFIG.headlineExitEnd],
    ["0%", CONFIG.headlineY]
  );
  const headlineOpacity = useTransform(
    smooth,
    [CONFIG.headlineExitStart, CONFIG.headlineExitEnd],
    [1, CONFIG.headlineOpacityEnd]
  );

  const subHeadlineY = useTransform(
    smooth,
    [CONFIG.subHeadlineExitStart, CONFIG.subHeadlineExitEnd],
    ["0%", CONFIG.subHeadlineY]
  );
  const subHeadlineOpacity = useTransform(
    smooth,
    [CONFIG.subHeadlineExitStart, CONFIG.subHeadlineExitEnd],
    [1, CONFIG.subHeadlineOpacityEnd]
  );

  const jarY = useTransform(
    smooth,
    [CONFIG.jarExitStart, CONFIG.jarExitEnd],
    ["0%", CONFIG.jarY]
  );
  const jarOpacity = useTransform(
    smooth,
    [CONFIG.jarExitStart, CONFIG.jarExitEnd],
    [1, CONFIG.jarOpacityEnd]
  );

  /* -------------------- HAND ANIMATION -------------------- */
  const handY = useTransform(
    smooth,
    [CONFIG.handExitStart, CONFIG.handExitEnd],
    ["0%", CONFIG.handY]
  );
  const handOpacity = useTransform(
    smooth,
    [CONFIG.handExitStart, CONFIG.handExitEnd],
    [1, CONFIG.handOpacityEnd]
  );

  /* -------------------- FINAL TEXT ANIMATION -------------------- */
  const textOpacity = useTransform(
    smooth,
    [CONFIG.text.appearStart, CONFIG.text.appearEnd],
    [0, 1]
  );
  const textBlur = useTransform(
    smooth,
    [CONFIG.text.appearStart, CONFIG.text.appearEnd],
    [`blur(${CONFIG.text.blurAmount}px)`, 'blur(0px)']
  );
  const textY = useTransform(
    smooth,
    [CONFIG.text.appearStart, CONFIG.text.appearEnd],
    ["100vh", CONFIG.text.yPosition]
  );

  return (
    <section
      ref={targetRef}
      style={{ backgroundColor: "#f8f5f0" }}
      className={`relative h-[${CONFIG.totalHeightVh}vh]`}
    >
      {/* STICKY CONTAINER */}
      <div className="h-screen sticky top-0 overflow-hidden flex items-center">
        {/* -------------------- PHASE 1 (EXIT) -------------------- */}
        <div className="absolute inset-0 px-6 z-10 pointer-events-none">
          <div className="container mx-auto h-full">
            <div className="grid grid-cols-12 gap-x-8 h-full items-center">

              {/* LEFT – HEADLINE + SOCIAL */}
              <motion.div
                style={{ 
                  y: headlineY, 
                  opacity: headlineOpacity 
                }}
                className="col-span-12 md:col-span-5 space-y-8"
              >
                <motion.h1
                  initial={{ y: -100, x: 0, scale: 1 }}
                  animate={{ 
                    y: CONFIG.headlineAnimateY,
                    x: CONFIG.headlineAnimateX,
                    scale: 1.2 
                  }}
                  className="text-5xl lg:text-6xl font-semibold text-gray-700 leading-tight text-left font-stack-sans"
                  style={{ fontWeight: 600 }} 
                >
                  Support That Never Leaves You.
                </motion.h1>

                {/* SOCIAL PROOF – custom position */}
                <div
                  style={{
                    position: "relative",
                    left: `${CONFIG.socialProof.left}px`,
                    top: `${CONFIG.socialProof.top}px`,
                    zIndex: 9,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex -space-x-2">
                      {customerImages.map((src, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-md overflow-hidden border-2 border-white"
                        >
                          <Image
                            src={src}
                            alt={`Customer ${i + 1}`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.917c1.927-1.823 5.008-1.823 6.936 0L18 5.142l-2.136 7.86A2 2 0 0114.136 16H5.864a2 2 0 01-1.765-1.142L2 12.142V5.142C2 3.33 3.33 2 5.142 2h3.908z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        35,0000+ Happy Patients 
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* MIDDLE – JAR */}
              <motion.div
                style={{ 
                  y: jarY, 
                  opacity: jarOpacity 
                }}
                className="col-span-12 md:col-span-2 flex justify-center"
              >
                <div
                  style={{
                    position: "relative",
                    left: `${CONFIG.jar.left}px`,
                    top: `${CONFIG.jar.top}px`,
                    zIndex: 10,
                  }}
                >
                  <Image
                    src="/RAW_IMG/11475317.png"
                    alt="Skincare cream jar"
                    width={CONFIG.jar.width}
                    height={CONFIG.jar.height}
                    className="object-contain max-w-none"
                  />
                </div>
              </motion.div>

              {/* RIGHT – SUB-HEADLINE */}
              <motion.div
                style={{ 
                  y: subHeadlineY, 
                  opacity: subHeadlineOpacity 
                }}
                className="col-span-12 md:col-span-5 max-w-md text-right ml-auto"
              >
                <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
                  We strip away the unnecessary to focus on what truly works.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* HAND – MOVES DOWN SMOOTHLY AND STICKS TO BOTTOM */}
        <motion.div
          style={{
            y: handY,
            opacity: handOpacity,
            position: "absolute",
            left: `${CONFIG.hand.left}px`,
            top: `${CONFIG.hand.top}px`,
            zIndex: 1,
            willChange: 'transform, opacity'
          }}
        >
          <Image
            src="/RAW_IMG/hand.avif"
            alt="Presenting hand"
            width={CONFIG.hand.width}
            height={CONFIG.hand.height}
            className="object-contain"
          />
        </motion.div>

        {/* FINAL TEXT – CENTERED WITH DYNAMIC POSITIONING */}
        <motion.div
          style={{ 
            opacity: textOpacity,
            filter: textBlur,
            y: textY
          }}
          className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-30 pointer-events-none"
        >
          <div className="text-center max-w-4xl px-4">
            <ScrollRevealText className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
              AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family. Select Clinic
            </ScrollRevealText>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
