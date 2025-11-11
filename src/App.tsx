import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from './contexts/useToast';
import type { GoalConfig } from './types';
import { GoalForm } from './components/GoalForm';
import { DayGrid } from './components/DayGrid';
import { GoalSummary } from './components/GoalSummary';
import { LocaleSelector } from './components/LocaleSelector';
import { ToastContainer } from './components/ToastContainer';
import { saveGoals, loadGoals } from './utils/goalUtils';
import './App.css';

function App() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [goals, setGoals] = useState<GoalConfig[]>([]);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number | null>(null);

  // Load goals from localStorage on mount
  useEffect(() => {
    const loaded = loadGoals();
    setGoals(loaded);
    if (loaded.length > 0) {
      setSelectedGoalIndex(0);
    }
  }, []);

  // Save goals to localStorage whenever they change (but not on initial render)
  useEffect(() => {
    if (goals.length > 0) {
      saveGoals(goals);
    }
  }, [goals]);

  const handleCreateGoal = (goalData: Omit<GoalConfig, 'completedDays'>) => {
    const newGoal: GoalConfig = {
      ...goalData,
      completedDays: new Set(),
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    setSelectedGoalIndex(updatedGoals.length - 1);
    addToast('success', t('goal_created_successfully'));
  };

  const handleDayToggle = (dayNumber: number) => {
    if (selectedGoalIndex === null) return;

    const updatedGoals = [...goals];
    const goal = updatedGoals[selectedGoalIndex];
    
    if (goal.completedDays.has(dayNumber)) {
      goal.completedDays.delete(dayNumber);
    } else {
      goal.completedDays.add(dayNumber);
    }
    
    setGoals(updatedGoals);
  };

  const handleDeleteGoal = (goalIndex: number) => {
    const updatedGoals = goals.filter((_, idx) => idx !== goalIndex);
    setGoals(updatedGoals);
    
    if (selectedGoalIndex === goalIndex) {
      setSelectedGoalIndex(updatedGoals.length > 0 ? 0 : null);
    } else if (selectedGoalIndex !== null && selectedGoalIndex > goalIndex) {
      setSelectedGoalIndex(selectedGoalIndex - 1);
    }
    
    addToast('success', t('goal_deleted_successfully'));
  };

  const currentGoal = selectedGoalIndex !== null ? goals[selectedGoalIndex] : null;

  return (
    <div className="app">
      <ToastContainer />
      
      <header className="app-header">
        <h1>{t('app_title')}</h1>
        <LocaleSelector />
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>{t('create_goal')}</h2>
          <GoalForm onSubmit={handleCreateGoal} />
        </section>

        {goals.length > 0 && (
          <section className="goal-selector-section">
            <div className="goal-selector">
              <label htmlFor="goal-select">{t('select_goal')}:</label>
              <select 
                id="goal-select"
                value={selectedGoalIndex ?? -1}
                onChange={(e) => setSelectedGoalIndex(parseInt(e.target.value, 10))}
              >
                {goals.map((goal, idx) => (
                  <option key={idx} value={idx}>
                    {goal.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-danger btn-small"
                onClick={() => {
                  if (selectedGoalIndex !== null) {
                    handleDeleteGoal(selectedGoalIndex);
                  }
                }}
                title={t('delete_goal')}
              >
                {t('delete_goal')}
              </button>
            </div>
          </section>
        )}

        {currentGoal && (
          <section className="goal-display-section">
            <div className="goal-header">
              <h2>{currentGoal.name}</h2>
              <button 
                className="btn btn-primary print-btn"
                onClick={() => window.print()}
                title={t('print')}
              >
                {t('print')}
              </button>
            </div>
            <GoalSummary goal={currentGoal} />
            <DayGrid goal={currentGoal} onDayToggle={handleDayToggle} />
          </section>
        )}

        {goals.length === 0 && (
          <section className="empty-state">
            <p>{t('no_goals')}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
