import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { LocaleCode } from '../types';

const SUPPORTED_LOCALES: LocaleCode[] = ['en', 'de'];

export function useLocale() {
  const { i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<LocaleCode>(
    (localStorage.getItem('locale') as LocaleCode) || 'en'
  );

  useEffect(() => {
    if (SUPPORTED_LOCALES.includes(currentLocale)) {
      i18n.changeLanguage(currentLocale);
      localStorage.setItem('locale', currentLocale);
    }
  }, [currentLocale, i18n]);

  const changeLocale = useCallback((locale: LocaleCode) => {
    if (SUPPORTED_LOCALES.includes(locale)) {
      setCurrentLocale(locale);
    }
  }, []);

  return {
    currentLocale,
    changeLocale,
    supportedLocales: SUPPORTED_LOCALES,
  };
}
