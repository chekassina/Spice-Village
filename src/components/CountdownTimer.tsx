/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { translations } from '../data';

interface CountdownTimerProps {
  currentLang: 'en' | 'fr' | 'de';
}

export default function CountdownTimer({ currentLang }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    // Determine target time: next tour starts at either 9:00 AM or 2:00 PM local time
    const calculateTimeLeft = () => {
      const now = new Date();
      const t1 = new Date();
      t1.setHours(9, 0, 0, 0);

      const t2 = new Date();
      t2.setHours(14, 0, 0, 0);

      let target = t1;
      if (now > t1 && now <= t2) {
        target = t2;
      } else if (now > t2) {
        target = new Date();
        target.setDate(target.getDate() + 1);
        target.setHours(9, 0, 0, 0);
      }

      const diffMs = target.getTime() - now.getTime();
      const hrs = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      return {
        hours: Math.max(0, hrs),
        minutes: Math.max(0, mins),
        seconds: Math.max(0, secs),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const labels = translations[currentLang];

  return (
    <div id="countdown-banner" className="bg-[#D4AF37] text-[#5A3E2B] px-5 py-3 rounded-2xl flex flex-wrap items-center justify-center gap-4 shadow-md font-sans select-none border border-amber-400">
      <div className="flex items-center gap-2 font-semibold text-sm">
        <Clock className="w-5 h-5 text-[#5A3E2B] animate-spin" style={{ animationDuration: '8s' }} />
        <span>{labels.nextTourIn}</span>
      </div>
      <div className="flex gap-2 text-center text-lg font-bold">
        <div className="bg-[#5A3E2B] text-white px-3 py-1 rounded-lg shadow-inner min-w-[50px]">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-medium block text-amber-400 mt-0.5">{labels.hours}</span>
        </div>
        <span className="text-[#5A3E2B] self-center text-xl">:</span>
        <div className="bg-[#5A3E2B] text-white px-3 py-1 rounded-lg shadow-inner min-w-[50px]">
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-medium block text-amber-400 mt-0.5">{labels.mins}</span>
        </div>
        <span className="text-[#5A3E2B] self-center text-xl">:</span>
        <div className="bg-[#5A3E2B] text-white px-3 py-1 rounded-lg shadow-inner min-w-[50px]">
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-medium block text-amber-400 mt-0.5">{labels.secs}</span>
        </div>
      </div>
    </div>
  );
}
