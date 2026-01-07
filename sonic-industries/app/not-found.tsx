"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6">
      <div className="relative max-w-2xl w-full text-center">

        {/* 404 Text */}
        <div className="relative mb-6 sm:mb-8">
          <div className="text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[14rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-700 leading-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[14rem] font-extrabold text-gray-200 leading-none -z-10 translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2">
            404
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="p-3 sm:p-4 bg-red-100 rounded-full animate-bounce">
            <Image
              src="/favicon.ico"
              alt="Page not found"
              width={48}
              height={48}
              priority
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="mb-8 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Don&apos;t worry, it happens to the best of us.
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-100 text-gray-700 text-sm sm:text-base font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Back
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 left-8 w-10 h-10 sm:w-14 sm:h-14 bg-blue-200 rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-20 right-10 w-8 h-8 sm:w-12 sm:h-12 bg-purple-200 rounded-full opacity-20 animate-float-delayed" />
      <div className="absolute top-1/2 left-6 sm:left-20 w-6 h-6 sm:w-8 sm:h-8 bg-pink-200 rounded-full opacity-20 animate-float-slow" />

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
