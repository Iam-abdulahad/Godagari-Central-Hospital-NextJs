import { Day, ALL_DAYS, DAY_LABELS } from "@/data/types";

/**
 * Get the current day in Asia/Dhaka timezone as our Day type.
 */
export function getTodayInDhaka(): Day {
  const now = new Date();
  const dhakaStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "Asia/Dhaka",
  });
  const map: Record<string, Day> = {
    Sat: "sat",
    Sun: "sun",
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
  };
  return map[dhakaStr] ?? "sat";
}

/**
 * Get current hour in Dhaka timezone (0-23)
 */
export function getCurrentHourInDhaka(): number {
  const now = new Date();
  const hour = parseInt(
    now.toLocaleString("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Dhaka",
    }),
    10
  );
  return hour;
}

/**
 * Check if OPD is currently open (9 AM - 9 PM daily)
 */
export function isOpdOpen(): boolean {
  const hour = getCurrentHourInDhaka();
  return hour >= 9 && hour < 21;
}

/**
 * Check if a doctor is available on a specific day.
 */
export function isDoctorAvailableOnDay(
  schedule: { day: Day }[],
  day: Day
): boolean {
  return schedule.some((s) => s.day === day);
}

/**
 * Check if a doctor is available today (Dhaka time).
 */
export function isDoctorAvailableToday(
  schedule: { day: Day }[]
): boolean {
  const today = getTodayInDhaka();
  return isDoctorAvailableOnDay(schedule, today);
}

/**
 * Get doctor's schedule formatted for a given day
 */
export function getDoctorTimeForDay(
  schedule: { day: Day; from: string; to: string }[],
  day: Day
): string | null {
  const entry = schedule.find((s) => s.day === day);
  if (!entry) return null;
  return `${formatTime(entry.from)} – ${formatTime(entry.to)}`;
}

/**
 * Format 24h time string to 12h format
 * "17:00" → "5:00 PM"
 */
export function formatTime(time24: string): string {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || "00";
  const period = hour >= 12 ? "PM" : "AM";
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${period}`;
}

/**
 * Get day labels for a doctor's schedule
 */
export function getAvailableDayLabels(
  schedule: { day: Day }[]
): string {
  return schedule
    .map((s) => DAY_LABELS[s.day])
    .join(", ");
}

/**
 * Get available days as an array
 */
export function getAvailableDays(
  schedule: { day: Day }[]
): Day[] {
  return ALL_DAYS.filter((d) => schedule.some((s) => s.day === d));
}

/**
 * Generate WhatsApp URL with prefilled message
 */
export function getWhatsAppUrl(
  phone: string,
  message: string
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate initials from a name (for avatar fallback)
 * "Dr. Rahim Ahmed (Demo)" → "RA"
 */
export function getInitials(name: string): string {
  const cleaned = name
    .replace(/^Dr\.?\s*/i, "")
    .replace(/\s*\(Demo\)\s*/i, "")
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.substring(0, 2).toUpperCase();
}

/**
 * Utility to join class names
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Get the JS Date day index for our Day type (used for date picker)
 * JavaScript: 0 = Sunday, 6 = Saturday
 */
export function dayToJsDay(day: Day): number {
  const map: Record<Day, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };
  return map[day];
}
