
'use client';
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const doctorImages = [
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_Krishnendhu_dxtah5.jpg",
  "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255860/Dr_girish_wcph4p.jpg"
].map((url) => url.trim());

const HeroSectionDesktop = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Add spring physics for smoother animations
  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const imageY = useTransform(smoothYProgress, [0, 1], ["0%", "50%"]);
  const handY = useTransform(smoothYProgress, [0, 1], ["0%", "120%"]); // Moves faster
  const textY = useTransform(smoothYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section
      ref={targetRef}
      className="h-screen relative overflow-hidden"
    >
      
      {/* Main Hero Content - 12-Column Grid System */}
      <div className="absolute inset-0 flex items-center px-6">
        <div className="container mx-auto">
          {/* 🧭 12-COLUMN GRID SYSTEM - CUSTOMIZABLE GUTTER & SPAN */}
          <div className="grid grid-cols-12 gap-x-8 items-center">

            {/* LEFT COLUMN: Headline + Social Proof (Spans 5 columns) */}
            <motion.div style={{ y: textY }} className="col-span-12 md:col-span-5 space-y-8">
              {/* Main Headline - LEFT ALIGNED */}
              <motion.h1
                animate={{ y: '-170%', x: '2%', scale: 1.2 }}
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
                  top: '-130px',    // ← adjust vertically
                  zIndex: 9,
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* Doctor Avatars */}
                  <div className="flex -space-x-2">
                    {doctorImages.map((src, index) => (
                      <div key={index} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src={src}
                          alt={`Doctor ${index + 1}`}
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
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.917c1.927-1.823 5.008-1.823 6.936 0L18 5.142l-2.136 7.86A2 2 0 0114.136 16H5.864a2 2 0 01-1.765-1.142L2 12.142V5.142C2 3.33 3.33 2 5.142 2h3.908z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">30,000+ Happy Patients</p>
                  </div>
                </div>
              </div>
            </motion.div> {/* ← ADDED: LEFT COLUMN CLOSE */}

            {/* MIDDLE COLUMN: Product Image (Spans 2 columns) */}
            <motion.div
              style={{ y: imageY }}
              animate={{ y: '-23%', x: '0%', scale: 1.2 }}
              className="col-span-12 md:col-span-2 flex justify-center z-10 w-[250px] h-[250px]"
            >
              <div
                style={{
                  // ✅ YOU CONTROL THESE VALUES MANUALLY
                  position: 'relative',
                  left: '0px',   // ← adjust horizontally
                  top: '-15px',    // ← adjust vertically
                  zIndex: 10,
                }}
              >
                <Image
                  src="/RAW_IMG/11475317.png"
                  alt="Skincare cream jar"
                  width={250}
                  height={250}
                  className="object-contain w-[250px] h-[250px] max-w-none"
                />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Sub-headline (Spans 5 columns) */}
            <motion.div
              style={{
                opacity: 1,
                position: 'relative',
                left: '0px',   // ← adjust horizontally
                top: '15px',    // ← adjust vertically
                zIndex: 10,
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

      {/* 🖐️ HAND IMAGE - ABSOLUTE POSITIONED BELOW PRODUCT JAR */}
      <motion.div
        style={{ y: handY }}
        className="absolute z-9 pointer-events-none"
        // ✅ YOU CONTROL THESE VALUES MANUALLY
        initial={{
          left: '50%',
          top: '80%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: 'auto'
        }}
      >
        <Image
          src="/RAW_IMG/hand.avif"
          alt="Presenting hand"
          width={300}
          height={200}
          className="object-contain"
        />
      </motion.div>

    </section>
  );
};

export default HeroSectionDesktop;
