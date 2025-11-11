# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Goal Calendar

Eine eigenständige React-App mit Vite zur Verfolgung von Zielen über einen benutzerdefinierten Zeitraum. Die App stellt Ziele als klickbare Kästchen dar und ist vollständig i18n-bereit mit Unterstützung für Englisch und Deutsch.

## Features

- 📅 **Zeitflexibel**: Definiere Ziele in Tagen, Wochen oder Monaten
- 🎯 **Visuelle Verfolgung**: Klickbare Kästchen zur Markierung abgeschlossener Tage
- 📊 **Fortschrittsanzeige**: Statistiken und Fortschrittsbalken für jedes Ziel
- 🌍 **Mehrsprachig**: Englisch und Deutsch (i18n-bereit für weitere Sprachen)
- 🖨️ **Druckoptimiert**: Perfekt ausgelegt für A4-Papier (365 Tage passen auf eine Seite)
- 💾 **Persistent**: Speichert Ziele automatisch im Browser-LocalStorage
- 🚀 **Frontend-only**: Keine Backend- oder Routing-Abhängigkeiten

## Technischer Stack

- **Framework**: React 18+ mit TypeScript
- **Build-Tool**: Vite
- **i18n**: i18next + react-i18next
- **Storage**: Browser LocalStorage (JSON-Serialisierung)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Die App öffnet sich unter `http://localhost:5173`

## Build für Production

```bash
npm run build
```

## Verzeichnisstruktur

```
src/
├── components/
│   ├── GoalForm.tsx          # Formular zum Erstellen/Bearbeiten von Zielen
│   ├── GoalForm.css
│   ├── GoalList.tsx          # Liste aller Ziele
│   ├── GoalList.css
│   ├── DayGrid.tsx           # Grid mit 365 Tagen (print-optimiert)
│   ├── DayGrid.css
│   ├── GoalSummary.tsx       # Statistiken und Fortschrittsbalken
│   ├── GoalSummary.css
│   ├── LocaleSelector.tsx    # Sprachauswahl
│   └── LocaleSelector.css
├── hooks/
│   └── useLocale.ts          # Custom Hook für Locale-Verwaltung
├── locales/
│   └── i18n.ts               # i18n-Konfiguration mit Übersetzungen
├── types/
│   └── index.ts              # TypeScript-Typen
├── utils/
│   └── goalUtils.ts          # Hilfsfunktionen (Datenkonversion, Storage)
├── App.tsx                   # Hauptkomponente
├── App.css
├── main.tsx                  # Entry Point mit i18n Provider
└── index.css                 # Globale Stile
```

## Verwendung

### 1. Ziel erstellen

1. Geben Sie einen Namen ein (z.B. "Learn TypeScript")
2. Wählen Sie die Dauer (Zahlenwert)
3. Wählen Sie die Einheit (Tage, Wochen oder Monate)
4. Wählen Sie ein Startdatum
5. Klicken Sie "Create Goal"

### 2. Fortschritt verfolgen

- Klicken Sie auf die Kästchen, um Tage als abgeschlossen zu markieren
- Grüne Kästchen = abgeschlossen
- Weiße Kästchen = ausstehend
- Der Fortschrittsbalken aktualisiert sich automatisch

### 3. Sprache ändern

Wählen Sie die gewünschte Sprache in der "Language"-Dropdown in der oberen rechten Ecke (derzeit Englisch und Deutsch unterstützt).

### 4. Drucken

Klicken Sie auf "Print" oder verwenden Sie Ctrl+P / Cmd+P. Die App ist für A4-Papier optimiert:
- 365 Tage passen auf eine Seite
- Grid-Layout mit etwa 37 Spalten × 10 Reihen
- Monochrom-Druckoptimierung (schwarz/weiß)

## Datenmodell

### GoalConfig

```typescript
interface GoalConfig {
  name: string;                    // Zielname
  duration: number;                // Zeitspanne (Zahlenwert)
  unit: 'days' | 'weeks' | 'months'; // Zeiteinheit
  startDate: Date;                 // Startdatum
  completedDays: Set<number>;      // Set von abgeschlossenen Tagenummern
}
```

### Storage

Ziele werden als JSON im localStorage gespeichert (`localStorage.getItem('goals')`). Das Format:

```json
[
  {
    "name": "Example Goal",
    "duration": 365,
    "unit": "days",
    "startDate": "2025-01-01",
    "completedDays": [1, 2, 3, 5]
  }
]
```

## i18n-Erweiterung

Um eine neue Sprache hinzuzufügen:

1. Öffnen Sie `src/locales/i18n.ts`
2. Fügen Sie die Übersetzungen dem `resources`-Objekt hinzu
3. Importieren Sie den Locale-Code in den `useLocale`-Hook (`src/hooks/useLocale.ts`)
4. Aktualisieren Sie `LocaleSelector.tsx` mit dem Label

Beispiel:
```typescript
const frTranslations = {
  "app_title": "Calendrier des Objectifs",
  // ... weitere Übersetzungen
};

const resources = {
  en: { translation: enTranslations },
  de: { translation: deTranslations },
  fr: { translation: frTranslations },  // Neue Sprache
};
```

## Print-Optimierung

Die App verwendet mehrere CSS-Techniken zur Optimierung für A4-Druck:

1. **Grid-Layout**: 37 Spalten für 365 Tage (≈5 Wochen × 7 Spalten)
2. **Minimal-CSS**: Reduzierte Padding/Margin im Print-Modus
3. **Page-Break-Handling**: `page-break-inside: avoid` für Ziele
4. **Schwarzweiß-Optimi**: Abgeschlossene Tage als schwarze Kästchen

## Performance

- **Lokale Speicherung**: Keine API-Aufrufe
- **Effiziente Rendering**: Memoization durch React Hooks
- **CSS-Optimierung**: Minimal CSS für 365-Tage-Grid
- **Bundle-Größe**: ~150KB (gzip) mit allen Dependencies

## Browser-Kompatibilität

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

Erforderlich: LocalStorage-Unterstützung

## Roadmap (optional)

- [ ] Unterstützung für mehr Sprachen (FR, ES, IT)
- [ ] Dark Mode
- [ ] Custom-Farben für Ziele
- [ ] Export als CSV/JSON
- [ ] Statistik-Dashboard
- [ ] Mobile-App mit React Native

## Lizenzen

Dieses Projekt steht unter der MIT-Lizenz.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
