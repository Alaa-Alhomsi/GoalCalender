import { useTranslation } from 'react-i18next';
import type { GoalConfig } from '../types';
import { DayGrid } from './DayGrid';
import { GoalSummary } from './GoalSummary';
import './GoalList.css';

interface GoalListProps {
  goals: GoalConfig[];
  onDayToggle: (goalIndex: number, dayNumber: number) => void;
  onDeleteGoal: (goalIndex: number) => void;
}

export function GoalList({ goals, onDayToggle, onDeleteGoal }: GoalListProps) {
  const { t } = useTranslation();

  if (goals.length === 0) {
    return <div className="no-goals-message">{t('no_goals')}</div>;
  }

  return (
    <div className="goal-list">
      {goals.map((goal, index) => (
        <div key={index} className="goal-item">
          <div className="goal-header">
            <h2>{goal.name}</h2>
            <button
              className="btn btn-danger btn-small"
              onClick={() => onDeleteGoal(index)}
              title={t('delete_goal')}
            >
              ×
            </button>
          </div>
          <GoalSummary goal={goal} />
          <DayGrid goal={goal} onDayToggle={(day) => onDayToggle(index, day)} />
        </div>
      ))}
    </div>
  );
}
