import * as linkHelper from '../helpers/links';

const routes = {
  'ROOT': {
    'label': 'HOME',
    path: '/',
    'f': linkHelper.createRootLink,
  },
  'HOME': {
    'label': 'HOME',
    path: '/',
    'f': linkHelper.createRootLink,
  },
  'PRIVACY':  {
    'label': 'TITLE_PRIVACY',
    path: '/privacy-policy',
    f: linkHelper.createPrivacyLink,
    parents: ['HOME'],
  },
  'ABOUT':  {
    'label': 'TITLE_ABOUT',
    path: '/about-us',
    f: linkHelper.createAboutLink,
    parents: ['HOME'],
  },
};

export default routes;
