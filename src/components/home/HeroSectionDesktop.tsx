'use client';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSectionDesktop = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  // === ANIMATIONS ===


  return (
    <section
      ref={targetRef}
      className="h-screen bg-white relative overflow-hidden"
    >
      
      {/* Main Hero Content - 12-Column Grid System */}
      <div className="absolute inset-0 flex items-center px-6">
        <div className="container mx-auto">
          {/* 🧭 12-COLUMN GRID SYSTEM - CUSTOMIZABLE GUTTER & SPAN */}
          {/* ⚙️ HOW TO USE:
               - Adjust 'gap-x-8' to change horizontal spacing between columns
               - Use 'col-span-X' to control how many columns an element spans
               - For mobile: add 'md:col-span-12' etc. for responsive behavior
               - Change 'grid-cols-12' to 'grid-cols-6' or 'grid-cols-24' for finer control
          */}
          <div className="grid grid-cols-12 gap-x-8 items-center">

            {/* LEFT COLUMN: Headline + Social Proof (Spans 5 columns) */}
            <div className="col-span-12 md:col-span-5 space-y-8">
              {/* Main Headline - LEFT ALIGNED */}
              <motion.h1
                animate={{ y: '-15%', x: '0%', scale: 1 }}
                className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight text-left"
              >
                Your healthiest<br />skin revealed
              </motion.h1>

              {/* Customer Avatars + Stars + Count */}
              <div className="flex items-start space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={`/avatar-${i}.jpg`}
                        alt={`Customer ${i}`}
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
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        {/* ✅ CORRECT STAR ICON PATH */}
                        <path d="M9.049 2.917c1.927-1.823 5.008-1.823 6.936 0L18 5.142l-2.136 7.86A2 2 0 0114.136 16H5.864a2 2 0 01-1.765-1.142L2 12.142V5.142C2 3.33 3.33 2 5.142 2h3.908z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">2500+ Happy Customers</p>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN: Product Image (Spans 2 columns) */}
            <motion.div
              animate={{ y: '20%', x: '0%', scale: 1 }}
              className="col-span-12 md:col-span-2 flex justify-center z-10"
            >
              <div
                style={{
                  // ✅ YOU CONTROL THESE VALUES MANUALLY
                  position: 'relative',
                  left: '0px',   // ← adjust horizontally
                  top: '0px',    // ← adjust vertically
                  zIndex: 10,
                }}
              >
                <Image
                  src="/RAW_IMG/Adobe Express - file (16).png"
                  alt="Skincare cream jar"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Sub-headline (Spans 5 columns) */}
            <motion.div
              style={{
                opacity: 1,
                y: '0px',
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

      {/* 🖼️ BACKGROUND HAND IMAGE - FIXED POSITION */}
      {/* ⚙️ HOW TO USE:
           - Replace "/hand-background.png" with your actual image path
           - Adjust width/height to fit your design
           - Modify opacity or position if needed
      */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-auto z-0 opacity-10 pointer-events-none">
        <Image
          src="/hand-background.png" // <-- REPLACE THIS WITH YOUR IMAGE PATH
          alt="Presenting hand watermark"
          width={600}
          height={400}
          className="w-full h-auto"
          objectFit="contain"
          objectPosition="bottom"
        />
      </div>

      {/* 🔤 FIXED Background Watermark "Essentia" - No Animation, No Movement */}
      <div
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none z-0"
        style={{
          opacity: 0.1,
          fontSize: '200px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          color: '#000',
          textAlign: 'center',
          lineHeight: '1',
          WebkitTextStroke: '1px #fff',
          textShadow: '0 0 20px rgba(255,255,255,0.8)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        Essentia
      </div>

    </section>
  );
};

export default HeroSectionDesktop;
