"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Package, Gift, Tag } from "lucide-react";

const messages = [
  {
    text: "Someone from Delhi purchased a Band Sealer Machine!",
    icon: "shopping",
  },
  {
    text: "A customer from Mumbai just ordered a Shrink Tunnel Machine!",
    icon: "package",
  },
  {
    text: "New order received for Vacuum Packaging Machine!",
    icon: "shopping",
  },
  {
    text: "Ankur from Jaipur bought the Continuous Band Sealer!",
    icon: "shopping",
  },
  {
    text: "Priya added a Carton Sealing Machine to her cart.",
    icon: "package",
  },
  {
    text: "Ravi from Chennai placed an order for Packing Roll!",
    icon: "shopping",
  },
  {
    text: "A user from Pune is checking out the Box Strapping Machine.",
    icon: "package",
  },
  { text: "Limited-time offer claimed by someone from Nagpur!", icon: "tag" },
  {
    text: "Customer from Kolkata ordered a Hand Sealer Machine.",
    icon: "shopping",
  },
  { text: "A visitor unlocked a ₹500 coupon!", icon: "gift" },
  { text: "Rahul from Surat just won a smartwatch!", icon: "gift" },
];

const getIcon = (type: string) => {
  const base = "w-4 h-4 sm:w-5 sm:h-5";
  switch (type) {
    case "shopping":
      return <ShoppingBag className={`${base} text-emerald-600`} />;
    case "package":
      return <Package className={`${base} text-blue-600`} />;
    case "gift":
      return <Gift className={`${base} text-purple-600`} />;
    case "tag":
      return <Tag className={`${base} text-orange-600`} />;
    default:
      return <ShoppingBag className={`${base} text-emerald-600`} />;
  }
};

export default function FakePopup() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setMsg(messages[Math.floor(Math.random() * messages.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 3500);
      },
      3 * 60 * 1000 + Math.random() * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            fixed
            bottom-4 left-1/2 -translate-x-1/2
            sm:bottom-auto sm:top-6 sm:left-auto sm:right-6 sm:translate-x-0
            bg-white border border-gray-200
            shadow-xl rounded-xl p-3 sm:p-4
            w-[90vw] max-w-sm
            z-50 backdrop-blur-sm
          "
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">{getIcon(msg.icon)}</div>

            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                {msg.text}
              </p>

              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs text-gray-500">
                  Just now
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
