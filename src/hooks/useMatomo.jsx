import { useEffect } from 'react';
import { compress, decompress } from 'lz-string';
import { nanoid } from 'nanoid';

const key = 'annie-in-black__knock';

const storeVisitorId = (id) => {
  const data = compress(JSON.stringify({
    t: Math.floor(Date.now() / 1000),
    id,
  }));

  try {
    localStorage.setItem(key, data);
  } catch {
    /* empty */
  }

  try {
    sessionStorage.setItem(key, data);
  } catch {
    /* empty */
  }
};

const getStoredVisitorId = () => {
  let value = localStorage.getItem(key) || sessionStorage.getItem(key) || null;
  if (!value) { return null; }

  if (value) {
    try {
      value = JSON.parse(decompress(value));
    } catch {
      value = null;
    }
  }

  if (value?.t && (!Number.isInteger(value.t))) {
    return null;
  }

  return value?.id;
};

const getVisitorId = () => {
  const value = getStoredVisitorId();
  if (value) {
    return value;
  }

  const tempId = nanoid(12);
  storeVisitorId(tempId);
  return tempId;
};

const useMatomo = (matomoUrl, siteId) => {
  useEffect(() => {
    if (window._paq) { return; }

    if (!matomoUrl || !siteId) {
      return;
    }

    const visitorId = getVisitorId();
    window._paq = window._paq || [];
    window._paq.push(['setRequestMethod', 'POST']);
    window._paq.push(['setUserId', visitorId]);
    window._paq.push(['setSiteId', siteId]);
    window._paq.push(['setTrackerUrl', `${matomoUrl}/matomo.php`]);
    window._paq.push(['disableBrowserFeatureDetection']);
    window._paq.push(['enableLinkTracking']);

    const script = document.createElement('script');
    script.async = true;
    script.src = `${matomoUrl}/matomo.js`;
    document.head.appendChild(script);
  }, [matomoUrl, siteId]);

  return null;
};

export default useMatomo;
