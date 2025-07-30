"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// Define the type for an image object, which now includes an ID.
type Image = {
  id: string | number;
  src: string;
  alt?: string;
};

export const ParallaxScroll = ({
  images,
  className,
}: {
  // The component now expects an array of objects, not just strings.
  images: Image[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10"
      >
        <div className="grid gap-10">
          {firstPart.map((el) => (
            <motion.div
              style={{ y: translateFirst }}
              // Use the unique ID from your object as the key
              key={`grid-1-${el.id}`}
            >
              <img
                // Use the src property from the object
                src={el.src}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                // Use the alt property from the object
                alt={el.alt || "thumbnail"}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el) => (
            <motion.div
              style={{ y: translateSecond }}
              // Use the unique ID from your object as the key
              key={`grid-2-${el.id}`}
            >
              <img
                // Use the src property from the object
                src={el.src}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                // Use the alt property from the object
                alt={el.alt || "thumbnail"}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el) => (
            <motion.div
              style={{ y: translateThird }}
              // Use the unique ID from your object as the key
              key={`grid-3-${el.id}`}
            >
              <img
                // Use the src property from the object
                src={el.src}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                // Use the alt property from the object
                alt={el.alt || "thumbnail"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};