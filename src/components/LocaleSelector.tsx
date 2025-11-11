import { useTranslation } from 'react-i18next';
import { useLocale } from '../hooks/useLocale';
import type { LocaleCode } from '../types';
import './LocaleSelector.css';

const LOCALE_LABELS: Partial<Record<LocaleCode, string>> = {
  en: 'English',
  de: 'Deutsch',
};

export function LocaleSelector() {
  const { t } = useTranslation();
  const { currentLocale, changeLocale, supportedLocales } = useLocale();

  return (
    <div className="locale-selector">
      <label htmlFor="locale-select">{t('locale')}:</label>
      <select
        id="locale-select"
        value={currentLocale}
        onChange={(e) => changeLocale(e.target.value as LocaleCode)}
      >
        {supportedLocales.map((locale) => (
          <option key={locale} value={locale}>
            {LOCALE_LABELS[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
