// i18n.test.js
const i18n = require('i18next');
const { initReactI18next } = require('react-i18next');
const translations = require('./jest.translations');

i18n.use(initReactI18next).init({
  lng: 'en-GB',
  fallbackLng: 'en-GB',
  supportedLngs: ['en-GB'],
  defaultNS: 'common',
  ns: ['common', 'reviews', 'company'],
  resources: {
    'en-GB': {
      ...translations,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

module.exports = i18n;
