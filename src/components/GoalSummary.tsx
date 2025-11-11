import { useTranslation } from 'react-i18next';
import type { GoalConfig } from '../types';
import { convertToTotalDays, calculateProgress } from '../utils/goalUtils';
import './GoalSummary.css';

interface GoalSummaryProps {
  goal: GoalConfig;
}

export function GoalSummary({ goal }: GoalSummaryProps) {
  const { t } = useTranslation();
  const totalDays = convertToTotalDays(goal.duration, goal.unit);
  const completedCount = goal.completedDays.size;
  const remainingCount = totalDays - completedCount;
  const progress = calculateProgress(goal);

  return (
    <div className="goal-summary">
      <h4>{t('goal_summary')}</h4>
      <div className="summary-stats">
        <div className="stat">
          <span className="label">{t('total_days')}:</span>
          <span className="value">{totalDays}</span>
        </div>
        <div className="stat">
          <span className="label">{t('completed')}:</span>
          <span className="value">{completedCount}</span>
        </div>
        <div className="stat">
          <span className="label">{t('remaining')}:</span>
          <span className="value">{remainingCount}</span>
        </div>
        <div className="stat">
          <span className="label">{t('progress')}:</span>
          <span className="value">{progress}%</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
