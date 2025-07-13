"use client";

import React from "react";
import { CalendarData } from "@/lib/api/mockData";

interface CalendarWidgetProps {
  calendarData: CalendarData;
}

export default function CalendarWidget({ calendarData }: CalendarWidgetProps) {
  const { currentMonth, currentYear, events } = calendarData;

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, 2, 1).getDay(); // March is month 2 (0-indexed)
  const daysInMonth = 31; // March has 31 days

  // Create array for calendar grid
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayData = events.find((e) => e.date === day);
    calendarDays.push({
      date: day,
      hasEvent: dayData?.hasEvent || false,
      isToday: dayData?.isToday || false,
    });
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full h-full bg-white rounded-xl p-4 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-black">
          {currentMonth} {currentYear}
        </h3>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 flex-1">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-6" />;
          }

          return (
            <div
              key={day.date}
              className={`h-6 flex items-center justify-center text-xs rounded cursor-pointer transition-colors ${
                day.isToday
                  ? "bg-blue-500 text-white font-bold"
                  : day.hasEvent
                    ? "bg-red-500 text-white font-medium"
                    : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              {day.date}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded"></div>
          <span className="text-gray-600">Events</span>
        </div>
      </div>
    </div>
  );
}
