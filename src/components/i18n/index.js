import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

import CustomStorage from '@src/helpers/storage';
import { storage as storageConfig } from '@src/config';

const customStorage = new CustomStorage();
const defaultLang = 'en-GB'; // Always default to a known supported language
const storedLang = customStorage.get(storageConfig.NAMES.SELECTED_LANGUAGE);
const supportedLanguages = ['en-GB'];

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      'en': [defaultLang],
      'default': [defaultLang]
    },
    lng: storedLang || defaultLang,
    supportedLngs: supportedLanguages,
    load: 'all',
    backend: {
      loadPath: '/languages/{{lng}}/{{ns}}.json',
      queryStringParams: { v: process.env.REACT_APP_DEPLOYMENT_VERSION || '1.0.0' },
    },
    ns: [], // Ensure namespace exists in translation files
    defaultNS: null,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'], // Only use localStorage to control language
      caches: ['localStorage'],
      lookupLocalStorage: storageConfig.NAMES.SELECTED_LANGUAGE,
    },
    compatibilityJSON: 'v3'
  });

i18n.on('languageChanged', (lng) => {
  if (lng === 'en') {
    i18n.changeLanguage(defaultLang);
  }
});

i18n.on('initialized', () => {
  // console.log('🚀 i18n fully initialized with:', i18n.language);
  // console.log('📌 Supported languages:', i18n.options.supportedLngs);
});

export default i18n;
