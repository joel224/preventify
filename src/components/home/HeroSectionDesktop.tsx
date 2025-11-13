// src/components/home/HeroSectionDesktop.tsx
'use client';
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// NOTE: I'm using the original Essentia image paths. 
// Replace with your 'doctorImages' array if you prefer.
const customerImages = [
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_Krishnendhu_dxtah5.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_girish_wcph4p.jpg" 
].map((url) => url.trim()); // Assuming 5 images like before


const HeroSectionDesktop = () => {
  // 1. Create a ref for the TALL parent wrapper
  const targetRef = useRef<HTMLDivElement>(null);

  // 2. Track the scroll progress of the 300vh parent
  //    offset: ["start start", "end end"] means:
  //    - Start at 0 when the top of the 300vh div hits the top of the screen.
  //    - End at 1 when the bottom of the 300vh div hits the bottom of the screen.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Add spring for smoothness
  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // === ANIMATIONS MAPPED TO THE 300VH SCROLL ===
  // These ranges (e.g., [0, 0.3]) fine-tune *when* during the
  // 300vh scroll each animation happens.

  // Headline moves UP and OUT
  const headlineY = useTransform(smoothYProgress, [0, 0.3], ["0%", "-150%"]);
  const headlineOpacity = useTransform(smoothYProgress, [0, 0.25], [1, 0]);

  // Product jar moves DOWN (not up)
  // This creates the effect from the images!
  const productY = useTransform(smoothYProgress, [0, 1], ["0%", "150%"]);
  const productOpacity = useTransform(smoothYProgress, [0.05, 0.2], [1, 0]); // Fades out quick

  // Hand moves DOWN and OUT (faster)
  const handY = useTransform(smoothYProgress, [0, 1], ["0%", "250%"]);
  const handOpacity = useTransform(smoothYProgress, [0, 0.25], [1, 0]);

  // Sub-headline moves UP and OUT
  const subHeadlineY = useTransform(smoothYProgress, [0, 0.3], ["0%", "-100%"]);
  const subHeadlineOpacity = useTransform(smoothYProgress, [0, 0.25], [1, 0]);

 

  return (
    // 3. This is the 300vh parent wrapper.
    //    We attach the ref here.
    <section
      ref={targetRef}
      className="h-[300vh] relative" // Set the "pinning" duration
    >
      {/* 4. This is the STICKY container that holds the content.
           It stays pinned for the entire 300vh. */}
      <div className="h-screen sticky top-0 overflow-hidden">
        
        

        {/* Main Hero Content - 12-Column Grid System */}
        <div className="absolute inset-0 flex items-center px-6 z-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-x-8 items-center">

              {/* LEFT COLUMN: Headline + Social Proof */}
              <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="col-span-12 md:col-span-5 space-y-8 z-10">
                {/* Main Headline - LEFT ALIGNED */}
              <motion.h1
                initial={{ y: 0, x: 0, scale: 1 }}
                animate={{ y: '-100%', x: '2%', scale: 1.2 }}
                className="text-5xl lg:text-5xl font-bold text-gray-740 leading-tight text-left"
              >
                Care That Follows Up, So You Stay on Track
              </motion.h1>
                
                {/* Customer Avatars + Stars + Count - MANUAL POSITION CONTROL */}
                <div
                  style={{
                    // ✅ YOU CONTROL THESE VALUES MANUALLY
                    position: 'relative',
                    left: '0px',   // ← adjust horizontally
                    top: '-75px',    // ← adjust vertically
                    zIndex: 9,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Customer Avatars */}
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

              {/* MIDDLE COLUMN: Product Image */}
              <motion.div
                style={{ y: productY, opacity: productOpacity }}
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
                    src="/RAW_IMG/11475317.png" // Use your actual path
                    alt="Skincare cream jar"
                    width={250}
                    height={250}
                    className="object-contain w-[250px] h-[250px] max-w-none" // Ensures size control
                  />
                </div>
              </motion.div>

              {/* RIGHT COLUMN: Sub-headline */}
              <motion.div
                style={{ y: subHeadlineY, opacity: subHeadlineOpacity }}
                className="col-span-12 md:col-span-5 max-w-md text-right ml-auto z-10"
              >
                <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
                  We strip away the unnecessary to focus on what truly works.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 🖐️ HAND IMAGE - MANUAL POSITION CONTROL ADDED */}
        <motion.div
          style={{ y: handY, opacity: handOpacity }}
          className="absolute z-0" // Removed left-1/2 -translate-x-1/2 bottom-0 to allow manual control
        >
          {/* Wrap the Image in a div with manual positioning */}
          <div
            style={{
              // ✅ YOU CONTROL THESE VALUES MANUALLY FOR THE HAND
              position: 'relative',
              left: '290px',   // ← adjust hand horizontally
              top: '250px',    // ← adjust hand vertically
              zIndex: 0,     // Adjust if needed relative to other elements
            }}
          >
            <Image
              src="/RAW_IMG/hand.avif" // Use your actual path
              alt="Presenting hand"
              width={600}
              height={400}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionDesktop;
