"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CategoryImages } from "@/types";
import Image from "next/image";

interface ProductComparisonProps {
  allProductData: CategoryImages;
}

export default function ProductComparison({
  allProductData,
}: ProductComparisonProps) {
  const products = allProductData.products || [];

  // -----------------------------
  // UNIQUE FEATURES GENERATION
  // -----------------------------
  const getUniqueFeatures = () => {
    const featureMap = new Map();
    products.forEach((product) => {
      product.features?.forEach((f) => {
        if (!featureMap.has(f.name)) featureMap.set(f.name, f.name);
      });
    });
    return Array.from(featureMap.values());
  };

  const uniqueFeatures = getUniqueFeatures();

  // State management
  const [, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Row component with proper once animation
  function SpecRow({
    featureName,
    index,
  }: {
    featureName: string;
    index: number;
  }) {
    const ref = useRef<HTMLTableRowElement | null>(null);

    return (
      <motion.tr
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          ease: "easeOut",
        }}
        className={index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
      >
        <td className="border border-gray-200 p-3 font-bold sticky left-0 bg-white z-10 min-w-[150px]">
          {featureName}
        </td>

        {products.map((product) => {
          const match = product.features?.find((f) => f.name === featureName);
          return (
            <td
              key={product._id}
              className="border border-gray-200 p-3 text-center min-w-[150px]"
            >
              {match ? match.weight : "--"}
            </td>
          );
        })}
      </motion.tr>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Compare Products
      </motion.h1>

      {/* Scroll Container */}
      <div className="relative">
        <motion.div
          className="overflow-x-auto rounded-xl shadow-xl"
          ref={scrollContainerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                {/* Empty Corner Cell */}
                <th className="border-b border-gray-200 p-3 bg-gray-50 sticky left-0 z-10"></th>

                {/* Product Headers */}
                {products.map((product, idx) => (
                  <th
                    key={product._id}
                    className="border-b border-gray-200 p-3 min-w-[200px] bg-white"
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + idx * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-[120px] h-[120px] object-contain rounded-lg mb-2"
                      />
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="font-extrabold text-blue-600 mt-1">
                        ₹{product.price}
                      </p>
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Dynamic Unique Feature Rows */}
              {uniqueFeatures.map((featureName, index) => (
                <SpecRow
                  key={featureName}
                  featureName={featureName}
                  index={index}
                />
              ))}

              {/* BUY NOW Row */}
              <tr>
                <td className="border p-3 bg-gray-50 sticky left-0 z-10"></td>

                {products.map((product) => (
                  <td
                    key={product._id}
                    className="border p-3 text-center min-w-[150px]"
                  >
                    <button className="bg-red-600 text-white font-bold py-2 px-4 w-full rounded-lg shadow hover:bg-red-700 transition-colors">
                      BUY NOW
                    </button>
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
