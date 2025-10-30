"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Bell, MapPin, Bluetooth, Cloud, Video } from "lucide-react";
import { CategoryBackend, CategoryImages, Hotspot } from "@/types";
import Image from "next/image";

interface HotspotsProps {
  productData: CategoryBackend;
  allProductData: CategoryImages;
}


const hotspots = [
  {
    id: 1,
    x: 28,
    y: 48,
    title: "Heart Monitor",
    description:
      "Track your health with real-time heart rate monitoring and instant alerts for irregularities.",
    color: "bg-red-500",
    lineColor: "bg-red-500",
    icon: <Heart size={24} strokeWidth={1.5} className="text-white" />,
  },
  {
    id: 2,
    x: 28,
    y: 24,
    title: "Video Calls",
    description:
      "Make quick video calls directly from your smartwatch with the integrated camera.",
    color: "bg-blue-500",
    lineColor: "bg-blue-500",
    icon: <Video size={24} strokeWidth={1.5} className="text-white" />,
  },
  {
    id: 3,
    x: 28,
    y: 72,
    title: "Bluetooth",
    description:
      "Seamlessly connect to your devices for music, calls, and data sync.",
    color: "bg-indigo-500",
    lineColor: "bg-indigo-500",
    icon: <Bluetooth size={24} strokeWidth={1.5} className="text-white" />,
  },
  {
    id: 4,
    x: 65,
    y: 24,
    title: "Notification Alert",
    description:
      "Stay connected with instant notifications and customizable alert settings.",
    color: "bg-amber-500",
    lineColor: "bg-amber-500",
    icon: <Bell size={24} strokeWidth={1.5} className="text-white" />,
  },
  {
    id: 5,
    x: 65,
    y: 48,
    title: "Location Tracking",
    description:
      "Never lose your way with built-in GPS tracking and location services.",
    color: "bg-green-500",
    lineColor: "bg-green-500",
    icon: <MapPin size={24} strokeWidth={1.5} className="text-white" />,
  },
  {
    id: 6,
    x: 65,
    y: 72,
    title: "Weather Updates",
    description:
      "Get real-time weather forecasts and alerts directly on your wrist.",
    color: "bg-purple-500",
    lineColor: "bg-purple-500",
    icon: <Cloud size={24} strokeWidth={1.5} className="text-white" />,
  },
];

export default function Hotspots({productData, allProductData}: HotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
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

    if (isMobile) {
      interval = setInterval(() => {
        setActiveHotspot((current) => {
          if (current === null) return 1;
          return current >= hotspots.length ? 1 : current + 1;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile]);

  // Calculate line angle and length
  const calculateLine = (hotspot: Hotspot) => {
    // Adjust line length based on screen size
    const baseLength = Math.min(
      isMobile
        ? (containerSize.width * 0.1, 60)
        : (containerSize.width * 0.3, 250)
    );
    const lineLength = isMobile ? baseLength * 0.6 : baseLength;

    const cardPosition = getCardPosition(hotspot.x);

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
  const handleHotspotInteraction = (id: number) => {
    if (isMobile) {
      setActiveHotspot(activeHotspot === id ? null : id);
    }
  };

  // Mobile feature list view
  const renderMobileFeaturesList = () => {
    if (!isMobile) return null;

    return (
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-center mb-4">All Features {productData.name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hotspots.map((hotspot) => (
            <div
              key={`mobile-${hotspot.id}`}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                activeHotspot === hotspot.id
                  ? `${hotspot.color} text-white`
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveHotspot(hotspot.id)}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`p-2 mr-3 rounded-full ${
                    activeHotspot === hotspot.id ? "bg-white/20" : hotspot.color
                  }`}
                >
                  {React.cloneElement(hotspot.icon, {
                    color: activeHotspot === hotspot.id ? "white" : "white",
                    size: 20,
                  })}
                </div>
                <h4 className="font-medium">{hotspot.title}</h4>
              </div>
              <p
                className={`text-sm ${
                  activeHotspot === hotspot.id
                    ? "text-white/90"
                    : "text-gray-600"
                }`}
              >
                {hotspot.description}
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
            Explore the amazing features of our latest smartwatch with
            interactive hotspots. {isMobile ? "Tap" : "Hover over"} the points
            to discover what makes this device special.
          </p>
        </motion.div>

        {/* Interactive Smartwatch Section */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mb-8 md:mb-16"
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
              src={allProductData.images[1]}
              alt="Labelling Image"
              className="max-w-full max-h-full object-contain"
              width={500}
              height={500}
            />
          </motion.div>

          {/* Hotspots */}
          {hotspots.map((hotspot) => {
            const line = calculateLine(hotspot);
            const cardPosition = getCardPosition(hotspot.x);

            return (
              <div
                key={hotspot.id}
                className="absolute"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: isMobile ? "translate(-50%, -50%)" : "none",
                }}
              >
                {/* Pulsing effect for inactive hotspots */}
                <motion.div
                  className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full ${hotspot.color} opacity-30`}
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
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                    hotspot.color
                  } cursor-pointer z-10 relative ${
                    activeHotspot === hotspot.id
                      ? "ring-2 ring-white ring-opacity-70"
                      : ""
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleHotspotInteraction(hotspot.id)}
                  onMouseEnter={() => !isMobile && setActiveHotspot(hotspot.id)}
                  onMouseLeave={() => !isMobile && setActiveHotspot(null)}
                />

                {/* Connecting line and info card */}
                <AnimatePresence>
                  {activeHotspot === hotspot.id && (
                    <>
                      {/* Connecting line */}
                      <motion.div
                        className={`absolute top-1/2 h-0.5 ${
                          hotspot.lineColor
                        } origin-${
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
                        className="absolute top-1/2 z-20 w-max max-w-[150px] md:max-w-[250px]"
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
                            className={`flex items-center justify-center rounded-full mb-2 ${
                              hotspot.color
                            } ${!isMobile ? "p-4" : "p-2"}`}
                          >
                            <div
                              className={`${
                                !isMobile ? "text-3xl" : "text-xs"
                              }`}
                            >
                              {hotspot.icon}
                            </div>
                          </div>

                          <div
                            className={`text-center bg-white rounded-lg ${
                              !isMobile ? "p-4" : ""
                            }`}
                          >
                            <h3
                              className={`mb-1 ${
                                !isMobile
                                  ? "text-lg md:text-xl mb-2 font-semibold"
                                  : "text-xs font-light w-[4.4rem] break-words"
                              }`}
                            >
                              {hotspot.title}
                            </h3>
                            {!isMobile && (
                              <p className="text-xs md:text-sm text-gray-600">
                                {hotspot.description}
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
            {isMobile ? "Tap" : "Hover over"} the hotspots on the smartwatch to
            explore all the amazing features and capabilities. Our next
            generation smartwatch combines cutting-edge technology with elegant
            design.
          </p>
        </div>
      </div>
    </div>
  );
}
