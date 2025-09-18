import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import './index.css'; // Assuming you have some global styles here
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
