"use client"

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { CategoryImages, FAQItem } from "@/types";

interface FAQsProps {
  allProductData: CategoryImages;
}

export default function FAQs({allProductData}: FAQsProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How can I order my favrourate product ?",
      answer:
        "You can easily order your favorite product by browsing our online catalog, selecting the item, choosing your preferred color and specifications, and then clicking the 'Add to Cart' button. Follow the checkout process to complete your order.",
    },
    {
      id: 2,
      question: "How can I complete the order with payment ?",
      answer:
        "To complete your order, proceed to checkout where you'll be prompted to provide shipping information and payment details. We accept credit/debit cards, PayPal, and Apple Pay. Once payment is confirmed, you'll receive an order confirmation email.",
    },
    {
      id: 3,
      question: "Which payments options are available ?",
      answer:
        "We offer multiple payment options including all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for select countries. All transactions are secured with industry-standard encryption.",
    },
    {
      id: 4,
      question: "How can I get refund for return products ?",
      answer:
        "To receive a refund for returned products, first initiate a return request through your account within 30 days of purchase. Once we receive and inspect the returned item, we'll process your refund to the original payment method within 5-7 business days.",
    },
    {
      id: 5,
      question: "How can I be confident of the quality ?",
      answer:
        "We stand behind the quality of our products with a comprehensive 12-month warranty. All our items undergo rigorous quality testing before shipping, and we source components only from certified suppliers. Our customer satisfaction rate exceeds 98%.",
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  // Intersection Observer for scroll animations - reset when out of view
  useEffect(() => {
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

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how far through the section we've scrolled (0 to 1)
        const progress = 1 - rect.bottom / (windowHeight + rect.height);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants for animations
  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 0.05,
      scale: 1 + i * 0.5,
      x: i * 50,
      y: i * 30,
      transition: { duration: 0.8, ease: easeOut },
    }),
  };

  const faqContainerVariants = {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const faqItemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, x: 32, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeOut,
        delay: 0.3,
      },
    },
  };

  const imageDecorationVariants = {
    hidden: { scale: 0 },
    visible: (delay: number) => ({
      scale: 1,
      transition: { duration: 1, ease: easeOut, delay },
    }),
  };

  const imageVariants = {
    hidden: { y: 20, scale: 0.9, rotate: 6 },
    visible: {
      y: 0,
      scale: 1.1,
      rotate: 0,
      transition: { duration: 1, ease: easeOut, delay: 0.3 },
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.3 },
    },
  };

  const shadowVariants = {
    hidden: { scale: 0.5, y: 4, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 0.2,
      transition: { duration: 1, ease: easeOut, delay: 0.3 },
    },
  };

  return (
    <div
      className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4 overflow-hidden relative"
      ref={sectionRef}
      id="faq"
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-500 blur-3xl pointer-events-none"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={backgroundVariants}
        custom={scrollProgress}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-purple-500 blur-3xl pointer-events-none"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={backgroundVariants}
        custom={scrollProgress * 0.8}
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading and description */}
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-black mb-3">
          Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Find answers to commonly asked questions about our products, ordering
          process, payment options, and more to help you make informed
          decisions.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* FAQ Accordion section with animations that reset */}
          <motion.div
            className="w-full md:w-1/2 space-y-4"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={faqContainerVariants}
          >
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                variants={faqItemVariants}
                style={{
                  borderLeft:
                    openItem === item.id
                      ? "4px solid #8b5cf6"
                      : "4px solid transparent",
                }}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-gray-800 text-lg">
                    {item.question}
                  </h3>
                  <motion.div
                    className="flex-shrink-0 ml-2"
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 bg-gray-50 text-gray-600 border-t border-gray-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Image section with animations that reset */}
          <motion.div
            className="w-full md:w-1/2 flex items-center justify-center relative"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={imageContainerVariants}
          >
            {/* Decorative background elements for the image */}
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-blue-100 opacity-30"
              style={{ left: "20%", top: "10%" }}
              variants={imageDecorationVariants}
              custom={0.5}
            />
            <motion.div
              className="absolute w-48 h-48 rounded-full bg-purple-100 opacity-30"
              style={{ right: "15%", bottom: "15%" }}
              variants={imageDecorationVariants}
              custom={0.7}
            />

            {/* Main image with animated effects */}
            <div className="relative z-10 w-full flex items-center justify-center">
              {/* Shadow blob that moves slightly differently than the image */}
              <motion.div
                className="absolute bottom-0 w-2/3 h-6 bg-black rounded-full blur-md"
                variants={shadowVariants}
              />

              {/* The actual image with hover effects */}
              <motion.img
                src={allProductData.images[4]}
                alt="Product Info"
                className="w-full max-w-lg h-96 object-contain cursor-pointer"
                style={{
                  filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))",
                }}
                variants={imageVariants}
                whileHover="hover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
