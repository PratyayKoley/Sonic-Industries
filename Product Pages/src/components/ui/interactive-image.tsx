import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Bell, MapPin, Bluetooth, Cloud, Video } from 'lucide-react';

// Custom animated feature component
const AnimatedFeature = ({ title, description, icon, direction }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : 100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="flex flex-col items-center mb-16"
    >
      <div className="flex items-center mb-4">
        {direction === 'right' && (
          <div className="text-center max-w-xs mr-4">
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        )}
        <div className={`${direction === 'left' ? 'ml-4' : 'mr-4'} text-purple-500`}>
          {icon}
        </div>
        {direction === 'left' && (
          <div className="text-center max-w-xs ml-4">
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function AttractiveFeatures1() {
  const placeholder = "New had happen unable uneasy. Drawings pronounce can be followed improved out.";

  const leftFeatures = [
    {
      title: "Heart Monitor",
      description: placeholder,
      icon: <Heart size={42} strokeWidth={1.5} />,
    },
    {
      title: "Alarm Alert",
      description: placeholder,
      icon: <Bell size={42} strokeWidth={1.5} />,
    },
    {
      title: "Distance Counter",
      description: placeholder,
      icon: <MapPin size={42} strokeWidth={1.5} />,
    },
  ];

  const rightFeatures = [
    {
      title: "Bluetooth",
      description: placeholder,
      icon: <Bluetooth size={42} strokeWidth={1.5} />,
    },
    {
      title: "Weather Update",
      description: placeholder,
      icon: <Cloud size={42} strokeWidth={1.5} sun={true} />,
    },
    {
      title: "Video Call",
      description: placeholder,
      icon: <Video size={42} strokeWidth={1.5} />,
    },
  ];

  // Animation for title
  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (titleInView) {
      titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    }
  }, [titleControls, titleInView]);

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -50 }}
          animate={titleControls}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Attractive Features
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prepared is me marianne pleasure likewise debating. Wonder an unable except better stairs
            do ye admire. His secure called esteem praise.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Features */}
          <div className="md:w-1/3">
            {leftFeatures.map((feature, index) => (
              <AnimatedFeature
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                direction="left"
              />
            ))}
          </div>

          {/* Watch Image (Center) */}
          <div className="md:w-1/3 flex justify-center my-8 md:my-0">
            <motion.div
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }} // Apply oscillation only to 'y'
              transition={{
                opacity: { duration: 1, repeat: 0 },  // No repeat for opacity
                scale: { duration: 1, repeat: 0 },  // No repeat for scaling
                y: { duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" } // Infinite oscillation for y
              }}
            >
              <img
                src="/smartwatch4.png"
                alt="Smartwatch with music player"
                className="max-w-full"
              />
            </motion.div>
          </div>


          {/* Right Features */}
          <div className="md:w-1/3">
            {rightFeatures.map((feature, index) => (
              <AnimatedFeature
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                direction="right"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}