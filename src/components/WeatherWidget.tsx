/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Cloud, Wind, Thermometer, MapPin } from 'lucide-react';
import { Language } from '../types';

interface WeatherWidgetProps {
  currentLang: Language;
}

interface WeatherData {
  tempCelsius: number;
  condition: string;
  humidity: string;
  windSpeed: string;
  location: string;
}

export default function WeatherWidget({ currentLang }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?lang=${currentLang}`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetching error:', err);
        // Fallback static data in case of any network interruption
        setWeather({
          tempCelsius: 28,
          condition: currentLang === 'fr' ? 'Ensoleillé' : currentLang === 'de' ? 'Sonnig' : 'Sunny & Warm',
          humidity: '74%',
          windSpeed: '14 km/h',
          location: 'Zanzibar, Tanzania'
        });
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [currentLang]);

  if (loading || !weather) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 flex items-center justify-center text-sm text-stone-200">
        <div className="w-4 h-4 border-2 border-stone-200 border-t-transparent rounded-full animate-spin mr-2"></div>
        Zanzibar Weather...
      </div>
    );
  }

  // Choose icon based on condition string
  const getIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('sun') || cond.includes('sonn') || cond.includes('ensol')) {
      return <Sun className="w-8 h-8 text-[#D4AF37] animate-pulse" />;
    }
    if (cond.includes('rain') || cond.includes('plui') || cond.includes('regen')) {
      return <CloudRain className="w-8 h-8 text-blue-300 animate-bounce" />;
    }
    return <Cloud className="w-8 h-8 text-stone-300" />;
  };

  return (
    <div id="zanzibar-weather-card" className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-white flex items-center justify-between gap-4 shadow-sm select-none">
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-2.5 rounded-lg">
          {getIcon(weather.condition)}
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{weather.location}</span>
          </div>
          <p className="text-sm font-semibold tracking-wide text-white capitalize mt-0.5">
            {weather.condition}
          </p>
        </div>
      </div>
      <div className="text-right border-l border-white/10 pl-4">
        <div className="flex items-center justify-end text-2xl font-bold tracking-tight text-[#D4AF37]">
          <Thermometer className="w-4 h-4 text-white/70 mr-0.5" />
          <span>{weather.tempCelsius}°C</span>
        </div>
        <p className="text-[10px] text-stone-300 font-mono mt-0.5">
          Hum: {weather.humidity} | {weather.windSpeed}
        </p>
      </div>
    </div>
  );
}
