import { onValue, ref, set, type Unsubscribe } from "firebase/database";

import { firebaseEnabled, getFirebaseRtdb } from "@/lib/firebase";

export type VerificationStatus = "Verified Institution" | "Pending Review";

export type StudentStatus = "Valid Student" | "Suspended" | "Graduated";

export interface SchoolRecord {
  id: string;
  schoolCode: string;
  schoolSerialNumber: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  schoolName: string;
  eiinNumber: string;
  logo: string;
  address: string;
  principal: string;
  phone: string;
  district: string;
  division: string;
  students: number;
  teachers: number;
  achievements: string[];
  competitionRankings: string[];
  gallery: string[];
  about: string;
}

export interface StudentRecord {
  id: string;
  schoolId: string;
  schoolCode: string;
  schoolName: string;
  fullName: string;
  photo: string;
  classLevel: number;
  section: string;
  roll: string;
  studentId: string;
  bloodGroup: string;
  contact: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  status: StudentStatus;
  achievements: string[];
  competitionHistory: string[];
  academicRecords: Array<{ term: string; gpa: string; remark: string }>;
}

export interface CompetitionRecord {
  id: string;
  category:
    | "Quiz Battles"
    | "Debate Battles"
    | "Olympiads"
    | "Coding Competitions"
    | "Science Fair Arena";
  title: string;
  description: string;
  schoolA: string;
  schoolB: string;
  status: "Live" | "Upcoming" | "Judging" | "Completed";
  scoreboard: { left: number; right: number };
  judgeScore: number;
  participants: number;
}

export interface SocialPost {
  id: string;
  author: string;
  authorRole: "Student" | "Teacher" | "School";
  schoolName: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  replies: number;
}

export interface LibraryItem {
  id: string;
  category: string;
  title: string;
  level: string;
  format: "Book" | "Audio" | "Model" | "Lab";
  description: string;
  accent: string;
}

export interface LibraryAsset {
  id: string;
  title: string;
  kind: "PDF" | "Note" | "Audio" | "Novel" | "AR Model";
  subject: string;
  shelf: "left" | "middle" | "right";
  url: string;
  uploadedBy: string;
  uploadedAt: number;
  description: string;
}

export interface SearchResult {
  type: "School" | "Student" | "Book" | "Competition" | "Teacher" | "Note" | "Project";
  title: string;
  subtitle: string;
  href: string;
  score: number;
}

const STORAGE_KEYS = {
  schools: "epathshala:ecosystem:schools",
  students: "epathshala:ecosystem:students",
  competitions: "epathshala:ecosystem:competitions",
  posts: "epathshala:ecosystem:posts",
  library: "epathshala:ecosystem:library",
} as const;

const RTDB_KEYS = {
  schools: "epathshala/ecosystem/schools",
  students: "epathshala/ecosystem/students",
  competitions: "epathshala/ecosystem/competitions",
  posts: "epathshala/ecosystem/posts",
  library: "epathshala/ecosystem/library",
} as const;

const DEFAULT_PUBLIC_APP_ORIGIN = "https://e-pathshalaa.vercel.app";

type CollectionKey = keyof typeof STORAGE_KEYS;
const rtdbUnsubscribers = new Map<CollectionKey, Unsubscribe>();

const seedSchools: SchoolRecord[] = [
  {
    id: "school-kachua",
    schoolCode: "EP-2026-001245",
    schoolSerialNumber: "SCH-0001",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "Kachua Govt. Pilot High School",
    eiinNumber: "109876",
    logo: "🏫",
    address: "Kachua, Chandpur, Bangladesh",
    principal: "Prof. A. K. M. Hasan",
    phone: "+880-2-9000123",
    district: "Chandpur",
    division: "Chattogram",
    students: 3421,
    teachers: 156,
    achievements: [
      "National Olympiad top-10",
      "3 consecutive debate titles",
      "Best digital school 2026",
    ],
    competitionRankings: ["Top Schools #1", "Top Debaters #2", "Top Quiz Masters #4"],
    gallery: ["Innovation Week", "Science Fair", "Debate Finals", "Library Night"],
    about:
      "A flagship model for Bangladesh digital education with strong academics, competitions, and student leadership.",
  },
  {
    id: "school-chandpur",
    schoolCode: "EP-2026-000882",
    schoolSerialNumber: "SCH-0002",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "Chandpur Hasan Ali Govt. Boys School",
    eiinNumber: "112233",
    logo: "🧪",
    address: "Chandpur Sadar, Chandpur, Bangladesh",
    principal: "Dr. Salma Rahman",
    phone: "+880-2-55550123",
    district: "Chandpur",
    division: "Chattogram",
    students: 2190,
    teachers: 121,
    achievements: ["Science fair champions", "Top coding school", "STEM leadership award"],
    competitionRankings: ["Top Innovators #1", "Top Coders #3"],
    gallery: ["Lab Expo", "Coding Camp", "Robotics Club", "Poster Day"],
    about: "A STEM-first school profile built for science, coding, and project-based learning.",
  },
  {
    id: "school-matripith",
    schoolCode: "EP-2026-004521",
    schoolSerialNumber: "SCH-0003",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "Matripith Ucchya Biddyaloy",
    eiinNumber: "145678",
    logo: "🌳",
    address: "Cumilla, Bangladesh",
    principal: "Col. Farhana Akter",
    phone: "+880-521-123456",
    district: "Cumilla",
    division: "Chattogram",
    students: 1840,
    teachers: 98,
    achievements: ["Regional quiz finalists", "Library growth award"],
    competitionRankings: ["Top Schools #9"],
    gallery: ["Campus Walk", "Quiz Arena", "Library"],
    about: "A regional school profile pending official ecosystem verification.",
  },
  {
    id: "school-haziganj",
    schoolCode: "EP-2026-008214",
    schoolSerialNumber: "SCH-0004",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "Haziganj Govt. Pilot School",
    eiinNumber: "167890",
    logo: "🎓",
    address: "Haziganj, Chandpur, Bangladesh",
    principal: "Mr. Rafiqul Islam",
    phone: "+880-481-123456",
    district: "Chandpur",
    division: "Chattogram",
    students: 1965,
    teachers: 104,
    achievements: ["District quiz champions", "Digital classroom excellence"],
    competitionRankings: ["Top Schools #6"],
    gallery: ["Assembly", "Library", "Lab"],
    about: "A modern government school with strong participation in education and competitions.",
  },
];

const seedStudents: StudentRecord[] = [
  {
    id: "EP-STU-260001",
    schoolId: "school-kachua",
    schoolCode: "EP-2026-001245",
    schoolName: "Kachua Govt. Pilot High School",
    fullName: "Fahim Hasan",
    photo: "🧑‍🎓",
    classLevel: 8,
    section: "A",
    roll: "14",
    studentId: "EP-STU-260001",
    bloodGroup: "B+",
    contact: "01711-123456",
    guardianName: "Mr. Kamrul Hasan",
    guardianRelation: "Father",
    guardianPhone: "01911-123456",
    status: "Valid Student",
    achievements: ["Science quiz finalist", "7-day streak", "Debate team"],
    competitionHistory: ["Quiz Battles", "District Olympiad", "Debate Battle"],
    academicRecords: [
      { term: "Mid-term", gpa: "5.00", remark: "Excellent" },
      { term: "Terminal", gpa: "4.93", remark: "Strong performance" },
    ],
  },
  {
    id: "EP-STU-260002",
    schoolId: "school-kachua",
    schoolCode: "EP-2026-001245",
    schoolName: "Kachua Govt. Pilot High School",
    fullName: "Nafisa Rahman",
    photo: "👩‍🎓",
    classLevel: 10,
    section: "B",
    roll: "07",
    studentId: "EP-STU-260002",
    bloodGroup: "O+",
    contact: "01811-998877",
    guardianName: "Mrs. Jahanara Rahman",
    guardianRelation: "Mother",
    guardianPhone: "01711-998877",
    status: "Valid Student",
    achievements: ["Top coder", "Science fair medal"],
    competitionHistory: ["Coding Competition", "Science Fair Arena"],
    academicRecords: [
      { term: "Mid-term", gpa: "4.98", remark: "Outstanding" },
      { term: "Terminal", gpa: "5.00", remark: "Honor roll" },
    ],
  },
  {
    id: "EP-STU-260003",
    schoolId: "school-kachua",
    schoolCode: "EP-2026-001245",
    schoolName: "Kachua Govt. Pilot High School",
    fullName: "Sabbir Hossain",
    photo: "🧑‍🔬",
    classLevel: 9,
    section: "C",
    roll: "03",
    studentId: "EP-STU-260003",
    bloodGroup: "A+",
    contact: "01611-554433",
    guardianName: "Mr. Anwar Hossain",
    guardianRelation: "Father",
    guardianPhone: "01711-554433",
    status: "Suspended",
    achievements: ["Laboratory project"],
    competitionHistory: ["Olympiad qualifier"],
    academicRecords: [{ term: "Mid-term", gpa: "4.30", remark: "Needs review" }],
  },
];

const seedCompetitions: CompetitionRecord[] = [
  {
    id: "comp-quiz-01",
    category: "Quiz Battles",
    title: "School A vs School B: National Quiz Night",
    description: "Real-time scoreboard with fast question rounds and team ranking.",
    schoolA: "Kachua Govt. Pilot High School",
    schoolB: "Chandpur Hasan Ali Govt. Boys School",
    status: "Live",
    scoreboard: { left: 420, right: 390 },
    judgeScore: 92,
    participants: 48,
  },
  {
    id: "comp-debate-01",
    category: "Debate Battles",
    title: "Climate Action Youth Debate",
    description: "Topic announcement, team registration, video submission, and judge scoring.",
    schoolA: "Matripith Ucchya Biddyaloy",
    schoolB: "Kachua Govt. Pilot High School",
    status: "Judging",
    scoreboard: { left: 78, right: 84 },
    judgeScore: 89,
    participants: 16,
  },
  {
    id: "comp-science-01",
    category: "Science Fair Arena",
    title: "Virtual Science Fair Arena",
    description: "Project uploads, visitor votes, and AI support for evaluation.",
    schoolA: "Chandpur Hasan Ali Govt. Boys School",
    schoolB: "Haziganj Govt. Pilot School",
    status: "Upcoming",
    scoreboard: { left: 0, right: 0 },
    judgeScore: 0,
    participants: 72,
  },
];

const seedPosts: SocialPost[] = [
  {
    id: "post-01",
    author: "Fahim Hasan",
    authorRole: "Student",
    schoolName: "Kachua Govt. Pilot High School",
    title: "Uploaded my class 8 science note",
    body: "Shared a short note with diagrams for the water cycle and some revision questions.",
    tags: ["#science", "#notes", "#class8"],
    likes: 124,
    replies: 18,
  },
  {
    id: "post-02",
    author: "Prof. A. K. M. Hasan",
    authorRole: "Teacher",
    schoolName: "Kachua Govt. Pilot High School",
    title: "New debate topic announced",
    body: "The motion this week is about digital learning improving rural access.",
    tags: ["#debate", "#digital", "#school"],
    likes: 88,
    replies: 11,
  },
  {
    id: "post-03",
    author: "Chandpur Hasan Ali Govt. Boys School",
    authorRole: "School",
    schoolName: "Chandpur Hasan Ali Govt. Boys School",
    title: "Robotics team shortlisted",
    body: "Our junior robotics team will represent the school in the national innovation challenge.",
    tags: ["#robotics", "#innovation", "#stem"],
    likes: 203,
    replies: 29,
  },
];

const seedLibraryAssets: LibraryAsset[] = [
  {
    id: "asset-1",
    title: "Class 6 Mathematics PDF",
    kind: "PDF",
    subject: "গণিত",
    shelf: "left",
    url: "https://example.com/class-6-math.pdf",
    uploadedBy: "Admin",
    uploadedAt: Date.now(),
    description: "Printable textbook on the left shelf.",
  },
  {
    id: "asset-2",
    title: "Bangla Note - Grammar",
    kind: "Note",
    subject: "বাংলা",
    shelf: "left",
    url: "https://example.com/bangla-note",
    uploadedBy: "Teacher",
    uploadedAt: Date.now(),
    description: "Revision note for the note shelf.",
  },
  {
    id: "asset-3",
    title: "Audio Story - Shonar Tori",
    kind: "Audio",
    subject: "বাংলা",
    shelf: "middle",
    url: "https://example.com/audio-story.mp3",
    uploadedBy: "Librarian",
    uploadedAt: Date.now(),
    description: "Middle shelf audio experience.",
  },
  {
    id: "asset-4",
    title: "Nolok Novel Starter",
    kind: "Novel",
    subject: "সাহিত্য",
    shelf: "middle",
    url: "https://example.com/novel",
    uploadedBy: "Library",
    uploadedAt: Date.now(),
    description: "Novels shelf for slow reading.",
  },
  {
    id: "asset-5",
    title: "AR Heart Model",
    kind: "AR Model",
    subject: "বিজ্ঞান",
    shelf: "right",
    url: "https://example.com/heart-model.glb",
    uploadedBy: "STEM Team",
    uploadedAt: Date.now(),
    description: "3D AR model to place on the right shelf.",
  },
];

export const libraryItems: LibraryItem[] = [
  {
    id: "lib-text-1",
    category: "Textbooks",
    title: "Class 1-12 National Textbooks",
    level: "Primary to HSC",
    format: "Book",
    description: "Quick search across class, subject, and edition with one-tap reading.",
    accent: "from-amber-200 via-amber-100 to-white",
  },
  {
    id: "lib-bank-1",
    category: "Question Banks",
    title: "SSC and HSC Exam Banks",
    level: "Board prep",
    format: "Book",
    description: "Practice sets grouped by exam, year, and difficulty.",
    accent: "from-sky-200 via-cyan-100 to-white",
  },
  {
    id: "lib-novel-1",
    category: "Novels",
    title: "Bangla and English Story Shelf",
    level: "Reading club",
    format: "Audio",
    description: "Beginner-friendly novels with audiobook playback.",
    accent: "from-rose-200 via-pink-100 to-white",
  },
  {
    id: "lib-science-1",
    category: "Virtual Labs",
    title: "Interactive Science Labs",
    level: "Class 6-10",
    format: "Lab",
    description: "Animated experiments and 3D-ready lessons.",
    accent: "from-emerald-200 via-green-100 to-white",
  },
  {
    id: "lib-3d-1",
    category: "3D Models",
    title: "AR Learning Models",
    level: "Future classroom",
    format: "Model",
    description: "Rotate, inspect, and explore curriculum concepts in 3D.",
    accent: "from-violet-200 via-fuchsia-100 to-white",
  },
  {
    id: "lib-audio-1",
    category: "Audiobooks",
    title: "Bangla Audiobook Reader",
    level: "Everyday reading",
    format: "Audio",
    description: "Play books directly while students read along.",
    accent: "from-indigo-200 via-blue-100 to-white",
  },
];

const isBrowser = () => typeof window !== "undefined";

function readCollection<T>(key: string, fallback: T[]) {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeCollection<T>(value: unknown, fallback: T[]) {
  if (Array.isArray(value))
    return value.filter((item): item is T => item !== null && item !== undefined);
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, T>).filter(
      (item): item is T => item !== null && item !== undefined,
    );
  }
  return fallback;
}

function writeCollection<T>(key: string, value: T[]) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(key));
}

function writeRemoteCollection<T>(key: CollectionKey, value: T[]) {
  if (!firebaseEnabled || !isBrowser()) return;
  const rtdb = getFirebaseRtdb();
  if (!rtdb) return;
  void set(ref(rtdb, RTDB_KEYS[key]), value).catch(() => {});
}

function seedCollection<T>(key: string, fallback: T[]) {
  if (!isBrowser()) return fallback;
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return readCollection<T>(key, fallback);
}

function subscribeCollection<T>(key: CollectionKey, fallback: T[], onChange: (value: T[]) => void) {
  if (!isBrowser()) {
    onChange(fallback);
    return () => {};
  }

  const next = seedCollection(STORAGE_KEYS[key], fallback);
  onChange(next);

  const listener = () => onChange(readCollection<T>(STORAGE_KEYS[key], fallback));
  window.addEventListener(STORAGE_KEYS[key], listener);
  window.addEventListener("storage", listener);

  if (firebaseEnabled && !rtdbUnsubscribers.has(key)) {
    const rtdb = getFirebaseRtdb();
    if (rtdb) {
      const collectionRef = ref(rtdb, RTDB_KEYS[key]);
      const unsub = onValue(
        collectionRef,
        (snapshot) => {
          const remote = snapshot.exists()
            ? normalizeCollection<T>(snapshot.val(), fallback)
            : fallback;
          writeCollection(STORAGE_KEYS[key], remote);
          onChange(remote);
          if (!snapshot.exists()) {
            void set(collectionRef, fallback).catch(() => {});
          }
        },
        () => {
          onChange(readCollection<T>(STORAGE_KEYS[key], fallback));
        },
      );
      rtdbUnsubscribers.set(key, unsub);
    }
  }

  return () => {
    window.removeEventListener(STORAGE_KEYS[key], listener);
    window.removeEventListener("storage", listener);
    const unsub = rtdbUnsubscribers.get(key);
    if (unsub) {
      unsub();
      rtdbUnsubscribers.delete(key);
    }
  };
}

export function ensureEcosystemSeed() {
  if (!isBrowser()) return;
  seedCollection(STORAGE_KEYS.schools, seedSchools);
  seedCollection(STORAGE_KEYS.students, seedStudents);
  seedCollection(STORAGE_KEYS.competitions, seedCompetitions);
  seedCollection(STORAGE_KEYS.posts, seedPosts);
  seedCollection(STORAGE_KEYS.library, seedLibraryAssets);
}

export function listenSchools(onChange: (schools: SchoolRecord[]) => void) {
  return subscribeCollection("schools", seedSchools, onChange);
}

export function listenStudents(onChange: (students: StudentRecord[]) => void) {
  return subscribeCollection("students", seedStudents, onChange);
}

export function listenCompetitions(onChange: (competitions: CompetitionRecord[]) => void) {
  return subscribeCollection("competitions", seedCompetitions, onChange);
}

export function listenSocialPosts(onChange: (posts: SocialPost[]) => void) {
  return subscribeCollection("posts", seedPosts, onChange);
}

export function listenLibraryAssets(onChange: (assets: LibraryAsset[]) => void) {
  return subscribeCollection("library", seedLibraryAssets, onChange);
}

export function getSchools() {
  return seedCollection(STORAGE_KEYS.schools, seedSchools);
}

export function getStudents() {
  return seedCollection(STORAGE_KEYS.students, seedStudents);
}

export function getCompetitions() {
  return seedCollection(STORAGE_KEYS.competitions, seedCompetitions);
}

export function getSocialPosts() {
  return seedCollection(STORAGE_KEYS.posts, seedPosts);
}

export function getLibraryAssets() {
  return seedCollection(STORAGE_KEYS.library, seedLibraryAssets);
}

export function getSchoolByCode(schoolCode: string) {
  return (
    getSchools().find((school) => school.schoolCode === schoolCode || school.id === schoolCode) ??
    null
  );
}

export function getSchoolById(id: string) {
  return getSchools().find((school) => school.id === id) ?? null;
}

export function getStudentById(id: string) {
  return getStudents().find((student) => student.studentId === id || student.id === id) ?? null;
}

export function getStudentsBySchool(schoolId: string) {
  return getStudents().filter((student) => student.schoolId === schoolId);
}

export function saveSchool(record: SchoolRecord) {
  const schools = getSchools();
  const index = schools.findIndex(
    (school) => school.id === record.id || school.schoolCode === record.schoolCode,
  );
  if (index >= 0) schools[index] = record;
  else schools.unshift(record);
  writeCollection(STORAGE_KEYS.schools, schools);
  writeRemoteCollection("schools", schools);
  return record;
}

export function saveStudent(record: StudentRecord) {
  const students = getStudents();
  const index = students.findIndex(
    (student) => student.id === record.id || student.studentId === record.studentId,
  );
  if (index >= 0) students[index] = record;
  else students.unshift(record);
  writeCollection(STORAGE_KEYS.students, students);
  writeRemoteCollection("students", students);
  return record;
}

export function saveCompetition(record: CompetitionRecord) {
  const competitions = getCompetitions();
  const index = competitions.findIndex((competition) => competition.id === record.id);
  if (index >= 0) competitions[index] = record;
  else competitions.unshift(record);
  writeCollection(STORAGE_KEYS.competitions, competitions);
  writeRemoteCollection("competitions", competitions);
  return record;
}

export function savePost(record: SocialPost) {
  const posts = getSocialPosts();
  const index = posts.findIndex((post) => post.id === record.id);
  if (index >= 0) posts[index] = record;
  else posts.unshift(record);
  writeCollection(STORAGE_KEYS.posts, posts);
  writeRemoteCollection("posts", posts);
  return record;
}

export function saveLibraryAsset(record: LibraryAsset) {
  const assets = getLibraryAssets();
  const index = assets.findIndex((asset) => asset.id === record.id);
  if (index >= 0) assets[index] = record;
  else assets.unshift(record);
  writeCollection(STORAGE_KEYS.library, assets);
  writeRemoteCollection("library", assets);
  return record;
}

export function createSchoolCode() {
  const number = Math.floor(100000 + Math.random() * 900000);
  return `EP-2026-${String(number).padStart(6, "0")}`;
}

export function createSchoolSerialNumber() {
  return `SCH-${String(Math.floor(1 + Math.random() * 9999)).padStart(4, "0")}`;
}

export function createStudentId() {
  return `EP-STU-${String(Math.floor(100000 + Math.random() * 900000))}`;
}

export function createIdCardUrl(studentId: string) {
  return createAppUrl(`/students/${encodeURIComponent(studentId)}`);
}

export function createVerificationUrl(studentId: string) {
  return createAppUrl(`/students/${encodeURIComponent(studentId)}`);
}

export function createAppUrl(pathname: string) {
  const configured =
    (isBrowser()
      ? import.meta.env.VITE_PUBLIC_APP_URL || import.meta.env.VITE_APP_URL
      : process.env.VITE_PUBLIC_APP_URL || process.env.VITE_APP_URL) ?? "";
  const origin = configured.replace(/\/+$/, "") || DEFAULT_PUBLIC_APP_ORIGIN;
  if (
    isBrowser() &&
    window.location?.origin &&
    !/^(localhost|127\.0\.0\.1|::1)$/i.test(window.location.hostname)
  ) {
    return new URL(pathname, window.location.origin).toString();
  }
  return new URL(pathname, origin).toString();
}

export function pseudoQrSvgDataUrl(text: string) {
  const size = 29;
  const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  const fill = (x: number, y: number, v: boolean) => {
    if (x >= 0 && y >= 0 && x < size && y < size) cells[y][x] = v;
  };
  const patterns = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  patterns.forEach(([sx, sy]) => {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6;
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        fill(sx + x, sy + y, edge || inner);
      }
    }
  });
  for (let y = 8; y < size - 8; y += 1) {
    for (let x = 8; x < size - 8; x += 1) {
      const bit = (hash >> ((x + y) % 24)) & 1;
      fill(x, y, bit === 1 || (x * y + hash) % 11 === 0);
    }
  }

  const moduleSize = 6;
  const margin = 8;
  const dimension = size * moduleSize + margin * 2;
  const rects: string[] = [];
  cells.forEach((row, y) => {
    row.forEach((filled, x) => {
      if (!filled) return;
      rects.push(
        `<rect x="${margin + x * moduleSize}" y="${margin + y * moduleSize}" width="${moduleSize}" height="${moduleSize}" rx="1.2" fill="#111827"/>`,
      );
    });
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${dimension}" height="${dimension}" viewBox="0 0 ${dimension} ${dimension}"><rect width="100%" height="100%" fill="white"/>${rects.join("")}</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function searchCatalog(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return defaultSearchResults();

  const results: SearchResult[] = [];
  getSchools().forEach((school) => {
    const haystack =
      `${school.schoolName} ${school.schoolCode} ${school.address} ${school.district} ${school.division} ${school.about}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "School",
        title: school.schoolName,
        subtitle: `${school.schoolCode} · ${school.verificationStatus}`,
        href: `/schools/${school.id}`,
        score,
      });
    }
  });

  getStudents().forEach((student) => {
    const haystack =
      `${student.fullName} ${student.studentId} ${student.schoolName} ${student.section} ${student.roll} ${student.achievements.join(" ")}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Student",
        title: student.fullName,
        subtitle: `${student.schoolName} · Class ${student.classLevel} · Roll ${student.roll}`,
        href: `/students/${student.studentId}`,
        score,
      });
    }
  });

  libraryItems.forEach((item) => {
    const haystack =
      `${item.category} ${item.title} ${item.level} ${item.description}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Book",
        title: item.title,
        subtitle: `${item.category} · ${item.level}`,
        href: "/books",
        score,
      });
    }
  });

  getCompetitions().forEach((competition) => {
    const haystack =
      `${competition.category} ${competition.title} ${competition.description} ${competition.schoolA} ${competition.schoolB}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Competition",
        title: competition.title,
        subtitle: `${competition.category} · ${competition.status}`,
        href: "/competitions",
        score,
      });
    }
  });

  getSocialPosts().forEach((post) => {
    const haystack =
      `${post.author} ${post.title} ${post.body} ${post.tags.join(" ")}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Note",
        title: post.title,
        subtitle: `${post.author} · ${post.schoolName}`,
        href: "/classmates",
        score,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 20);
}

function scoreMatch(query: string, haystack: string) {
  if (haystack.includes(query)) return 100 + query.length;
  const terms = query.split(/\s+/).filter(Boolean);
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 15;
  }
  return score;
}

function defaultSearchResults(): SearchResult[] {
  return [
    {
      type: "School",
      title: "Kachua Govt. Pilot High School",
      subtitle: "EP-2026-001245 · Verified Institution",
      href: "/schools/school-kachua",
      score: 88,
    },
    {
      type: "Student",
      title: "Fahim Hasan",
      subtitle: "Class 8 · Roll 14",
      href: "/students/EP-STU-260001",
      score: 87,
    },
    {
      type: "Competition",
      title: "National Quiz Night",
      subtitle: "Quiz Battles · Live",
      href: "/competitions",
      score: 82,
    },
  ];
}
