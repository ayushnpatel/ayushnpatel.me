import { useState, useEffect } from 'react';

export function AnimatedYear() {
  const [year, setYear] = useState(2016);
  const [isAnimating, setIsAnimating] = useState(true);
  const targetYear = new Date().getFullYear();

  useEffect(() => {
    if (year >= targetYear) {
      setIsAnimating(false);
      return;
    }

    const duration = 2000;
    const steps = targetYear - 2016;
    const stepDuration = duration / steps;

    const timer = setTimeout(() => {
      setYear(prev => prev + 1);
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [year, targetYear]);

  // When we reach the current year, show the rocket text instead
  if (year >= targetYear) {
    return (
      <span className="inline-block mr-1">
        🚀 engineer @ palantir 🚀
      </span>
    );
  }

  return (
    <span className={!isAnimating ? 'inline-block mr-1' : 'mr-1'}>
      engineer since <span className={`inline-block ml-1 ${!isAnimating ? 'wobble' : ''}`}>{year}</span>...
    </span>
  );
}
