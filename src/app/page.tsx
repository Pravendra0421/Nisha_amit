"use client";

import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CarouselDemo } from "@/components/widget/Carousel";
import CountdownTimer from "@/components/countDownTimer";
import Events from "@/components/common/Event";
import { TimelineDemo } from "@/components/common/Story";
export default function Home() {

  return (
    <main className="text-center w-full h-full min-h-screen bg-gray-400 flex flex-col items-center justify-center">
      <CarouselDemo />
      <CountdownTimer/>
      <LanguageSwitcher />
      <Events/>
      <TimelineDemo/>
    </main>
  );
}
