"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SemesterSummary {
  semester: string;
  academicYear: string;
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  semesterRank?: number;
  coursesCount: number;
}

export default function EarlierSemesterResultsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState("3");
  const [semesters, setSemesters] = useState<SemesterSummary[]>([]);

  // Mock data
  useEffect(() => {
    const loadSemesters = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSemesters([
        {
          semester: "1",
          academicYear: "2023-24",
          sgpa: 8.45,
          cgpa: 8.45,
          totalCredits: 24,
          semesterRank: 45,
          coursesCount: 8,
        },
        {
          semester: "2",
          academicYear: "2023-24",
          sgpa: 9.12,
          cgpa: 8.78,
          totalCredits: 23,
          semesterRank: 28,
          coursesCount: 7,
        },
        {
          semester: "3",
          academicYear: "2024-25",
          sgpa: 9.9,
          cgpa: 9.15,
          totalCredits: 22,
          semesterRank: 12,
          coursesCount: 8,
        },
      ]);
      setLoading(false);
    };

    loadSemesters();
  }, []);

  const selectedSemesterData = semesters.find(
    (s) => s.semester === selectedSemester,
  );

  const chartData = semesters.map((sem) => ({
    semester: `Sem ${sem.semester}`,
    SGPA: sem.sgpa,
    CGPA: sem.cgpa,
  }));

  const downloadTranscript = () => {
    alert("Full transcript download initiated...");
  };

  const downloadGradeSheet = () => {
    alert("Individual grade sheet download initiated...");
  };

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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Earlier Semester Results
            </h1>
            <p className="text-gray-600">
              Access your previous semester results and track academic progress
            </p>
          </div>

          {/* Semester Selector and Downloads */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Semester
                  </label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {semesters.map((sem) => (
                      <option key={sem.semester} value={sem.semester}>
                        Semester {sem.semester} - {sem.academicYear}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadGradeSheet}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Grade Sheet
                </button>
                <button
                  onClick={downloadTranscript}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Full Transcript
                </button>
              </div>
            </div>
          </div>

          {/* Selected Semester Summary */}
          {selectedSemesterData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Semester
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedSemesterData.semester}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedSemesterData.academicYear}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">SGPA</h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {selectedSemesterData.sgpa.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Out of 10.00</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">CGPA</h3>
                <p className="text-2xl font-bold text-green-600">
                  {selectedSemesterData.cgpa.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Cumulative</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Credits
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedSemesterData.totalCredits}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedSemesterData.coursesCount} courses
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Rank</h3>
                <p className="text-2xl font-bold text-purple-600">
                  #{selectedSemesterData.semesterRank || "N/A"}
                </p>
                <p className="text-sm text-gray-600">Semester rank</p>
              </div>
            </div>
          )}

          {/* SGPA Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ChartBarIcon className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Academic Performance Trend
              </h3>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[6, 10]} />
                  <Tooltip
                    formatter={(value: number) => [value.toFixed(2), ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="SGPA"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: "#4F46E5", strokeWidth: 2, r: 6 }}
                    name="SGPA"
                  />
                  <Line
                    type="monotone"
                    dataKey="CGPA"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                    name="CGPA"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* All Semesters Summary Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                All Semesters Summary
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Academic Year
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SGPA
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CGPA
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {semesters.map((semester) => (
                    <tr key={semester.semester} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Semester {semester.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {semester.academicYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        <span className="font-semibold text-indigo-600">
                          {semester.sgpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        <span className="font-semibold text-green-600">
                          {semester.cgpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {semester.totalCredits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        #{semester.semesterRank || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => setSelectedSemester(semester.semester)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Results displayed are official and
              verified. For any discrepancies, please contact the academic
              office within 15 days of result publication.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
