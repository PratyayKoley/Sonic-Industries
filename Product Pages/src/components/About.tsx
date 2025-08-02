import { useState, useEffect, useRef } from "react";
import { motion, AnimationGeneratorType } from "framer-motion";
import {
  Lightbulb,
  Lock,
  Zap,
  ShieldCheck,
  Cloud,
  Headphones,
} from "lucide-react";
import { Feature, FeatureCardProps } from "@/types";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features: Feature[] = [
    {
      title: "Innovative Design",
      icon: <Lightbulb className="w-16 h-16" />,
      description:
        "Our products feature cutting-edge design that combines aesthetics with functionality for an exceptional user experience.",
      animation: "left",
    },
    {
      title: "Advanced Security",
      icon: <Lock className="w-16 h-16" />,
      description:
        "We prioritize security in all our products, ensuring your data and privacy are protected at all times.",
      animation: "bottom",
    },
    {
      title: "High Performance",
      icon: <Zap className="w-16 h-16" />,
      description:
        "Experience lightning-fast performance with our optimized hardware and software solutions designed for efficiency.",
      animation: "right",
    },
    {
      title: "Quality Assurance",
      icon: <ShieldCheck className="w-16 h-16" />,
      description:
        "Every product undergoes rigorous testing to ensure it meets our high standards for quality and reliability.",
      animation: "left",
    },
    {
      title: "Cloud Integration",
      icon: <Cloud className="w-16 h-16" />,
      description:
        "Seamlessly connect and sync your data across all devices with our integrated cloud solutions.",
      animation: "bottom",
    },
    {
      title: "24/7 Support",
      icon: <Headphones className="w-16 h-16" />,
      description:
        "Our dedicated support team is available around the clock to assist you with any questions or issues.",
      animation: "right",
    },
  ];

  const getAnimationVariant = (direction: "left" | "right" | "bottom") => {
    switch (direction) {
      case "left":
        return {
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring" as AnimationGeneratorType,
              stiffness: 100,
              damping: 12,
              duration: 0.8,
            },
          },
        };
      case "right":
        return {
          hidden: { x: 100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring" as AnimationGeneratorType,
              stiffness: 100,
              damping: 12,
              duration: 0.8,
            },
          },
        };
      case "bottom":
        return {
          hidden: { y: 100, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring" as AnimationGeneratorType,
              stiffness: 80,
              damping: 12,
              duration: 0.8,
            },
          },
        };
      default:
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring" as AnimationGeneratorType,
              stiffness: 100,
              damping: 10,
              duration: 0.7,
            },
          },
        };
    }
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardVariants = {
      hover: {
        y: -15,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          type: "spring" as AnimationGeneratorType,
          stiffness: 300,
          damping: 20,
        },
      },
    };

    const iconVariants = {
      initial: { rotate: 0, scale: 1 },
      hover: {
        rotate: [0, -10, 10, -5, 5, 0],
        scale: 1.2,
        transition: {
          rotate: {
            duration: 0.5,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
          scale: {
            duration: 0.3,
          },
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        whileHover="hover"
        variants={{
          ...getAnimationVariant(feature.animation),
          ...cardVariants,
        }}
        transition={{ delay: index * 0.15 }}
        className="relative overflow-hidden rounded-2xl shadow-lg bg-white h-96"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`p-10 relative z-10 h-full flex flex-col justify-between ${
            isHovered ? "text-white" : "text-gray-800"
          }`}
        >
          <motion.div
            className="flex justify-center mb-6"
            variants={iconVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            <div className={isHovered ? "text-white" : "text-indigo-600"}>
              {feature.icon}
            </div>
          </motion.div>
          <h3 className="text-2xl font-bold text-center mb-4">
            {feature.title}
          </h3>
          <p
            className={`text-center text-lg ${
              isHovered ? "text-white" : "text-gray-600"
            }`}
          >
            {feature.description}
          </p>
        </div>

        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-700 to-indigo-500 rounded-2xl z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0.5, originY: 0.5 }}
        />
      </motion.div>
    );
  };

  return (
    <div
      className="min-h-screen bg-white py-24"
      ref={sectionRef}
      id="about"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Sonic Industries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine innovation with reliability to deliver products that
            exceed expectations and transform experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 cursor-pointer">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
