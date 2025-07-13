"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

interface CourseResult {
  courseCode: string;
  courseTitle: string;
  credits: number;
  grade: string;
  gradePoints: number;
  remarks?: string;
}

interface SemesterResult {
  semester: string;
  academicYear: string;
  sgpa: number;
  totalCredits: number;
  courses: CourseResult[];
}

export default function CurrentSemesterResultsPage() {
  const [loading, setLoading] = useState(true);
  const [semesterResult, setSemesterResult] = useState<SemesterResult | null>(
    null,
  );

  // Mock data
  useEffect(() => {
    const loadResults = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSemesterResult({
        semester: "Semester 4",
        academicYear: "2024-25",
        sgpa: 9.63,
        totalCredits: 22,
        courses: [
          {
            courseCode: "CSE 201",
            courseTitle: "Data Structures and Algorithms",
            credits: 4,
            grade: "A+",
            gradePoints: 10.0,
          },
          {
            courseCode: "CSE 202",
            courseTitle: "Computer Organization",
            credits: 3,
            grade: "A",
            gradePoints: 9.0,
          },
          {
            courseCode: "AEC 104",
            courseTitle: "Creativity and Critical Thinking Skills",
            credits: 2,
            grade: "O",
            gradePoints: 10.0,
          },
          {
            courseCode: "CSE 203",
            courseTitle: "Digital Logic Design",
            credits: 3,
            grade: "A+",
            gradePoints: 10.0,
          },
          {
            courseCode: "MTH 201",
            courseTitle: "Discrete Mathematics",
            credits: 4,
            grade: "A",
            gradePoints: 9.0,
          },
          {
            courseCode: "ENG 201",
            courseTitle: "Technical Communication",
            credits: 2,
            grade: "A+",
            gradePoints: 10.0,
          },
          {
            courseCode: "CSE 204",
            courseTitle: "Programming Laboratory",
            credits: 2,
            grade: "O",
            gradePoints: 10.0,
          },
          {
            courseCode: "CSE 205",
            courseTitle: "Database Systems",
            credits: 2,
            grade: "A",
            gradePoints: 9.0,
            remarks: "Incomplete",
          },
        ],
      });
      setLoading(false);
    };

    loadResults();
  }, []);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "O":
        return "text-green-700 bg-green-100";
      case "A+":
        return "text-green-600 bg-green-50";
      case "A":
        return "text-blue-600 bg-blue-50";
      case "B+":
        return "text-yellow-600 bg-yellow-50";
      case "B":
        return "text-orange-600 bg-orange-50";
      case "F":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const downloadGradeCard = () => {
    // Simulate PDF download
    alert("Grade card download initiated...");
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

  if (!semesterResult) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Results Available
              </h2>
              <p className="text-gray-600">
                Current semester results have not been published yet.
              </p>
            </div>
          </div>
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
              Current Semester Results
            </h1>
            <p className="text-gray-600">
              View your latest academic performance and grades
            </p>
          </div>

          {/* Semester Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {semesterResult.semester} – {semesterResult.academicYear}
                </h3>
                <p className="text-gray-600">Academic Period</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-indigo-600 mb-1">
                  {semesterResult.sgpa.toFixed(2)}
                </h3>
                <p className="text-gray-600">SGPA</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-600 mb-1">
                  {semesterResult.totalCredits}
                </h3>
                <p className="text-gray-600">Credits Earned</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={downloadGradeCard}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Download Grade Card
                </button>
              </div>
            </div>
          </div>

          {/* Course Results Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Course-wise Results
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Title
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {semesterResult.courses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.courseCode}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {course.courseTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(course.grade)}`}
                        >
                          {course.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {course.gradePoints.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.remarks && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            {course.remarks}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Grading Policy
            </h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p>
                • O: Outstanding (10 points) | A+: Excellent (10 points) | A:
                Very Good (9 points)
              </p>
              <p>
                • B+: Good (8 points) | B: Above Average (7 points) | C: Average
                (6 points)
              </p>
              <p>• F: Fail (0 points) | Minimum passing grade: C</p>
              <p>
                • Results are subject to verification and may be revised if
                discrepancies are found
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
