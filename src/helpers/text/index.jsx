import i18next from 'i18next';

const shortenText = (inputText, inputMaxLength) => {
  const stripTags = (input) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    return doc.body.textContent || '';
  };

  const text = stripTags(inputText);
  const maxLength = inputMaxLength || 250;

  const words = text.split(' ');
  let shortenedText = '';
  let charCount = 0;

  for (let x = 0; x < words.length; x += 1) {
    const word = words[x]?.trim() || '';

    if (charCount + word.length + (shortenedText ? 1 : 0) <= maxLength) {
      if (shortenedText !== '') {
        shortenedText += ` ${word}`;
      } else {
        shortenedText = word;
      }

      charCount += word.length + (shortenedText ? 1 : 0); // Adding 1 for the space
    } else {
      break;
    }
  }

  if (shortenedText.length < text.length) {
    shortenedText += '...';
  }

  return shortenedText;
};

const getFirstCharacter = (str) => {
  if (!str) {
    return null;
  }

  return Array.from(str)[0];
};

const getDisplayNameTypeLabel = (type, firstName, lastName, displayName = '') => {

  if (type === 4) {
    if (displayName && displayName?.length > 0) {
      return displayName.trim() || `${i18next.t('common:CUSTOM_DISPLAY_NAME')}`;
    }

    return `${i18next.t('common:CUSTOM_DISPLAY_NAME')}`;
  }

  if (type === 3) {
    if (lastName && lastName.trim().length > 0) {
      return `${lastName.trim()}`;
    }

    return `${i18next.t('common:LAST_NAME')}`;
  }

  if (type === 2) {
    if (firstName && firstName.trim().length > 0) {
      return `${firstName.trim()}`;
    }

    return `${i18next.t('common:FIRST_NAME')}`;
  }

  if (type === 1) {
    if (firstName && lastName && lastName.trim().length > 0 && lastName.trim().length > 0) {
      return `${firstName.trim()} ${getFirstCharacter(lastName.trim())}.`;
    }

    if (firstName && firstName.trim().length > 0) {
      return `${firstName.trim()} ____.`;
    }

    if (lastName && lastName.trim().length > 0) {
      return `_____ ${getFirstCharacter(lastName.trim())}`;
    }

    return `${i18next.t('common:FIRST_NAME')} ${getFirstCharacter(i18next.t('common:LAST_NAME'))}.`;
  }

  if (type === 0 || !type) {
    if (firstName && lastName && lastName.trim().length > 0 && lastName.trim().length > 0) {
      return `${firstName.trim()} ${lastName.trim()}`;
    }

    if (firstName && firstName.trim().length > 0) {
      return `${firstName.trim()} ${i18next.t('common:LAST_NAME')}`;
    }

    if (lastName && lastName.trim().length > 0) {
      return `${i18next.t('common:FIRST_NAME')} ${firstName.trim()} `;
    }

    return `${i18next.t('common:FIRST_NAME')} ${i18next.t('common:LAST_NAME')}`;
  }
};

export {
  shortenText,
  getDisplayNameTypeLabel,
};
