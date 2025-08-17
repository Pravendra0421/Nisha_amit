"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// Define the type for an image object
type Image = {
  id: string | number;
  src: string;
  alt?: string;
};

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: Image[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // This download logic remains the same as it's correct
  const handleDownload = async (src: string, id: string | number) => {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const filename = src.split("/").pop() || `image-${id}.jpg`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        {/* We apply the same changes to all three columns */}
        
        {/* Column 1 */}
        <div className="grid gap-10">
          {firstPart.map((el) => (
            <motion.div
              style={{ y: translateFirst }}
              key={`grid-1-${el.id}`}
              className="relative group" // The parent container is relative
            >
              <img
                src={el.src}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height="400"
                width="400"
                alt={el.alt || "thumbnail"}
              />
              {/* The button is now positioned directly */}
              <button
                onClick={() => handleDownload(el.src, el.id)}
                className="absolute top-4 right-4 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Download image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="grid gap-10">
          {secondPart.map((el) => (
            <motion.div
              style={{ y: translateSecond }}
              key={`grid-2-${el.id}`}
              className="relative group"
            >
              <img
                src={el.src}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height="400"
                width="400"
                alt={el.alt || "thumbnail"}
              />
              <button
                onClick={() => handleDownload(el.src, el.id)}
                className="absolute top-4 right-4 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Download image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="grid gap-10">
          {thirdPart.map((el) => (
            <motion.div
              style={{ y: translateThird }}
              key={`grid-3-${el.id}`}
              className="relative group"
            >
              <img
                src={el.src}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height="400"
                width="400"
                alt={el.alt || "thumbnail"}
              />
              <button
                onClick={() => handleDownload(el.src, el.id)}
                className="absolute top-4 right-4 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Download image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};