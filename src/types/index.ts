export type TimeUnit = 'days' | 'weeks' | 'months';

export interface GoalConfig {
  name: string;
  duration: number;
  unit: TimeUnit;
  startDate: Date;
  completedDays: Set<number>;
}

export interface DayCell {
  dayNumber: number;
  isCompleted: boolean;
  date: Date;
}

export interface DayCellWithOptional extends Partial<DayCell> {
  date: Date;
  dayNumber?: number;
  isCompleted?: boolean;
}

export type LocaleCode = 'en' | 'de' | 'fr' | 'es' | 'it';
