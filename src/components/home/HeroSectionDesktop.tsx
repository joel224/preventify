'use client';

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useWindowSize } from "@/hooks/use-window-size";
import FixedWatermark from "@/components/home/FixedWatermark";
const { useRef, useState, useMemo, useEffect } = React;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

const refWidth = 1366;
const refHeight = 768;

const getDynamicConfig = (width: number, height: number) => {
    const jarAspectRatio = 250 / 250;
    const baseJarWidth = 300;

    if (!width || !height) {
        return {
            totalHeightVh: 300,
            headlineExitStart: 0,
            headlineExitEnd: 0.25,
            headlineY: "-100%",
            headlineOpacityEnd: 0.2,
            subHeadlineExitStart: 0,
            subHeadlineExitEnd: 0.35,
            subHeadlineY: "-100%",
            subHeadlineOpacityEnd: 0.25,
            jarExitStart: 0.4,
            jarExitEnd: 0.8,
            jarY: "-100%",
            jarOpacityEnd: 0.25,
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
    
    const jarLeftPct = (-50 / refWidth) * 100;
    const jarTopPct = (0 / refHeight) * 100;
    const jarWidthPct = (baseJarWidth / refWidth) * 100;
    
    const socialLeftPct = (0 / refWidth) * 100;
    const socialTopPct = (-110 / refHeight) * 100;

    return {
        totalHeightVh: 300, 
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
        jar: {
            leftPct: jarLeftPct,
            topPct: jarTopPct,
            widthPct: jarWidthPct,
            paddingBottomPct: jarAspectRatio * 100,
        },
        socialProof: {
            leftPct: socialLeftPct,
            topPct: socialTopPct,
        },
    };
};

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

  const CONFIG = useMemo(() => getDynamicConfig(width || 1366, height || 768), [width, height]);

  const leftSpan = useMemo(() => width && width < 1280 ? 4 : 5, [width]);
  const middleSpan = useMemo(() => width && width < 1280 ? 4 : 3, [width]);
  const rightSpan = useMemo(() => 12 - leftSpan - middleSpan, [leftSpan, middleSpan]);
  const middleStart = useMemo(() => leftSpan + 1, [leftSpan]);

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

  const getFallDistance = () => {
    if (!height) return '0vh';
    let x = 0.3 + 0.0150;
    return `${height * x}px`;
  };

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

  return (
    <section
      ref={targetRef}
      style={{ 
        backgroundColor: "#f8f5f0",
        height: `${CONFIG.totalHeightVh}vh`
      }}
      className="relative"
    >
      <div className="h-screen sticky top-0 overflow-hidden flex items-center">
        <div className="absolute inset-0 px-6 z-10 pointer-events-none">
          <div className="container mx-auto h-full">
            <div className="grid grid-cols-12 gap-x-8 h-full items-center">
              <motion.div
                style={{
                  y: headlineY,
                  opacity: headlineOpacity,
                  gridColumn: `span ${leftSpan}`,
                }}
                className="space-y-8"
              >
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-[#25338e]  leading-tight text-left font-sans-serif"
                  style={{ fontSize: '72px', lineHeight: '1.1', fontWeight: 500 }}
                >
                  <span 
                  className="inline-block bg-[#255cc9] text-white font-sans-serif text-[#3d3d3d] font-semibold " 
                style={{ padding: '0 4px', borderRadius: '0px' }}
                    >
                     
                  </span> Preventify
                </motion.h1>
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

      <div className="absolute bottom-0 left-0 right-0 z-20 leading-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-auto">
          <path d="M1440,21.2101911 C1200,70.7019108 960,100.000000 720,100.000000 C480,100.000000 240,70.7019108 0,21.2101911 L0,120 L1440,120 L1440,21.2101911 Z" style={{fill: '#ffffff', stroke: 'none'}}></path>
        </svg>
      </div>
    </section>
   
  );
}
