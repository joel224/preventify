// app/components/home/HeroSection.tsx (NEW COMBINED COMPONENT)
// Replace your existing HeroSectionDesktop.tsx and HeroSectionTwoDesktop.tsx with this.
// It merges both into ONE tall sticky section with shared scroll progress.
// - Phase 1 (0-0.5 progress): Exact Essentia exit choreo (headline up fast, sub up normal, jar up slow, hand down fast).
// - Phase 2 (0.5-1 progress): Enter second hero (fade/scale text/image, staggered).
// - Total height: 400vh for smooth flow (adjust if needed).
// - Keeps ALL your custom x/y/size controls (left/top/zIndex/style tweaks).
// - Background: #f8f5f0 from page.tsx.
// - Uses Framer Motion for exact cinematic feel (spring smoothed).
// - In page.tsx: Remove <HeroSectionTwo />, keep only <HeroSection /> in the 200vh div (or extend to 400vh if needed for testing).

'use client';
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ScrollRevealText from "../ScrollRevealText"; // Assuming this exists; if not, remove or implement simple stagger.

// Customer images from your code (5 doctors)
const customerImages = [
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_Krishnendhu_dxtah5.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_girish_wcph4p.jpg"
].map((url) => url.trim());

const HeroSection = () => {
  // SINGLE REF for the entire tall hero (combines both phases)
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll across 400vh (full progress 0-1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // Start when top hits top; end when bottom hits bottom
  });

  // Spring for buttery smooth cinematic motion (like Essentia)
  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // === PHASE 1: EXIT ANIMATION (0-0.5) - EXACT ESSENTIA CHOREO ===
  // Headline: UP fast (exits quick, -200% over short range)
  const headlineY = useTransform(smoothYProgress, [0, 0.25], ["0%", "-200%"]);
  const headlineOpacity = useTransform(smoothYProgress, [0, 0.2], [1, 0]);

  // Sub-headline: UP normal (-100% over medium range)
  const subHeadlineY = useTransform(smoothYProgress, [0, 0.35], ["0%", "-100%"]);
  const subHeadlineOpacity = useTransform(smoothYProgress, [0, 0.25], [1, 0]);

  // Jar: UP slow (stays longest, -20% over full phase)
  const productY = useTransform(smoothYProgress, [0, 0.5], ["0%", "-20%"]); // UP slow (negative Y), not down like your old code
  const productOpacity = useTransform(smoothYProgress, [0, 0.4], [1, 0]); // Fades late

  // Hand: DOWN fast (+150% quick)
  const handY = useTransform(smoothYProgress, [0, 0.2], ["0%", "150%"]);
  const handOpacity = useTransform(smoothYProgress, [0, 0.15], [1, 0]);

  // === PHASE 2: ENTER ANIMATION (0.5-1) - FROM HEROSECTIONTWO ===
  // Overall fade/scale in (starts at 0.5 progress)
  const enterOpacity = useTransform(smoothYProgress, [0.5, 0.7], [0, 1]);
  const enterScale = useTransform(smoothYProgress, [0.5, 0.7], [0.9, 1]);

  // Text stagger delay (slight offset for reveal)
  const textDelay = useTransform(smoothYProgress, [0.5, 0.7], [0.2, 0]);

  // Hide phase 1 elements in phase 2 (fully out)
  const phase1Hide = useTransform(smoothYProgress, [0.5, 0.6], [0, 0]); // Force opacity 0 after exit

  return (
    // TALL PARENT WRAPPER (400vh total for both phases)
    <section
      ref={targetRef}
      style={{ backgroundColor: "#f8f5f0" }} // From your page.tsx
      className="relative h-[400vh]" // Extended for combined flow
    >
      {/* SINGLE STICKY CONTAINER (pins for entire duration) */}
      <div className="h-screen sticky top-0 overflow-hidden flex items-center">
        
        {/* === PHASE 1 CONTENT: EXITING ELEMENTS (Z-10 for layering) === */}
        <div className="absolute inset-0 px-6 z-10 pointer-events-none">
          <div className="container mx-auto h-full">
            <div className="grid grid-cols-12 gap-x-8 h-full items-center">

              {/* LEFT: HEADLINE + SOCIAL PROOF */}
              <motion.div
                style={{
                  y: headlineY,
                  opacity: [headlineOpacity, phase1Hide], // Chain for hide
                }}
                className="col-span-12 md:col-span-5 space-y-8"
              >
                {/* Main Headline */}
                <motion.h1
                  initial={{ y: 0, x: 0, scale: 1 }}
                  animate={{ y: '-100%', x: '2%', scale: 1.2 }} // Your initial animate (kept)
                  className="text-5xl lg:text-5xl font-bold text-gray-740 leading-tight text-left"
                >
                  Care That Follows Up, So You Stay on Track
                </motion.h1>

                {/* CUSTOM POSITIONED SOCIAL PROOF */}
                <div
                  style={{
                    // YOUR CUSTOM CONTROLS (unchanged - tweak here)
                    position: 'relative',
                    left: '0px',   // ← Horizontal tweak
                    top: '-75px',  // ← Vertical tweak
                    zIndex: 9,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatars */}
                    <div className="flex -space-x-2">
                      {customerImages.map((src, index) => (
                        <div key={index} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                          <Image
                            src={src}
                            alt={`Customer ${index + 1}`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    {/* Stars + Count */}
                    <div className="flex flex-col">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.917c1.927-1.823 5.008-1.823 6.936 0L18 5.142l-2.136 7.86A2 2 0 0114.136 16H5.864a2 2 0 01-1.765-1.142L2 12.142V5.142C2 3.33 3.33 2 5.142 2h3.908z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">2500+ Happy Customers</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* MIDDLE: PRODUCT JAR */}
              <motion.div
                style={{
                  y: productY,
                  opacity: [productOpacity, phase1Hide],
                }}
                className="col-span-12 md:col-span-2 flex justify-center"
              >
                <div
                  style={{
                    // YOUR CUSTOM CONTROLS (unchanged)
                    position: 'relative',
                    left: '0px',   // ← Horizontal
                    top: '0px',    // ← Vertical
                    zIndex: 10,
                  }}
                >
                  <Image
                    src="/RAW_IMG/11475317.png"
                    alt="Skincare cream jar"
                    width={250}
                    height={250}
                    className="object-contain w-[250px] h-[250px] max-w-none" // Your size control
                  />
                </div>
              </motion.div>

              {/* RIGHT: SUB-HEADLINE */}
              <motion.div
                style={{
                  y: subHeadlineY,
                  opacity: [subHeadlineOpacity, phase1Hide],
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

        {/* HAND IMAGE - CUSTOM POSITION */}
        <motion.div
          style={{
            y: handY,
            opacity: [handOpacity, phase1Hide],
          }}
          className="absolute z-0"
        >
          <div
            style={{
              // YOUR CUSTOM CONTROLS (unchanged - tweak hand here)
              position: 'relative',
              left: '290px',   // ← Horizontal
              top: '250px',    // ← Vertical
              zIndex: 1,
            }}
          >
            <Image
              src="/RAW_IMG/hand.avif"
              alt="Presenting hand"
              width={600}
              height={400}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* === PHASE 2 CONTENT: ENTERING ELEMENTS (Z-20 to layer over phase 1) === */}
        <motion.div
          style={{
            opacity: enterOpacity,
            scale: enterScale,
          }}
          className="absolute inset-0 px-6 z-20 pointer-events-none"
        >
          <div className="container mx-auto h-full">
            <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
              {/* LEFT: TEXT */}
              <div className="space-y-8">
                <ScrollRevealText
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  wordDelay={0.08}
                  lineDelay={0.1}
                  style={{ delay: textDelay }} // Your stagger
                >
                  Prevention powered by always-on intelligence
                </ScrollRevealText>
                <p className="mt-6 text-preventify-dark-gray">
                  Kerala's AI-assisted, evidence-based care for early intervention and better health for your family.
                </p>
              </div>

              {/* RIGHT: IMAGE */}
              <div className="relative h-[600px] flex justify-center items-center">
                <div className="w-[600px] h-[600px] rounded-full overflow-hidden">
                  <Image
                    src="/RAW_IMG/Adobe Express - file (16).png"
                    alt="Happy professional working on a laptop"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                    data-ai-hint="people working"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;