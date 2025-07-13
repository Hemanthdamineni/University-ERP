import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';
import Dashboard from '../Dashboard/Dashboard';
import Timetable from '../Academics/Timetable';
import AttendanceDetails from '../Academics/AttendanceDetails';
import Curriculum from '../Academics/Curriculum';
import ElectivePreferences from '../Academics/ElectivePreferences';
import CurrentResults from '../Exams/CurrentResults';
import EarlierResults from '../Exams/EarlierResults';
import FeeDetails from '../Finance/FeeDetails';
import EventListings from '../Events/EventListings';
import Settings from '../Settings/Settings';
import MyProfile from '../Profile/MyProfile';

const AppLayout = () => {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard':
        return <Dashboard />;
      case '/academics/timetable':
        return <Timetable />;
      case '/academics/attendance':
        return <AttendanceDetails />;
      case '/academics/curriculum':
        return <Curriculum />;
      case '/academics/electives':
        return <ElectivePreferences />;
      case '/exams/current':
        return <CurrentResults />;
      case '/exams/past':
        return <EarlierResults />;
      case '/finance/details':
        return <FeeDetails />;
      case '/events/listings':
        return <EventListings />;
      case '/settings':
        return <Settings />;
      case '/profile':
        return <MyProfile />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development.</p>
              <p className="text-sm text-gray-500 mt-2">Current path: {currentPath}</p>
            </div>
          </div>
        );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavBar
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;