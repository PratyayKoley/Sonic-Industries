import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence, spring } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Natha Roy",
      position: "CEO of Apple",
      avatar: "/image1.png",
      rating: 5,
      content:
        "Do play they miss give so up. Words to up style of since world. Way own uncommonly travelling now acceptance bed compliment solicitude. We leaf to snug on no need.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "CTO of Microsoft",
      avatar: "/image2.png",
      rating: 5,
      content:
        "Peculiar trifling absolute and wandered vicinity property yet. The and collecting motionless difficulty son. His hearing staying ten colonel met. Word drew six easy four dear cold deny.",
    },
  ];

  // Small avatar images that appear around the main testimonial with varied positions
  const avatarBubbles = [
    { id: 1, top: "15%", left: "10%", size: "w-16 h-16", delay: 0.2 },
    { id: 2, top: "55%", left: "5%", size: "w-14 h-14", delay: 0.3 },
    { id: 3, top: "80%", left: "20%", size: "w-16 h-16", delay: 0.4 },
    { id: 4, top: "10%", right: "5%", size: "w-14 h-14", delay: 0.5 },
    { id: 5, top: "60%", right: "8%", size: "w-16 h-16", delay: 0.6 },
    { id: 6, top: "85%", right: "20%", size: "w-14 h-14", delay: 0.7 },
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
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
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
      { threshold: 0.2 }
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
      },
    },
    hover: {
      boxShadow: "0 20px 30px rgba(191, 219, 254, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom,
        duration: 0.5,
      },
    }),
  };

  const decorativeElementVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 0.2,
      transition: {
        delay: custom,
        type: spring,
        stiffness: 70,
        damping: 10,
      },
    }),
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

  return (
    <motion.div
      className="bg-gradient-to-b from-white to-white/20 py-24 px-4 relative overflow-hidden"
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
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r bg-clip-text text-black mb-3">
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
            className="absolute -top-12 -left-6 md:left-16 text-blue-100"
            variants={quoteVariants}
          >
            <Quote size={80} strokeWidth={1} />
          </motion.div>
          <motion.div
            className="absolute -bottom-12 -right-6 md:right-16 text-blue-100 transform rotate-180"
            variants={quoteVariants}
          >
            <Quote size={80} strokeWidth={1} />
          </motion.div>

          {/* Avatar bubbles with staggered animations */}
          {!isMobile &&
            avatarBubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className={`absolute ${bubble.size} rounded-full bg-white shadow-xl p-1`}
                style={{
                  top: bubble.top,
                  left: bubble.left,
                  right: bubble.right,
                  zIndex: 5,
                }}
                variants={bubbleVariants}
                custom={bubble.delay}
                whileHover="hover"
              >
                <Image
                  src="/image1.png"
                  alt="Client avatar"
                  className="w-full h-full rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Star size={12} className="text-white fill-white" />
                </div>
              </motion.div>
            ))}

          {/* Main testimonial card with animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl mx-auto relative z-10 cursor-pointer"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top right, rgba(239, 246, 255, 0.6), rgba(255, 255, 255, 1) 60%)",
              }}
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-5 right-5 w-24 h-24 bg-blue-50 rounded-full opacity-20"
                variants={decorativeElementVariants}
                custom={0.6}
              ></motion.div>
              <motion.div
                className="absolute bottom-10 left-10 w-16 h-16 bg-purple-50 rounded-full opacity-20"
                variants={decorativeElementVariants}
                custom={0.7}
              ></motion.div>

              <div className="flex flex-col items-center relative">
                {/* Avatar with animation */}
                <motion.div
                  className="w-28 h-28 rounded-full border-4 border-blue-600 mb-8 relative z-10 overflow-hidden shadow-lg"
                  variants={fadeInVariants}
                  custom={0.3}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(191, 219, 254, 0.5)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-30"></div>
                  <Image
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full rounded-full object-cover"
                    width={112}
                    height={112}
                  />
                </motion.div>

                {/* Star rating */}
                <motion.div
                  className="flex mb-6"
                  variants={fadeInVariants}
                  custom={0.4}
                >
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Star
                        size={20}
                        className="text-yellow-400 fill-yellow-400 mx-1"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Testimonial content with animation */}
                <motion.div
                  className="text-center"
                  variants={fadeInVariants}
                  custom={0.5}
                >
                  <p className="text-gray-700 text-lg md:text-xl italic mb-8 relative">
                    {testimonials[activeIndex].content}
                  </p>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {testimonials[activeIndex].position}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

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
