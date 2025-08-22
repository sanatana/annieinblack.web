import i18next from 'i18next';

const shortenLargeNumbers = (number) => {
  const formatter = Intl.NumberFormat(i18next.language || 'en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  if (!number) {
    return 0;
  }

  return formatter.format(number || 0);
};

export {
  shortenLargeNumbers,
};
