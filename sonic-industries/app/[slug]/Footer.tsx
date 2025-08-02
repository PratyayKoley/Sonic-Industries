import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, AnimationGeneratorType, spring } from "framer-motion";
import { ChevronUp, PhoneCall } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const currentFooter = footerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentFooter) {
      observer.observe(currentFooter);
    }

    return () => {
      if (currentFooter) {
        observer.unobserve(currentFooter);
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
      transition: {
        type: spring,
        stiffness: 300,
        damping: 15,
      },
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
      transition: {
        type: spring,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: spring,
        stiffness: 400,
        damping: 10,
      },
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
            key="scroll-to-top"
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
      </AnimatePresence>

      {/* Phone Call Button - Always visible, no AnimatePresence needed */}
      <motion.a
        key="phone-call"
        href="tel:+918010735898"
        className="fixed bottom-[84px] right-6 w-12 h-12 bg-green-700 rounded-full text-white flex items-center justify-center shadow-lg z-50"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        aria-label="Call"
      >
        <PhoneCall size={22} />
      </motion.a>

      {/* WhatsApp Button - Always visible, no AnimatePresence needed */}
      <motion.a
        key="whatsapp"
        href="https://wa.me/+918010735898"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[144px] right-6 w-12 h-12 bg-[#25D366] rounded-full text-white flex items-center justify-center shadow-lg z-50"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={22} />
      </motion.a>

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
                    <Image
                      src="/favicon.ico"
                      alt="Logo"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
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
                key="facebook"
                href="https://www.facebook.com/sonicpackagingindustries"
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:bg-[#145DBF] transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
                target="_blank"
              >
                <FaFacebook size={20} />
              </motion.a>

              {/* Instagram */}
              <motion.a
                key="instagram"
                href="https://www.instagram.com/sonicpackagingindustries/"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
                target="_blank"
              >
                <FaInstagram size={20} />
              </motion.a>

              {/* YouTube */}
              <motion.a
                key="youtube"
                href="https://www.youtube.com/@packagingmachinerybysonic"
                className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-md hover:bg-[#CC0000] transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
                target="_blank"
              >
                <FaYoutube size={20} />
              </motion.a>

              {/* Pinterest */}
              <motion.a
                key="pinterest"
                href="https://es.pinterest.com/sonicindustries/"
                className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center shadow-md hover:bg-[#BD001C] transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
                target="_blank"
              >
                <FaPinterest size={20} />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                key="linkedin"
                href="https://in.linkedin.com/company/sonic-industries"
                className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center shadow-md hover:bg-[#005582] transition-colors"
                whileHover="hover"
                whileTap="tap"
                variants={socialIconVariants}
                target="_blank"
              >
                <FaLinkedin size={20} />
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