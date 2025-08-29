"use client"

import { motion } from "framer-motion";
import { CategoryBackend } from "@/types";
import Image from "next/image";

interface PackagingInfoProps {
  productData: CategoryBackend;
}

export default function PackagingInfo({
  productData,
}: PackagingInfoProps) {
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
              A Watch Can Make Your
              <br />
              Life Easy and Fast.
            </h1>

            {/* 📦 Unique Box Dimensions Card */}
            {(productData.packaged?.length ||
              productData.packaged?.width ||
              productData.packaged?.height) && (
              <motion.div
                className="bg-white shadow-lg rounded-xl p-6 mb-8 border-l-4 border-indigo-500 cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                  Package Dimensions
                </h2>
                <div className="grid grid-cols-3 gap-4 text-center text-gray-800 font-medium">
                  <div>
                    <p className="text-sm">Length</p>
                    <p className="text-xl">{productData.packaged?.length} cm</p>
                  </div>
                  <div>
                    <p className="text-sm">Width</p>
                    <p className="text-xl">{productData.packaged?.width} cm</p>
                  </div>
                  <div>
                    <p className="text-sm">Height</p>
                    <p className="text-xl">{productData.packaged?.height} cm</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
              {productData.packaged?.items?.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-gray-600 text-center">{feature.desc}</p>
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
              <Image
                src="/smartwatch3.png"
                alt="Smartwatch with activity tracking"
                className="max-w-full"
                width={500}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
