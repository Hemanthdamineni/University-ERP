import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle, Download, Filter } from 'lucide-react';
import { mockCourses } from '../../data/mockData';

const Curriculum = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const curriculumData = [
    // Semester 1
    { semester: 1, courseCode: 'MA101', courseName: 'Engineering Mathematics I', credits: 4, type: 'Core', status: 'Completed', grade: 'A' },
    { semester: 1, courseCode: 'PH101', courseName: 'Engineering Physics', credits: 3, type: 'Core', status: 'Completed', grade: 'B+' },
    { semester: 1, courseCode: 'CH101', courseName: 'Engineering Chemistry', credits: 3, type: 'Core', status: 'Completed', grade: 'A-' },
    { semester: 1, courseCode: 'CS101', courseName: 'Programming for Problem Solving', credits: 4, type: 'Core', status: 'Completed', grade: 'A' },
    { semester: 1, courseCode: 'EG101', courseName: 'Engineering Graphics', credits: 2, type: 'Core', status: 'Completed', grade: 'B+' },
    
    // Semester 2
    { semester: 2, courseCode: 'MA102', courseName: 'Engineering Mathematics II', credits: 4, type: 'Core', status: 'Completed', grade: 'A-' },
    { semester: 2, courseCode: 'PH102', courseName: 'Applied Physics', credits: 3, type: 'Core', status: 'Completed', grade: 'B+' },
    { semester: 2, courseCode: 'CS102', courseName: 'Data Structures', credits: 4, type: 'Core', status: 'Completed', grade: 'A' },
    { semester: 2, courseCode: 'EC101', courseName: 'Basic Electronics', credits: 3, type: 'Core', status: 'Completed', grade: 'B' },
    { semester: 2, courseCode: 'EG102', courseName: 'Workshop Practice', credits: 2, type: 'Core', status: 'Completed', grade: 'A' },
    
    // Current Semester (6)
    ...mockCourses.map(course => ({
      semester: 6,
      courseCode: course.code,
      courseName: course.name,
      credits: course.credits,
      type: course.type,
      status: 'In Progress',
      grade: null
    })),
    
    // Future Semesters
    { semester: 7, courseCode: 'CS401', courseName: 'Machine Learning', credits: 4, type: 'Core', status: 'Pending', grade: null },
    { semester: 7, courseCode: 'CS402', courseName: 'Distributed Systems', credits: 3, type: 'Core', status: 'Pending', grade: null },
    { semester: 7, courseCode: 'CS403', courseName: 'Cyber Security', credits: 3, type: 'Elective', status: 'Pending', grade: null },
    { semester: 8, courseCode: 'CS501', courseName: 'Project Work', credits: 6, type: 'Project', status: 'Pending', grade: null },
    { semester: 8, courseCode: 'CS502', courseName: 'Seminar', credits: 2, type: 'Core', status: 'Pending', grade: null },
  ];

  const totalCredits = 160;
  const completedCredits = curriculumData.filter(c => c.status === 'Completed').reduce((sum, c) => sum + c.credits, 0);
  const inProgressCredits = curriculumData.filter(c => c.status === 'In Progress').reduce((sum, c) => sum + c.credits, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'In Progress':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeColor = (grade: string | null) => {
    if (!grade) return '';
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredCourses = curriculumData.filter(course => {
    if (selectedTab !== 'all' && course.type !== selectedTab) return false;
    if (selectedSemester !== 'all' && course.semester.toString() !== selectedSemester) return false;
    return true;
  });

  const semesters = [...new Set(curriculumData.map(c => c.semester))].sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Curriculum</h1>
            <p className="text-gray-600">Track your academic progress and course completion</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Download Curriculum
          </button>
        </div>
      </div>

      {/* Program Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Program</h3>
            <p className="text-blue-100">B.Tech Computer Science</p>
            <p className="text-blue-200 text-sm">Batch: 2021-2025</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Credits</h3>
            <p className="text-2xl font-bold">{totalCredits}</p>
            <p className="text-blue-200 text-sm">Required for graduation</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <p className="text-2xl font-bold">{completedCredits}</p>
            <p className="text-blue-200 text-sm">{((completedCredits / totalCredits) * 100).toFixed(1)}% complete</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">In Progress</h3>
            <p className="text-2xl font-bold">{inProgressCredits}</p>
            <p className="text-blue-200 text-sm">Current semester</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Credit Progress</span>
            <span>{completedCredits} / {totalCredits} credits</span>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedCredits / totalCredits) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              {['all', 'Core', 'Elective', 'Lab', 'Project'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTab === tab
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'all' ? 'All Courses' : tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Curriculum Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">Sem {course.semester}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.courseName}</div>
                      <div className="text-sm text-gray-500">{course.courseCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {course.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{course.credits}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(course.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.grade ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(course.grade)}`}>
                        {course.grade}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Core Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {curriculumData.filter(c => c.type === 'Core').reduce((sum, c) => sum + c.credits, 0)}
              </p>
              <p className="text-sm text-gray-500">credits</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Electives</p>
              <p className="text-2xl font-bold text-gray-900">
                {curriculumData.filter(c => c.type === 'Elective').reduce((sum, c) => sum + c.credits, 0)}
              </p>
              <p className="text-sm text-gray-500">credits</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Labs & Projects</p>
              <p className="text-2xl font-bold text-gray-900">
                {curriculumData.filter(c => c.type === 'Lab' || c.type === 'Project').reduce((sum, c) => sum + c.credits, 0)}
              </p>
              <p className="text-sm text-gray-500">credits</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;