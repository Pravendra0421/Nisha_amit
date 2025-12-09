"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageType = {
  id: string | number;
  src: string;
  alt?: string;
};

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: ImageType[];
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

  // 1. OPTIMIZATION: useMemo for Data Splitting
  // Kyun: Array.slice() har render par naya array banata hai.
  // useMemo lagane se ye calculation cache ho jati hai.
  const { firstPart, secondPart, thirdPart } = useMemo(() => {
    const third = Math.ceil(images.length / 3);
    return {
      firstPart: images.slice(0, third),
      secondPart: images.slice(third, 2 * third),
      thirdPart: images.slice(2 * third),
    };
  }, [images]);

  const handleDownload = async (src: string, id: string | number) => {
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error("Network response was not ok");
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
        
        {/* Column 1 */}
        <div className="grid gap-10">
          {firstPart.map((el) => (
            <ImageCard
              key={`grid-1-${el.id}`}
              image={el}
              translate={translateFirst}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="grid gap-10">
          {secondPart.map((el) => (
            <ImageCard
              key={`grid-2-${el.id}`}
              image={el}
              translate={translateSecond}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="grid gap-10">
          {thirdPart.map((el) => (
            <ImageCard
              key={`grid-3-${el.id}`}
              image={el}
              translate={translateThird}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Helper Component to Remove Repetition & Apply Optimization
const ImageCard = ({
  image,
  translate,
  onDownload,
}: {
  image: ImageType;
  translate: MotionValue<number>;
  onDownload: (src: string, id: string | number) => void;
}) => {
  return (
    <motion.div
      style={{ y: translate }}
      className="relative group h-80 w-full rounded-lg overflow-hidden" // Moved sizing classes here
    >
      {/* 3. OPTIMIZATION: next/image with fill */}
      <Image
        src={image.src}
        alt={image.alt || "thumbnail"}
        fill // Automatic width/height based on parent
        className="object-cover object-left-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
      />
      
      {/* Download Button */}
      <button
        onClick={() => onDownload(image.src, image.id)}
        className="absolute top-4 right-4 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-gray-100"
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
  );
};