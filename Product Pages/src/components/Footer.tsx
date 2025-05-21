import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Plus,
  Dribbble,
  ChevronUp,
  PhoneCall,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Scroll listener for floating button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to get current year
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: custom * 0.2,
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.1,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {/* Scroll to Top */}
        {showScrollButton && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-purple-700 rounded-full text-white flex items-center justify-center shadow-lg z-50 cursor-pointer"
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}

        {/* Phone Call Button */}
        <motion.a
          href="tel:+918010735898"
          className="fixed bottom-[84px] right-6 w-12 h-12 bg-green-700 rounded-full text-white flex items-center justify-center shadow-lg z-50"
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          aria-label="Call"
        >
          <PhoneCall size={22} />
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/+918010735898"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-[144px] right-6 w-12 h-12 bg-[#25D366] rounded-full text-white flex items-center justify-center shadow-lg z-50"
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={22} />
        </motion.a>
      </AnimatePresence>

      <footer ref={footerRef} className="relative">
        {/* Footer content */}
        <div className="bg-gray-100 pt-16 pb-6 px-4 relative">
          <div className="max-w-6xl mx-auto">
            {/* Logo and tagline */}
            <motion.div
              className="flex flex-col items-center mb-8"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              custom={0}
            >
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-12 relative mr-2">
                    {/* Flask icon */}
                    <div className="absolute inset-0 bg-purple-700 rounded-b-lg rounded-t-sm transform rotate-3"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                      <div className="w-1 h-4 bg-white rounded-full"></div>
                      <div className="w-1 h-2 bg-white rounded-full ml-1 mt-2"></div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                      SONIC INDUSTRIES
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 max-w-xl">
                Conveying or northward offending admitting perfectly my. Colonel
                gravity get thought fat smiling add but.
              </p>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className="flex justify-center space-x-3 mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              custom={1}
            >
              {/* Facebook */}
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
              >
                <Facebook size={20} />
              </motion.a>

              {/* Twitter */}
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-md hover:bg-cyan-600 transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
              >
                <Twitter size={20} />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
              >
                <Linkedin size={20} />
              </motion.a>

              {/* Google Plus (using Plus icon from Lucide) */}
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
              >
                <Plus size={20} />
              </motion.a>

              {/* Dribbble */}
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md hover:bg-pink-600 transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
              >
                <Dribbble size={20} />
              </motion.a>
            </motion.div>

            {/* Copyright Info */}
            <motion.div
              className="text-center text-sm text-gray-500 cursor-pointer"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              custom={2}
            >
              <p>
                Copyright © {getCurrentYear()}. All rights reserved by{" "}
                <span className="font-medium">Sonic Industries</span>
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
}
