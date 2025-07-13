"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import StudentProfileHeader from "@/components/dashboard/StudentProfileHeader";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import InternalMarksGrid from "@/components/dashboard/InternalMarksGrid";
import WeeklyActivityChart from "@/components/dashboard/WeeklyActivityChart";
import TodoList from "@/components/dashboard/TodoList";
import ScheduleWidget from "@/components/dashboard/ScheduleWidget";
import Link from "next/link";
import {
  StudentProfile,
  InternalMark,
  WeeklyActivity,
  TodoItem,
  ScheduleItem,
  CalendarData,
  fetchStudentProfile,
  fetchInternalMarks,
  fetchWeeklyActivity,
  fetchTodoItems,
  fetchScheduleItems,
  fetchCalendarData,
} from "@/lib/api/mockData";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    profile: StudentProfile | null;
    marks: InternalMark[];
    activity: WeeklyActivity[];
    todos: TodoItem[];
    schedule: ScheduleItem[];
    calendar: CalendarData | null;
  }>({
    profile: null,
    marks: [],
    activity: [],
    todos: [],
    schedule: [],
    calendar: null,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [profile, marks, activity, todos, schedule, calendar] =
          await Promise.all([
            fetchStudentProfile(),
            fetchInternalMarks(),
            fetchWeeklyActivity(),
            fetchTodoItems(),
            fetchScheduleItems(),
            fetchCalendarData(),
          ]);

        setData({
          profile,
          marks,
          activity,
          todos,
          schedule,
          calendar,
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-screen bg-[#F8F7F7] overflow-hidden">
        {/* Remove the Link/button to /grid-demo */}
        {/* 3x3 Grid Container */}
        <div className="h-full p-4 grid grid-cols-3 grid-rows-3 gap-4">
          {/* Row 1, Col 1-2: Basic Info (Profile Header) */}
          <div className="col-span-2 row-span-1 bg-white rounded-xl shadow-sm">
            {data.profile && <StudentProfileHeader profile={data.profile} />}
          </div>

          {/* Row 1, Col 3: Calendar */}
          <div className="col-span-1 row-span-1 bg-white rounded-xl shadow-sm">
            {data.calendar && <CalendarWidget calendarData={data.calendar} />}
          </div>

          {/* Row 2, Col 1: Internal Marks */}
          <div className="col-span-1 row-span-1 bg-white rounded-xl shadow-sm">
            <InternalMarksGrid marks={data.marks} />
          </div>

          {/* Row 2, Col 2: Weekly Activity */}
          <div className="col-span-1 row-span-1 bg-white rounded-xl shadow-sm">
            <WeeklyActivityChart data={data.activity} />
          </div>

          {/* Row 2-3, Col 3: Schedule (spans 2 rows) */}
          <div className="col-span-1 row-span-2 bg-white rounded-xl shadow-sm">
            <ScheduleWidget scheduleItems={data.schedule} />
          </div>

          {/* Row 3, Col 1-2: To-Do List */}
          <div className="col-span-2 row-span-1 bg-white rounded-xl shadow-sm">
            <TodoList todos={data.todos} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
