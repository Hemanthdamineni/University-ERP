import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  Bus, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  TrendingUp, 
  Briefcase, 
  HelpCircle,
  User,
  Settings,
  LogOut,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useViewMode } from '../../hooks/useViewMode';
import { useAuth } from '../../hooks/useAuth';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  mode: 'basic' | 'advanced' | 'both';
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    mode: 'both'
  },
  {
    id: 'academics',
    label: 'Academics',
    icon: GraduationCap,
    path: '/academics',
    mode: 'both',
    children: [
      { id: 'timetable', label: 'Timetable', icon: Calendar, path: '/academics/timetable', mode: 'both' },
      { id: 'attendance', label: 'Attendance Details', icon: FileText, path: '/academics/attendance', mode: 'both' },
      { id: 'curriculum', label: 'Curriculum', icon: BookOpen, path: '/academics/curriculum', mode: 'both' },
      { id: 'electives', label: 'Elective Preferences', icon: UserPlus, path: '/academics/electives', mode: 'advanced' }
    ]
  },
  {
    id: 'exams',
    label: 'Exams / Results',
    icon: FileText,
    path: '/exams',
    mode: 'both',
    children: [
      { id: 'current-results', label: 'Current Semester Results', icon: FileText, path: '/exams/current', mode: 'both' },
      { id: 'past-results', label: 'Earlier Semester Results', icon: FileText, path: '/exams/past', mode: 'both' },
      { id: 'revaluation', label: 'Revaluation Application', icon: UserPlus, path: '/exams/revaluation', mode: 'advanced' },
      { id: 'internal', label: 'Internal Assessments', icon: FileText, path: '/exams/internal', mode: 'advanced' },
      { id: 'exam-essentials', label: 'Exam Essentials', icon: BookOpen, path: '/exams/essentials', mode: 'advanced' }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: CreditCard,
    path: '/finance',
    mode: 'both',
    children: [
      { id: 'fee-details', label: 'Fee Details', icon: FileText, path: '/finance/details', mode: 'both' },
      { id: 'fee-payment', label: 'Fee Payment', icon: CreditCard, path: '/finance/payment', mode: 'advanced' },
      { id: 'scholarships', label: 'SAP & Scholarships', icon: GraduationCap, path: '/finance/scholarships', mode: 'advanced' }
    ]
  },
  {
    id: 'transport-hostel',
    label: 'Transport & Hostel',
    icon: Bus,
    path: '/transport-hostel',
    mode: 'both',
    children: [
      { id: 'room-details', label: 'Room Details', icon: User, path: '/transport-hostel/room', mode: 'both' },
      { id: 'route-details', label: 'Route Details', icon: Bus, path: '/transport-hostel/route', mode: 'both' },
      { id: 'requests', label: 'Refund & Change Requests', icon: FileText, path: '/transport-hostel/requests', mode: 'advanced' },
      { id: 'leave-maintenance', label: 'Leave & Maintenance', icon: Settings, path: '/transport-hostel/leave', mode: 'advanced' }
    ]
  },
  {
    id: 'registration',
    label: 'Registration',
    icon: UserPlus,
    path: '/registration',
    mode: 'advanced',
    children: [
      { id: 'course-reg', label: 'Course Registration', icon: BookOpen, path: '/registration/courses', mode: 'advanced' },
      { id: 'minor-oe', label: 'Minor / OE Registration', icon: GraduationCap, path: '/registration/minor-oe', mode: 'advanced' },
      { id: 'exam-reg', label: 'Exam Registration', icon: FileText, path: '/registration/exam', mode: 'advanced' },
      { id: 'hostel-transport-reg', label: 'Hostel / Transport Registration', icon: Bus, path: '/registration/hostel-transport', mode: 'advanced' },
      { id: 'sap-reg', label: 'SAP Registration', icon: GraduationCap, path: '/registration/sap', mode: 'advanced' },
      { id: 'events-reg', label: 'Events Registration', icon: Calendar, path: '/registration/events', mode: 'advanced' },
      { id: 'reg-tracker', label: 'Registration Tracker', icon: TrendingUp, path: '/registration/tracker', mode: 'advanced' }
    ]
  },
  {
    id: 'events',
    label: 'Events',
    icon: Calendar,
    path: '/events',
    mode: 'both',
    children: [
      { id: 'event-listings', label: 'Event Listings', icon: Calendar, path: '/events/listings', mode: 'both' },
      { id: 'my-events', label: 'My Events', icon: User, path: '/events/my-events', mode: 'both' },
      { id: 'participation', label: 'Event Participation', icon: TrendingUp, path: '/events/participation', mode: 'advanced' },
      { id: 'propose', label: 'Propose New Event', icon: UserPlus, path: '/events/propose', mode: 'advanced' }
    ]
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: MessageSquare,
    path: '/feedback',
    mode: 'advanced',
    children: [
      { id: 'submit-feedback', label: 'Submit Feedback', icon: MessageSquare, path: '/feedback/submit', mode: 'advanced' },
      { id: 'past-feedback', label: 'View Past Feedback', icon: FileText, path: '/feedback/past', mode: 'advanced' },
      { id: 'anonymous', label: 'Anonymous Feedback', icon: MessageSquare, path: '/feedback/anonymous', mode: 'advanced' }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: BookOpen,
    path: '/resources',
    mode: 'both',
    children: [
      { id: 'learning-materials', label: 'Learning Materials', icon: BookOpen, path: '/resources/materials', mode: 'both' },
      { id: 'advanced-access', label: 'Advanced Access', icon: Settings, path: '/resources/advanced', mode: 'advanced' }
    ]
  },
  {
    id: 'academic-tracker',
    label: 'Academic Tracker',
    icon: TrendingUp,
    path: '/academic-tracker',
    mode: 'both',
    children: [
      { id: 'progress', label: 'Progress Overview', icon: TrendingUp, path: '/academic-tracker/progress', mode: 'both' },
      { id: 'insights', label: 'Academic Insights', icon: FileText, path: '/academic-tracker/insights', mode: 'advanced' }
    ]
  },
  {
    id: 'career',
    label: 'Career Portal',
    icon: Briefcase,
    path: '/career',
    mode: 'both',
    children: [
      { id: 'opportunities', label: 'Opportunities', icon: Briefcase, path: '/career/opportunities', mode: 'both' },
      { id: 'resume', label: 'Resume & Profile', icon: User, path: '/career/resume', mode: 'advanced' },
      { id: 'interviews', label: 'Interview Booking', icon: Calendar, path: '/career/interviews', mode: 'advanced' },
      { id: 'alumni', label: 'Alumni Connect', icon: UserPlus, path: '/career/alumni', mode: 'advanced' }
    ]
  },
  {
    id: 'helpdesk',
    label: 'Helpdesk',
    icon: HelpCircle,
    path: '/helpdesk',
    mode: 'both',
    children: [
      { id: 'raise-ticket', label: 'Raise a Ticket', icon: UserPlus, path: '/helpdesk/ticket', mode: 'both' },
      { id: 'faqs', label: 'FAQs', icon: HelpCircle, path: '/helpdesk/faqs', mode: 'both' },
      { id: 'track-escalate', label: 'Track & Escalate', icon: TrendingUp, path: '/helpdesk/track', mode: 'advanced' }
    ]
  }
];

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, isCollapsed }) => {
  const { viewMode, toggleViewMode } = useViewMode();
  const { logout } = useAuth();

  const filterItemsByMode = (items: SidebarItem[]): SidebarItem[] => {
    return items.filter(item => {
      if (item.mode === 'both') return true;
      return item.mode === viewMode;
    }).map(item => ({
      ...item,
      children: item.children ? filterItemsByMode(item.children) : undefined
    }));
  };

  const filteredItems = filterItemsByMode(sidebarItems);

  const renderSidebarItem = (item: SidebarItem, depth = 0) => {
    const Icon = item.icon;
    const isActive = currentPath === item.path;
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id}>
        <button
          onClick={() => onNavigate(item.path)}
          className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          } ${depth > 0 ? 'ml-4' : ''}`}
        >
          <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
          {!isCollapsed && (
            <span className="truncate">{item.label}</span>
          )}
        </button>
        
        {!isCollapsed && hasChildren && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderSidebarItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">SRM Portal</h1>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {filteredItems.map(item => renderSidebarItem(item))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* View Mode Toggle */}
          <button
            onClick={toggleViewMode}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            {viewMode === 'basic' ? (
              <Monitor className="w-5 h-5 mr-3 flex-shrink-0" />
            ) : (
              <Smartphone className="w-5 h-5 mr-3 flex-shrink-0" />
            )}
            {!isCollapsed && (
              <span>{viewMode === 'basic' ? 'Advanced Mode' : 'Basic Mode'}</span>
            )}
          </button>

          {/* Profile */}
          <button
            onClick={() => onNavigate('/profile')}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <User className="w-5 h-5 mr-3 flex-shrink-0" />
            {!isCollapsed && <span>My Profile</span>}
          </button>

          {/* Settings */}
          <button
            onClick={() => onNavigate('/settings')}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;