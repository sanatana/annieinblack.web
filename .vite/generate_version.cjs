const fs = require('fs');

const required = [
  'REACT_APP_REVIEW_SERVICE',
  'REACT_APP_USER_SERVICE',
  'REACT_APP_APPLICATION_NAME',
  'REACT_APP_TRACKING_APPLICATION_NAME',
  'REACT_APP_PROFILE_IMAGES_URL',
  'REACT_APP_COMPANY_LOGO_IMAGES_URL',
  'REACT_APP_PUBLIC_SEARCH_API_KEY',
];

const missing = required.filter(key => !process.env[key]);

const output = {
  status: missing.length > 0 ? 'error' : 'ok',
  missing,
};

fs.writeFileSync('build/status/health/status.json', JSON.stringify(output, null, 2));
