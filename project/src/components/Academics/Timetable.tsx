import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTimetable } from '../../data/mockData';

const Timetable = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '14:00', '15:00', '16:00', '17:00'];

  const getClassesForDay = (day: string) => {
    return mockTimetable.filter(slot => slot.day === day);
  };

  const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5);
  };

  const isCurrentClass = (startTime: string, endTime: string) => {
    const currentTime = getCurrentTime();
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return currentTime >= startTime && currentTime <= endTime && selectedDay === currentDay;
  };

  const getClassColor = (courseCode: string) => {
    const colors = {
      'CS301': 'bg-blue-100 border-blue-300 text-blue-800',
      'CS302': 'bg-green-100 border-green-300 text-green-800',
      'CS303': 'bg-purple-100 border-purple-300 text-purple-800',
      'CS304': 'bg-orange-100 border-orange-300 text-orange-800',
      'CS305': 'bg-pink-100 border-pink-300 text-pink-800',
    };
    return colors[courseCode as keyof typeof colors] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const jumpToToday = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setSelectedDay(today);
    setViewMode('day');
  };

  const renderWeekView = () => (
    <div className="grid grid-cols-7 gap-4">
      {/* Time column */}
      <div className="space-y-4">
        <div className="h-12"></div> {/* Header space */}
        {timeSlots.map(time => (
          <div key={time} className="h-16 flex items-center justify-center text-sm text-gray-500 font-medium">
            {time}
          </div>
        ))}
      </div>

      {/* Day columns */}
      {days.map(day => (
        <div key={day} className="space-y-1">
          <div className="h-12 flex items-center justify-center bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900">{day}</span>
          </div>
          <div className="space-y-1 relative">
            {timeSlots.map((time, index) => {
              const dayClasses = getClassesForDay(day);
              const classAtTime = dayClasses.find(cls => cls.startTime === time);
              
              return (
                <div key={`${day}-${time}`} className="h-16 relative">
                  {classAtTime && (
                    <div
                      className={`absolute inset-0 p-2 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                        getClassColor(classAtTime.courseCode)
                      } ${isCurrentClass(classAtTime.startTime, classAtTime.endTime) ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
                      style={{
                        height: classAtTime.type === 'Lab' ? '192px' : '64px', // 3 slots for lab
                        zIndex: 10
                      }}
                      title={`${classAtTime.courseName} - ${classAtTime.faculty} - ${classAtTime.room}`}
                    >
                      <div className="text-xs font-semibold truncate">{classAtTime.courseCode}</div>
                      <div className="text-xs truncate">{classAtTime.room}</div>
                      {classAtTime.type === 'Lab' && (
                        <div className="text-xs text-gray-600 mt-1">{classAtTime.type}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDayView = () => {
    const dayClasses = getClassesForDay(selectedDay);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{selectedDay}'s Schedule</h3>
          <div className="flex space-x-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {dayClasses.length > 0 ? (
          <div className="space-y-4">
            {dayClasses.map(classItem => (
              <div
                key={classItem.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  getClassColor(classItem.courseCode)
                } ${isCurrentClass(classItem.startTime, classItem.endTime) ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-lg">{classItem.courseCode}</span>
                      <span className="px-2 py-1 bg-white/50 rounded-md text-xs font-medium">
                        {classItem.type}
                      </span>
                      {isCurrentClass(classItem.startTime, classItem.endTime) && (
                        <span className="px-2 py-1 bg-green-500 text-white rounded-md text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{classItem.courseName}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{classItem.startTime} - {classItem.endTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{classItem.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{classItem.faculty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No classes scheduled for {selectedDay}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Class Timetable</h1>
            <p className="text-gray-600">View your weekly schedule and current classes</p>
          </div>

          <div className="flex flex-wrap items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Day
              </button>
            </div>

            {/* Today Button */}
            <button
              onClick={jumpToToday}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Today
            </button>

            {/* Week Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedWeek(selectedWeek - 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-20 text-center">
                Week {selectedWeek + 1}
              </span>
              <button
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-sm text-gray-600">Data Structures</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-sm text-gray-600">Database Systems</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
            <span className="text-sm text-gray-600">Operating Systems</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
            <span className="text-sm text-gray-600">Computer Networks</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded"></div>
            <span className="text-sm text-gray-600">Software Engineering</span>
          </div>
        </div>
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm overflow-x-auto">
        {viewMode === 'week' ? renderWeekView() : renderDayView()}
      </div>
    </div>
  );
};

export default Timetable;