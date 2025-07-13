import React, { useState } from 'react';
import { Download, TrendingUp, Award, FileText, Star } from 'lucide-react';

const CurrentResults = () => {
  const [selectedSemester, setSelectedSemester] = useState('6');

  const currentResults = [
    { code: 'CS301', title: 'Data Structures & Algorithms', credits: 4, grade: 'A', points: 9, remarks: '' },
    { code: 'CS302', title: 'Database Management Systems', credits: 3, grade: 'A-', points: 8, remarks: '' },
    { code: 'CS303', title: 'Operating Systems', credits: 3, grade: 'B+', points: 7, remarks: '' },
    { code: 'CS304', title: 'Computer Networks', credits: 3, grade: 'A', points: 9, remarks: '' },
    { code: 'CS305', title: 'Software Engineering', credits: 3, grade: 'A-', points: 8, remarks: '' },
    { code: 'CS306', title: 'Computer Networks Lab', credits: 1, grade: 'A', points: 9, remarks: '' },
    { code: 'CS307', title: 'DBMS Lab', credits: 1, grade: 'A', points: 9, remarks: '' },
  ];

  const totalCredits = currentResults.reduce((sum, course) => sum + course.credits, 0);
  const totalPoints = currentResults.reduce((sum, course) => sum + (course.credits * course.points), 0);
  const sgpa = (totalPoints / totalCredits).toFixed(2);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-100';
    if (grade.startsWith('D')) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getPerformanceMessage = (sgpa: number) => {
    if (sgpa >= 9) return { message: 'Outstanding Performance!', color: 'text-green-600', icon: Award };
    if (sgpa >= 8) return { message: 'Excellent Work!', color: 'text-blue-600', icon: Star };
    if (sgpa >= 7) return { message: 'Good Performance', color: 'text-orange-600', icon: TrendingUp };
    return { message: 'Needs Improvement', color: 'text-red-600', icon: FileText };
  };

  const performance = getPerformanceMessage(parseFloat(sgpa));
  const PerformanceIcon = performance.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Current Semester Results</h1>
            <p className="text-gray-600">Semester 6 - Academic Year 2024-25</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="6">Semester 6</option>
              <option value="5">Semester 5</option>
              <option value="4">Semester 4</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2 inline" />
              Download Grade Card
            </button>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <PerformanceIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">SGPA</h3>
            <p className="text-3xl font-bold">{sgpa}</p>
            <p className={`text-sm ${performance.color.replace('text-', 'text-white opacity-')}`}>
              {performance.message}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Total Credits</h3>
            <p className="text-3xl font-bold">{totalCredits}</p>
            <p className="text-blue-200 text-sm">This semester</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Grade Points</h3>
            <p className="text-3xl font-bold">{totalPoints}</p>
            <p className="text-blue-200 text-sm">Total earned</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Rank</h3>
            <p className="text-3xl font-bold">12</p>
            <p className="text-blue-200 text-sm">Out of 120</p>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Course-wise Results</h3>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentResults.map((course, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{course.remarks || '-'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['A', 'A-', 'B+', 'B'].map((grade) => {
            const count = currentResults.filter(course => course.grade === grade).length;
            const percentage = (count / currentResults.length) * 100;
            return (
              <div key={grade} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${getGradeColor(grade)}`}>
                  <span className="font-bold">{grade}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{count} courses</p>
                <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Grading Scale:</h4>
            <ul className="space-y-1">
              <li>A: 9-10 points (Outstanding)</li>
              <li>A-: 8-8.9 points (Excellent)</li>
              <li>B+: 7-7.9 points (Very Good)</li>
              <li>B: 6-6.9 points (Good)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Notes:</h4>
            <ul className="space-y-1">
              <li>• Results are provisional until verified</li>
              <li>• Revaluation applications accepted within 15 days</li>
              <li>• Contact academic office for any discrepancies</li>
              <li>• Official transcript available after verification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentResults;