"use client";

import React from "react";
import { CheckCircle, Home, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.back();
  };

  const handleDownloadReceipt = async (invoice?: string): Promise<void> => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/invoice`,
      JSON.stringify({ invoice }),
      { responseType: "blob" }
    );

    const blob = res.data;
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Main content with higher z-index */}
      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated Success Icon */}
        <div className="relative mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-scale-in shadow-2xl">
                <CheckCircle className="w-16 h-16 text-white animate-check-draw" />
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 w-28 h-28 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full animate-pulse opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
            Payment Successful!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 animate-fade-in-up animation-delay-200">
            🎉 Thank you for your purchase!
          </p>
          <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-400">
            Your transaction has been processed successfully.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-100 shadow-lg animate-fade-in-up animation-delay-600 relative z-20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Transaction Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800 relative z-20">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => handleDownloadReceipt()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-xl border-2 border-green-200 hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
        </div>

        {/* Floating Elements - positioned behind main content */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-float -z-10"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-float-delayed -z-10"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-teal-200 rounded-full opacity-20 animate-float-slow -z-10"></div>
        <div className="absolute bottom-1/3 left-16 w-8 h-8 bg-green-300 rounded-full opacity-30 animate-float -z-10"></div>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check-draw {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-check-draw {
          animation: check-draw 0.6s ease-out 0.3s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
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

export default PaymentSuccess;
