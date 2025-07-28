"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="absolute top-16 right-0 w-full   text-black  rounded shadow"
    >
      {language === "en" ? "हिंदी भाषा में बदलें" : "Switch to English"}
    </button>
  );
}
