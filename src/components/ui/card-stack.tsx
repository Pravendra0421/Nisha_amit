"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Defines the structure for each card
type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 12;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[20rem] md:h-[20rem] w-full max-w-4xl">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-gradient-to-br from-white to-neutral-100 dark:from-zinc-800 dark:to-zinc-900 h-[20rem] md:h-[20rem] w-full rounded-3xl p-6 shadow-2xl border border-neutral-200/80 dark:border-white/[0.2] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {/* --- THIS IS THE FIX --- */}
            {/* This div is now set to grow and fill available space */}
            <div className="flex-1 w-full">
              {card.content}
            </div>
            
            {/* This part for the name and designation stays the same */}
            <div>
              <p className="font-semibold text-xl text-neutral-800 dark:text-white">
                {card.name}
              </p>
              <p className="text-base font-normal text-neutral-500 dark:text-neutral-300">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};