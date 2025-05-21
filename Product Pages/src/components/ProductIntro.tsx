import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlarmClock, MessageCircle, Camera, Wifi } from "lucide-react";

export default function ProductIntro({ productData }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getWatchRotation = () => {
    const maxRotation = 10;
    const rotation = (scrollPosition / 100) * maxRotation;
    return Math.min(rotation, maxRotation);
  };

  const features = [
    {
      icon: <AlarmClock className="text-indigo-500 w-12 h-12" />,
      title: "Alarm Counter",
      description:
        "New had happen unable uneasy. Drawings pronounce can be followed improved out.",
    },
    {
      icon: <MessageCircle className="text-indigo-500 w-12 h-12" />,
      title: "Live Chat",
      description:
        "New had happen unable uneasy. Drawings pronounce can be followed improved out.",
    },
    {
      icon: <Camera className="text-indigo-500 w-12 h-12" />,
      title: "Camera",
      description:
        "New had happen unable uneasy. Drawings pronounce can be followed improved out.",
    },
    {
      icon: <Wifi className="text-indigo-500 w-12 h-12" />,
      title: "Support Wifi",
      description:
        "New had happen unable uneasy. Drawings pronounce can be followed improved out.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-white relative overflow-hidden"
      id="features"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 pointer-events-none" />

      <div className="container mx-auto px-6 py-16 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* <motion.img
              src={productData.images[1]}
              alt="Smart Watch"
              className="w-4/5 md:w-3/4 lg:w-2/3"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            /> */}
          </motion.div>

          {/* Text and Features */}
          <div className="w-full md:w-1/2">
            <motion.h1
              className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-10 leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A Watch Can Make Your <br /> Life Easy and Fast.
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
