"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence, spring } from "framer-motion";
import Image from "next/image";
import { TestimonialBackend } from "@/types";
import axios from "axios";

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const [vidTestimonials, setVidTestimonials] = useState<TestimonialBackend[]>(
    [],
  );

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`,
        );

        setVidTestimonials(res.data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleTouchStart = () => {
    holdTimeout.current = setTimeout(() => {
      setIsPaused(true);
    }, 200); // hold delay
  };

  const handleTouchEnd = () => {
    if (holdTimeout.current !== null) {
      clearTimeout(holdTimeout.current);
    }
    setIsPaused(false);
  };

  const testimonials = [
    {
      type: "single",
      id: 1,
      name: "Shubham Shrivastva",
      position: "",
      avatar:
        "https://lh3.googleusercontent.com/a-/ALV-UjV0s8Jqtr5HHsBey_HEe1w1zQCKUCTrv94y7TWOFIt21jX-ZiMe=w45-h45-p-rp-mo-br100",
      rating: 5,
      content:
        "I recently purchased a Sonic Band Sealer, and I must say the overall experience has been excellent. The product was delivered with utmost care, packed just like a fragile item, ensuring it reached me safely. I’ve been using it for sealing packets, and it works perfectly without any issues. What impressed me even more was the level of support provided by the team — prompt, helpful, and professional throughout. Truly a hassle-free experience. I would rate it 5/5 without any hesitation. Keep up the great work guys!",
    },
    {
      type: "single",
      id: 2,
      name: "Prem Sekhon",
      position: "",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocLnemANySWTGuTbBG9RNBBvytw7zH4U99F-6D7HzKoHcJkvlA=w45-h45-p-rp-mo-ba2-br100",
      rating: 5,
      content:
        "Best company to deal with. I bought labeling machine and it was not suitable for our business and they swapped the one we needed without a question. Always answer the phone calls and great technical support after the purchase. I was facing issues to install the machines and called for technical support and Sonic team helped me in installing the machines and how it works with a video call. Anand being very patient with us and he explained us in very simple ways. I highly recommend this company.",
    },
    {
      type: "single",
      id: 3,
      name: "Laishram Bijenkumar",
      position: "",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJI3fPoOgNAVEVt1v92iqL1lq7DesNFXunRdfUoC54oY6_faA=w45-h45-p-rp-mo-br100",
      rating: 5,
      content:
        "Fantastic experience! I bought the continuous band sealer with nitrogen flush (FR-900) from Sonic, and team sonic was extremely friendly and helpful throughout the process. He patiently guided me, explained everything clearly, and made sure I got exactly what I needed. The machine works perfectly - smooth, fast, and reliable sealing. Highly recommend Sonic and team for their excellent service and support",
    },
    {
      type: "single",
      id: 4,
      name: "Sujeet Kumar Singh",
      position: "",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocLEyp7xs0DfbksvL4v5pTYqSfJ0FlhZwWNTyTPXGaMzfIPOGrO_=w45-h45-p-rp-mo-br100",
      rating: 5,
      content:
        "I purchased a packaging sealing machine from the company, and their team installed it on the same day. The installation was done very professionally, and they explained everything clearly. The machine quality and service are excellent. I am fully satisfied. Highly recommended!",
    },
    {
      type: "single",
      id: 5,
      name: "Faisal Latif",
      position: "",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKCnuIYWtvbLd0nZdXznyV-LXBHLo8RfZVOYj_tQIMzen9oPQ=w45-h45-p-rp-mo-ba3-br100",
      rating: 5,
      content:
        "I needed a machine urgently and they delivered it the same day with installation and demo ... Excellent service .. the team at sonic industries is very professional and helpful.",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle next/previous testimonial navigation with Framer Motion animations
  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === vidTestimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? vidTestimonials.length - 1 : prevIndex - 1,
    );
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentCarousel = carouselRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    if (currentCarousel) {
      observer.observe(currentCarousel);
    }

    return () => {
      if (currentCarousel) {
        observer.unobserve(currentCarousel);
      }
    };
  }, []);

  // Add scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how far through the section we've scrolled (0 to 1)
        const progress = 1 - rect.bottom / (windowHeight + rect.height);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (vidTestimonials.length === 0) return;
    if (isPaused) return;

    setProgress(0);

    const duration = 20000;
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = (elapsed / duration) * 100;

      if (percent >= 100) {
        setProgress(100);
        clearInterval(interval);
        handleNext();
      } else {
        setProgress(percent);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, vidTestimonials.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 80,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const bubbleVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 70,
        damping: 10,
        delay: custom,
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: spring,
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const navButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#2563eb",
      color: "#ffffff",
      transition: { duration: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: spring,
        stiffness: 80,
        damping: 14,
      },
    },
  };

  return (
    <motion.div
      className="bg-linear-to-b from-white to-white/20 py-24 px-4 relative overflow-hidden"
      ref={carouselRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      id="testimonial"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl"
          animate={{
            scale: 1 + scrollProgress * 0.5,
            x: scrollProgress * 50,
            y: scrollProgress * 30,
          }}
          transition={{ type: "spring", damping: 20 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-purple-500 opacity-5 blur-3xl"
          animate={{
            scale: 1 + scrollProgress * 0.3,
            x: -scrollProgress * 40,
            y: scrollProgress * 20,
          }}
          transition={{ type: "spring", damping: 20 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-pink-400 opacity-5 blur-3xl"
          animate={{
            scale: 1 + scrollProgress * 0.4,
            x: scrollProgress * 30,
            y: -scrollProgress * 40,
          }}
          transition={{ type: "spring", damping: 20 }}
        ></motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading with animation */}
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-linear-to-r bg-clip-text text-black mb-3">
            Our Clients Say
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Discover why our clients choose us time and again. Their
            testimonials speak volumes about our commitment to excellence.
          </p>
        </motion.div>

        {/* Main testimonial section with enhanced animations */}
        <div className="relative">
          {/* Decorative quote icons */}
          <motion.div
            className="absolute -top-8 -left-4 md:left-10 text-blue-100"
            variants={quoteVariants}
          >
            <Quote
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              strokeWidth={1}
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-8 -right-4 md:right-10 text-blue-100 rotate-180"
            variants={quoteVariants}
          >
            <Quote
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              strokeWidth={1}
            />
          </motion.div>
          {/* Avatar bubbles with staggered animations */}
          {!isMobile &&
            testimonials
              .filter((t) => t.type === "single")
              .map((item, index) => {
                const positions = [
                  "top-[2%] left-[3%]",
                  "top-[73%] left-[4%]",
                  "top-[38%] left-[0%]",
                  "top-[6%] right-[1%]",
                  "bottom-[12%] right-[4%]",
                ];

                return (
                  <motion.div
                    key={item.id}
                    className={`
                      absolute ${positions[index]}
                      w-[clamp(160px,22vw,320px)]
                      bg-white rounded-2xl shadow-xl
                      p-3 sm:p-4 md:p-5
                      border border-gray-100 z-0 cursor-pointer
                    `}
                    variants={bubbleVariants}
                    custom={0.2 + index * 0.1}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover sm:w-7 sm:h-7"
                      />
                      <div>
                        <p className="text-xs sm:text-xs font-semibold">
                          {item.name}
                        </p>
                        <p className="text-xs sm:text-xs text-gray-500">
                          {item.position}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex mb-2">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-yellow-400 fill-yellow-400 mr-1"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg sm:text-xs md:text-xs text-gray-700 italic leading-relaxed line-clamp-5">
                      {item.content}
                    </p>
                  </motion.div>
                );
              })}

          {/* Main testimonial card with animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto"
            >
              <div
                className="w-full flex justify-center cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="w-full max-w-70 md:max-w-[320px] aspect-9/16 max-h-125">
                  {vidTestimonials.length > 0 && (
                    <iframe
                      src={`${
                        vidTestimonials[activeIndex % vidTestimonials.length]
                          ?.link
                      }?autoplay=1&mute=1`}
                      title="YouTube Short"
                      className="w-full h-full rounded-2xl shadow-xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <motion.div
            variants={childVariants}
            className="max-w-xs mx-auto mt-5 h-1 bg-gray-100 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-[#378ADD] rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          {/* Navigation buttons with enhanced hover effects */}
          <motion.div
            className="flex justify-center mt-12 space-x-6"
            variants={itemVariants}
          >
            <motion.button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer"
              aria-label="Previous testimonial"
              variants={navButtonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer"
              aria-label="Next testimonial"
              variants={navButtonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
