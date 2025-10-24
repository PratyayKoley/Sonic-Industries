"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface JwtPayload {
  exp: number;
}

const CheckoutTimer: React.FC<{ token: string }> = ({ token }) => {
  const [, setExpiryTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const expiry = decoded.exp * 1000;
      setExpiryTime(expiry);

      const updateRemaining = () => {
        const now = Date.now();
        const remaining = Math.max(0, expiry - now);
        setTimeLeft(Math.floor(remaining / 1000));

        if (remaining <= 0) {
          router.back();
        }
      };

      // Update every second — this is fine even if throttled
      const interval = setInterval(updateRemaining, 1000);
      updateRemaining(); // initial run

      // ALSO handle when tab becomes visible again
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          updateRemaining();
        }
      });

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
        <>Session expires in {minutes}:{seconds.toString().padStart(2, "0")}</>
      ) : (
        <>⚠️ Session expired. Redirecting…</>
      )}
    </div>
  );
};

export default CheckoutTimer;
