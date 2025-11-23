import { useState, useEffect } from "react";
import frenchieImage from "../assets/frenchie.png";
import { cn } from "@/lib/utils";

export function AnimatedYear() {
  const [year, setYear] = useState(2016);
  const [isAnimating, setIsAnimating] = useState(true);
  const targetYear = new Date().getFullYear();

  useEffect(() => {
    if (year >= targetYear) {
      setIsAnimating(false);
      return;
    }

    const duration = 4000;
    const steps = targetYear - 2016;
    const stepDuration = duration / steps;

    const timer = setTimeout(() => {
      setYear((prev) => prev + 1);
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [year, targetYear]);

  // When we reach the current year, show the palantir text instead
  return year >= targetYear ? (
    <span className="inline-block items-center gap-1.5 mr-1">
      <img
        src={frenchieImage}
        alt="Palantir"
        className="w-8 h-8 inline-block object-contain"
      />
      <span className="px-2">engineer in nyc</span>
      <img
        src={frenchieImage}
        alt="Palantir"
        className="w-8 h-8 inline-block object-contain"
      />
    </span>
  ) : (
    <div
      className={cn("min-h-8 h-8", !isAnimating ? "inline-block mr-1" : "mr-1")}
    >
      <img
        src={frenchieImage}
        alt="Palantir"
        className="w-8 h-8 inline-block object-contain"
      />
      <span className="pl-2">engineering since </span>
      <span
        className={`inline-block ml-1 mr-2   ${!isAnimating ? "wobble" : ""}`}
      >
        {year}
      </span>
      <span className="mr-2">...</span>
      <img
        src={frenchieImage}
        alt="Palantir"
        className="w-8 h-8 inline-block object-contain"
      />
    </div>
  );
}
