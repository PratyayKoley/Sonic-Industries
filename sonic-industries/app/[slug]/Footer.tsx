"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, spring, springValue } from "framer-motion";
import { ChevronUp, PhoneCall, Mail, Clock } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getCurrentYear = () => new Date().getFullYear();

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
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
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
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: {
        type: spring,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const linkHoverVariants = {
    hover: {
      x: 5, // move 5px right on hover
      color: "#7C3AED", // Tailwind purple-600 hex
      transition: {
        type: spring,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const policyLinks = [
    { name: "Privacy Policy", href: "/RazorpayPages/privacy-policy" },
    { name: "Terms & Conditions", href: "/RazorpayPages/terms-and-conditions" },
    { name: "Refund & Cancellation", href: "/RazorpayPages/refund-policy" },
    { name: "Shipping & Delivery", href: "/RazorpayPages/shipping-policy" },
  ];

  return (
    <>
      <AnimatePresence>
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

      <motion.a
        key="phone-call"
        href="tel:+918010735898"
        className="fixed bottom-21 right-6 w-12 h-12 bg-green-700 rounded-full text-white flex items-center justify-center shadow-lg z-50"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        aria-label="Call"
      >
        <PhoneCall size={22} />
      </motion.a>

      <motion.a
        key="whatsapp"
        href="https://wa.me/+918010735898"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-36 right-6 w-12 h-12 bg-[#25D366] rounded-full text-white flex items-center justify-center shadow-lg z-50"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={22} />
      </motion.a>

      <footer
        ref={footerRef}
        className="relative bg-linear-to-b from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              custom={0}
              className="space-y-4"
            >
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-auto relative mr-2">
                    <Image
                      src="/Sonic Logo.png"
                      alt="Logo"
                      width={48}
                      height={48}
                      className="w-12 h-16"
                    />
                  </div>
                  <div className="text-2xl font-medium tracking-wider text-purple-600">
                    <div className="text-transparent bg-clip-text bg-black">
                      SONIC
                    </div>
                    <div className="text-transparent bg-clip-text bg-black">
                      INDUSTRIES
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Leading manufacturer of high-quality packaging machinery and
                solutions. Delivering excellence since inception.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-2">
                <div className="flex items-start text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 mt-1 text-purple-600" />
                  <span>support@sonicindustries.com</span>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <PhoneCall className="w-4 h-4 mr-2 mt-1 text-purple-600" />
                  <span>+91 801 073 5898</span>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 mt-1 text-purple-600" />
                  <span>Mon - Fri: 10 AM - 6 PM IST</span>
                </div>
              </div>
            </motion.div>

            {/* Legal & Policies */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              custom={2}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Legal & Policies
              </h3>
              <ul className="space-y-2">
                {policyLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      variants={linkHoverVariants}
                      whileHover="hover"
                      className="text-gray-600 hover:text-purple-600 transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              custom={3}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Connect With Us
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Follow us on social media for updates and latest products.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.facebook.com/sonicpackagingindustries"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md"
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/sonicpackagingindustries/"
                  className="w-10 h-10 rounded-full bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-md"
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </motion.a>

                <motion.a
                  href="https://www.youtube.com/@packagingmachinerybysonic"
                  className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-md"
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  target="_blank"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </motion.a>

                <motion.a
                  href="https://es.pinterest.com/sonicindustries/"
                  className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center shadow-md"
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  target="_blank"
                  aria-label="Pinterest"
                >
                  <FaPinterest size={20} />
                </motion.a>

                <motion.a
                  href="https://in.linkedin.com/company/sonic-industries"
                  className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center shadow-md"
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-gray-300 pt-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            custom={4}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-600 text-center md:text-left">
                Copyright &copy; {getCurrentYear()}{" "}
                <span className="font-semibold text-purple-600">
                  Sonic Industries
                </span>
                . All rights reserved.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <Link
                  href="/RazorpayPages/privacy-policy"
                  className="hover:text-purple-600 transition-colors"
                >
                  Privacy
                </Link>
                <span>•</span>
                <Link
                  href="/RazorpayPages/terms-and-conditions"
                  className="hover:text-purple-600 transition-colors"
                >
                  Terms
                </Link>
                <span>•</span>
                <Link
                  href="/RazorpayPages/refund-policy"
                  className="hover:text-purple-600 transition-colors"
                >
                  Refunds
                </Link>
                <span>•</span>
                <Link
                  href="/RazorpayPages/shipping-policy"
                  className="hover:text-purple-600 transition-colors"
                >
                  Shipping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
