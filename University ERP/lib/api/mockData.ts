// Mock API data for University ERP Dashboard

export interface StudentProfile {
  name: string;
  dob: string;
  age: number;
  gender: string;
  program: string;
  specialization: string;
  minorOE: string;
  academicYear: string;
  semester: string;
  section: string;
  previousSemesterGPA: number;
  latestCGPA: number;
}

export interface InternalMark {
  courseCode: string;
  courseName: string;
  marks: number;
  totalMarks: number;
}

export interface WeeklyActivity {
  day: string;
  value: number;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  category: "assigned" | "missing" | "done";
  timeCategory: "no_due_date" | "done_early" | "this_week" | "earlier";
  status: "pending" | "completed" | "overdue";
  courseCode?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  courseCode: string;
  professor: string;
  location: string;
  startTime: string;
  endTime: string;
  type: "lecture" | "lab" | "tutorial";
  status: "pending" | "ongoing" | "completed";
}

export interface CalendarData {
  currentMonth: string;
  currentYear: number;
  events: Array<{
    date: number;
    hasEvent: boolean;
    isToday?: boolean;
  }>;
}

// Mock data generators
export const getStudentProfile = (): StudentProfile => ({
  name: "Damineni Hemanth Satya Veer",
  dob: "4th May 2006",
  age: 19,
  gender: "Male",
  program: "B. Tech - CSE [UG - Full Time]",
  specialization: "AI / ML",
  minorOE: "Minor in Robotics",
  academicYear: "2024-25",
  semester: "4th",
  section: "F",
  previousSemesterGPA: 9.9,
  latestCGPA: 9.63,
});

export const getInternalMarks = (): InternalMark[] => [
  {
    courseCode: "AEC 112",
    courseName: "Creativity and Critical Thinking",
    marks: 100.0,
    totalMarks: 100.0,
  },
  {
    courseCode: "CSE 201",
    courseName: "Data Structures",
    marks: 95.5,
    totalMarks: 100.0,
  },
  {
    courseCode: "CSE 202",
    courseName: "Computer Organization",
    marks: 92.0,
    totalMarks: 100.0,
  },
  {
    courseCode: "CSE 203",
    courseName: "Digital Logic Design",
    marks: 98.5,
    totalMarks: 100.0,
  },
  {
    courseCode: "MTH 201",
    courseName: "Discrete Mathematics",
    marks: 94.0,
    totalMarks: 100.0,
  },
  {
    courseCode: "CSE 204",
    courseName: "Programming Lab",
    marks: 100.0,
    totalMarks: 100.0,
  },
  {
    courseCode: "ENG 201",
    courseName: "Technical Communication",
    marks: 96.5,
    totalMarks: 100.0,
  },
  {
    courseCode: "CSE 205",
    courseName: "Database Systems",
    marks: 93.5,
    totalMarks: 100.0,
  },
  {
    courseCode: "CSE 206",
    courseName: "Software Engineering",
    marks: 97.0,
    totalMarks: 100.0,
  },
];

export const getWeeklyActivity = (): WeeklyActivity[] => [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 100 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 90 },
];

export const getTodoItems = (): TodoItem[] => [
  {
    id: "1",
    title: "AEC 104 Creativity and Critical Thinking Assignment",
    description:
      "Ex 1: Design webpage and select elective subject through online with registration.",
    category: "assigned",
    timeCategory: "earlier",
    status: "pending",
    courseCode: "AEC 104",
  },
  {
    id: "2",
    title: "Database Lab Report",
    description: "Submit ER diagram and normalization exercises",
    category: "assigned",
    timeCategory: "this_week",
    status: "pending",
    courseCode: "CSE 205",
  },
  {
    id: "3",
    title: "Programming Assignment",
    description: "Implement binary search tree operations",
    category: "done",
    timeCategory: "done_early",
    status: "completed",
    courseCode: "CSE 201",
  },
  {
    id: "4",
    title: "Technical Communication Essay",
    description: "Write 1000-word essay on emerging technologies",
    category: "missing",
    timeCategory: "earlier",
    status: "overdue",
    courseCode: "ENG 201",
  },
  {
    id: "5",
    title: "Software Engineering Project",
    description: "Complete requirements documentation phase",
    category: "assigned",
    timeCategory: "no_due_date",
    status: "pending",
    courseCode: "CSE 206",
  },
];

export const getScheduleItems = (): ScheduleItem[] => [
  {
    id: "1",
    title: "Creativity and Critical Thinking Skills",
    courseCode: "AEC 104",
    professor: "Prof. P. Vivekananda Shanmuganathan",
    location: "Lecture - C 211",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    type: "lecture",
    status: "pending",
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    courseCode: "CSE 201",
    professor: "Dr. Sarah Johnson",
    location: "Lab - L 305",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    type: "lab",
    status: "pending",
  },
  {
    id: "3",
    title: "Computer Organization",
    courseCode: "CSE 202",
    professor: "Prof. Michael Chen",
    location: "Lecture - A 102",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "lecture",
    status: "pending",
  },
  {
    id: "4",
    title: "Database Systems",
    courseCode: "CSE 205",
    professor: "Dr. Emily Rodriguez",
    location: "Tutorial - T 201",
    startTime: "1:00 PM",
    endTime: "2:00 PM",
    type: "tutorial",
    status: "pending",
  },
  {
    id: "5",
    title: "Software Engineering",
    courseCode: "CSE 206",
    professor: "Prof. David Kumar",
    location: "Lecture - B 104",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    type: "lecture",
    status: "pending",
  },
  {
    id: "6",
    title: "Technical Communication",
    courseCode: "ENG 201",
    professor: "Dr. Lisa Thompson",
    location: "Seminar - S 301",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    type: "lecture",
    status: "pending",
  },
  {
    id: "7",
    title: "Digital Logic Design Lab",
    courseCode: "CSE 203",
    professor: "Prof. Robert Wilson",
    location: "Lab - L 208",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    type: "lab",
    status: "pending",
  },
  {
    id: "8",
    title: "Discrete Mathematics Tutorial",
    courseCode: "MTH 201",
    professor: "Dr. Anna Singh",
    location: "Tutorial - T 105",
    startTime: "5:00 PM",
    endTime: "5:30 PM",
    type: "tutorial",
    status: "pending",
  },
];

export const getCalendarData = (): CalendarData => {
  const today = new Date();
  const currentDate = today.getDate();

  return {
    currentMonth: "March",
    currentYear: 2024,
    events: Array.from({ length: 31 }, (_, i) => ({
      date: i + 1,
      hasEvent: [3, 10, 15, 22, 24, 28].includes(i + 1),
      isToday: i + 1 === currentDate,
    })),
  };
};

// API simulation functions
export const fetchStudentProfile = (): Promise<StudentProfile> =>
  new Promise((resolve) => setTimeout(() => resolve(getStudentProfile()), 100));

export const fetchInternalMarks = (): Promise<InternalMark[]> =>
  new Promise((resolve) => setTimeout(() => resolve(getInternalMarks()), 150));

export const fetchWeeklyActivity = (): Promise<WeeklyActivity[]> =>
  new Promise((resolve) => setTimeout(() => resolve(getWeeklyActivity()), 120));

export const fetchTodoItems = (): Promise<TodoItem[]> =>
  new Promise((resolve) => setTimeout(() => resolve(getTodoItems()), 100));

export const fetchScheduleItems = (): Promise<ScheduleItem[]> =>
  new Promise((resolve) => setTimeout(() => resolve(getScheduleItems()), 110));

export const fetchCalendarData = (): Promise<CalendarData> =>
  new Promise((resolve) => setTimeout(() => resolve(getCalendarData()), 90));
