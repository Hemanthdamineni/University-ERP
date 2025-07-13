import React, { useState } from 'react';
import { Download, TrendingUp, BarChart3, FileText } from 'lucide-react';

const EarlierResults = () => {
  const [selectedSemester, setSelectedSemester] = useState('5');

  const semesterData = {
    '5': {
      semester: 'Semester 5',
      year: '2024',
      sgpa: 8.2,
      cgpa: 8.45,
      rank: 15,
      totalStudents: 120,
      results: [
        { code: 'CS201', title: 'Design & Analysis of Algorithms', credits: 4, grade: 'A-', points: 8 },
        { code: 'CS202', title: 'Computer Organization', credits: 3, grade: 'B+', points: 7 },
        { code: 'CS203', title: 'Discrete Mathematics', credits: 3, grade: 'A', points: 9 },
        { code: 'CS204', title: 'Theory of Computation', credits: 3, grade: 'A-', points: 8 },
        { code: 'CS205', title: 'Web Technologies', credits: 3, grade: 'A', points: 9 },
      ]
    },
    '4': {
      semester: 'Semester 4',
      year: '2023',
      sgpa: 8.1,
      cgpa: 8.3,
      rank: 18,
      totalStudents: 118,
      results: [
        { code: 'CS101', title: 'Object Oriented Programming', credits: 4, grade: 'A', points: 9 },
        { code: 'CS102', title: 'Data Structures', credits: 4, grade: 'A-', points: 8 },
        { code: 'MA201', title: 'Probability & Statistics', credits: 3, grade: 'B+', points: 7 },
        { code: 'CS103', title: 'Computer Graphics', credits: 3, grade: 'A-', points: 8 },
        { code: 'CS104', title: 'Microprocessors', credits: 3, grade: 'B+', points: 7 },
      ]
    },
    '3': {
      semester: 'Semester 3',
      year: '2023',
      sgpa: 8.6,
      cgpa: 8.4,
      rank: 12,
      totalStudents: 115,
      results: [
        { code: 'CS001', title: 'Programming in C++', credits: 4, grade: 'A', points: 9 },
        { code: 'MA101', title: 'Linear Algebra', credits: 3, grade: 'A', points: 9 },
        { code: 'PH101', title: 'Physics for Engineers', credits: 3, grade: 'A-', points: 8 },
        { code: 'CS002', title: 'Digital Logic Design', credits: 3, grade: 'A', points: 9 },
        { code: 'EG101', title: 'Engineering Graphics', credits: 2, grade: 'A-', points: 8 },
      ]
    }
  };

  const currentData = semesterData[selectedSemester];
  const totalCredits = currentData.results.reduce((sum, course) => sum + course.credits, 0);
  const totalPoints = currentData.results.reduce((sum, course) => sum + (course.credits * course.points), 0);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-100';
    if (grade.startsWith('D')) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  // CGPA trend data for chart
  const cgpaTrend = [
    { semester: 'Sem 1', cgpa: 8.2 },
    { semester: 'Sem 2', cgpa: 8.3 },
    { semester: 'Sem 3', cgpa: 8.4 },
    { semester: 'Sem 4', cgpa: 8.3 },
    { semester: 'Sem 5', cgpa: 8.45 },
    { semester: 'Sem 6', cgpa: 8.52 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Earlier Semester Results</h1>
            <p className="text-gray-600">View your academic performance history</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="5">Semester 5</option>
              <option value="4">Semester 4</option>
              <option value="3">Semester 3</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2 inline" />
              Download Transcript
            </button>
          </div>
        </div>
      </div>

      {/* Semester Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">SGPA</h3>
            <p className="text-3xl font-bold">{currentData.sgpa}</p>
            <p className="text-indigo-200 text-sm">{currentData.semester}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">CGPA</h3>
            <p className="text-3xl font-bold">{currentData.cgpa}</p>
            <p className="text-indigo-200 text-sm">Cumulative</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Credits</h3>
            <p className="text-3xl font-bold">{totalCredits}</p>
            <p className="text-indigo-200 text-sm">This semester</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Rank</h3>
            <p className="text-3xl font-bold">{currentData.rank}</p>
            <p className="text-indigo-200 text-sm">of {currentData.totalStudents}</p>
          </div>
        </div>
      </div>

      {/* CGPA Trend Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CGPA Trend</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {cgpaTrend.map((point, index) => {
            const height = (point.cgpa / 10) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-full absolute bottom-0 transition-all duration-500"
                    style={{ height: `${height * 2}px` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
                    {point.cgpa}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">{point.semester}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentData.semester} - {currentData.year} Results
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.results.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{course.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{course.title}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{course.credits}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{course.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Individual Grade Sheet</h4>
            <p className="text-sm text-gray-600">Download grade sheet for selected semester</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <BarChart3 className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Complete Transcript</h4>
            <p className="text-sm text-gray-600">Download full academic transcript</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Performance Report</h4>
            <p className="text-sm text-gray-600">Detailed performance analysis</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarlierResults;