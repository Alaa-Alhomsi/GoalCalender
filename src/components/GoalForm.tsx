import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "../contexts/useToast";
import type { TimeUnit, GoalConfig } from "../types";
import { formatDate } from "../utils/goalUtils";
import "./GoalForm.css";

interface GoalFormProps {
  onSubmit: (goal: Omit<GoalConfig, "completedDays">) => void;
  initialGoal?: GoalConfig;
  isEditing?: boolean;
}

export function GoalForm({
  onSubmit,
  initialGoal,
  isEditing = false,
}: GoalFormProps) {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [name, setName] = useState(initialGoal?.name || "");
  const [duration, setDuration] = useState<number | "">(
    initialGoal?.duration || 45
  );
  const [unit, setUnit] = useState<TimeUnit>(initialGoal?.unit || "days");
  const [startDate, setStartDate] = useState(
    formatDate(initialGoal?.startDate || new Date())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validierung: Name ist erforderlich
    if (!name.trim()) {
      addToast("error", t("goal_name") + " " + t("required"));
      return;
    }

    // Validierung: Duration muss > 0 sein
    if (duration === '' || duration < 1) {
      addToast("error", t("duration") + " " + t("must_be_positive"));
      return;
    }

    onSubmit({
      name: name.trim(),
      duration: Math.max(1, duration),
      unit,
      startDate: new Date(startDate),
    });

    addToast(
      "success",
      isEditing
        ? t("goal_updated_successfully")
        : t("goal_created_successfully")
    );

    if (!isEditing) {
      setName("");
      setDuration(365);
      setUnit("days");
      setStartDate(formatDate(new Date()));
    }
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="goal-name">{t("goal_name")}</label>
        <input
          id="goal-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("goal_name")}
          maxLength={100}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="duration">{t("duration")}</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => {
              const value = e.target.value;
              setDuration(value === "" ? "" : parseInt(value, 10));
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">{t("unit")}</label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as TimeUnit)}
          >
            <option value="days">{t("days")}</option>
            <option value="weeks">{t("weeks")}</option>
            <option value="months">{t("months")}</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="start-date">{t("start_date")}</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {isEditing ? t("edit_goal") : t("create_goal")}
      </button>
    </form>
  );
}
