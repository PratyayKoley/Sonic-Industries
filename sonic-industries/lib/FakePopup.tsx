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
  switch (type) {
    case "shopping":
      return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
    case "package":
      return <Package className="w-5 h-5 text-blue-600" />;
    case "gift":
      return <Gift className="w-5 h-5 text-purple-600" />;
    case "tag":
      return <Tag className="w-5 h-5 text-orange-600" />;
    default:
      return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
  }
};

export default function FakePopup() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setMsg(randomMessage);

      setShow(true);

      setTimeout(() => setShow(false), 3500);
    }, 5000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 right-6 
            bg-white border border-gray-200
            shadow-xl rounded-2xl p-4 w-[300px] z-[9999]
            backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{getIcon(msg.icon)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                {msg.text}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
