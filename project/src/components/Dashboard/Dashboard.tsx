import React from 'react';
import { Calendar, BookOpen, CreditCard, TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockAttendance, getCurrentClass, getNextClass, mockFinances } from '../../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const currentClass = getCurrentClass();
  const nextClass = getNextClass();
  const overallAttendance = mockAttendance.reduce((sum, record) => sum + record.percentage, 0) / mockAttendance.length;
  const lowestAttendance = mockAttendance.reduce((min, record) => record.percentage < min.percentage ? record : min);
  const pendingFees = mockFinances.find(fee => fee.status === 'Pending');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user?.profilePicture || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, {user?.name?.split(' ')[0]}!</h1>
              <p className="text-blue-100">{user?.program} - {user?.branch}</p>
              <p className="text-blue-200 text-sm">Semester {user?.semester} • Academic Year {user?.academicYear}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{user?.cgpa}</p>
            <p className="text-blue-200 text-sm">Current CGPA</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Credits Earned</p>
              <p className="text-2xl font-bold text-gray-900">95/160</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fee Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingFees ? '₹1,78,000' : 'No Dues'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              pendingFees ? 'bg-orange-100' : 'bg-green-100'
            }`}>
              <CreditCard className={`w-6 h-6 ${pendingFees ? 'text-orange-600' : 'text-green-600'}`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Academic Standing</p>
              <p className="text-2xl font-bold text-gray-900">Good</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          {currentClass ? (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Current Class</span>
              </div>
              <p className="font-semibold text-gray-900">{currentClass.courseName}</p>
              <p className="text-sm text-gray-600">{currentClass.faculty} • {currentClass.room}</p>
              <p className="text-sm text-gray-600">{currentClass.startTime} - {currentClass.endTime}</p>
            </div>
          ) : null}

          {nextClass ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Next Class</span>
              </div>
              <p className="font-semibold text-gray-900">{nextClass.courseName}</p>
              <p className="text-sm text-gray-600">{nextClass.faculty} • {nextClass.room}</p>
              <p className="text-sm text-gray-600">{nextClass.startTime} - {nextClass.endTime}</p>
            </div>
          ) : (
            !currentClass && (
              <div className="text-center py-8">
                <p className="text-gray-500">No classes scheduled for today</p>
              </div>
            )
          )}

          <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View Full Timetable →
          </button>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Summary</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Overall</span>
                <span className="text-sm text-gray-600">{overallAttendance.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${overallAttendance}%` }}
                ></div>
              </div>
            </div>

            {lowestAttendance.percentage < 75 && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Low Attendance Alert</span>
                </div>
                <p className="text-sm text-gray-700">{lowestAttendance.courseName}</p>
                <p className="text-sm text-orange-700">{lowestAttendance.percentage}% attendance</p>
              </div>
            )}
          </div>

          <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View Detailed Attendance →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Pay Fees</p>
                  <p className="text-sm text-gray-600">₹1,78,000 pending</p>
                </div>
              </div>
            </button>

            <button className="w-full p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">View Results</p>
                  <p className="text-sm text-gray-600">Semester 5 results available</p>
                </div>
              </div>
            </button>

            <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Register for Events</p>
                  <p className="text-sm text-gray-600">TechFest 2025 registration open</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">Mid-semester exam schedule released</p>
              <p className="text-sm text-gray-600 mt-1">Check your exam timetable for Semester 6 mid-term examinations starting from March 15, 2025.</p>
              <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">TechFest 2025 registration now open</p>
              <p className="text-sm text-gray-600 mt-1">Register for technical competitions, workshops, and guest lectures. Early bird registration ends February 20.</p>
              <p className="text-xs text-gray-500 mt-2">1 day ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">Hostel fee payment reminder</p>
              <p className="text-sm text-gray-600 mt-1">Semester 7 hostel fees are due by February 28, 2025. Pay online to avoid late fees.</p>
              <p className="text-xs text-gray-500 mt-2">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;