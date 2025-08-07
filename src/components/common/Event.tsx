'use client'
import React from 'react'
import { CardStack } from '@/components/ui/card-stack';
import { cn } from "@/lib/utils";
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};
 

const Events = () => {
const CARDS = [
  {
    id: 0,
    name: "Amit Love Nisha",
    designation: "The Proposal 💍",
    content: (
      <img
        src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621241/beautiful-couple-street-with-presents_zuf6oj.jpg"
        className="h-60 w-full object-cover rounded-xl"
        alt="A romantic proposal on a beach"
      />
    ),
  },
  {
    id: 1,
    name: "Sangeet Night",
    designation: "A Symphony of Joy 💃",
    content: (
      <img
        src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621053/young-couple-love-outdoor_oceqzu.jpg"
        className="h-60 w-full object-cover rounded-xl"
        alt="A vibrant dance event with colorful lights"
      />
    ),
  },
  {
    id: 2,
    name: "The Wedding Vows",
    designation: "A Promise of Forever 🙏",
    content: (
      <img
        src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621379/Gemini_Generated_Image_8q21bn8q21bn8q21_sncfzu.png"
        className="h-60 w-full object-cover rounded-xl"
        alt="A couple exchanging wedding vows"
      />
    ),
  },
  {
    id: 3,
    name: "Grand Reception",
    designation: "Our First Celebration as Mr. & Mrs. 🎉",
    content: (
      <img
        src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621506/Gemini_Generated_Image_i62sv1i62sv1i62s_oys6yz.png"
        className="h-60 w-full object-cover rounded-xl"
        alt="A grand wedding reception with guests"
      />
    ),
  },
];
  return (
    <>
        <div className="h-[20rem]  flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
 

    </>
  )
}

export default Events