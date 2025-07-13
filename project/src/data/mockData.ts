import { TimeSlot, AttendanceRecord, FinanceRecord, Event, Course } from '../types';

export const mockTimetable: TimeSlot[] = [
  {
    id: '1',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    faculty: 'Dr. Rajesh Kumar',
    room: 'AB1-301',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    type: 'Lecture'
  },
  {
    id: '2',
    courseCode: 'CS302',
    courseName: 'Database Management Systems',
    faculty: 'Dr. Priya Sharma',
    room: 'AB1-205',
    day: 'Monday',
    startTime: '10:00',
    endTime: '11:00',
    type: 'Lecture'
  },
  {
    id: '3',
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    faculty: 'Dr. Amit Singh',
    room: 'AB2-101',
    day: 'Monday',
    startTime: '11:30',
    endTime: '12:30',
    type: 'Lecture'
  },
  {
    id: '4',
    courseCode: 'CS304',
    courseName: 'Computer Networks',
    faculty: 'Dr. Neha Gupta',
    room: 'Lab-1',
    day: 'Monday',
    startTime: '14:00',
    endTime: '17:00',
    type: 'Lab'
  },
  {
    id: '5',
    courseCode: 'CS302',
    courseName: 'Database Management Systems',
    faculty: 'Dr. Priya Sharma',
    room: 'AB1-205',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    type: 'Lecture'
  },
  {
    id: '6',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    faculty: 'Dr. Rajesh Kumar',
    room: 'Lab-2',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '13:00',
    type: 'Lab'
  },
  {
    id: '7',
    courseCode: 'CS305',
    courseName: 'Software Engineering',
    faculty: 'Dr. Ravi Patel',
    room: 'AB1-401',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:00',
    type: 'Lecture'
  },
  {
    id: '8',
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    faculty: 'Dr. Amit Singh',
    room: 'AB2-101',
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '11:00',
    type: 'Lecture'
  }
];

export const mockAttendance: AttendanceRecord[] = [
  {
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    attended: 28,
    total: 32,
    percentage: 87.5,
    status: 'Good'
  },
  {
    courseCode: 'CS302',
    courseName: 'Database Management Systems',
    attended: 25,
    total: 30,
    percentage: 83.3,
    status: 'Good'
  },
  {
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    attended: 22,
    total: 31,
    percentage: 71.0,
    status: 'Warning'
  },
  {
    courseCode: 'CS304',
    courseName: 'Computer Networks',
    attended: 18,
    total: 24,
    percentage: 75.0,
    status: 'Good'
  },
  {
    courseCode: 'CS305',
    courseName: 'Software Engineering',
    attended: 20,
    total: 28,
    percentage: 71.4,
    status: 'Warning'
  }
];

export const mockFinances: FinanceRecord[] = [
  {
    semester: 'Semester 6',
    tuitionFees: 125000,
    hostelFees: 45000,
    miscFees: 8000,
    total: 178000,
    status: 'Paid'
  },
  {
    semester: 'Semester 7',
    tuitionFees: 125000,
    hostelFees: 45000,
    miscFees: 8000,
    total: 178000,
    status: 'Pending',
    dueDate: '2025-02-15'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'TechFest 2025',
    description: 'Annual technical festival with coding competitions, hackathons, and tech talks.',
    date: '2025-02-20',
    venue: 'Main Auditorium',
    category: 'Technical',
    organizer: 'CSE Department',
    registrationDeadline: '2025-02-15',
    isRegistered: false
  },
  {
    id: '2',
    title: 'Cultural Night',
    description: 'Showcase your talents in music, dance, and drama.',
    date: '2025-02-25',
    venue: 'Open Theater',
    category: 'Cultural',
    organizer: 'Cultural Committee',
    registrationDeadline: '2025-02-20',
    isRegistered: true
  },
  {
    id: '3',
    title: 'Research Symposium',
    description: 'Present your research findings and network with faculty.',
    date: '2025-03-05',
    venue: 'Conference Hall',
    category: 'Academic',
    organizer: 'Research Cell',
    registrationDeadline: '2025-02-28',
    isRegistered: false
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    credits: 4,
    type: 'Core',
    faculty: 'Dr. Rajesh Kumar'
  },
  {
    id: '2',
    code: 'CS302',
    name: 'Database Management Systems',
    credits: 3,
    type: 'Core',
    faculty: 'Dr. Priya Sharma'
  },
  {
    id: '3',
    code: 'CS303',
    name: 'Operating Systems',
    credits: 3,
    type: 'Core',
    faculty: 'Dr. Amit Singh'
  },
  {
    id: '4',
    code: 'CS304',
    name: 'Computer Networks',
    credits: 3,
    type: 'Core',
    faculty: 'Dr. Neha Gupta'
  },
  {
    id: '5',
    code: 'CS305',
    name: 'Software Engineering',
    credits: 3,
    type: 'Core',
    faculty: 'Dr. Ravi Patel'
  }
];

export const getCurrentClass = (): TimeSlot | null => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0, 5);

  return mockTimetable.find(slot => {
    return slot.day === currentDay && 
           currentTime >= slot.startTime && 
           currentTime <= slot.endTime;
  }) || null;
};

export const getNextClass = (): TimeSlot | null => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0, 5);

  const todayClasses = mockTimetable.filter(slot => slot.day === currentDay);
  
  return todayClasses.find(slot => currentTime < slot.startTime) || null;
};