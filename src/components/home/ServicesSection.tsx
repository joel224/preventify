'use client';

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";

// =====================================================================
// 🎛️ THE MASTER KEY (CONFIGURATION)
// =====================================================================
// Adjust these values to control the look without breaking the code.
const WAVE_CONFIG = {
  layout: {
    containerHeight: "140px",   // How tall the wave area is
    marginBottom: "20px",       // Space between Wave and Heading
  },
  mainLine: {
    width: "85%",               // Width of the center line image (0% to 100%)
    opacity: 1,
    yOffset: 0,                 // Move center line Up (-) or Down (+) in px
  },
  icons: {
    size: 60,                   // Size of the pulse icons in px
    opacity: 0.8,
    yOffset: 5,                 // Move icons Up (-) or Down (+) relative to center
    xOffset: 0,                 // Move icons Inward (-) or Outward (+)
  }
};
// =====================================================================

const services = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
    title: "Primary Care",
    description: "Comprehensive healthcare services for individuals and families, focusing on long-term health and wellness.",
    type: "card"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/9354/9354551.png",
    title: "Diabetes Management",
    description: "AI-driven specialized programs for the prevention, monitoring, and management of diabetes.",
    type: "card"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2382/2382461.png",
    title: "Lifestyle Medicine",
    description: "Evidence-based therapeutic approaches to treat, prevent and often reverse chronic diseases.",
    type: "video",
    videoUrl: "https://player.mux.com/bU1COBRBk00DfgHV3L9vk5TL2uXEiu9o2hp6Dfbox1F00?loop=true&autoplay=muted&controls=false&max_resolution=480p"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/17774/17774825.png",
    title: "Pediatric Care",
    description: "Specialized, compassionate healthcare services tailored for infants, children, and adolescents.",
    type: "card"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/8657/8657426.png",
    title: "Women's Health",
    description: "Comprehensive care addressing women's unique health needs at every stage of life.",
    type: "card"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4087/4087640.png",
    title: "Preventive Screenings",
    description: "Advanced early detection tests to identify potential health issues before they become serious.",
    type: "card"
  },
];

const StickyCard = ({ 
  children, 
  index 
}: { 
  children: React.ReactNode; 
  index: number; 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <motion.div 
      ref={cardRef}
      // Sticky Position Control
      className="sticky top-40 mb-24 last:mb-0" 
      style={{ 
        scale, 
        opacity,
        zIndex: index 
      }}
    >
      {children}
    </motion.div>
  );
};

const ServicesSection = () => {
  const videoService = services.find(s => s.type === 'video');
  const cardServices = services.filter(s => s.type === 'card');

  return (
    <section className="bg-[#f8f9fa] relative py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* ============================================================ */}
        {/* 1. THE DYNAMIC WAVE SECTION (Controlled by WAVE_CONFIG)      */}
        {/* ============================================================ */}
        <motion.div 
           initial={{ opacity: 0, scaleX: 0.8 }}
           whileInView={{ opacity: 1, scaleX: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative w-full mx-auto flex items-center justify-center"
           style={{ 
             height: WAVE_CONFIG.layout.containerHeight,
             marginBottom: WAVE_CONFIG.layout.marginBottom 
           }}
        >
            {/* --- LEFT PULSE ICON --- */}
            <img 
              src="https://cdn-icons-png.flaticon.com/512/8011/8011552.png" 
              alt="Pulse Start"
              className="absolute left-0 object-contain"
              style={{ 
                width: `${WAVE_CONFIG.icons.size}px`,
                height: `${WAVE_CONFIG.icons.size}px`,
                opacity: WAVE_CONFIG.icons.opacity,
                filter: "hue-rotate(180deg)",
                // X/Y Dynamic Control
                transform: `translate(${WAVE_CONFIG.icons.xOffset}px, ${WAVE_CONFIG.icons.yOffset}px)`
              }}
            />

            {/* --- CENTER LINE IMAGE --- */}
            <div 
              className="flex items-center justify-center h-full"
              style={{ width: WAVE_CONFIG.mainLine.width }}
            >
              <img 
                src="public/vectorink-download (1).svg" 
                alt="Healthcare Pulse Line"
                className="w-full h-full object-contain"
                style={{ 
                    opacity: WAVE_CONFIG.mainLine.opacity,
                    transform: `translateY(${WAVE_CONFIG.mainLine.yOffset}px)`
                }}
              />
            </div>

            {/* --- RIGHT PULSE ICON --- */}
            <img 
              src="https://cdn-icons-png.flaticon.com/512/8011/8011552.png" 
              alt="Pulse End"
              className="absolute right-0 object-contain"
              style={{ 
                width: `${WAVE_CONFIG.icons.size}px`,
                height: `${WAVE_CONFIG.icons.size}px`,
                opacity: WAVE_CONFIG.icons.opacity,
                filter: "hue-rotate(90deg)",
                // X/Y Dynamic Control (Mirroring X offset for symmetry)
                transform: `translate(${-WAVE_CONFIG.icons.xOffset}px, ${WAVE_CONFIG.icons.yOffset}px)`
              }}
            />
        </motion.div>
        {/* ============================================================ */}


        {/* 2. HEADER (Now below the wave) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          // Added extra margin bottom to separate from cards
          className="text-center mb-24" 
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#1a365d]">
            Our Healthcare Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Preventify offers a comprehensive range of healthcare services designed to keep you healthy and address your medical needs.
          </p>
        </motion.div>

        {/* 3. MAIN CONTENT ROW */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">
          
          {/* Left Column: Cards */}
          <div className="w-full lg:w-1/2 relative pb-[20vh]">
            {cardServices.map((service, index) => (
              <StickyCard key={index} index={index}>
                <Card className="bg-white border-none rounded-2xl shadow-sm overflow-hidden">
                  <CardContent className="px-8 py-8 flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 p-4 bg-blue-50 rounded-2xl">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-[#1a365d]">
                          {service.title}
                        </h3>
                        <span className="text-sm font-bold text-gray-300">
                           0{index + 1}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StickyCard>
            ))}
          </div>

          {/* Right Column: Sticky Video */}
          <div className="hidden lg:block w-full lg:w-1/2 sticky top-40 h-auto flex items-start justify-center">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              {videoService && (
                 <iframe 
                   src={videoService.videoUrl}
                   className="absolute inset-0 w-full h-full object-cover"
                   allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                 />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 pointer-events-none">
                <span className="inline-block px-3 py-1 mb-3 rounded-full bg-[#38a169] text-white text-xs font-bold uppercase tracking-wide">
                    Featured Service
                </span>
                <h3 className="text-white text-2xl font-bold">
                  {videoService?.title || "Lifestyle Medicine"}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;