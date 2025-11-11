import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const enTranslations = {
  "app_title": "Goal Calendar",
  "goal_name": "Goal Name",
  "duration": "Duration",
  "unit": "Unit",
  "days": "Days",
  "weeks": "Weeks",
  "months": "Months",
  "start_date": "Start Date",
  "create_goal": "Create Goal",
  "edit_goal": "Edit Goal",
  "delete_goal": "Delete Goal",
  "save": "Save",
  "cancel": "Cancel",
  "reset": "Reset",
  "print": "Print",
  "day": "Day",
  "total_days": "Total Days",
  "completed": "Completed",
  "remaining": "Remaining",
  "progress": "Progress",
  "no_goals": "No goals yet. Create your first goal!",
  "goal_summary": "Goal Summary",
  "locale": "Language",
  "required": "is required",
  "must_be_positive": "must be at least 1",
  "goal_created_successfully": "Goal created successfully!",
  "goal_updated_successfully": "Goal updated successfully!",
  "goal_deleted_successfully": "Goal deleted successfully!",
  "select_goal": "Select Goal"
};

const deTranslations = {
  "app_title": "Zielkalender",
  "goal_name": "Zielname",
  "duration": "Dauer",
  "unit": "Einheit",
  "days": "Tage",
  "weeks": "Wochen",
  "months": "Monate",
  "start_date": "Startdatum",
  "create_goal": "Ziel erstellen",
  "edit_goal": "Ziel bearbeiten",
  "delete_goal": "Ziel löschen",
  "save": "Speichern",
  "cancel": "Abbrechen",
  "reset": "Zurücksetzen",
  "print": "Drucken",
  "day": "Tag",
  "total_days": "Gesamttage",
  "completed": "Abgeschlossen",
  "remaining": "Verbleibend",
  "progress": "Fortschritt",
  "no_goals": "Keine Ziele vorhanden. Erstelle dein erstes Ziel!",
  "goal_summary": "Zielübersicht",
  "locale": "Sprache",
  "required": "ist erforderlich",
  "must_be_positive": "muss mindestens 1 sein",
  "goal_created_successfully": "Ziel erfolgreich erstellt!",
  "goal_updated_successfully": "Ziel erfolgreich aktualisiert!",
  "goal_deleted_successfully": "Ziel erfolgreich gelöscht!",
  "select_goal": "Ziel wählen"
};

const resources = {
  en: { translation: enTranslations },
  de: { translation: deTranslations },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('locale') || 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
