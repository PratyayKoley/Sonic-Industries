import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Product, Specification, SpecRowProps } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ProductComparison() {
  const products: Product[] = [
    {
      id: 1,
      name: "Watch Blue",
      subtitle: "For Men & Women",
      image: "/smartwatch.png",
      price: "$135",
      brand: "Apple",
      color: "Black",
      compatibility: "Android 4.0 iOS7 & above",
      dimensions: "9 x 3.01 x 0.79 in",
      weight: "0.7 lb",
      os: "iOS",
      battery: "170mAh",
    },
    {
      id: 2,
      name: "Watch Red",
      subtitle: "For Men & Women",
      image: "/smartwatch2.png",
      price: "$124",
      brand: "Apple",
      color: "White",
      compatibility: "Android 5.0, iOS8 & above",
      dimensions: "7 x 5.03 x 0.63 in",
      weight: "2.4 ounces",
      os: "iOS, Android",
      battery: "180mAh",
    },
    {
      id: 3,
      name: "Watch Black",
      subtitle: "For Men & Women",
      image: "/smartwatch3.png",
      price: "$179",
      brand: "Apple",
      color: "Blue",
      compatibility: "Android 6.0, iOS9 & above",
      dimensions: "10 x 2.01 x 0.21 in",
      weight: "0.9 lb",
      os: "Android",
      battery: "190mAh",
    },
    {
      id: 4,
      name: "Watch White",
      subtitle: "For Men & Women",
      image: "/smartwatch4.png",
      price: "$159",
      brand: "Apple",
      color: "Black",
      compatibility: "Android 7.0, iOS10 & above",
      dimensions: "8 x 3.5 x 0.75 in",
      weight: "3.8 ounces",
      os: "iOS, Android",
      battery: "200mAh",
    },
  ];

  const specifications: Specification[] = [
    { id: "price", name: "Price" },
    { id: "brand", name: "Brand" },
    { id: "color", name: "Color" },
    { id: "compatibility", name: "Compatible with" },
    { id: "dimensions", name: "Item Dimensions" },
    { id: "weight", name: "Item Weight" },
    { id: "os", name: "Operating System" },
    { id: "battery", name: "Battery Capacity" },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll arrows visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const productVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  function SpecRow({ spec, index }: SpecRowProps) {
    const ref = useRef<HTMLTableRowElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
      <motion.tr
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={rowVariants}
        custom={index}
        className={index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
      >
        <td className="border border-gray-200 p-2 md:p-4 font-bold text-gray-800 sticky left-0 bg-inherit z-10 min-w-[120px]">
          {spec.name}
        </td>
        {products.map((product) => (
          <td
            key={product.id}
            className="border border-gray-200 p-2 md:p-4 text-center min-w-[150px]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {product[spec.id]}
            </motion.div>
          </td>
        ))}
      </motion.tr>
    );
  }

  // Mobile Card View Component
  const MobileProductCard = ({ product }: { product: Product }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.1 });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
      >
        <div className="p-4 flex items-center space-x-4 border-b border-gray-100">
          <div className="relative w-20 h-20 flex-shrink-0">
            <motion.div
              className="absolute inset-0 bg-blue-500/10 rounded-full"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.4, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.subtitle}</p>
            <p className="font-extrabold text-lg text-blue-600 mt-1">
              {product.price}
            </p>
          </div>
        </div>

        <div className="p-4">
          {specifications.slice(1).map((spec) => (
            <div
              key={spec.id}
              className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-sm font-medium text-gray-700">
                {spec.name}
              </span>
              <span className="text-sm text-gray-900">{product[spec.id]}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50">
          <button className="bg-red-600 text-white font-bold py-2 px-4 w-full rounded-lg shadow">
            BUY NOW
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 md:py-16 bg-gradient-to-b from-white to-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={headingVariants}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-3 tracking-tight">
          Compare Similar Products
        </h1>
        <p className="text-center text-gray-600 mb-6 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Prepared is me marianne pleasure likewise debating. Wonder an unable
          except better stairs do ye admire. His secure called esteem praise.
        </p>
      </motion.div>

      {/* Responsive Cards View for Mobile */}
      {isMobile && (
        <div className="md:hidden">
          {products.map((product) => (
            <MobileProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Table View (hidden on mobile if using cards) */}
      <div className={isMobile ? "hidden md:block relative" : "relative"}>
        {/* Scroll Arrows */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 shadow-lg rounded-r-full p-2"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} className="text-blue-600" />
          </motion.button>
        )}

        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 shadow-lg rounded-l-full p-2"
            onClick={scrollRight}
          >
            <ChevronRight size={24} className="text-blue-600" />
          </motion.button>
        )}

        <motion.div
          className="overflow-x-auto rounded-xl shadow-xl scrollbar-hide"
          variants={tableVariants}
          ref={scrollContainerRef}
        >
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="border-b border-r border-gray-200 p-3 md:p-6 bg-gray-50 rounded-tl-xl sticky left-0 z-10 min-w-[120px]"></th>
                {products.map((product, index) => (
                  <motion.th
                    key={product.id}
                    className={`border-b border-gray-200 p-3 md:p-6 bg-white min-w-[150px] ${
                      index === products.length - 1 ? "rounded-tr-xl" : ""
                    }`}
                    variants={productVariants}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3 md:mb-5 p-2 md:p-4">
                        <motion.div
                          className="absolute inset-0 bg-blue-500/10 rounded-full"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.7, 0.4, 0.7],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 md:w-36 md:h-36 object-contain relative z-10 cursor-pointer"
                        />
                      </div>
                      <h3 className="font-bold text-base md:text-xl text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm mt-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </motion.th>
                ))}
              </tr>
            </thead>

            <tbody>
              <motion.tr variants={rowVariants} className="bg-white">
                <td className="border border-gray-200 p-2 md:p-5 font-bold text-gray-800 sticky left-0 bg-white z-10 min-w-[120px]">
                  Price
                </td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="border border-gray-200 p-2 md:p-5 text-center min-w-[150px]"
                  >
                    <span className="font-extrabold text-lg md:text-xl text-blue-600">
                      {product.price}
                    </span>
                  </td>
                ))}
              </motion.tr>

              {specifications.slice(1).map((spec, index) => (
                <SpecRow key={spec.id} spec={spec} index={index} />
              ))}

              <tr>
                <td className="border border-gray-200 p-3 md:p-6 bg-gray-50 rounded-bl-xl sticky left-0 z-10 min-w-[120px]"></td>
                {products.map((product, index) => (
                  <td
                    key={product.id}
                    className={`border border-gray-200 p-3 md:p-6 text-center min-w-[150px] ${
                      index === products.length - 1 ? "rounded-br-xl" : ""
                    }`}
                  >
                    <motion.button
                      className="bg-red-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 w-full rounded-lg shadow-lg cursor-pointer text-sm md:text-base"
                      variants={buttonVariants}
                    >
                      BUY NOW
                    </motion.button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
}
