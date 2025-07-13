"use client";

import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasSubItems?: boolean;
  subItems?: SubNavItem[];
  accessLevel?: "B" | "A"; // B = Basic, A = Advanced
  route?: string;
}

interface SubNavItem {
  id: string;
  label: string;
  accessLevel: "B" | "A";
  route: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isAdvancedMode?: boolean;
  onToggleMode?: () => void;
}

export default function Sidebar({
  isCollapsed = false,
  onToggleCollapse,
  isAdvancedMode = false,
  onToggleMode,
}: SidebarProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const router = useRouter();

  const toggleExpanded = (itemId: string) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  const handleNavigation = (route?: string) => {
    if (route) {
      router.push(route);
    }
  };

  const mainNavItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      isActive: true,
      accessLevel: "B",
      route: "/",
    },
    {
      id: "academics",
      label: "Academics",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "timetable",
          label: "Timetable",
          accessLevel: "B",
          route: "/academics/timetable",
        },
        {
          id: "attendance",
          label: "Attendance Details",
          accessLevel: "B",
          route: "/academics/attendance",
        },
        {
          id: "curriculum",
          label: "Curriculum",
          accessLevel: "B",
          route: "/academics/curriculum",
        },
        {
          id: "electives",
          label: "Elective Preferences",
          accessLevel: "A",
          route: "/academics/electives",
        },
      ],
    },
    {
      id: "exams",
      label: "Exams / Results",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "current-results",
          label: "Current Semester Results",
          accessLevel: "B",
          route: "/exams/current-results",
        },
        {
          id: "earlier-results",
          label: "Earlier Semester Results",
          accessLevel: "B",
          route: "/exams/earlier-results",
        },
        {
          id: "revaluation",
          label: "Revaluation Application",
          accessLevel: "A",
          route: "/exams/revaluation",
        },
        {
          id: "internal-assessments",
          label: "Internal Assessments",
          accessLevel: "A",
          route: "/exams/internal-assessments",
        },
        {
          id: "exam-essentials",
          label: "Exam Essentials",
          accessLevel: "A",
          route: "/exams/essentials",
        },
      ],
    },
    {
      id: "finance",
      label: "Finance",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "fee-details",
          label: "Fee Details",
          accessLevel: "B",
          route: "/finance/fee-details",
        },
        {
          id: "fee-payment",
          label: "Fee Payment",
          accessLevel: "A",
          route: "/finance/fee-payment",
        },
        {
          id: "scholarships",
          label: "SAP & Scholarships",
          accessLevel: "A",
          route: "/finance/scholarships",
        },
      ],
    },
    {
      id: "transport-hostel",
      label: "Transport & Hostel",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "room-details",
          label: "Room Details",
          accessLevel: "B",
          route: "/transport-hostel/room-details",
        },
        {
          id: "route-details",
          label: "Route Details",
          accessLevel: "B",
          route: "/transport-hostel/route-details",
        },
        {
          id: "refund-requests",
          label: "Refund & Change Requests",
          accessLevel: "A",
          route: "/transport-hostel/refund-requests",
        },
        {
          id: "leave-maintenance",
          label: "Leave & Maintenance",
          accessLevel: "A",
          route: "/transport-hostel/leave-maintenance",
        },
      ],
    },
    {
      id: "registration",
      label: "Registration",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "course-registration",
          label: "Course Registration",
          accessLevel: "A",
          route: "/registration/course-registration",
        },
        {
          id: "minor-oe-registration",
          label: "Minor / OE Registration",
          accessLevel: "A",
          route: "/registration/minor-oe-registration",
        },
        {
          id: "exam-registration",
          label: "Exam Registration",
          accessLevel: "A",
          route: "/registration/exam-registration",
        },
        {
          id: "hostel-transport-registration",
          label: "Hostel / Transport Registration",
          accessLevel: "A",
          route: "/registration/hostel-transport-registration",
        },
        {
          id: "sap-registration",
          label: "SAP Registration",
          accessLevel: "A",
          route: "/registration/sap-registration",
        },
        {
          id: "events-registration",
          label: "Events Registration",
          accessLevel: "A",
          route: "/registration/events-registration",
        },
        {
          id: "registration-tracker",
          label: "Registration Tracker",
          accessLevel: "A",
          route: "/registration/registration-tracker",
        },
      ],
    },
    {
      id: "events",
      label: "Events",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "event-listings",
          label: "Event Listings",
          accessLevel: "B",
          route: "/events/event-listings",
        },
        {
          id: "my-events",
          label: "My Events",
          accessLevel: "B",
          route: "/events/my-events",
        },
        {
          id: "event-participation",
          label: "Event Participation",
          accessLevel: "A",
          route: "/events/event-participation",
        },
        {
          id: "propose-event",
          label: "Propose New Event",
          accessLevel: "A",
          route: "/events/propose-event",
        },
      ],
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "submit-feedback",
          label: "Submit Feedback",
          accessLevel: "A",
          route: "/feedback/submit-feedback",
        },
        {
          id: "past-feedback",
          label: "View Past Feedback",
          accessLevel: "A",
          route: "/feedback/past-feedback",
        },
        {
          id: "anonymous-feedback",
          label: "Anonymous Feedback Option",
          accessLevel: "A",
          route: "/feedback/anonymous-feedback",
        },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "learning-materials",
          label: "Learning Materials",
          accessLevel: "B",
          route: "/resources/learning-materials",
        },
        {
          id: "advanced-access",
          label: "Advanced Access",
          accessLevel: "A",
          route: "/resources/advanced-access",
        },
      ],
    },
    {
      id: "tracker",
      label: "Academic Tracker",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "progress-overview",
          label: "Progress Overview",
          accessLevel: "B",
          route: "/tracker/progress-overview",
        },
        {
          id: "academic-insights",
          label: "Academic Insights",
          accessLevel: "A",
          route: "/tracker/academic-insights",
        },
      ],
    },
    {
      id: "career",
      label: "Career Portal",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "opportunities",
          label: "Opportunities",
          accessLevel: "B",
          route: "/career/opportunities",
        },
        {
          id: "resume-profile",
          label: "Resume & Profile",
          accessLevel: "A",
          route: "/career/resume-profile",
        },
        {
          id: "interview-booking",
          label: "Interview Booking",
          accessLevel: "A",
          route: "/career/interview-booking",
        },
        {
          id: "alumni-connect",
          label: "Alumni Connect",
          accessLevel: "A",
          route: "/career/alumni-connect",
        },
      ],
    },
    {
      id: "helpdesk",
      label: "Helpdesk",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasSubItems: true,
      subItems: [
        {
          id: "raise-ticket",
          label: "Raise a Ticket",
          accessLevel: "B",
          route: "/helpdesk/raise-ticket",
        },
        {
          id: "faqs",
          label: "FAQs",
          accessLevel: "B",
          route: "/helpdesk/faqs",
        },
        {
          id: "track-escalate",
          label: "Track & Escalate",
          accessLevel: "A",
          route: "/helpdesk/track-escalate",
        },
      ],
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      id: "notifications",
      label: "Notifications",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      ),
      route: "/notifications",
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      route: "/settings",
    },
  ];

  const filteredSubItems = (subItems: SubNavItem[]) => {
    return subItems.filter(
      (item) => isAdvancedMode || item.accessLevel === "B",
    );
  };

  const filteredMainItems = mainNavItems.filter(
    (item) =>
      isAdvancedMode ||
      !item.hasSubItems ||
      item.accessLevel === "B" ||
      (item.subItems && item.subItems.some((sub) => sub.accessLevel === "B")),
  );

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/assets/SRM-University-AP-Logo.png"
              alt="SRM University AP Logo"
              width={24}
              height={24}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          {!isCollapsed && (
            <div className="font-semibold text-gray-900 text-lg">
              SRM University AP
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-7 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 space-y-1">
          {filteredMainItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              {/* Remove Basic/Advanced Toggle from here */}
              {/* Render nav item */}
              <div>
                <button
                  onClick={() => {
                    if (item.hasSubItems) {
                      toggleExpanded(item.id);
                    } else {
                      handleNavigation(item.route);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-indigo-50 transition-colors ${
                    item.isActive ? "bg-indigo-100 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                  {item.hasSubItems && !isCollapsed && (
                    <ChevronDownIcon
                      className={`w-4 h-4 ml-auto transition-transform ${
                        expandedItem === item.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {/* SubNav */}
                {item.hasSubItems && expandedItem === item.id && !isCollapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {filteredSubItems(item.subItems || []).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          handleNavigation(sub.route);
                          setExpandedItem(null);
                        }}
                        className="block w-full text-left px-2 py-1 rounded text-gray-600 hover:bg-indigo-100 text-sm"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6 mx-4" />

        {/* Bottom Navigation */}
        <nav className="px-4 space-y-1">
          {/* Basic/Advanced Toggle above notifications button */}
          {!isCollapsed && (
            <div className="px-2 pb-4">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`${isAdvancedMode ? "text-gray-500" : "text-indigo-600 font-medium"}`}
                >
                  Basic
                </span>
                <button
                  onClick={onToggleMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAdvancedMode ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAdvancedMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`${isAdvancedMode ? "text-indigo-600 font-medium" : "text-gray-500"}`}
                >
                  Advanced
                </span>
              </div>
            </div>
          )}
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.route)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-full text-gray-600 hover:bg-gray-50 transition-colors ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <span className="text-gray-400">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
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
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-xs text-gray-500">Welcome back 👋</p>
              <p className="text-sm font-medium text-gray-900">
                Student Portal
              </p>
            </div>
          )}
          {!isCollapsed && (
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}
