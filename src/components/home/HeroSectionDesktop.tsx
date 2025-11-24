'use client';


import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import ScrollRevealText from "../ScrollRevealText";
import { useWindowSize } from "@/hooks/use-window-size";
import FixedWatermark from "@/components/home/FixedWatermark";
const { useRef, useState, useMemo, useEffect } = React;
const ScrollTypewriter = ({ 
  text, 
  progress, 
  start, 
  end, 
  className 
}: { 
  text: string, 
  progress: MotionValue<number>, 
  start: number, 
  end: number, 
  className?: string 
}) => {
  const words = text.split(" ");
  // We calculate the step size based on the total range (end - start) divided by word count
  const range = end - start;
  const step = range / words.length;

  return (
    <span className={className}>
      {words.map((word, i) => {
        // Calculate the specific scroll range for this word
        const wordStart = start + (i * step);
        // We make the word fade in quickly within its specific slice
        const wordEnd = wordStart + step; 
        
        // Map scroll progress to opacity: starts dim (0.15) and turns fully visible (1)
        const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
        
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};

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
const ScrollRevealWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <ScrollRevealText className={className}>{children}</ScrollRevealText>
);
/* ==============================================================
   DYNAMIC CONFIGURATION – Calculates layout based on screen size
   ============================================================== */
const getDynamicConfig = (width: number, height: number) => {
    // Fixed aspect ratios for images
    const handAspectRatio = 400 / 550; // height / width
    const jarAspectRatio = 250 / 250; // square
    
    // Base sizes adjustable here
    const baseHandWidth = 450; // Reduced from 550 for smaller hand (adjust as needed, e.g., 400 for even smaller)
    const baseJarWidth = 300; // Increased to 350 for larger jar visibility
    const baseHandLeft = 450; // Adjusted from 350 to move hand slightly to the right (increase this value to move further right)

    if (!width || !height) {
        return {
            totalHeightVh: 200,
            headlineExitStart: 0,
            headlineExitEnd: 0.25,
            headlineY: "-100%",
            headlineOpacityEnd: 0.2,
            subHeadlineExitStart: 0,
            subHeadlineExitEnd: 0.35,
            subHeadlineY: "-100%",
            subHeadlineOpacityEnd: 0.25,
            jarExitStart: 0,
            jarExitEnd: 0.35,
            jarY: "-100%",
            jarOpacityEnd: 0.25,
            handExitStart: 0,
            handExitEnd: 0.2,
            handY: "40vh",
            handBottomOffset: 12,
            handOpacityEnd: 1,
            text: {
                appearStart: 0.4,
                appearEnd: 0.5,
                blurAmount: 12,
                shiftPct: 13.02,
            },
            hand: {
                leftPct: (baseHandLeft / refWidth) * 100,
                topPct: (110 / refHeight) * 100,
                widthPct: (baseHandWidth / refWidth) * 100,
                paddingBottomPct: handAspectRatio * 100,
            },
            jar: {
                leftPct: 10,
                topPct: 0,
                widthPct: (baseJarWidth / refWidth) * 100,
                paddingBottomPct: jarAspectRatio * 100,
            },
            socialProof: {
                leftPct: 0,
                topPct: (-75 / refHeight) * 100,
            },
        };
    }
    
    // Calculate percentages based on current screen size (positions scale with screen)
    const handLeftPct = (baseHandLeft / refWidth) * 100;
    const handTopPct = (450 / refHeight) * 100;
    const handWidthPct = (baseHandWidth / refWidth) * 100;
    
    const jarLeftPct = (-50 / refWidth) * 100;
    const jarTopPct = (0 / refHeight) * 100;
    const jarWidthPct = (baseJarWidth / refWidth) * 100;
    
    const socialLeftPct = (0 / refWidth) * 100;
    const socialTopPct = (-110 / refHeight) * 100;

    return {
        totalHeightVh: 200,

        /** ---- PHASE 1 (Essentia exit) ---- */
        // headline
        headlineExitStart: 0,
        headlineExitEnd: 0.25,
        headlineY: "-100%",
        headlineOpacityEnd: 0.2,

        // sub-headline
        subHeadlineExitStart: 0,
        subHeadlineExitEnd: 0.35,
        subHeadlineY: "-100%",
        subHeadlineOpacityEnd: 0.25,

        // product jar
        jarExitStart: 0,
        jarExitEnd: 0.35,
        jarY: "-100%",
        jarOpacityEnd: 0.25,

        // hand
        handExitStart: 0,
        handExitEnd: 0.7,
        handY: "40vh",
        handOpacityEnd: 1,

        /** ---- FINAL TEXT CONTROLS ---- */
        text: {
            appearStart: 0.3,
            appearEnd: 0.9,
            blurAmount: 1.4,
            shiftPct: (80 / height) * 100, // Dynamic shift based on current height (~13vh equivalent)
        },

        /** ---- HAND POSITION & SIZE (% of vw/vh) ---- */
        hand: {
            leftPct: handLeftPct,
            topPct: handTopPct,
            widthPct: handWidthPct,
            paddingBottomPct: handAspectRatio * 100, // Fixed aspect ratio
        },

        /** ---- JAR POSITION & SIZE (% of vw/vh) ---- */
        jar: {
            leftPct: jarLeftPct,
            topPct: jarTopPct,
            widthPct: jarWidthPct,
            paddingBottomPct: jarAspectRatio * 100, // Fixed aspect ratio
        },

        /** ---- SOCIAL PROOF POSITION (% of vw/vh) ---- */
        socialProof: {
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

export default function HeroSectionDesktop() {
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
    offset: [`start ${navbarHeight}px`, `end end`],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
// Add this function inside your component (before the return statement)
  const getFallDistance = () => {
    if (!height) return '0vh'; // Fallback if height is undefined
    let x =0.3 +0.0150;
    return `${height * x }px`; // 50% of screen height
  };
  /* -------------------- PHASE 1 TRANSFORMS -------------------- */
  const headlineY = useTransform(
    smooth,
    [CONFIG.headlineExitStart, CONFIG.headlineExitEnd],
    ["0%", CONFIG.headlineY]
  );
  const headlineOpacity = useTransform(
    smooth,
    [CONFIG.headlineExitStart, CONFIG.headlineExitEnd],
    [1, 0]
  );
  const subHeadlineY = useTransform(
    smooth,
    [CONFIG.subHeadlineExitStart, CONFIG.subHeadlineExitEnd],
    ["0%", CONFIG.subHeadlineY]
  );
  const subHeadlineOpacity = useTransform(
    smooth,
    [CONFIG.subHeadlineExitStart, CONFIG.subHeadlineExitEnd],
    [1, 0]
  );
  const jarY = useTransform(
    smooth,
    [CONFIG.jarExitStart, CONFIG.jarExitEnd],
    ["-20%", "0%"]
  );
  const jarOpacity = useTransform(
    smooth,
    [CONFIG.jarExitStart, CONFIG.jarExitEnd],
    [1, 0]
  );

  /* -------------------- HAND ANIMATION -------------------- */
  const handY = useTransform(
    smooth,
    [CONFIG.handExitStart, CONFIG.handExitEnd],
    ["15vh", CONFIG.handY]
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
  const textYEnd = `calc(0vh - ${CONFIG.text.shiftPct}vh)`;
  const textY = useTransform(
    smooth,
    [0, 1],
    ["150vh", textYEnd]
  );

  return (
    <section
      ref={targetRef}
      style={{ 
        backgroundColor: "#f8f5f0",
        height: `${CONFIG.totalHeightVh}vh`   // ← THIS is the fix
      }}
      className="relative"
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
                  opacity: headlineOpacity,
                  gridColumn: `span ${leftSpan}`,
                }}
                className="space-y-8"
              >
                <motion.h1
                  initial={{ y: 0, x: 0, scale: 1 }}
                  animate={{ y: "-200%", x: "5%", scale: 1.4 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-5xl lg:text-6xl font-bold text-[#25338e]  leading-tight text-left font-sans-serif"
                  style={{ fontSize: '72px', lineHeight: '1.1', fontWeight: 500 }}
                >
                  <span 
                  className="inline-block bg-[#255cc9] text-white font-sans-serif text-[#3d3d3d] font-semibold " 
                style={{ padding: '0 4px', borderRadius: '0px' }}
                    >
                     
                  </span> Preventify
                </motion.h1>
                {/* SOCIAL PROOF – custom position (vh/vw responsive) */}
                <div
                  style={{
                    position: "relative",
                    left: `${CONFIG.socialProof.leftPct}vw`,
                    top: `${CONFIG.socialProof.topPct}vh`,
                    zIndex: 10,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex -space-x-2">
                      {customerImages.map((src, i) => (
                        <div
                          key={i}
                          className="w-8 h-9 rounded overflow-hidden border-3.5 border-white"
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
                           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-[#3d3d3d] mt-1" style={{ fontSize: '14px' }}>
                        35,000+ Happy Patients
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* MIDDLE – JAR */}
              <motion.div
                style={{
                  y: jarY,
                  opacity: jarOpacity,
                  gridColumn: `${middleStart} / span ${middleSpan}`,
                }}
                className="flex justify-center items-center" // Added items-center for better vertical alignment
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
                className="max-w-md text-right ml-auto" // Added ml-auto to push to right if needed
              >
                <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
                  We strip away the unnecessary to focus on what truly works.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        {/* HAND – MOVES DOWN SMOOTHLY */}
        {/* HAND – FALLS FROM JAR THEN STAYS FIXED */}
        <motion.div
        style={{
          opacity: handOpacity,
          willChange: 'opacity',
          position: 'absolute',
          left: `${CONFIG.hand.leftPct}vw`,
          bottom: `${CONFIG.handBottomOffset}px`,
        }}
        animate={{
          y: [1, getFallDistance()], // ← Falls from 0 to getFallDistance()
          transition: { 
            duration: 1.5, 
            ease: "easeOut" 
          }
        }}
        className="absolute z-0"
      >
        <div
          style={{
            position: "relative",
            width: `${CONFIG.hand.widthPct}vw`,
            paddingBottom: `${CONFIG.hand.paddingBottomPct}%`,
            zIndex: 1,
          }}
        >
          <Image
            src="/RAW_IMG/hand.avif"
            alt="Presenting hand"
            fill
            sizes={`${CONFIG.hand.widthPct}vw`}
            className="object-contain"
          />
        </div>
      </motion.div>
      <FixedWatermark />
        {/* FINAL TEXT – FULLY CONTROLLED POSITION */}
        <motion.div
          style={{
            // opacity: textOpacity, <--- REMOVED THIS so the typewriter handles visibility
            filter: textBlur,
            y: textY
          }}
          className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-30"
        >
          <div className="text-center max-w-4xl px-4">
            {/* REPLACED ScrollRevealWrapper WITH ScrollTypewriter */}
            <ScrollTypewriter 
              text="AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family."
              progress={smooth}
              start={CONFIG.text.appearStart}
              end={CONFIG.text.appearEnd}
              className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed"
            />
          </div>
        </motion.div>
      </div>
    </section>
   
  );
}
