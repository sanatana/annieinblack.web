import { useCallback, useEffect, useState } from 'react';

const CONSENT_KEY = 'annie-in-black__cookie';
import { InternalLink } from '@src/components';
import { trackEvent } from '@src/helpers/stats';

import './cookie_banner.scss';

const policyVersion = '1.0';

const hasMatomoCookieConsent = () => {
  const c = document.cookie || '';
  return c.includes('mtm_cookie_consent=' /* cookieless mode */)
    || c.includes('mtm_consent=' /* strict mode, if you ever switch */);
};

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  // Show banner if we haven't already made a choice
  useEffect(() => {
    const chosen = localStorage.getItem(CONSENT_KEY) || sessionStorage.getItem(CONSENT_KEY);
    const hasCookie = hasMatomoCookieConsent();
    if (chosen !== '1' || !hasCookie) { setShow(true); }
  }, []);

  const accept = useCallback(() => {
    // 13 months in hours (Matomo’s helper accepts hours)
    const THIRTEEN_MONTHS_HOURS = 13 * 30 * 24;

    if (window._paq) {
      // cookieless mode
      window._paq.push(['rememberCookieConsentGiven', THIRTEEN_MONTHS_HOURS]);
      trackEvent('Privacy', 'AcceptCookie', policyVersion);
    }

    try {
      localStorage.setItem(CONSENT_KEY, '1');
    } catch {
      // nothing
    }

    try {
      sessionStorage.setItem(CONSENT_KEY, '1');
    } catch {
      // nothing
    }

    setShow(false);
  }, []);

  if (!show) { return null; }

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__inner">
        <div>
          To improve our website, we use privacy-friendly analytics. By selecting OK, you allow us to set one cookie for this purpose.

          <div className="copy">
            &copy; 2025 Annie in Black, All rights reserved. | <InternalLink to="/privacy-policy">Privacy policy</InternalLink>
          </div>
        </div>

        <button onClick={ accept }>
          Ok
        </button>
      </div>
    </div>
  );
}
