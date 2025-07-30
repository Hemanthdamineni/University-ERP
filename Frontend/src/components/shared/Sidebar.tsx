import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

// Types for menu config
interface SubMenuItem {
  label: string;
  route: string;
  type: "B" | "A";
  optional?: boolean;
}
interface MenuItem {
  label: string;
  icon: string;
  type?: "B" | "A";
  submenu?: SubMenuItem[];
  route?: string;
}

const MainNav: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "/src/assets/Icons/Dashboard.png",
    type: "B",
    route: "/dashboard"
  },
  {
    label: "Academics",
    icon: "/src/assets/Icons/Classroom.png",
    submenu: [
      { label: "Time Table", route: "/academic/timetable", type: "B" },
      { label: "Attendance Details", route: "/academic/attendance-details", type: "B" },
      { label: "Curriculum", route: "/academic/curriculum", type: "B" },
      { label: "Elective Preferences", route: "/academic/elective-preferences", type: "A" },
    ],
  },
  {
    label: "Exams/Results",
    icon: "/src/assets/Icons/Exams.png",
    submenu: [
      { label: "Current Semester Results", route: "/exams/current-semester-results", type: "B" },
      { label: "Earlier Semester Results", route: "/exams/earlier-semester-results", type: "B" },
      { label: "Internal Assessments", route: "/exams/internal-assessments", type: "A" },
      { label: "Exam Essentials", route: "/exams/essentials", type: "A" },
    ],
  },
  {
    label: "Finance",
    icon: "/src/assets/Icons/Fianance.png",
    submenu: [
      { label: "Fees Dues", route: "/finance/fee-dues", type: "B" },
      { label: "Fees Paid", route: "/finance/fee-paid", type: "B" },
      { label: "SAP & Scholarships", route: "/finance/sap-scholarships", type: "A" },
    ],
  },
  {
    label: "Transport & Hostel",
    icon: "/src/assets/Icons/Library.png",
    submenu: [
      { label: "Rooms Details", route: "/transport-hostel/room-details", type: "B" },
      { label: "Routes Details", route: "/transport-hostel/route-details", type: "B" },
      { label: "FAQs", route: "/transport-hostel/faqs", type: "B" },
      { label: "Refund & Change Requests", route: "/transport-hostel/refund-change-requests", type: "A" },
      { label: "Outing & Maintenance", route: "/transport-hostel/outing-maintenance", type: "A" },
    ],
  },
  {
    label: "Registration",
    icon: "/src/assets/Icons/Menu-icon.png",
    submenu: [
      { label: "Course Registration", route: "/registration/course-registration", type: "B" },
      { label: "Minor / OE Registration", route: "/registration/minor-oe-registration", type: "B" },
      { label: "Events Registration", route: "/registration/events-registration", type: "B" },
      { label: "Exam Registration", route: "/registration/exam-registration", type: "B" },
      { label: "Hostel Registration", route: "/registration/hostel-registration", type: "B" },
      { label: "Transport Registration", route: "/registration/transport-registration", type: "B" },
      { label: "SAP Registration", route: "/registration/sap-registration", type: "B" },
      { label: "Registration Tracker", route: "/registration/registration-tracker", type: "A" },
    ],
  },
  {
    label: "Events",
    icon: "/src/assets/Icons/Events.png",
    submenu: [
      { label: "Events Listings", route: "/events/listings", type: "B" },
      { label: "My Events", route: "/events/my-events", type: "B" },
      { label: "Registered Events", route: "/events/registered-events", type: "B" },
      { label: "Event Attendance", route: "/events/event-attendance", type: "A" },
      { label: "Propose New Event", route: "/events/propose-new-event", type: "A" },
    ],
  },
  {
    label: "Feedback",
    icon: "/src/assets/Icons/NotificationIcon.png",
    submenu: [
      { label: "Course Feedback", route: "/feedback/course-feedback", type: "A" },
      { label: "Events Feedback", route: "/feedback/events-feedback", type: "A" },
      { label: "Hostel & Mess Feedback", route: "/feedback/hostel-mess-feedback", type: "A" },
      { label: "Transport Feedback", route: "/feedback/transport-feedback", type: "A" },
    ],
  },
  {
    label: "Resources",
    icon: "/src/assets/Icons/Library.png",
    submenu: [
      { label: "Learning Materials", route: "/resources/learning-materials", type: "B" },
      { label: "Advanced Access", route: "/resources/advanced-access", type: "A" },
    ],
  },
  {
    label: "Academic Tracker",
    icon: "/src/assets/Icons/Placements.png",
    submenu: [
      { label: "Progress Overview", route: "/academic-tracker/progress-overview", type: "B" },
      { label: "Academic Insights", route: "/academic-tracker/academic-insights", type: "A" },
    ],
  },
  {
    label: "Career Portal",
    icon: "/src/assets/Icons/Placements.png",
    submenu: [
      { label: "Opportunities", route: "/career-portal/opportunities", type: "B" },
      { label: "Resume & Profile", route: "/career-portal/resume-profile", type: "A" },
      { label: "Interview Booking", route: "/career-portal/interview-booking", type: "A" },
      { label: "Alumni Connect", route: "/career-portal/alumni-connect", type: "A" },
    ],
  },
  {
    label: "Helpdesk",
    icon: "/src/assets/Icons/SearchIcon.png",
    submenu: [
      { label: "Raise a Ticket", route: "/helpdesk/raise-ticket", type: "B" },
      { label: "FAQs", route: "/helpdesk/faqs", type: "B" },
      { label: "Track & Escalate", route: "/helpdesk/track-escalate", type: "A" },
    ],
  },
];

const BottomNav = [
  { label: "Notifications", icon: "/src/assets/Icons/NotificationIcon.png", route: "/notifications" },
  { label: "Settings", icon: "/src/assets/Icons/Settings.png", route: "/settings" },
  { label: "Logout", icon: "/src/assets/Icons/Logout.png", route: "/logout" },
];

export default function Sidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const location = useLocation();

  const handleToggleSidebar = () => {
    setSidebarClosed((prev) => !prev);
    setOpenSubMenu(null);
  };

  const handleToggleSubMenu = (label: string) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
    if (sidebarClosed) setSidebarClosed(false);
  };

  return (
    <div className={` bg-white border-r border-gray-200 transition-all duration-300 flex flex-col font-semibold ${sidebarClosed ? "w-16" : "w-64"}`}>
      {/* Header */}
      <div className={`${!sidebarClosed ? "p-6" : "p-4 pl-3"} relative`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src="/CircularSrmLogo.png"
              alt="SRM University AP Logo"
              width={24}
              height={24}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          {!sidebarClosed && (
            <div className="font-semibold text-gray-900 text-lg">
              SRM University AP
            </div>
          )}
        </div>
        {/* Collapse Toggle */}
        <button
          onClick={handleToggleSidebar}
          className="absolute -right-3 top-7 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          {sidebarClosed ? (
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className={`${!sidebarClosed ? "px-4" : "px-4 pl-2"} space-y-1 relative`}>
          {MainNav.map((item) => (
            <div className="m-0 p-0" key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-indigo-50 transition-colors ${openSubMenu === item.label ? "bg-indigo-100 font-semibold" : ""}`}
                    onClick={() => handleToggleSubMenu(item.label)}
                  >
                    <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6" />
                    {!sidebarClosed && <span>{item.label}</span>}
                    {!sidebarClosed && (
                      <ChevronDownIcon className={`w-4 h-4 ml-auto transition-transform ${openSubMenu === item.label ? "rotate-180" : ""}`} />
                    )}
                  </button>
                  {/* SubNav */}
                  <div
                    className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${openSubMenu === item.label && !sidebarClosed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    style={{ willChange: "max-height, opacity" }}
                  >
                    {item.submenu.map((sub) =>
                      (showAdvanced || sub.type === "B") ? (
                        <Link
                          key={sub.label}
                          to={sub.route}
                          className={`block w-full text-left px-2 py-1 rounded text-gray-600 hover:bg-indigo-100 text-sm ${location.pathname === sub.route ? "font-semibold" : ""}`}
                          onClick={() => setOpenSubMenu(null)}
                        >
                          {sub.label}
                          {sub.optional && <span className="ml-1 text-xs text-gray-400">(optional)</span>}
                        </Link>
                      ) : null
                    )}
                  </div>
                </>
              ) : (
                item.route && (
                  <Link
                    to={item.route}
                    className={`Inter flex items-center w-full gap-3 px-2 py-2 rounded-lg font-semibold hover:bg-gray-100 transition ${sidebarClosed ? "justify-center" : ""} ${location.pathname === item.route ? "bg-indigo-100" : ""}`}
                  >
                    <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6" />
                    <span className={`${sidebarClosed ? "hidden" : ""}`}>{item.label}</span>
                  </Link>
                )
              )}
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4 mx-4" />

        {/* Bottom Navigation */}
        <nav className="px-4 space-y-1">
          {/* Basic/Advanced Segmented Toggle */}
          <div className="bg-gray-100 p-2 rounded-xl">
            {!sidebarClosed && (
              <div className="px-2">
                <div className="flex w-full rounded-md bg-gray-100 overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(false)}
                    className={`flex-1 py-2 text-sm transition font-medium ${!showAdvanced ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-200'} `}
                    aria-pressed={!showAdvanced}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setShowAdvanced(true)}
                    className={`flex-1 py-2 text-sm transition font-medium ${showAdvanced ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-200'} `}
                    aria-pressed={showAdvanced}
                  >
                    Advanced
                  </button>
                </div>
              </div>
            )}
          </div>
          {BottomNav.map((item) => (
            <Link
              key={item.label}
              to={item.route || "#"}
              className={`flex items-center w-full px-2 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition ${sidebarClosed ? "justify-center" : ""}`}
            >
              {item.icon && <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6 mr-3" />}
              <span className={`${sidebarClosed ? "hidden" : ""}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2259c93f68b89dfbd7622fc3b2505b0f165279?placeholderIfAbsent=true"
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          {!sidebarClosed && (
            <div className="flex-1">
              <p className="text-xs text-gray-500">Welcome back 👋</p>
              <p className="text-sm font-medium text-gray-900">
                Student Portal
              </p>
            </div>
          )}
          {!sidebarClosed && (
            <ChevronRightIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}