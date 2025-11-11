import { useTranslation } from 'react-i18next';
import type { GoalConfig } from '../types';
import { generateDayCells, groupDaysByWeeks, formatDateShort, isFutureDate } from '../utils/goalUtils';
import './DayGrid.css';

interface DayGridProps {
  goal: GoalConfig;
  onDayToggle: (dayNumber: number) => void;
}

export function DayGrid({ goal, onDayToggle }: DayGridProps) {
  const { t, i18n } = useTranslation();
  const dayCells = generateDayCells(goal);
  const weeks = groupDaysByWeeks(dayCells);

  const handleDayClick = (dayNumber: number, date: Date) => {
    // Nur erlauben, wenn das Datum nicht in der Zukunft liegt
    if (!isFutureDate(date)) {
      onDayToggle(dayNumber);
    }
  };

  return (
    <div className="day-grid-container">
      <h3 className="day-grid-title">{goal.name}</h3>
      <div className="weeks-grid" data-testid="weeks-grid">
        {weeks.map((week) => (
          <div key={week.weekNumber} className="week-card">
            <div className="week-label">
              <span className="week-info">
                W{week.weekNumber} • {formatDateShort(week.startDate, i18n.language)} - {formatDateShort(week.endDate, i18n.language)}
              </span>
            </div>
            <div className="week-days">
              {week.days.map((cell, index) =>
                cell ? (
                  <button
                    key={cell.dayNumber}
                    className={`day-cell ${cell.isCompleted ? 'completed' : ''} ${
                      isFutureDate(cell.date) ? 'future' : ''
                    }`}
                    onClick={() => handleDayClick(cell.dayNumber, cell.date)}
                    disabled={isFutureDate(cell.date)}
                    title={`${t('day')} ${cell.dayNumber}: ${cell.date.toLocaleDateString()}`}
                    aria-label={`${t('day')} ${cell.dayNumber}`}
                    data-day={cell.dayNumber}
                  />
                ) : (
                  <div key={`empty-${index}`} className="day-cell empty" />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
