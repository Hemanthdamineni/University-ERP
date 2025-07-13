import React, { useState } from 'react';
import { Calendar, TrendingUp, AlertTriangle, CheckCircle, Filter, Download } from 'lucide-react';
import { mockAttendance } from '../../data/mockData';

const AttendanceDetails = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('current');

  const overallAttendance = mockAttendance.reduce((sum, record) => sum + record.percentage, 0) / mockAttendance.length;
  const totalAttended = mockAttendance.reduce((sum, record) => sum + record.attended, 0);
  const totalSessions = mockAttendance.reduce((sum, record) => sum + record.total, 0);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredAttendance = mockAttendance.filter(record => {
    if (selectedFilter === 'low') return record.percentage < 75;
    if (selectedFilter === 'warning') return record.percentage >= 75 && record.percentage < 85;
    if (selectedFilter === 'good') return record.percentage >= 85;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Details</h1>
            <p className="text-gray-600">Monitor your attendance across all subjects</p>
          </div>
          <div className="flex flex-wrap items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2 inline" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
              <p className="text-3xl font-bold text-gray-900">{overallAttendance.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">{totalAttended} of {totalSessions} sessions</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Subjects at Risk</p>
              <p className="text-3xl font-bold text-red-600">
                {mockAttendance.filter(r => r.percentage < 75).length}
              </p>
              <p className="text-sm text-gray-500">Below 75% threshold</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Good Standing</p>
              <p className="text-3xl font-bold text-green-600">
                {mockAttendance.filter(r => r.percentage >= 85).length}
              </p>
              <p className="text-sm text-gray-500">Above 85% attendance</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Subjects</option>
              <option value="low">At Risk (&lt;75%)</option>
              <option value="warning">Warning (75-85%)</option>
              <option value="good">Good Standing (&gt;85%)</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
              <option value="semester">Full Semester</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Subject-wise Attendance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.courseName}</div>
                      <div className="text-sm text-gray-500">{record.courseCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {record.attended} / {record.total}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-900">{record.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(record.percentage)}`}
                            style={{ width: `${record.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.percentage)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Attendance Alert */}
      {mockAttendance.some(r => r.percentage < 75) && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Attendance Warning</h3>
              <p className="text-orange-700 mb-4">
                You have {mockAttendance.filter(r => r.percentage < 75).length} subject(s) with attendance below 75%. 
                This may affect your exam eligibility.
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                  Request Attendance Review
                </button>
                <button className="px-4 py-2 border border-orange-300 text-orange-700 hover:bg-orange-100 rounded-lg transition-colors">
                  View Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;