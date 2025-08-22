import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import i18n from '@src/components/i18n';
import { I18nextProvider } from 'react-i18next';

import './index.scss';
// workaround for css scope issue and menu in suspense

import { useEffect } from 'react';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

const DetectWebPSupport = () => {

  useEffect(() => {
    const webpSupport = () => {
      const elem = document.createElement('canvas');
      if (elem.getContext && elem.getContext('2d')) {
        // Safari on iOS 14+ lies, force test
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    };

    const el = document.documentElement;
    el.classList.remove('is-webp');
    el.classList.remove('no-webp');
    el.classList.add(
      webpSupport() ? 'is-webp' : 'no-webp'
    );
  }, []);

  return null;
};

root.render(
  <>
    <BrowserRouter>
      <DetectWebPSupport />
      <I18nextProvider i18n={ i18n }>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </>
);
