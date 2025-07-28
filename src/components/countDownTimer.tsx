'use client'
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
// --- Self-Contained SVG Icons (No library needed) ---

// Heart Icon SVG
const HeartIcon = () => (
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
    className="text-pink-300"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Calendar Icon SVG
const CalendarIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
        <line x1="16" x2="16" y1="2" y2="6"></line>
        <line x1="8" x2="8" y1="2" y2="6"></line>
        <line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
);


// --- Reusable UI Components & Types ---

// Defining the types for the TimeUnit component's props
interface TimeUnitProps {
  value: number;
  label: string;
}

// This component renders each individual time unit (e.g., "Days", "Hours").
const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className="flex flex-col items-center justify-center bg-white/5 p-4 rounded-2xl w-24 h-24 border border-white/10 shadow-lg">
    <span className="text-4xl font-bold text-white tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs font-light text-white/60 uppercase tracking-widest mt-1">
      {label}
    </span>
  </div>
);

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}


export default function CountdownTimer() {
    const {t} = useLanguage();
  const weddingDate = new Date("2026-02-21T00:00:00");

  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +weddingDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
  
    setIsClient(true); 
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const timerComponents = timeLeft ? (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 p-4">
      <TimeUnit value={timeLeft.days} label={t("days")} />
      <TimeUnit value={timeLeft.hours} label={t("Hours")} />
      <TimeUnit value={timeLeft.minutes} label={t("minutes")} />
      <TimeUnit value={timeLeft.seconds} label={t("seconds")} />
    </div>
  ) : (
    <div className="text-center space-y-4 p-8">
      <h2 className="text-4xl font-bold text-white drop-shadow-lg">
        🎉 {t("weddingDay")}! 🎉
      </h2>
    </div>
  );

  return (
   
        <div className="absolute top-110 flex  flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl max-w-2xl w-full overflow-hidden">
            
            <div className="text-center py-6 px-6 border-b border-white/10 w-full">
                <div className="flex items-center justify-center gap-2 text-white/90 mb-2">
                    <HeartIcon />
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
                        {t("home")}
                    </h1>
                </div>
                <p className="text-sm text-white/70 flex items-center justify-center gap-2">
                    <CalendarIcon />
                    {t("Are_getting_married")}
                </p>
            </div>

            {/* Countdown Component - Now automatic */}
            <div className="py-6">
                {/* We only render the timer on the client to avoid SSR issues */}
                {isClient ? timerComponents : <div className="h-[128px] w-[440px]"></div>}
            </div>
        </div>
  );
}
