'use client'
import React, { useMemo } from 'react'
import { CardStack } from '@/components/ui/card-stack';
import { cn } from "@/lib/utils";
import { useLanguage } from '@/context/LanguageContext';
import Image from "next/image";

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
  const { t } = useLanguage();
  const CARDS = useMemo(() => [
    {
      id: 0,
      name: t("eventName1"),
      designation: t("eventDesign1"),
      content: (
        // 3. Wrapper Div for 'fill' layout
        <div className="relative h-60 w-full"> 
          <Image
            src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621241/beautiful-couple-street-with-presents_zuf6oj.jpg"
            alt="A romantic proposal on a beach"
            fill // Automatic width/height based on parent
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 500px" // Mobile pe full, Desktop pe card size
          />
        </div>
      ),
    },
    {
      id: 1,
      name: t("eventName2"),
      designation: t("eventDesign2"),
      content: (
        <div className="relative h-60 w-full">
          <Image
            src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621053/young-couple-love-outdoor_oceqzu.jpg"
            alt="A vibrant dance event with colorful lights"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      ),
    },
    {
      id: 2,
      name: t("eventName3"),
      designation: t("eventDesign3"),
      content: (
        <div className="relative h-60 w-full">
          <Image
            src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621379/Gemini_Generated_Image_8q21bn8q21bn8q21_sncfzu.png"
            alt="A couple exchanging wedding vows"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      ),
    },
    {
      id: 3,
      name: t("eventName4"),
      designation: t("eventDesign4"),
      content: (
        <div className="relative h-60 w-full">
          <Image
            src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621506/Gemini_Generated_Image_i62sv1i62sv1i62s_oys6yz.png"
            alt="A grand wedding reception with guests"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      ),
    },
  ], [t]);

  return (
    <div className="h-[20rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  )
}

export default Events