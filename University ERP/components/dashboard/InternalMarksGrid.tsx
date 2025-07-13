"use client";

import React from "react";
import { InternalMark } from "@/lib/api/mockData";

interface InternalMarksGridProps {
  marks: InternalMark[];
}

export default function InternalMarksGrid({ marks }: InternalMarksGridProps) {
  // Display only first 9 marks to match the 3x3 grid from design
  const displayMarks = marks.slice(0, 9);

  return (
    <div className="w-full h-full bg-white rounded-xl p-4 overflow-hidden flex flex-col">
      <h2 className="text-lg font-bold text-black mb-4">Internal Marks</h2>

      <div className="grid grid-cols-3 gap-2 flex-1">
        {displayMarks.map((mark, index) => (
          <div
            key={mark.courseCode}
            className="bg-teal-800 rounded-xl p-3 text-white text-center opacity-80 hover:opacity-100 transition-opacity flex flex-col justify-center"
          >
            <div className="space-y-1">
              <h3 className="text-sm font-bold">{mark.courseCode}</h3>
              <div className="border-b border-white w-8 mx-auto"></div>
              <p className="text-xs">{mark.marks.toFixed(2)}</p>
              <p className="text-xs">{mark.totalMarks.toFixed(2)}</p>
            </div>
          </div>
        ))}

        {/* Fill remaining slots if less than 9 marks */}
        {Array.from({ length: Math.max(0, 9 - displayMarks.length) }).map(
          (_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-teal-800 rounded-xl p-3 opacity-80"
            />
          ),
        )}
      </div>
    </div>
  );
}
