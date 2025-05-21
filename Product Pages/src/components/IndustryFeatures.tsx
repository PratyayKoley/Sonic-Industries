import { Bell, MessageCircle, Camera, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IndustryFeatures() {
  const featureItems = [
    {
      icon: <Bell className="text-purple-500 w-12 h-12" />,
      title: "Alarm Counter",
      description: "New had happen unable uneasy. Drawings pronounce can be followed improved out."
    },
    {
      icon: <MessageCircle className="text-purple-500 w-12 h-12" />,
      title: "Live Chat",
      description: "New had happen unable uneasy. Drawings pronounce can be followed improved out."
    },
    {
      icon: <Camera className="text-purple-500 w-12 h-12" />,
      title: "Camera",
      description: "New had happen unable uneasy. Drawings pronounce can be followed improved out."
    },
    {
      icon: <Wifi className="text-purple-500 w-12 h-12" />,
      title: "Support Wifi",
      description: "New had happen unable uneasy. Drawings pronounce can be followed improved out."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-screen">
          
          {/* Left side content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              A Watch Can Make Your<br />Life Easy and Fast.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
              {featureItems.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
                >
                  <div className="w-14 h-14 flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side image */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src="/smartwatch3.png"
                alt="Smartwatch with activity tracking"
                className="max-w-full rounded-lg"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
