import '@testing-library/jest-dom';

process.env.REACT_APP_USER_SERVICE = 'http://localhost:1000';
process.env.REACT_APP_REVIEW_SERVICE = 'https://localhost:1001';
process.env.REACT_APP_PROFILE_IMAGES_URL= 'http://localhost:82/developer/image/upload/';

process.env.REACT_APP_APPLICATION_NAME='recruiters.com';
process.env.REACT_APP_TRACKING_APPLICATION_NAME='recruiters.com';
process.env.REACT_APP_COMPANY_LOGO_IMAGES_URL='http://localhost:82/developer/{MD5}/image/upload/';

import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

global.IntersectionObserver = class IntersectionObserver {

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
};

let count = 0;
const DIVIDER_LENGTH = 72;

const getDisplayDate = () => {
  const date = new Date();
  return date.toISOString().substring(0, 19).replace('T', ' ');
};

global.beforeAll(() => {
  count = 0;
  process.stdout.write(
    `${'#'.repeat(DIVIDER_LENGTH)}\n`,
  );
  process.stdout.write(
    `${getDisplayDate().replace('T', ' ')} \x1b[32mRunning:\x1b[0m ${expect.getState().testPath}\n`,
  );

  sessionStorage.clear();
  localStorage.clear();
});

global.beforeEach(() => {
  count += 1;
  process.stdout.write(
    `${getDisplayDate()} \x1b[32mRunning:\x1b[0m #${count}. ${expect.getState().currentTestName}\n`,
  );

  sessionStorage.clear();
  localStorage.clear();

  delete window.location; // remove the read-only property
  window.location = {
    ...window.location,
    host: 'example.com',
  };
});
