"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CategoryImages, Hotspot, ProductBackend } from "@/types";
import Image from "next/image";

interface HotspotsProps {
  productData: ProductBackend;
  allProductData: CategoryImages;
}

const COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-amber-500",
  "bg-green-500",
  "bg-purple-500",
];

export default function Hotspots({
  productData,
  allProductData,
}: HotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Title animation
  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (titleInView) {
      titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    }
  }, [titleControls, titleInView]);

  // Auto-cycle through hotspots on mobile
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMobile && productData.labels && productData.labels.length > 0) {
      interval = setInterval(() => {
        setActiveHotspot((current) => {
          const labels = productData.labels ?? [];
          if (labels.length === 0) return null;
          const currentIndex = labels.findIndex((h) => h._id === current);
          const nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % labels.length;
          return labels[nextIndex]._id;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile, productData.labels]);

  // Calculate line angle and length
  const calculateLine = (hotspot: Hotspot) => {
    // Adjust line length based on screen size
    const baseLength = Math.min(
      isMobile
        ? (containerSize.width * 0.1, 60)
        : (containerSize.width * 0.3, 250)
    );
    const lineLength = isMobile ? baseLength * 0.6 : baseLength;

    const cardPosition = getCardPosition(hotspot.x ?? 0);

    return {
      length: lineLength,
      angle: cardPosition === "left" ? 0 : 0,
    };
  };

  // Calculate the position for the info card
  const getCardPosition = (x: number) => {
    if (x < 50) return "left";
    return "right";
  };

  // Handle click for mobile (toggle hotspot)
  const handleHotspotInteraction = (id: string) => {
    if (isMobile) {
      setActiveHotspot(activeHotspot === id ? null : id);
    }
  };

  // Mobile feature list view
  const renderMobileFeaturesList = () => {
    if (!isMobile) return null;

    return (
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-center mb-4">
          All Features {productData.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {productData.labels?.map((hotspot) => (
            <div
              key={`mobile-${hotspot._id}`}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                activeHotspot === hotspot._id
                  ? "bg-gray-400/60 text-gray-800"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveHotspot(hotspot._id)}
            >
              <div className="flex items-center mb-2">
                <h4 className="font-medium">{hotspot.name}</h4>
              </div>
              <p
                className={`text-sm ${
                  activeHotspot === hotspot._id
                    ? "text-white/90"
                    : "text-gray-600"
                }`}
              >
                {hotspot.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -50 }}
          animate={titleControls}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            Attractive Features
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore the amazing features of our products with
            interactive hotspots. {isMobile ? "Tap" : "Hover over"} the points
            to discover what makes this product special.
          </p>
        </motion.div>

        {/* Interactive Smartwatch Section */}
        <div
          ref={containerRef}
          className="relative w-full aspect-4/3 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mb-8 md:mb-16"
        >
          {/* Watch Image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1, scale: 1.15, y: 0 }}
            animate={{ opacity: 1, scale: 1.2, y: [0, -3, 0] }}
            transition={{
              opacity: { duration: 1, repeat: 0 },
              scale: { duration: 1, repeat: 0 },
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src={productData.images[0]}
              alt="Labelling Image"
              className="max-w-full max-h-full object-contain"
              width={500}
              height={500}
            />
          </motion.div>

          {/* Hotspots */}
          {productData.labels?.map((hotspot, index) => {
            const line = calculateLine(hotspot);
            const cardPosition = getCardPosition(hotspot.x ?? 0);
            const color = COLORS[index % COLORS.length];
            const lineColor = color;

            return (
              <div
                key={hotspot._id}
                className="absolute"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: isMobile ? "translate(-50%, -50%)" : "none",
                }}
              >
                {/* Pulsing effect for inactive hotspots */}
                <motion.div
                  className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full ${color} opacity-30`}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Hotspot dot */}
                <motion.div
                  className={`w-1 h-1 md:w-2 md:h-2 rounded-full ${color} cursor-pointer z-10 relative ${
                    activeHotspot === hotspot._id
                      ? "ring-2 ring-white ring-opacity-70"
                      : ""
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleHotspotInteraction(hotspot._id)}
                  onMouseEnter={() =>
                    !isMobile && setActiveHotspot(hotspot._id)
                  }
                  onMouseLeave={() => !isMobile && setActiveHotspot(null)}
                />

                {/* Connecting line and info card */}
                <AnimatePresence>
                  {activeHotspot === hotspot._id && (
                    <>
                      {/* Connecting line */}
                      <motion.div
                        className={`absolute top-1/2 h-0.5 ${lineColor} origin-${
                          cardPosition === "left" ? "right" : "left"
                        } z-0`}
                        initial={{ width: 0 }}
                        animate={{ width: line.length }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          left: cardPosition === "right" ? "100%" : "auto",
                          right: cardPosition === "left" ? "100%" : "auto",
                          transform: `translateY(-50%) rotate(${line.angle}deg)`,
                          transformOrigin:
                            cardPosition === "left" ? "right" : "left",
                        }}
                      />

                      {/* Info card */}
                      <motion.div
                        className="absolute top-1/2 z-20 w-max max-w-37.5 md:max-w-62.5"
                        initial={{
                          opacity: 0,
                          y: "-50%",
                          x: cardPosition === "left" ? 10 : -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: "-50%",
                        }}
                        exit={{
                          opacity: 0,
                          x: cardPosition === "left" ? 10 : -10,
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        style={{
                          left:
                            cardPosition === "right"
                              ? `calc(100% + ${line.length}px)`
                              : "auto",
                          right:
                            cardPosition === "left"
                              ? `calc(100% + ${line.length}px)`
                              : "auto",
                        }}
                      >
                        <motion.div className="flex flex-col items-center">
                          <div
                            className={`text-center bg-white rounded-lg ${
                              !isMobile ? "p-4" : ""
                            }`}
                          >
                            <h3
                              className={`mb-1 ${
                                !isMobile
                                  ? "text-lg md:text-xl mb-2 font-semibold"
                                  : "text-xs font-light w-[4.4rem] wrap-break-word"
                              }`}
                            >
                              {hotspot.name}
                            </h3>
                            {!isMobile && (
                              <p className="text-xs md:text-sm text-gray-600">
                                {hotspot.desc}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile Features List Section */}
        {renderMobileFeaturesList()}

        {/* Additional info section */}
        <div className="text-center mt-6 md:mt-8">
          <p className="text-xs md:text-base text-gray-600 max-w-2xl mx-auto">
            {isMobile ? "Tap" : "Hover over"} the hotspots on the product to
            explore all the amazing features and capabilities. Our next
            generation products combines cutting-edge technology with elegant
            design.
          </p>
        </div>
      </div>
    </div>
  );
}
