
export const trackEvent = (category, action, name, value) =>  {
  if (!window._paq) { return; }
  if (value !== undefined) {
    window._paq.push(['trackEvent', category, action, name, value]);
  } else if (name !== undefined) {
    window._paq.push(['trackEvent', category, action, name]);
  } else {
    window._paq.push(['trackEvent', category, action]);
  }
};
