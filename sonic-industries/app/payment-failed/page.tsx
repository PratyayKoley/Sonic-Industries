"use client";

import React from "react";
import { XCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentFailed: React.FC = () => {
  const router = useRouter();
  const handleGoHome = () => router.back();

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Error Animation Container */}
      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated Error Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 sm:w-32 h-24 sm:h-32 bg-linear-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center animate-shake shadow-2xl">
              <XCircle className="w-12 sm:w-16 h-12 sm:h-16 text-white animate-error-pulse" />
            </div>
            <div className="absolute inset-0 sm:w-32 sm:h-32 w-24 h-24 border-4 border-red-300 rounded-full animate-error-ring opacity-60"></div>
            <div className="absolute inset-2 sm:inset-4 w-20 sm:w-24 h-20 sm:h-24 border-2 border-red-200 rounded-full animate-error-ring-delayed opacity-40"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
            Payment Failed
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 animate-fade-in-up animation-delay-200">
            😔 Something went wrong
          </p>
          <p className="text-base sm:text-lg text-gray-600 animate-fade-in-up animation-delay-400">
            Don&apos;t worry, no charges have been made to your account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 font-semibold rounded-xl border-2 border-red-200 hover:bg-red-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Home className="w-4 sm:w-5 h-4 sm:h-5" />
            Go Back
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 h-12 sm:h-16 bg-red-200 rounded-full opacity-20 animate-float-error"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-16 sm:w-20 h-16 sm:h-20 bg-rose-200 rounded-full opacity-20 animate-float-error-delayed"></div>
        <div className="absolute top-1/3 right-10 sm:right-20 w-8 sm:w-12 h-8 sm:h-12 bg-orange-200 rounded-full opacity-20 animate-float-error-slow"></div>
        <div className="absolute bottom-1/3 left-4 sm:left-16 w-6 sm:w-8 h-6 sm:h-8 bg-red-300 rounded-full opacity-30 animate-float-error"></div>

        {/* Warning triangles */}
        <div className="absolute top-8 sm:top-10 left-1/4 w-0 h-0 border-l-3 sm:border-l-4 border-r-3 sm:border-r-4 border-b-6 sm:border-b-8 border-l-transparent border-r-transparent border-b-red-300 opacity-40 animate-warning-1"></div>
        <div className="absolute top-14 sm:top-16 right-1/4 w-0 h-0 border-l-4 sm:border-l-5 border-r-4 sm:border-r-5 border-b-8 sm:border-b-10 border-l-transparent border-r-transparent border-b-orange-300 opacity-40 animate-warning-2"></div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shake {0%,100%{transform:translateX(0);}10%,30%,50%,70%,90%{transform:translateX(-2px);}20%,40%,60%,80%{transform:translateX(2px);}}
        @keyframes error-pulse {0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.1);opacity:0.8;}}
        @keyframes error-ring {0%{transform:scale(0.8);opacity:1;}100%{transform:scale(1.4);opacity:0;}}
        @keyframes error-ring-delayed {0%{transform:scale(0.8);opacity:1;}100%{transform:scale(1.6);opacity:0;}}
        @keyframes fade-in-up {0%{opacity:0;transform:translateY(30px);}100%{opacity:1;transform:translateY(0);}}
        @keyframes float-error {0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-15px) rotate(180deg);}}
        @keyframes float-error-delayed {0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-12px) rotate(-180deg);}}
        @keyframes float-error-slow {0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-8px) rotate(90deg);}}
        @keyframes warning-1 {0%,100%{opacity:0.2;transform:translateY(0px) rotate(0deg);}50%{opacity:0.6;transform:translateY(-10px) rotate(180deg);}}
        @keyframes warning-2 {0%,100%{opacity:0.2;transform:translateY(0px) rotate(0deg);}50%{opacity:0.6;transform:translateY(-8px) rotate(-180deg);}}

        .animate-shake {animation:shake 0.6s ease-in-out;}
        .animate-error-pulse {animation:error-pulse 2s ease-in-out infinite;}
        .animate-error-ring {animation:error-ring 2s ease-out infinite;}
        .animate-error-ring-delayed {animation:error-ring-delayed 2s ease-out infinite 0.5s;}
        .animate-fade-in-up {animation:fade-in-up 0.6s ease-out both;}
        .animation-delay-200 {animation-delay:0.2s;}
        .animation-delay-400 {animation-delay:0.4s;}
        .animation-delay-600 {animation-delay:0.6s;}
        .animation-delay-800 {animation-delay:0.8s;}
        .animate-float-error {animation:float-error 4s ease-in-out infinite;}
        .animate-float-error-delayed {animation:float-error-delayed 5s ease-in-out infinite 1s;}
        .animate-float-error-slow {animation:float-error-slow 6s ease-in-out infinite 2s;}
        .animate-warning-1 {animation:warning-1 3s ease-in-out infinite;}
        .animate-warning-2 {animation:warning-2 3.5s ease-in-out infinite 1s;}
      `}</style>
    </div>
  );
};

export default PaymentFailed;
