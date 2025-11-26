'use client';

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSectionContent() {
  return (
    <section
      style={{ backgroundColor: "#f8f5f0" }}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative text-center">
          {/* Main Title */}
          <h1 
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[200px] font-bold text-[#25338e] leading-none"
            style={{ fontFamily: 'Rebeqa, serif' }}
          >
            Preventify
          </h1>

          {/* Heart Image - positioned centrally */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
              <Image
                src="/heart.png"
                alt="Red Heart"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Bottom Text Elements */}
          <div className="absolute bottom-[-10%] sm:bottom-[-5%] md:bottom-0 inset-x-0 flex justify-between items-end px-4 sm:px-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl font-bold text-black max-w-xs text-left"
            >
              Your 365-Day Health Passport
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xs text-right"
            >
              We strip away the unnecessary to focus on what truly works.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
