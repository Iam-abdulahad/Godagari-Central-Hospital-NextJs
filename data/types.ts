export type Day = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";

export const ALL_DAYS: Day[] = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

export const DAY_LABELS: Record<Day, string> = {
  sat: "Sat",
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
};

export const DAY_LABELS_SHORT: Record<Day, string> = {
  sat: "S",
  sun: "S",
  mon: "M",
  tue: "T",
  wed: "W",
  thu: "T",
  fri: "F",
};

export interface Department {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  services?: string[];
  timing?: string;
}

export interface DoctorSchedule {
  day: Day;
  from: string; // "17:00"
  to: string;   // "21:00"
}

export interface Doctor {
  slug: string;
  name: string;
  degrees: string;
  departmentSlug: string;
  designation: string;
  photo?: string;
  schedule: DoctorSchedule[];
  room?: string;
  fee?: number;
  phone?: string;
  isDemo: boolean;
}

export interface Service {
  slug: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
}

export interface Facility {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface DiagnosticTest {
  name: string;
  category: string;
  price: number;
}

export interface Notice {
  slug: string;
  title: string;
  date: string; // ISO string
  category: "Notice" | "Health Camp" | "Holiday" | "Job" | "Announcement" | "Update";
  body: string;
  pinned?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}
