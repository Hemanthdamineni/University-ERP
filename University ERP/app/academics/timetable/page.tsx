"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface ClassBlock {
  id: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  room: string;
  startTime: string;
  endTime: string;
  type: "lecture" | "lab" | "tutorial";
  color: string;
}

interface TimetableData {
  [day: string]: {
    [timeSlot: string]: ClassBlock | null;
  };
}

export default function TimetablePage() {
  const [currentWeek, setCurrentWeek] = useState("Week 1");
  const [viewMode, setViewMode] = useState<"day" | "week">("week");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock timetable data
  const timetableData: TimetableData = {
    Monday: {
      "9:00-10:00": {
        id: "1",
        courseCode: "CSE 201",
        courseName: "Data Structures",
        faculty: "Dr. Sarah Johnson",
        room: "A-101",
        startTime: "9:00",
        endTime: "10:00",
        type: "lecture",
        color: "bg-blue-500",
      },
      "10:00-11:00": {
        id: "2",
        courseCode: "CSE 202",
        courseName: "Computer Organization",
        faculty: "Prof. Michael Chen",
        room: "B-205",
        startTime: "10:00",
        endTime: "11:00",
        type: "lecture",
        color: "bg-green-500",
      },
      "14:00-15:00": {
        id: "3",
        courseCode: "CSE 203",
        courseName: "Digital Logic Lab",
        faculty: "Dr. Emily Rodriguez",
        room: "Lab-1",
        startTime: "14:00",
        endTime: "15:00",
        type: "lab",
        color: "bg-purple-500",
      },
    },
    Tuesday: {
      "9:00-10:00": {
        id: "4",
        courseCode: "AEC 104",
        courseName: "Critical Thinking",
        faculty: "Prof. P. Vivekananda",
        room: "C-211",
        startTime: "9:00",
        endTime: "10:00",
        type: "lecture",
        color: "bg-orange-500",
      },
      "11:00-12:00": {
        id: "5",
        courseCode: "MTH 201",
        courseName: "Discrete Mathematics",
        faculty: "Dr. Anna Singh",
        room: "A-302",
        startTime: "11:00",
        endTime: "12:00",
        type: "lecture",
        color: "bg-red-500",
      },
    },
    Wednesday: {
      "10:00-11:00": {
        id: "6",
        courseCode: "CSE 204",
        courseName: "Programming Lab",
        faculty: "Prof. David Kumar",
        room: "Lab-2",
        startTime: "10:00",
        endTime: "11:00",
        type: "lab",
        color: "bg-indigo-500",
      },
    },
    Thursday: {
      "9:00-10:00": {
        id: "7",
        courseCode: "CSE 205",
        courseName: "Database Systems",
        faculty: "Dr. Lisa Thompson",
        room: "B-104",
        startTime: "9:00",
        endTime: "10:00",
        type: "lecture",
        color: "bg-yellow-500",
      },
    },
    Friday: {
      "14:00-15:00": {
        id: "8",
        courseCode: "ENG 201",
        courseName: "Technical Communication",
        faculty: "Prof. Robert Wilson",
        room: "S-301",
        startTime: "14:00",
        endTime: "15:00",
        type: "tutorial",
        color: "bg-pink-500",
      },
    },
    Saturday: {
      "9:00-10:00": {
        id: "9",
        courseCode: "CSE 206",
        courseName: "Software Engineering",
        faculty: "Dr. Jennifer Lee",
        room: "A-205",
        startTime: "9:00",
        endTime: "10:00",
        type: "lecture",
        color: "bg-teal-500",
      },
    },
  };

  const timeSlots = [
    "8:00-9:00",
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getCurrentClass = () => {
    const currentDay = days[new Date().getDay() - 1];
    const currentHour = new Date().getHours();
    const currentSlot = timeSlots.find((slot) => {
      const [start] = slot.split("-");
      const startHour = parseInt(start.split(":")[0]);
      return startHour === currentHour;
    });

    if (currentDay && currentSlot) {
      return timetableData[currentDay]?.[currentSlot];
    }
    return null;
  };

  const isCurrentClass = (day: string, timeSlot: string) => {
    const currentDay = days[new Date().getDay() - 1];
    const currentHour = new Date().getHours();
    const [start] = timeSlot.split("-");
    const startHour = parseInt(start.split(":")[0]);

    return day === currentDay && startHour === currentHour;
  };

  const jumpToToday = () => {
    const today = days[new Date().getDay() - 1] || "Monday";
    setSelectedDay(today);
    if (viewMode === "day") {
      setSelectedDay(today);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Timetable</h1>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              {/* Week Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Week:
                </label>
                <select
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Week 1">Week 1</option>
                  <option value="Week 2">Week 2</option>
                  <option value="Week 3">Week 3</option>
                  <option value="Week 4">Week 4</option>
                </select>
              </div>

              {/* Today Button */}
              <button
                onClick={jumpToToday}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
              >
                Today
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode("day")}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    viewMode === "day"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    viewMode === "week"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Week
                </button>
              </div>

              {/* Day Selector (for day view) */}
              {viewMode === "day" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Day:
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Current Class Highlight */}
          {getCurrentClass() && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Current Class
              </h3>
              <div className="text-green-700">
                <span className="font-medium">
                  {getCurrentClass()?.courseCode}
                </span>{" "}
                - {getCurrentClass()?.courseName}
                <br />
                <span className="text-sm">
                  {getCurrentClass()?.faculty} • {getCurrentClass()?.room}
                </span>
              </div>
            </div>
          )}

          {/* Timetable Grid */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {viewMode === "week" ? (
              /* Week View */
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 min-w-full">
                  {/* Header Row */}
                  <div className="bg-gray-50 p-3 font-medium text-gray-700 border-b border-r">
                    Time
                  </div>
                  {days.map((day) => (
                    <div
                      key={day}
                      className="bg-gray-50 p-3 font-medium text-gray-700 border-b border-r text-center"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Time Slots */}
                  {timeSlots.map((timeSlot) => (
                    <React.Fragment key={timeSlot}>
                      <div className="p-3 border-b border-r bg-gray-50 text-sm font-medium text-gray-600">
                        {timeSlot}
                      </div>
                      {days.map((day) => {
                        const classData = timetableData[day]?.[timeSlot];
                        const isCurrent = isCurrentClass(day, timeSlot);

                        return (
                          <div
                            key={`${day}-${timeSlot}`}
                            className={`p-2 border-b border-r min-h-[80px] ${isCurrent ? "bg-green-100" : ""}`}
                          >
                            {classData ? (
                              <div
                                className={`${classData.color} text-white p-2 rounded text-xs h-full flex flex-col justify-between`}
                              >
                                <div>
                                  <div className="font-semibold">
                                    {classData.courseCode}
                                  </div>
                                  <div className="text-xs opacity-90">
                                    {classData.courseName}
                                  </div>
                                </div>
                                <div className="text-xs opacity-90">
                                  <div>{classData.faculty}</div>
                                  <div>{classData.room}</div>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full"></div>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              /* Day View */
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedDay}
                </h3>
                <div className="space-y-2">
                  {timeSlots.map((timeSlot) => {
                    const classData = timetableData[selectedDay]?.[timeSlot];
                    const isCurrent = isCurrentClass(selectedDay, timeSlot);

                    return (
                      <div
                        key={timeSlot}
                        className={`flex items-center gap-4 p-3 rounded-lg border ${isCurrent ? "bg-green-50 border-green-200" : "bg-gray-50"}`}
                      >
                        <div className="w-20 text-sm font-medium text-gray-600">
                          {timeSlot}
                        </div>
                        {classData ? (
                          <div className="flex-1 flex items-center gap-4">
                            <div
                              className={`w-4 h-4 rounded ${classData.color}`}
                            ></div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">
                                {classData.courseCode} - {classData.courseName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {classData.faculty} • {classData.room} •{" "}
                                {classData.type}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 text-gray-400 text-sm">
                            No classes scheduled
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-700">Lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-700">Lab</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
                <span className="text-sm text-gray-700">Tutorial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Current Class</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
