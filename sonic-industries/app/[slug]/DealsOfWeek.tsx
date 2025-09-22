"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function DealsOfWeek() {
  const [currentDeal, setCurrentDeal] = useState(0);

  const deals = [
    {
      id: 1,
      name: "Smart Watch (Blue)",
      image: "/smartwatch3.png",
      description:
        "Premium smartwatch with health tracking, GPS, and 7-day battery life. Water resistant up to 50 meters.",
      originalPrice: 250,
      salePrice: 99,
      rating: 5,
      timeLeft: { days: "02", hours: "23", minutes: "59", seconds: "09" },
    },
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      image: "/earbuds.png",
      description:
        "Active noise cancellation, premium sound quality, and 30-hour battery life with charging case.",
      originalPrice: 199,
      salePrice: 79,
      rating: 5,
      timeLeft: { days: "01", hours: "15", minutes: "32", seconds: "45" },
    },
    {
      id: 3,
      name: "Fitness Tracker Elite",
      image: "/fitness-tracker.png",
      description:
        "Advanced fitness tracking with heart rate monitoring, sleep analysis, and smartphone integration.",
      originalPrice: 179,
      salePrice: 69,
      rating: 4,
      timeLeft: { days: "03", hours: "08", minutes: "17", seconds: "22" },
    },
    {
      id: 4,
      name: "Smart Home Hub",
      image: "/smart-hub.png",
      description:
        "Control all your smart devices from one central hub. Voice control and app integration included.",
      originalPrice: 149,
      salePrice: 59,
      rating: 5,
      timeLeft: { days: "00", hours: "18", minutes: "43", seconds: "56" },
    },
  ];

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

  const currentDealData = deals[currentDeal];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4">
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
        <div className="relative">
          {/* Main Deal Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto transition-all duration-500 transform hover:shadow-2xl">
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="relative">
                  <Image
                    alt={currentDealData.name}
                    className="max-w-full h-64 md:h-80 object-contain transition-transform duration-300 hover:scale-105"
                    src={currentDealData.image}
                    width={500}
                    height={500}
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
                    {Math.round(
                      ((currentDealData.originalPrice -
                        currentDealData.salePrice) /
                        currentDealData.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < currentDealData.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({currentDealData.rating}.0)
                  </span>
                </div>

                {/* Product Name */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {currentDealData.name}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentDealData.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-indigo-600 mr-3">
                    ₹{currentDealData.salePrice}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{currentDealData.originalPrice}
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    Deal expires in:
                  </p>
                  <div className="flex justify-between max-w-sm">
                    {Object.entries(currentDealData.timeLeft).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="text-center p-3 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-inner min-w-16"
                        >
                          <div className="text-2xl font-bold text-gray-800">
                            {value}
                          </div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
                  BUY NOW - LIMITED TIME!
                </button>
              </div>
            </div>
          </div>

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

        {/* Deal Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Deal {currentDeal + 1} of {deals.length}
          </p>
        </div>
      </div>
    </div>
  );
}
