'use client';

import { useState, useEffect } from 'react';

const STAGES = ['Design', 'Estimate', 'Deposit', 'Fabrication', 'Install', 'Complete'];

export default function StatusBar({ project, estimate, calendar }) {
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(function fetchWeatherData() {
    async function getWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=49.90&longitude=-97.14&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=America/Winnipeg&forecast_days=5'
        );
        const data = await res.json();
        setWeather(data.daily);
      } catch (err) {
        console.error('Weather fetch failed:', err);
      }
    }
    getWeather();
  }, []);

  useEffect(function updateTime() {
    const interval = setInterval(function() {
      setCurrentTime(new Date());
    }, 60000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  const currentStageIndex = STAGES.indexOf(project?.stage || 'Estimate');
  const progressWidth = (currentStageIndex / (STAGES.length - 1)) * 100;

  function formatDate(date) {
    return date.toLocaleDateString('en-CA', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }

  function formatTime(date) {
    return date.toLocaleTimeString('en-CA', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  function formatDayShort(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-CA', { weekday: 'short' });
  }

  function getWeatherIcon(code) {
    if (code === 0) return '\u2600\uFE0F';
    if (code <= 3) return '\u26C5';
    if (code <= 48) return '\uD83C\uDF2B\uFE0F';
    if (code <= 55) return '\uD83C\uDF27\uFE0F';
    if (code <= 65) return '\uD83C\uDF27\uFE0F';
    if (code <= 75) return '\u2744\uFE0F';
    if (code <= 82) return '\uD83C\uDF26\uFE0F';
    if (code <= 99) return '\u26C8\uFE0F';
    return '\u2600\uFE0F';
  }

  // Get upcoming site dates from calendar
  const upcomingDates = calendar ? calendar.filter(function(event) {
    const eventDate = new Date(event.date);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  }).slice(0, 2) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Progress Section - Project info left */}
      <div className="bg-[#E8E4DF] p-6">
        <div className="mb-4">
          <h1 className="text-xl font-medium text-[#2C2C2C]">
            {estimate?.projectId || 'Project'}
          </h1>
          <p className="text-[#5C5C5C] text-sm">
            {estimate?.projectAddress || 'Address TBD'}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#5C5C5C] mb-3 uppercase tracking-wide">Progress</p>
          <div className="flex items-center justify-between mb-2">
            {STAGES.map(function(stage, index) {
              const isCompleted = index <= currentStageIndex;
              return (
                <div key={stage} className="flex flex-col items-center flex-1">
                  <div
                    className={isCompleted ? 'w-3 h-3 rounded-full bg-[#7C8C6E]' : 'w-3 h-3 rounded-full border-2 border-[#A8A8A8] bg-transparent'}
                  />
                </div>
              );
            })}
          </div>
          
          <div className="relative h-0.5 bg-[#D4D4D4] -mt-[22px] mx-[6px] -z-10">
            <div
              className="absolute left-0 top-0 h-full bg-[#7C8C6E] transition-all duration-500"
              style={{ width: progressWidth + '%' }}
            />
          </div>
          
          <div className="flex justify-between mt-3">
            {STAGES.map(function(stage, index) {
              const isCompleted = index <= currentStageIndex;
              return (
                <span
                  key={stage}
                  className={isCompleted ? 'text-[9px] uppercase tracking-wide flex-1 text-center text-[#7C8C6E] font-medium' : 'text-[9px] uppercase tracking-wide flex-1 text-center text-[#A8A8A8]'}
                >
                  {stage}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Local Info Section - Time/date right aligned */}
      <div className="bg-[#E8E4DF] p-6">
        {/* Date and Time - right aligned */}
        <div className="mb-4 text-right">
          <p className="text-2xl font-medium text-[#2C2C2C]">{formatTime(currentTime)}</p>
          <p className="text-sm text-[#5C5C5C]">{formatDate(currentTime)}</p>
        </div>

        {/* 5-Day Forecast with precipitation */}
        {weather ? (
          <div className="mb-4">
            <p className="text-xs text-[#5C5C5C] mb-2 uppercase tracking-wide">Forecast</p>
            <div className="flex justify-between">
              {weather.time.map(function(day, idx) {
                const precip = weather.precipitation_probability_max[idx];
                const icon = getWeatherIcon(weather.weathercode[idx]);
                return (
                  <div key={day} className="text-center">
                    <p className="text-xs text-[#5C5C5C]">{formatDayShort(day)}</p>
                    <p className="text-base">{icon}</p>
                    <p className="text-sm font-medium text-[#2C2C2C]">
                      {Math.round(weather.temperature_2m_max[idx])}
                    </p>
                    <p className="text-xs text-[#A8A8A8]">
                      {Math.round(weather.temperature_2m_min[idx])}
                    </p>
                    {precip > 0 ? (
                      <p className="text-[10px] text-[#7C8C6E]">{precip}%</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Upcoming Site Dates */}
        {upcomingDates.length > 0 ? (
          <div className="border-t border-[#D4D4D4] pt-3">
            <p className="text-xs text-[#5C5C5C] mb-2 uppercase tracking-wide">This Week</p>
            {upcomingDates.map(function(event, idx) {
              const eventDate = new Date(event.date);
              const dayNum = eventDate.getDate();
              const dayName = eventDate.toLocaleDateString('en-CA', { weekday: 'short' });
              return (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#7C8C6E] font-medium">{dayName} {dayNum}</span>
                  <span className="text-xs text-[#5C5C5C]">{event.event}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}