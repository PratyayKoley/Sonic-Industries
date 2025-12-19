"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Video } from "lucide-react";

export default function VideoWidget() {
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      {/* Dark backdrop when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Main video / minimized icon */}
      <AnimatePresence>
        {!minimized ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${
              expanded
                ? "inset-0 flex items-center justify-center"
                : "bottom-6 left-6"
            } z-[90]`}
          >
            <motion.div
              className={`bg-black rounded-xl overflow-hidden shadow-lg relative ${
                expanded ? "w-[90%] max-w-2xl h-[70vh]" : "w-[180px] h-[320px]"
              }`}
            >
              {/* Buttons */}
              <div className="absolute top-2 right-2 flex gap-2 z-20">
                {expanded ? (
                  <button
                    onClick={() => setExpanded(false)}
                    className="p-1 bg-white/20 hover:bg-white/40 rounded-md"
                  >
                    <Minimize2 size={18} color="white" />
                  </button>
                ) : (
                  <button
                    onClick={() => setExpanded(true)}
                    className="p-1 bg-white/20 hover:bg-white/40 rounded-md"
                  >
                    <Maximize2 size={18} color="white" />
                  </button>
                )}
                {/* Minimize to icon instead of closing */}
                <button
                  onClick={() => setMinimized(true)}
                  className="p-1 bg-white/20 hover:bg-white/40 rounded-md"
                >
                  <X size={18} color="white" />
                </button>
              </div>

              {/* VIDEO */}
              <video
                src="/videos/unboxing1.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ) : (
          // Minimized icon at bottom-left
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMinimized(false)}
            className="fixed bottom-6 left-6 w-12 h-12 flex items-center justify-center bg-black/70 text-white rounded-full shadow-lg z-[90]"
          >
            <Video size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
