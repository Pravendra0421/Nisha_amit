"use client";
import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      fetch("/api/track-visit", { method: "POST" })
        .then(() => {
          sessionStorage.setItem("hasVisited", "true");
        })
        .catch((err) => console.error("Tracking error:", err));
    }
  }, []);

  return null; 
}