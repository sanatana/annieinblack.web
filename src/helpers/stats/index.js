const checkIsDisabled = () => {
  return (localStorage.getItem('annie-in-black__no-track')
    || sessionStorage.getItem('annie-in-black__no-track')) === 'true';
};

export const trackPageView = () => {
  if (window._paq) {

    if (checkIsDisabled()) {
      return;
    }

    window._paq.push(['setCustomUrl', window.location.href]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
  }
};

export const trackEvent = (category, action, name, value) =>  {
  if (!window._paq) { return; }

  if (checkIsDisabled()) {
    return;
  }

  if (value !== undefined) {
    window._paq.push(['trackEvent', category, action, name, value]);
  } else if (name !== undefined) {
    window._paq.push(['trackEvent', category, action, name]);
  } else {
    window._paq.push(['trackEvent', category, action]);
  }
};

export const trackExternalLink = (e) => {
  if (e?.target?.href) {
    trackEvent('OutboundLink', 'Click', e.target.href);
  }
};
