
import { NewsItem, Department, StudentResult, CalendarEvent, Book } from './types';

export const SCHOOL_NAME = "Lumina Academy";

export const DEPARTMENTS: Department[] = [
  {
    id: '1',
    name: 'Science & Technology',
    description: 'Fostering innovation through hands-on laboratory work and advanced computer science programs.',
    head: 'Dr. Sarah Chen',
    courses: ['Advanced Physics', 'Molecular Biology', 'Artificial Intelligence 101', 'Robotics']
  },
  {
    id: '2',
    name: 'Humanities & Social Sciences',
    description: 'Exploring the human experience through literature, history, and critical thinking.',
    head: 'Prof. James Wilson',
    courses: ['World History', 'Philosophy', 'English Literature', 'Political Science']
  },
  {
    id: '3',
    name: 'Visual & Performing Arts',
    description: 'Nurturing creativity and artistic expression across diverse mediums.',
    head: 'Ms. Elena Rodriguez',
    courses: ['Classical Piano', 'Digital Arts', 'Theatre & Drama', 'Sculpting']
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Annual Science Fair Winners Announced',
    excerpt: 'Lumina students take home top prizes at the Regional Science & Engineering Expo.',
    date: 'Oct 24, 2023',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    category: 'Academic'
  },
  {
    id: 'n2',
    title: 'New Campus Sports Center Opening',
    excerpt: 'State-of-the-art facilities for our athletes will open their doors next month.',
    date: 'Oct 20, 2023',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    category: 'Sports'
  },
  {
    id: 'n3',
    title: 'Lumina Winter Concert Series',
    excerpt: 'Join us for three nights of breathtaking musical performances by our talented orchestra.',
    date: 'Oct 15, 2023',
    image: 'https://images.unsplash.com/photo-1514119412350-e174d90d280e?auto=format&fit=crop&q=80&w=800',
    category: 'Event'
  }
];

export const LIBRARY_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'The Quantum Perspective',
    author: 'Dr. Julian Thorne',
    category: 'Science',
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    publishedYear: 2022,
    pages: 412,
    readingTime: '6h 30m',
    difficulty: 'Advanced',
    description: 'An introductory guide to quantum mechanics and its implications on modern computing.',
    fullContent: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.\n\nCHAPTER 1: THE WAVE-PARTICLE DUALITY\nThe concept of wave-particle duality is a central tenet of quantum mechanics. It states that every particle or quantum entity may be described as either a particle or a wave. It expresses the inability of the classical concepts "particle" or "wave" to fully describe the behavior of quantum-scale objects.\n\nAs Albert Einstein wrote: "It seems as though we must use sometimes the one theory and sometimes the other, while at times we may use either. We are faced with a new kind of difficulty. We have two contradictory pictures of reality; separately neither of them fully explains the phenomena of light, but together they do."'
  },
  {
    id: 'b2',
    title: 'Echoes of Ancient Rome',
    author: 'Elena Moretti',
    category: 'Humanities',
    cover: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600',
    publishedYear: 2019,
    pages: 350,
    readingTime: '5h 15m',
    difficulty: 'Intermediate',
    description: 'A deep dive into the daily lives and political structures of the Roman Republic.',
    fullContent: 'The Roman Republic was the era of classical Roman civilization beginning with the overthrow of the Roman Kingdom, traditionally dated to 509 BC, and ending in 27 BC with the establishment of the Roman Empire.\n\nTHE SENATE AND THE PEOPLE\nSPQR, an abbreviation for Senātus Populusque Rōmānus, is an emblematic abbreviated phrase referring to the government of the ancient Roman Republic. It appears on Roman currency, at the end of documents made public by an inscription in stone or metal, and in public dedications of monuments and public works.'
  },
  {
    id: 'b3',
    title: 'Digital Aesthetics',
    author: 'Marcus Vane',
    category: 'Arts',
    cover: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=600',
    publishedYear: 2023,
    pages: 280,
    readingTime: '4h 00m',
    difficulty: 'Beginner',
    description: 'Exploring the evolution of art in the age of generative algorithms and AI.',
    fullContent: 'Digital art is an artistic work or practice that uses digital technology as part of the creative or presentation process. Since the 1960s, various names have been used to describe the process, including computer art and multimedia art.\n\nTHE ALGORITHMIC BRUSH\nGenerative art refers to art that in whole or in part has been created with the use of an autonomous system. An autonomous system in this context is generally one that is non-human and can independently determine features of an artwork that would otherwise require decisions made directly by the artist.'
  },
  {
    id: 'b4',
    title: 'Ethics in Bio-Engineering',
    author: 'Dr. Sarah Chen',
    category: 'Science',
    cover: 'https://images.unsplash.com/photo-1532187863486-abf9d3b3ec23?auto=format&fit=crop&q=80&w=600',
    publishedYear: 2021,
    pages: 520,
    readingTime: '8h 45m',
    difficulty: 'Advanced',
    description: 'A comprehensive study of the moral boundaries in genetic modification and life sciences.',
    fullContent: 'Bioethics is the study of the ethical issues emerging from advances in biology and medicine. It is also moral discernment as it relates to medical policy and practice.\n\nDESIGNER GENETICS\nThe rapid development of CRISPR-Cas9 technology has brought the dream of precision gene editing to reality. However, with great power comes unprecedented ethical responsibility. Should we edit the human germline? Where do we draw the line between therapy and enhancement?'
  },
  {
    id: 'b5',
    title: 'The Great Philosophers',
    author: 'Arthur Lumis',
    category: 'Humanities',
    cover: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=600',
    publishedYear: 2015,
    pages: 640,
    readingTime: '10h 20m',
    difficulty: 'Intermediate',
    description: 'Compiling the most influential thoughts from Socrates to the modern existentialists.',
    fullContent: 'Philosophy is the systematized study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language.\n\nTHE SOCRATIC METHOD\nSocratic questioning is a form of disciplined questioning that can be used to pursue thought in many directions and for many purposes, including: to explore complex ideas, to get to the truth of things, to open up issues and problems, to uncover assumptions, and to analyze concepts.'
  },
  {
    id: 'b6',
    title: 'Cinematography Mastery',
    author: 'Lina Grahame',
    category: 'Arts',
    cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600',
    publishedYear: 2020,
    pages: 310,
    readingTime: '4h 30m',
    difficulty: 'Beginner',
    description: 'Technical and artistic approaches to visual storytelling in cinema.',
    fullContent: 'Cinematography is the art of motion-picture photography and filming both in production and post-production. It includes the choice of cameras, lenses, and filters.\n\nLIGHTING AS NARRATIVE\nThe way a scene is lit can tell the audience more about a character than their dialogue. High-contrast lighting often suggests internal conflict, while soft, diffused light can evoke nostalgia or innocence.'
  }
];

export const MOCK_RESULTS: StudentResult[] = [
  {
    studentId: 'LUM-2023-892',
    name: 'Alex Sterling',
    term: 'Fall 2023',
    gradeLevel: 'Grade 12',
    gpa: 3.92,
    standing: 'First Class Distinction',
    grades: [
      { subject: 'Advanced Physics', grade: 'A', points: 4.0, credits: 4 },
      { subject: 'Molecular Biology', grade: 'A', points: 4.0, credits: 4 },
      { subject: 'World History', grade: 'A-', points: 3.7, credits: 3 },
      { subject: 'Philosophy', grade: 'B+', points: 3.3, credits: 3 },
      { subject: 'Artificial Intelligence 101', grade: 'A+', points: 4.0, credits: 4 }
    ]
  },
  {
    studentId: 'LUM-2023-441',
    name: 'Jordan Rivera',
    term: 'Fall 2023',
    gradeLevel: 'Grade 10',
    gpa: 3.65,
    standing: 'Honor Roll',
    grades: [
      { subject: 'English Literature', grade: 'A', points: 4.0, credits: 4 },
      { subject: 'Algebra II', grade: 'B', points: 3.0, credits: 4 },
      { subject: 'Chemistry', grade: 'A-', points: 3.7, credits: 4 },
      { subject: 'Theatre Arts', grade: 'A', points: 4.0, credits: 2 }
    ]
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Physics Lab Report Due', date: '2023-10-27', type: 'Assignment' },
  { id: 'e2', title: 'History Midterm Exam', date: '2023-10-30', type: 'Exam', location: 'Main Hall' },
  { id: 'e3', title: 'Fall Art Exhibition', date: '2023-11-02', type: 'Event', location: 'Gallery A' },
  { id: 'e4', title: 'PTA Evening Meeting', date: '2023-11-05', type: 'Event', location: 'Auditorium' },
  { id: 'e5', title: 'Math Olympiad Prelims', date: '2023-11-10', type: 'Holiday' },
  { id: 'e6', title: 'Veterans Day (Observed)', date: '2023-11-11', type: 'Holiday' },
  { id: 'e7', title: 'Science Fair Finals', date: '2023-11-15', type: 'Event', location: 'Quad' }
];

export const ADMISSIONS_FAQ = [
  { q: "When is the application deadline?", a: "For the Fall 2024 semester, applications are due by January 15, 2024." },
  { q: "Is financial aid available?", a: "Yes, we offer both merit-based and need-based financial aid. 30% of our students receive some form of assistance." },
  { q: "What is the admissions process?", a: "Our process includes an online application, entrance testing, teacher recommendations, and a student interview." }
];

export const SYSTEM_PROMPT = `You are Lumina Academy's AI Admissions Assistant. Lumina Academy is a premier private K-12 school in Sunshine Valley, CA.
Motto: "Claritate ad Excellence" (Through Clarity to Excellence). Principal: Dr. Arthur Lumis.

ADMISSIONS GUIDELINES:
- Tuition: $15,000 per year.
- Financial Aid: Available (merit and need-based). 30% of students receive aid.
- Application Deadline: January 15, 2024 for Fall 2024.
- Admissions Process: Online application, entrance testing, teacher recommendations, and student interview.
- Departments: Science & Technology (Head: Dr. Sarah Chen), Humanities (Head: Prof. James Wilson), Arts (Head: Ms. Elena Rodriguez).

Tone: Polite, professional, and encouraging. Use the school's specific data to answer questions accurately. If you don't know an answer, direct them to contact info@luminaacademy.edu.`;
