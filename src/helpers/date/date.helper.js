import { format, parseISO } from 'date-fns';
import { de, enGB, enUS } from 'date-fns/locale';
import { languages } from '@src/config';
import i18next from 'i18next'; // Import i18next directly

const DATE_LOCALES = {
  de,
  enGB,
  enUS,
};

const SUPPORTED_LANGUAGES = {};

Object.values(languages?.SUPPORTED_LANGUAGES || {}).forEach((language) => {
  SUPPORTED_LANGUAGES[language.locale] = language.date;
});

const geDisplayDate = (date, appLocale, dateFormat) => {
  if (!date || date === '') {
    return null;
  }

  const validLocale = findValidLocale(appLocale);

  if (validLocale) {
    return format(parseISO(date), dateFormat, { locale: validLocale });
  }

  return format(parseISO(date), dateFormat);
};

const findValidLocale = (appLocale) => {
  const locale = SUPPORTED_LANGUAGES?.[appLocale] || null;
  if (!locale) {
    return null;
  }

  return DATE_LOCALES?.[locale] || null;
};

const getDate = (date) => {
  return geDisplayDate(date, i18next.language, 'P');
};

const getDateWithMonthName = (date) => {
  return geDisplayDate(date, i18next.language, 'PPP');
};

const getDateWithTime = (date, showSeconds = false) => {
  const dateFormat = showSeconds ? 'Ppp' : 'Pp';
  return geDisplayDate(date, i18next.language, dateFormat);
};

const getDateWithMonthNameAndTime = (date, showSeconds = false) => {
  const dateFormat = showSeconds ? 'PPPpp' : 'PPPp';
  return geDisplayDate(date, i18next.language, dateFormat);
};
const getDateWithDayMonthNameAndTime = (date, showSeconds = false) => {
  const dateFormat = showSeconds ? 'PPPPpp' : 'PPPPp';
  return geDisplayDate(date, i18next.language, dateFormat);
};

const localiseDateToBrowser = (date) => {
  const temp = new Date(date);
  return temp.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Set to true for 12-hour format with AM/PM
  });
};

export {
  getDate,
  getDateWithMonthName,
  getDateWithTime,
  getDateWithMonthNameAndTime,
  localiseDateToBrowser,
  getDateWithDayMonthNameAndTime,
};
