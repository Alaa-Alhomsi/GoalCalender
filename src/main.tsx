import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { ToastProvider } from './contexts/ToastContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  //test workflow
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </I18nextProvider>
  </StrictMode>,
);
