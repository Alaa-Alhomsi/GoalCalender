import type { TimeUnit, GoalConfig, DayCell } from '../types';

/**
 * Konvertiert eine Dauer in eine Zeiteinheit in Tage um
 */
export function convertToTotalDays(duration: number, unit: TimeUnit): number {
  switch (unit) {
    case 'days':
      return duration;
    case 'weeks':
      return duration * 7;
    case 'months':
      // Durchschnittlich 30,44 Tage pro Monat
      return Math.round(duration * 30.44);
    default:
      return duration;
  }
}

/**
 * Generiert ein Array von DayCell-Objekten für ein Ziel
 */
export function generateDayCells(goal: GoalConfig): DayCell[] {
  const totalDays = convertToTotalDays(goal.duration, goal.unit);
  const cells: DayCell[] = [];

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(goal.startDate);
    date.setDate(date.getDate() + i - 1);

    cells.push({
      dayNumber: i,
      isCompleted: goal.completedDays.has(i),
      date,
    });
  }

  return cells;
}

/**
 * Berechnet den Fortschritt eines Ziels in Prozent
 */
export function calculateProgress(goal: GoalConfig): number {
  const totalDays = convertToTotalDays(goal.duration, goal.unit);
  return Math.round((goal.completedDays.size / totalDays) * 100);
}

/**
 * Gruppiert DayCells nach Wochen für die Anzeige
 * Wochen beginnen immer am Montag, aber können teilweise leer sein
 * wenn die Aktion nicht am Montag startet
 */
export interface WeekGroup {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  days: (DayCell | null)[];
}

export function groupDaysByWeeks(dayCells: DayCell[]): WeekGroup[] {
  if (dayCells.length === 0) return [];

  const weeks: WeekGroup[] = [];
  const firstDay = new Date(dayCells[0].date);
  const lastDay = new Date(dayCells[dayCells.length - 1].date);

  // Finde den ersten Montag am oder vor dem Startdatum
  const firstMondayDate = new Date(firstDay);
  const dayOfWeek = firstMondayDate.getDay(); // 0 = Sonntag, 1 = Montag, etc.
  const daysToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
  firstMondayDate.setDate(firstMondayDate.getDate() + daysToMonday);

  // Finde den letzten Sonntag nach dem Enddatum
  const lastSundayDate = new Date(lastDay);
  const lastDayOfWeek = lastSundayDate.getDay();
  const daysToSunday = (lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek);
  lastSundayDate.setDate(lastSundayDate.getDate() + daysToSunday);

  // Erstelle eine Map der dayCells für schnellen Zugriff
  const dayCellMap = new Map<string, DayCell>();
  dayCells.forEach((cell) => {
    const dateKey = formatDate(cell.date);
    dayCellMap.set(dateKey, cell);
  });

  // Iteriere durch alle Wochen vom ersten Montag bis zum letzten Sonntag
  const currentMondayDate = new Date(firstMondayDate);
  let weekNumber = 1;

  while (currentMondayDate <= lastSundayDate) {
    const weekStart = new Date(currentMondayDate);
    const weekEnd = new Date(currentMondayDate);
    weekEnd.setDate(weekEnd.getDate() + 6); // Sonntag

    const weekDays: (DayCell | null)[] = [];

    // Füge die 7 Tage der Woche hinzu (oder null, wenn außerhalb des Aktionszeitraums)
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(weekStart);
      dayDate.setDate(dayDate.getDate() + i);
      const dateKey = formatDate(dayDate);

      const dayCell = dayCellMap.get(dateKey);
      if (dayCell) {
        weekDays.push(dayCell);
      } else {
        // Null für Tage außerhalb des Aktionszeitraums
        weekDays.push(null);
      }
    }

    // Nur Wochen hinzufügen, die mindestens einen Tag aus der Aktion haben
    if (weekDays.some((day) => day !== null)) {
      weeks.push({
        weekNumber,
        startDate: new Date(weekStart),
        endDate: new Date(weekEnd),
        days: weekDays,
      });
      weekNumber++;
    }

    // Gehe zur nächsten Woche (nächster Montag)
    currentMondayDate.setDate(currentMondayDate.getDate() + 7);
  }

  return weeks;
}

/**
 * Formatiert ein Datum kurz (DD.MM.YYYY)
 */
export function formatDateShort(date: Date, locale: string = 'de-DE'): string {
  return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Prüft, ob ein Datum in der Zukunft liegt (nach heute)
 */
export function isFutureDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate > today;
}

/**
 * Formatiert ein Datum als Zeichenkette (YYYY-MM-DD)
 * Immer in diesem Format für HTML input type="date"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formatiert ein Datum für die UI je nach Sprache
 * Deutsch: DD.MM.YYYY
 * Englisch: MM/DD/YYYY
 */
export function formatDateForDisplay(date: Date, locale: string = 'de-DE'): string {
  if (locale === 'de' || locale === 'de-DE') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  }
}

/**
 * Konvertiert eine Zeichenkette in ein Datum (YYYY-MM-DD)
 */
export function parseDate(dateString: string): Date {
  return new Date(dateString + 'T00:00:00');
}

/**
 * Speichert Ziele im localStorage
 */
export function saveGoals(goals: GoalConfig[]): void {
  const serialized = goals.map((goal) => ({
    ...goal,
    startDate: formatDate(goal.startDate),
    completedDays: Array.from(goal.completedDays),
  }));
  localStorage.setItem('goals', JSON.stringify(serialized));
}

/**
 * Lädt Ziele aus dem localStorage
 */
export function loadGoals(): GoalConfig[] {
  const stored = localStorage.getItem('goals');
  if (!stored) return [];

  interface SerializedGoal {
    name: string;
    duration: number;
    unit: TimeUnit;
    startDate: string;
    completedDays: number[];
  }

  const parsed: SerializedGoal[] = JSON.parse(stored);
  return parsed.map((goal) => ({
    ...goal,
    startDate: parseDate(goal.startDate),
    completedDays: new Set(goal.completedDays),
  }));
}
