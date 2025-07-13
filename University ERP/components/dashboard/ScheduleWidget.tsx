"use client";

import React from "react";
import { ScheduleItem } from "@/lib/api/mockData";

interface ScheduleWidgetProps {
  scheduleItems: ScheduleItem[];
}

export default function ScheduleWidget({ scheduleItems }: ScheduleWidgetProps) {
  const timeSlots = [
    "9 Am",
    "10 Am",
    "11 Am",
    "12 Am",
    "1 Pm",
    "2 Pm",
    "3 Pm",
    "4 Pm",
    "5 Pm",
    "5:30 Pm",
  ];

  const getScheduleItemForTime = (timeSlot: string) => {
    return scheduleItems.find((item) => {
      const startTime = item.startTime
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(":", "");
      const slotTime = timeSlot
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(":", "");
      return startTime === slotTime;
    });
  };

  // Default content for empty slots
  const defaultScheduleItem = {
    title: "Creativity and Critical Thinking Skills",
    courseCode: "AEC 104",
    professor: "Prof. P. Vivekananda Shanmuganathan",
    location: "Lecture - C 211",
    status: "Pending",
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-4 overflow-hidden flex flex-col">
      <h2 className="text-lg font-bold text-black mb-4">Schedule</h2>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {timeSlots.map((timeSlot) => {
          const scheduleItem = getScheduleItemForTime(timeSlot);
          const displayItem = scheduleItem || defaultScheduleItem;

          return (
            <div key={timeSlot} className="flex items-center gap-3">
              {/* Time Label */}
              <div className="w-12 text-xs text-black opacity-60 font-normal flex-shrink-0">
                {timeSlot}
              </div>

              {/* Schedule Item */}
              <div className="flex-1 bg-[#F8F7F7] rounded-xl p-3">
                <div className="flex flex-col w-full text-black">
                  {/* Top row with title and course code */}
                  <div className="flex items-start justify-between gap-8 mb-2">
                    <div className="flex flex-col flex-1">
                      <div className="text-sm font-semibold leading-tight">
                        {scheduleItem ? scheduleItem.title : displayItem.title}
                      </div>
                      <div className="text-xs mt-2">
                        {scheduleItem
                          ? scheduleItem.professor
                          : displayItem.professor}
                      </div>
                    </div>
                    <div className="text-xs flex-shrink-0">
                      [
                      {scheduleItem
                        ? scheduleItem.courseCode
                        : displayItem.courseCode}
                      ]
                    </div>
                  </div>

                  {/* Bottom row with location and status */}
                  <div className="flex items-center justify-between gap-5 text-xs">
                    <div>
                      {scheduleItem
                        ? scheduleItem.location
                        : displayItem.location}
                    </div>
                    <div className="flex items-center gap-3 bg-gray-300 rounded-xl px-2 py-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="whitespace-nowrap">{scheduleItem ? scheduleItem.status : displayItem.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
