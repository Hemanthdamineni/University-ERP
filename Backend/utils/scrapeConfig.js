// Mapping of frontend pages to ERP dropdown/subitem(s) to scrape
// Format: { [frontendPage]: [{ dropdown: 'Dropdown', subitem: 'Subitem' }, ...] }

module.exports = {
  dashboard: [
    { dropdown: 'Academic', subitem: 'Time Table' },
    { dropdown: 'Academic', subitem: 'Attendance Details' },
    { dropdown: 'Examination', subitem: 'Internal Mark Details' },
    { dropdown: 'Academic', subitem: 'Student Wise Subjects' }, // Profile (assumed)
    { dropdown: 'Examination', subitem: 'Current Semester Results', optional: true },
    { dropdown: 'Examination', subitem: 'Exam Mark Details', optional: true },
  ],
  'academic/timetable': [
    { dropdown: 'Academic', subitem: 'Time Table' },
  ],
  'academic/attendance-details': [
    { dropdown: 'Academic', subitem: 'Attendance Details' },
  ],
  'exams/current-semester-results': [
    { dropdown: 'Examination', subitem: 'Current Semester Results' },
  ],
  'exams/earlier-semester-results': [
    { dropdown: 'Examination', subitem: 'Exam Mark Details' },
  ],
  'finance/fee-dues': [
    { dropdown: 'Finance', subitem: 'Fee Due Details' },
  ],
  'finance/fee-paid': [
    { dropdown: 'Finance', subitem: 'Fee Paid Details' },
  ],
  'finance/sap-scholarships': [
    { dropdown: 'SAP', subitem: 'SAP Process' },
  ],
  'transport-hostel/room-details': [
    { dropdown: 'Hostel', subitem: 'Room Details' },
  ],
  'transport-hostel/route-details': [
    { dropdown: 'Transport', subitem: 'Transport Registration' },
    { dropdown: 'Transport', subitem: 'Registration Acknowledgment' },
  ],
  'transport-hostel/faqs': [
    { dropdown: 'Hostel', subitem: 'Hostel Layout & FAQs' },
    { dropdown: 'Transport', subitem: 'Transport & FAQs' },
  ],
  'transport-hostel/refund-change-requests': [
    { dropdown: 'Hostel', subitem: 'Hostel Refund Policy' },
    { dropdown: 'Transport', subitem: 'Transport Refund Policy' },
  ],
  'registration/course-registration': [
    { dropdown: 'Academic', subitem: 'Course Registration' },
  ],
  'registration/minor-oe-registration': [
    { dropdown: 'Academic', subitem: 'Minor Program Registration' },
  ],
  'registration/exam-registration': [
    { dropdown: 'Examination', subitem: 'Exam Registration' },
  ],
  'registration/hostel-registration': [
    { dropdown: 'Hostel', subitem: 'Hostel Booking for Full Year' },
  ],
  'registration/transport-registration': [
    { dropdown: 'Transport', subitem: 'Transport Registration' },
    { dropdown: 'Transport', subitem: 'Registration Acknowledgment' },
  ],
  'registration/sap-registration': [
    { dropdown: 'SAP', subitem: 'SAP Process' },
  ],
  'events/event-attendance': [
    { dropdown: 'Events', subitem: 'Event Attendance' },
  ],
  'feedback/course-feedback': [
    { dropdown: 'Feedback', subitem: 'End Semester Feedback' },
  ],
  profile: [
    { dropdown: 'Academic', subitem: 'Student Wise Subjects' }, // Profile (assumed)
  ],
  settings: [], // No direct mapping, placeholder
  logout: [], // No direct mapping, placeholder
}; 