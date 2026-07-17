import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

type OpeningHoursGroup = NonNullable<NonNullable<SITE_SETTINGS_QUERY_RESULT>["openingHours"]>[number];

const DAY_ORDER = ["man", "tir", "ons", "tor", "fre", "lor", "son"] as const;
type DayCode = (typeof DAY_ORDER)[number];

const DAY_SHORT: Record<DayCode, string> = {
  man: "man",
  tir: "tir",
  ons: "ons",
  tor: "tor",
  fre: "fre",
  lor: "lør",
  son: "søn",
};

const DAY_LONG: Record<DayCode, string> = {
  man: "mandag",
  tir: "tirsdag",
  ons: "onsdag",
  tor: "torsdag",
  fre: "fredag",
  lor: "lørdag",
  son: "søndag",
};

const DAY_SCHEMA_ORG: Record<DayCode, string> = {
  man: "Monday",
  tir: "Tuesday",
  ons: "Wednesday",
  tor: "Thursday",
  fre: "Friday",
  lor: "Saturday",
  son: "Sunday",
};

function sortDays(days: string[]): DayCode[] {
  return DAY_ORDER.filter((day) => days.includes(day));
}

function dayRangeLabel(days: DayCode[], labels: Record<DayCode, string>): string {
  if (days.length <= 1) return days.map((day) => labels[day]).join("");
  const indices = days.map((day) => DAY_ORDER.indexOf(day));
  const isContiguous = indices.every((index, position) => position === 0 || index === indices[position - 1] + 1);
  return isContiguous
    ? `${labels[days[0]]}–${labels[days.at(-1)!]}`
    : days.map((day) => labels[day]).join(", ");
}

// "15:00" -> "15", "09:00" -> "9", "15:30" -> "15:30"
function shortTime(time: string): string {
  const [hour, minute] = time.split(":");
  return minute === "00" ? String(Number(hour)) : `${Number(hour)}:${minute}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function validGroups(groups: OpeningHoursGroup[] | null | undefined) {
  return (groups ?? []).flatMap((group) => {
    const days = sortDays(group.days ?? []);
    if (days.length === 0 || !group.opens || !group.closes) return [];
    return [{ days, opens: group.opens, closes: group.closes }];
  });
}

/** "man–lør 15–22, søn 12–22" — used in the hero. */
export function formatOpeningHoursCompact(groups: OpeningHoursGroup[] | null | undefined): string | undefined {
  const parsed = validGroups(groups);
  if (parsed.length === 0) return undefined;
  return parsed
    .map((group) => `${dayRangeLabel(group.days, DAY_SHORT)} ${shortTime(group.opens)}–${shortTime(group.closes)}`)
    .join(", ");
}

/** ["Mandag–lørdag 15:00–22:00", "Søndag 12:00–22:00"] — one line per group, used in the contact section. */
export function formatOpeningHoursLines(groups: OpeningHoursGroup[] | null | undefined): string[] {
  return validGroups(groups).map(
    (group) => `${capitalize(dayRangeLabel(group.days, DAY_LONG))} ${group.opens}–${group.closes}`,
  );
}

/** schema.org OpeningHoursSpecification entries for the Restaurant JSON-LD. */
export function toOpeningHoursSpecification(groups: OpeningHoursGroup[] | null | undefined) {
  const parsed = validGroups(groups);
  if (parsed.length === 0) return;
  return parsed.map((group) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: group.days.map((day) => DAY_SCHEMA_ORG[day]),
    opens: group.opens,
    closes: group.closes,
  }));
}
