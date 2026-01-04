
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: 'Event' | 'Academic' | 'Sports';
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  courses: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  criteria: (data: any) => boolean;
}

export interface SubjectGrade {
  subject: string;
  grade: string;
  points: number;
  credits: number;
}

export interface StudentResult {
  studentId: string;
  name: string;
  term: string;
  gradeLevel: string;
  gpa: number;
  standing: string;
  grades: SubjectGrade[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO format or YYYY-MM-DD
  type: 'Assignment' | 'Exam' | 'Event' | 'Holiday';
  location?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: 'Science' | 'Humanities' | 'Arts' | 'Reference';
  description: string;
  pages: number;
  publishedYear: number;
  fullContent?: string;
  readingTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
