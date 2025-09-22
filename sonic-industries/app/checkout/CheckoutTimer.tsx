"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface JwtPayload {
  exp: number;
}

const CheckoutTimer: React.FC<{ token: string }> = ({ token }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const expiry = decoded.exp * 1000;
      const now = Date.now();
      const remaining = Math.max(0, expiry - now);

      setTimeLeft(Math.floor(remaining / 1000));

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.back(); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Invalid JWT:", error);
    }
  }, [token, router]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mt-4 text-center text-sm text-red-600 font-medium">
      {timeLeft > 0 ? (
        <>
          Session expires in {minutes}:{seconds.toString().padStart(2, "0")}
        </>
      ) : (
        <>⚠️ Session expired. Redirecting…</>
      )}
    </div>
  );
};

export default CheckoutTimer;
