import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageLayout from './pages/Pagelayout';

import LoginPage from './pages/Login/LoginPage.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import Dashboard from "./pages/Dashboard/Dashboard";
// Academics
import Timetable from "./pages/Academic/Timetable";
import AttendanceDetails from "./pages/Academic/AttendanceDetails";
import Curriculum from "./pages/Academic/Curriculum";
import ElectivePreferences from "./pages/Academic/ElectivePreferences";
// Exams/Results
import CurrentSemesterResults from "./pages/Exams&Results/CurrentSemesterResults";
import EarlierSemesterResults from "./pages/Exams&Results/EarlierSemesterResults";
import InternalAssessments from "./pages/Exams&Results/InternalAssessments";
import Essentials from "./pages/Exams&Results/Essentials";
// Finance
import FeeDueDetails from "./pages/Finance/FeeDueDetails";
import FeePaidDetails from "./pages/Finance/FeePaidDetails";
import SAP from "./pages/Finance/SAP";
// Transport & Hostel
import RoomDetails from "./pages/Transport&Hostel/RoomDetails";
import RouteDetails from "./pages/Transport&Hostel/RouteDetails";
import FAQs from "./pages/Transport&Hostel/FAQs";
import RefundChangeRequests from "./pages/Transport&Hostel/RefundChangeRequests";
import OutingMaintenance from "./pages/Transport&Hostel/OutingMaintenance";
// Registration
import CourseRegistration from "./pages/Registration/CourseRegistration";
import MinorOERegistration from "./pages/Registration/MinorOERegistration";
import EventsRegistration from "./pages/Registration/EventsRegistration";
import ExamRegistration from "./pages/Registration/ExamRegistration";
import HostelRegistration from "./pages/Registration/HostelRegistration";
import TransportRegistration from "./pages/Registration/TransportRegistration";
import SAPRegistration from "./pages/Registration/SAPRegistration";
import RegistrationTracker from "./pages/Registration/RegistrationTracker";
// Events
import EventsListings from "./pages/Events/EventsListings";
import MyEvents from "./pages/Events/MyEvents";
import RegisteredEvents from "./pages/Events/RegisteredEvents";
import EventAttendance from "./pages/Events/EventAttendance";
import ProposeNewEvent from "./pages/Events/ProposeNewEvent";
// Feedback
import CourseFeedback from "./pages/Feedback/CourseFeedback";
import EventsFeedback from "./pages/Feedback/EventsFeedback";
import HostelMessFeedback from "./pages/Feedback/HostelMessFeedback";
import TransportFeedback from "./pages/Feedback/TransportFeedback";
// Resources
import LearningMaterials from "./pages/Resources/LearningMaterials";
import AdvancedAccess from "./pages/Resources/AdvancedAccess";
// Academic Tracker
import ProgressOverview from "./pages/AcademicTracker/ProgressOverview";
import AcademicInsights from "./pages/AcademicTracker/AcademicInsights";
// Career Portal
import Opportunities from "./pages/CareerPortal/Opportunities";
import ResumeProfile from "./pages/CareerPortal/ResumeProfile";
import InterviewBooking from "./pages/CareerPortal/InterviewBooking";
import AlumniConnect from "./pages/CareerPortal/AlumniConnect";
// Helpdesk
import RaiseTicket from "./pages/Helpdesk/RaiseTicket";
import TrackEscalate from "./pages/Helpdesk/TrackEscalate";
// Additional Pages
import Notification from "./pages/Notifications/Notifications";
import Settings from "./pages/Settings/Settings";

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout><HomePage /></PageLayout>,
  },
  {
    path: '/login',
    element: <PageLayout><LoginPage /></PageLayout>,
  },
  {
    path: '/dashboard',
    element: <PageLayout><Dashboard /></PageLayout>,
  },
  // Academics
  { path: '/academic/timetable', element: <PageLayout><Timetable /></PageLayout> },
  { path: '/academic/attendance-details', element: <PageLayout><AttendanceDetails /></PageLayout> },
  { path: '/academic/curriculum', element: <PageLayout><Curriculum /></PageLayout> },
  { path: '/academic/elective-preferences', element: <PageLayout><ElectivePreferences /></PageLayout> },
  // Exams/Results
  { path: '/exams/current-semester-results', element: <PageLayout><CurrentSemesterResults /></PageLayout> },
  { path: '/exams/earlier-semester-results', element: <PageLayout><EarlierSemesterResults /></PageLayout> },
  { path: '/exams/internal-assessments', element: <PageLayout><InternalAssessments /></PageLayout> },
  { path: '/exams/essentials', element: <PageLayout><Essentials /></PageLayout> },
  // Finance
  { path: '/finance/fee-dues', element: <PageLayout><FeeDueDetails /></PageLayout> },
  { path: '/finance/fee-paid', element: <PageLayout><FeePaidDetails /></PageLayout> },
  { path: '/finance/sap-scholarships', element: <PageLayout><SAP /></PageLayout> },
  // Transport & Hostel
  { path: '/transport-hostel/room-details', element: <PageLayout><RoomDetails /></PageLayout> },
  { path: '/transport-hostel/route-details', element: <PageLayout><RouteDetails /></PageLayout> },
  { path: '/transport-hostel/faqs', element: <PageLayout><FAQs /></PageLayout> },
  { path: '/transport-hostel/refund-change-requests', element: <PageLayout><RefundChangeRequests /></PageLayout> },
  { path: '/transport-hostel/outing-maintenance', element: <PageLayout><OutingMaintenance /></PageLayout> },
  // Registration
  { path: '/registration/course-registration', element: <PageLayout><CourseRegistration /></PageLayout> },
  { path: '/registration/minor-oe-registration', element: <PageLayout><MinorOERegistration /></PageLayout> },
  { path: '/registration/events-registration', element: <PageLayout><EventsRegistration /></PageLayout> },
  { path: '/registration/exam-registration', element: <PageLayout><ExamRegistration /></PageLayout> },
  { path: '/registration/hostel-registration', element: <PageLayout><HostelRegistration /></PageLayout> },
  { path: '/registration/transport-registration', element: <PageLayout><TransportRegistration /></PageLayout> },
  { path: '/registration/sap-registration', element: <PageLayout><SAPRegistration /></PageLayout> },
  { path: '/registration/registration-tracker', element: <PageLayout><RegistrationTracker /></PageLayout> },
  // Events
  { path: '/events/listings', element: <PageLayout><EventsListings /></PageLayout> },
  { path: '/events/my-events', element: <PageLayout><MyEvents /></PageLayout> },
  { path: '/events/registered-events', element: <PageLayout><RegisteredEvents /></PageLayout> },
  { path: '/events/event-attendance', element: <PageLayout><EventAttendance /></PageLayout> },
  { path: '/events/propose-new-event', element: <PageLayout><ProposeNewEvent /></PageLayout> },
  // Feedback
  { path: '/feedback/course-feedback', element: <PageLayout><CourseFeedback /></PageLayout> },
  { path: '/feedback/events-feedback', element: <PageLayout><EventsFeedback /></PageLayout> },
  { path: '/feedback/hostel-mess-feedback', element: <PageLayout><HostelMessFeedback /></PageLayout> },
  { path: '/feedback/transport-feedback', element: <PageLayout><TransportFeedback /></PageLayout> },
  // Resources
  { path: '/resources/learning-materials', element: <PageLayout><LearningMaterials /></PageLayout> },
  { path: '/resources/advanced-access', element: <PageLayout><AdvancedAccess /></PageLayout> },
  // Academic Tracker
  { path: '/academic-tracker/progress-overview', element: <PageLayout><ProgressOverview /></PageLayout> },
  { path: '/academic-tracker/academic-insights', element: <PageLayout><AcademicInsights /></PageLayout> },
  // Career Portal
  { path: '/career-portal/opportunities', element: <PageLayout><Opportunities /></PageLayout> },
  { path: '/career-portal/resume-profile', element: <PageLayout><ResumeProfile /></PageLayout> },
  { path: '/career-portal/interview-booking', element: <PageLayout><InterviewBooking /></PageLayout> },
  { path: '/career-portal/alumni-connect', element: <PageLayout><AlumniConnect /></PageLayout> },
  // Helpdesk
  { path: '/helpdesk/raise-ticket', element: <PageLayout><RaiseTicket /></PageLayout> },
  { path: '/helpdesk/track-escalate', element: <PageLayout><TrackEscalate /></PageLayout> },
  // Additional Pages
  { path: '/notifications', element: <PageLayout><Notification /></PageLayout> },
  { path: '/settings', element: <PageLayout><Settings /></PageLayout> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)