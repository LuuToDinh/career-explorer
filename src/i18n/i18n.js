/*eslint-disable*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import NAV_EN from '@/locales/en/language.json';
import NAV_VI from '@/locales/vi/language.json';


i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {...NAV_EN}
    },
    vi: {
      translation: {...NAV_VI}
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
