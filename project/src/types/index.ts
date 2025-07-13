export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  branch: string;
  semester: number;
  academicYear: string;
  cgpa: number;
  profilePicture?: string;
  hostelRoom?: string;
  transportRoute?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  faculty: string;
  grade?: string;
}

export interface TimeSlot {
  id: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface AttendanceRecord {
  courseCode: string;
  courseName: string;
  attended: number;
  total: number;
  percentage: number;
  status: 'Good' | 'Warning' | 'Critical';
}

export interface FinanceRecord {
  semester: string;
  tuitionFees: number;
  hostelFees: number;
  miscFees: number;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: 'Academic' | 'Cultural' | 'Technical' | 'Sports';
  organizer: string;
  registrationDeadline: string;
  isRegistered: boolean;
}

export interface ViewMode {
  mode: 'basic' | 'advanced';
}