"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface AttendanceRecord {
  courseCode: string;
  courseName: string;
  totalSessions: number;
  attendedSessions: number;
  lectureAttended: number;
  lectureSessions: number;
  labAttended: number;
  labSessions: number;
  tutorialAttended: number;
  tutorialSessions: number;
  percentage: number;
  type: "core" | "elective";
}

export default function AttendancePage() {
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Mock attendance data
  const attendanceData: AttendanceRecord[] = [
    {
      courseCode: "CSE 201",
      courseName: "Data Structures and Algorithms",
      totalSessions: 45,
      attendedSessions: 43,
      lectureAttended: 28,
      lectureSessions: 30,
      labAttended: 15,
      labSessions: 15,
      tutorialAttended: 0,
      tutorialSessions: 0,
      percentage: 95.6,
      type: "core",
    },
    {
      courseCode: "CSE 202",
      courseName: "Computer Organization",
      totalSessions: 40,
      attendedSessions: 32,
      lectureAttended: 25,
      lectureSessions: 30,
      labAttended: 7,
      labSessions: 10,
      tutorialAttended: 0,
      tutorialSessions: 0,
      percentage: 80.0,
      type: "core",
    },
    {
      courseCode: "AEC 104",
      courseName: "Creativity and Critical Thinking",
      totalSessions: 30,
      attendedSessions: 28,
      lectureAttended: 28,
      lectureSessions: 30,
      labAttended: 0,
      labSessions: 0,
      tutorialAttended: 0,
      tutorialSessions: 0,
      percentage: 93.3,
      type: "core",
    },
    {
      courseCode: "CSE 203",
      courseName: "Digital Logic Design",
      totalSessions: 50,
      attendedSessions: 35,
      lectureAttended: 20,
      lectureSessions: 25,
      labAttended: 15,
      labSessions: 25,
      tutorialAttended: 0,
      tutorialSessions: 0,
      percentage: 70.0,
      type: "core",
    },
    {
      courseCode: "MTH 201",
      courseName: "Discrete Mathematics",
      totalSessions: 35,
      attendedSessions: 25,
      lectureAttended: 20,
      lectureSessions: 25,
      labAttended: 0,
      labSessions: 0,
      tutorialAttended: 5,
      tutorialSessions: 10,
      percentage: 71.4,
      type: "core",
    },
    {
      courseCode: "ENG 201",
      courseName: "Technical Communication",
      totalSessions: 25,
      attendedSessions: 24,
      lectureAttended: 15,
      lectureSessions: 15,
      tutorialAttended: 9,
      tutorialSessions: 10,
      labAttended: 0,
      labSessions: 0,
      percentage: 96.0,
      type: "elective",
    },
  ];

  // Calculate overall stats
  const totalSessions = attendanceData.reduce(
    (sum, course) => sum + course.totalSessions,
    0,
  );
  const totalAttended = attendanceData.reduce(
    (sum, course) => sum + course.attendedSessions,
    0,
  );
  const overallPercentage = (totalAttended / totalSessions) * 100;

  // Find lowest attendance course
  const lowestCourse = attendanceData.reduce((lowest, course) =>
    course.percentage < lowest.percentage ? course : lowest,
  );

  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600 bg-green-100";
    if (percentage >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredData = attendanceData.filter((course) => {
    if (filterType !== "all" && course.type !== filterType) return false;
    // Add month filter logic here when needed
    return true;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Attendance Details
            </h1>
          </div>

          {/* Overall Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Overall Attendance
              </h3>
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {overallPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">
                {totalAttended} of {totalSessions} sessions attended
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(overallPercentage)}`}
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Attendance Status
              </h3>
              <div className="flex items-center gap-2">
                {overallPercentage >= 75 ? (
                  <>
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    <span className="text-green-600 font-medium">
                      Good Standing
                    </span>
                  </>
                ) : (
                  <>
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                    <span className="text-red-600 font-medium">
                      Below Minimum
                    </span>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Minimum required: 75%
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lowest Attendance
              </h3>
              <div className="text-lg font-semibold text-red-600 mb-1">
                {lowestCourse.courseCode}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                {lowestCourse.courseName}
              </div>
              <div className="text-lg font-bold text-red-600">
                {lowestCourse.percentage.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Type:
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Courses</option>
                  <option value="core">Core</option>
                  <option value="elective">Elective</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Month:
                </label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Months</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course-wise Attendance Grid */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Course-wise Attendance
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overall
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lectures
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Labs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutorials
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((course) => (
                    <tr
                      key={course.courseCode}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setSelectedCourse(
                          selectedCourse === course.courseCode
                            ? null
                            : course.courseCode,
                        )
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {course.courseCode}
                          </div>
                          <div className="text-sm text-gray-500">
                            {course.courseName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className={`h-2 rounded-full ${getProgressBarColor(course.percentage)}`}
                              style={{ width: `${course.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {course.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {course.attendedSessions}/{course.totalSessions}{" "}
                          sessions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.lectureSessions > 0 ? (
                          <div>
                            <div>
                              {course.lectureAttended}/{course.lectureSessions}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(
                                (course.lectureAttended /
                                  course.lectureSessions) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.labSessions > 0 ? (
                          <div>
                            <div>
                              {course.labAttended}/{course.labSessions}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(
                                (course.labAttended / course.labSessions) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.tutorialSessions > 0 ? (
                          <div>
                            <div>
                              {course.tutorialAttended}/
                              {course.tutorialSessions}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(
                                (course.tutorialAttended /
                                  course.tutorialSessions) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.percentage)}`}
                        >
                          {course.percentage >= 85
                            ? "Excellent"
                            : course.percentage >= 75
                              ? "Good"
                              : "Poor"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Messages */}
          {filteredData.some((course) => course.percentage < 75) && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Attendance Warning
                  </h3>
                  <div className="text-sm text-red-700 mt-1">
                    You have courses below the minimum 75% attendance
                    requirement. Please contact your academic advisor.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
              Download Report
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              View Absence History
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Request Attendance Correction
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
