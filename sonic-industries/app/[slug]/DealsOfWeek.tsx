"use client";

import { DealBackend } from "@/types";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DealsOfWeek() {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [deals, setDeals] = useState<DealBackend[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals`
      );
      const data: DealBackend[] = res.data.deals;
      setDeals(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const nextDeal = useCallback(() => {
    setCurrentDeal((prev) => (prev + 1) % deals.length);
  }, [deals.length]);

  const prevDeal = useCallback(() => {
    setCurrentDeal((prev) => (prev - 1 + deals.length) % deals.length);
  }, [deals.length]);

  const goToDeal = (index: number) => {
    setCurrentDeal(index);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextDeal, 5000);
    return () => clearInterval(interval);
  }, [nextDeal]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading deals...</p>
      </div>
    );
  }

  if (!loading && deals.length === 0) {
    // No deals, render nothing or a custom message
    return null;
  }

  const currentDealData = deals[currentDeal];

  const getTimeLeft = (expiresAt: Date) => {
    const now = new Date();
    const expire = new Date(expiresAt);
    const diff = expire.getTime() - now.getTime();
    if (diff <= 0)
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const timeLeft = getTimeLeft(currentDealData.expiresAt);

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Deals Of The Week
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover incredible savings on premium tech products. Limited time
            offers you don&apos;t want to miss!
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDeal}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto transition-all duration-500 transform hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-1/2 p-8 flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50">
                  <div className="relative">
                    <Image
                      alt={currentDealData.title || "Deal Image"}
                      className="max-w-full h-64 md:h-80 object-contain transition-transform duration-300 hover:scale-105"
                      src={currentDealData.imageUrl || "/placeholder.png"}
                      width={500}
                      height={500}
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
                      {currentDealData.dealType === "product" &&
                      currentDealData.discountPercent
                        ? `${Math.round(currentDealData.discountPercent)}% OFF`
                        : "Limited Offer"}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < (currentDealData.rating ?? 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({currentDealData.rating ?? 0}.0)
                    </span>
                  </div>

                  {currentDealData.dealType === "product" ? (
                    <>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {currentDealData.productName}
                      </h2>

                      <div className="flex items-center mb-6">
                        <span className="text-4xl font-bold text-indigo-600 mr-3">
                          ₹{currentDealData.discountedPrice}
                        </span>
                        {currentDealData.mrp && (
                          <span className="text-xl text-gray-500 line-through">
                            ₹{currentDealData.mrp}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {currentDealData.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {currentDealData.description}
                      </p>
                      <div className="flex items-center mb-6">
                        <span className="text-3xl font-semibold text-indigo-600">
                          Flat ₹{currentDealData.discountedPrice} off
                        </span>
                      </div>
                    </>
                  )}

                  {/* Countdown Timer */}
                  <div className="mb-8">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700 font-semibold mb-1">
                        Use Coupon:
                      </p>
                      <p className="text-lg font-bold text-indigo-700 tracking-wider">
                        {currentDealData.couponCode || "NO COUPON"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      Deal expires in:
                    </p>
                    <div className="flex justify-between max-w-sm">
                      {Object.entries(timeLeft).map(([key, value], index) => (
                        <div
                          key={index}
                          className="text-center p-3 bg-linear-to-b from-gray-100 to-gray-200 rounded-lg shadow-inner min-w-16"
                        >
                          <div className="text-2xl font-bold text-gray-800">
                            {value}
                          </div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
                    BUY NOW - LIMITED TIME!
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevDeal}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
            aria-label="Previous deal"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextDeal}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
            aria-label="Next deal"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDeal(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentDeal
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to deal ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Deal {currentDeal + 1} of {deals.length}
          </p>
        </div>
      </div>
    </div>
  );
}
