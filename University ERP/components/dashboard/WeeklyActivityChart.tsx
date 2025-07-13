"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { WeeklyActivity } from "@/lib/api/mockData";

interface WeeklyActivityChartProps {
  data: WeeklyActivity[];
}

export default function WeeklyActivityChart({
  data,
}: WeeklyActivityChartProps) {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4 overflow-hidden flex flex-col">
      <h2 className="text-lg font-bold text-indigo-900 mb-4">
        Weekly Activity
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#718EBF" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#718EBF" }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Bar
              dataKey="value"
              fill="#1814F3"
              radius={[10, 10, 10, 10]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
