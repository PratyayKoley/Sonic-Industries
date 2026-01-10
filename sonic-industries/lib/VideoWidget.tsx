"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Video } from "lucide-react";
import { CategoryImages, ProductBackend } from "@/types";
import { getResolvedVideoData } from "./getVideoData";

interface VideoWidgetProps {
  productData: ProductBackend | null;
  allProductData: CategoryImages | null;
}

export default function VideoWidget({
  productData,
  allProductData,
}: VideoWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    setIsMobile(media.matches);

    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  // On mobile → start minimized
  useEffect(() => {
    if (isMobile) {
      setMinimized(true);
      setExpanded(false);
    }
  }, [isMobile]);

  const videoData = getResolvedVideoData(productData, allProductData);

  const videoURL = videoData?.unboxing_yt_video_url || videoData?.yt_video_url;

  if (!videoURL) return null;

  function getYouTubeEmbedURL(url: string) {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&?]+)/
    );
    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1`
      : "";
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* VIDEO MODAL (mobile + desktop) */}
        {expanded && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              className={`bg-black rounded-xl overflow-hidden shadow-xl relative
                w-[92%] max-w-2xl h-[60vh] sm:h-[70vh]
              `}
            >
              {/* Controls */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                {!isMobile && (
                  <button
                    onClick={() => setExpanded(false)}
                    className="p-1 bg-white/20 hover:bg-white/40 rounded-md cursor-pointer"
                  >
                    <Minimize2 size={18} color="white" />
                  </button>
                )}

                <button
                  onClick={() => {
                    setExpanded(false);
                    setMinimized(true);
                  }}
                  className="p-1 bg-white/20 hover:bg-white/40 rounded-md cursor-pointer"
                >
                  <X size={18} color="white" />
                </button>
              </div>

              <iframe
                src={getYouTubeEmbedURL(videoURL)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}

        {/* DESKTOP MINI PLAYER */}
        {!expanded && !minimized && !isMobile && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <div className="bg-black rounded-xl overflow-hidden shadow-xl w-45 h-80 relative">
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => setExpanded(true)}
                  className="p-1 bg-white/20 hover:bg-white/40 rounded-md cursor-pointer"
                >
                  <Maximize2 size={18} color="white" />
                </button>

                <button
                  onClick={() => setMinimized(true)}
                  className="p-1 bg-white/20 hover:bg-white/40 rounded-md cursor-pointer"
                >
                  <X size={18} color="white" />
                </button>
              </div>

              <iframe
                src={getYouTubeEmbedURL(videoURL)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* FLOATING ICON (mobile + minimized) */}
        {!expanded && (minimized || isMobile) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setExpanded(true);
              setMinimized(false);
            }}
            className="fixed bottom-5 left-5 w-12 h-12 flex items-center justify-center bg-black/80 text-white rounded-full shadow-lg z-50 cursor-pointer"
          >
            <Video size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
