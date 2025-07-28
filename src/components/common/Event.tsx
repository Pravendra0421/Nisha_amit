'use client'
import React from 'react'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { CardStack } from '@/components/ui/card-stack';
import { cn } from "@/lib/utils";
export const projects = [
  {
    title: "Haldi 💛",
    description:
      "A sun-kissed ceremony of laughter and love. Join us as we shower the couple with turmeric and blessings for a life full of brightness and joy.",
    link: "#haldi", // Unique link
  },
  {
    title: "Mehndi 🌿",
    description:
      "An evening of intricate designs and joyful melodies. We invite you to our Mehndi night to celebrate the beautiful color of love that adorns our hands and hearts.",
    link: "#mehndi", // Unique link
  },
  {
    title: "Lagun 🙏",
    description:
      "The sacred commencement of our union. Witness the traditional Lagun ceremony, where we formalize the auspicious promise of a lifetime together.",
    link: "#lagun", // Unique link
  },
  {
    title: "Sangeet 💃",
    description:
      "Let the music take over! Get ready for an electrifying Sangeet night filled with dance, songs, and endless fun as our families unite in celebration.",
    link: "#sangeet", // Unique link
  },
  {
    title: "Phere 🔥",
    description:
      "Seven sacred vows around the holy fire. The Phere ceremony is the heart of our wedding, where two souls promise to walk together for a lifetime.",
    link: "#phere", // Unique link
  },
  {
    title: "Vidai 😢",
    description:
      "A bittersweet farewell filled with love and cherished memories. A poignant moment as our daughter begins her new journey, carrying our blessings with her.",
    link: "#vidai", // Unique link
  },
];
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
const Events = () => {
  return (
    <>
    
    <div className="max-w-7xl mx-auto px-8 mt-10">
      <HoverEffect items={projects} />
    </div>
        <div className="h-[20rem]  flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
 

    </>
  )
}

export default Events