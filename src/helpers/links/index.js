import { routes } from '../../config';
import i18next from 'i18next'; // Import i18next directly

const createAndClickLink = (url) => {
  const domLink = document.createElement('a');
  domLink.href = url;
  domLink.rel = 'noopener noreferrer';
  domLink.target = '_blank';
  domLink.dataset.allowexternaljump = '1';
  domLink.textContent = url;
  document.body.appendChild(domLink);
  domLink.click();
  domLink.remove();
};

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
    // eslint-disable-next-line no-unused-vars
  } catch (ignore) {
    return false;
  }
};

const findParentLink = (element) => {
  if (element?.tagName?.toLowerCase() === 'a') {
    return element;
  } if (element.parentElement) {
    return findParentLink(element.parentElement);
  }
  return null;
};

const createLanguageLink = (link) => {
  if (!link) {
    return '#';
  }

  return link.replace(':lang', i18next.language);
};

const createRootLink = () => {
  return routes.ROOT;
};

const createAboutLink = () => {
  return routes.ABOUT;
};

const createPrivacyLink = () => {
  return routes.PRIVACY;
};

export {
  findParentLink,
  createAndClickLink,
  createRootLink,
  isValidUrl,
  createPrivacyLink,
  createAboutLink
};
