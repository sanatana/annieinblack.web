import { routes } from '../../config';
import i18next from 'i18next'; // Import i18next directly
import { compressToBase64, decompressFromBase64, compress, decompress } from 'lz-string';

const userFriendlyEncodedString = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }

  return text.replace(/&amp;/g, '&')
    .replace(/&quot;/, '"')
    .replace(/&apos;/, '\'');
};

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

const addTrackingToExternalLink = (url, clickName = 'click') => {
  if (!url) {
    return;
  }

  let divider = '?';

  if (url.indexOf('?') !== -1) {
    divider = '&';
  }

  const domain = new URL('https://' + window.location.host)?.hostname || '';
  const tracking = `utm_medium=company_profile&utm_source=${process.env.REACT_APP_TRACKING_APPLICATION_NAME || domain}&utm_campaign=${clickName}`;

  return `${url}${divider}${tracking}`;
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

const createLoginLink = () => {
  return createLanguageLink(routes.LOGIN.path);
};

const createAddReviewLink = () => {
  return createLanguageLink(routes.ADD_REVIEW.path);
};

const createRegisterLink = () => {
  return  createLanguageLink(routes.REGISTER.path);
};

const createLostPasswordLink = () => {
  return createLanguageLink(routes.LOST_PASSWORD.path);
};

const createResetPasswordConfirmLink = (token = null) => {
  return routes.RESET_PASSWORD_WITH_CODE.path.replace(':lang', i18next.language).replace(':token', token);
};

const createEmailChangeConfirmLink = (token = null) => {
  return routes.USER_ACCOUNT_EMAIL_CHANGE_CODE.path.replace(':lang', i18next.language).replace(':token', token);
};

const createHomeLink = () => {
  return createLanguageLink(routes.HOME.path);
};

const createForBusinessLink = () => {
  return createLanguageLink(routes.FOR_BUSINESS.path);
};

const changeLanguageUrl = (currentUrl, currentLocale, newLocale) => {
  return currentUrl.replace(currentLocale, newLocale);
};

const createTermsLink = () => {
  return createLanguageLink(routes.TERMS.path);
};

const createPrivacyLink = () => {
  return createLanguageLink(routes.PRIVACY.path);
};

const createMissionLink = () => {
  return createLanguageLink(routes.MISSION.path);
};

const createWritingGuidelinesLink = () => {
  return createLanguageLink(routes.GUIDELINES.path);
};

const createHowItWorksLink = () => {
  return createLanguageLink(routes.HOW.path);
};

const createContactUsLink = () => {
  return createLanguageLink(routes.CONTACT_US.path);
};

const createHelpLink = () => {
  return createLanguageLink(routes.HELP_CENTER.path);
};

const createFaqLink = () => {
  return createLanguageLink(routes.FAQ.path);
};

const createUserAccountLink = () => {
  return createLanguageLink(routes.USER_ACCOUNT.path);
};

const createMyReviewsLink = () => {
  return createLanguageLink(routes.USER_ACCOUNT_REVIEWS.path);
};

const createUpdateDetailsLink = () => {
  return createLanguageLink(routes.USER_ACCOUNT_DETAILS.path);
};

const createUpdatePasswordLink = () => {
  return createLanguageLink(routes.USER_ACCOUNT_PASSWORD.path);
};

const createTWASettingsLink = () => {
  return createLanguageLink(routes.USER_ACCOUNT_TWA.path);
};

const createUpdateEmailLink = () => {
  return createLanguageLink(routes.USER_ACCOUNT_EMAIL.path);
};

const createRequestNewEmailConfirmationToken = () => {
  return createLanguageLink(routes.NEW_EMAIL_CONFIRMATION_TOKEN.path);
};

const createCompanyLink = (companySlug) => {
  return createLanguageLink(routes.COMPANY_PAGE.path).replace(':companySlug', companySlug);
};

const createCompanyReplyLink = (companySlug, reviewId) => {
  return createLanguageLink(routes.COMPANY_PAGE_REPLY.path)
    .replace(':companySlug', companySlug)
    .replace(':reviewId', reviewId);
};

const createAddCompanyReviewLink = (companySlug) => {
  return createLanguageLink(routes.ADD_COMPANY_REVIEW.path).replace(':companySlug', companySlug);
};

const createClaimCompanyLink = (companySlug) => {
  return createLanguageLink(routes.CLAIM_PROFILE.path).replace(':companySlug', companySlug);;
};

const createCompanyAccountLink = () => {
  return createLanguageLink(routes.COMPANY_ACCOUNT_HOME.path);
};

const createCompanyEditBasicLink = () => {
  return createLanguageLink(routes.COMPANY_ACCOUNT_BASIC.path);
};

const createCompanyEditContactLink = () => {
  return createLanguageLink(routes.COMPANY_ACCOUNT_CONTACT.path);
};

const createCompanyEditUsersLink = () => {
  return createLanguageLink(routes.COMPANY_ACCOUNT_USERS.path);
};

const createCompanyRequestReviewsLink = () => {
  return createLanguageLink(routes.COMPANY_ACCOUNT_ASK_FOR_REVIEWS.path);
};

const createCompanySubscriptionLink = () => {
  return createLanguageLink(routes.COMPANY_SUBSCRIPTION.path);
};

const createCompanyCommsPreferencesLink = () => {
  return createLanguageLink(routes.COMPANY_NOTIFICATION_PREFERENCES.path);
};

const createCompanyInviteUsersLink = () => {
  return createLanguageLink(routes.COMPANY_ACCOUNT_INVITE_USERS.path);
};

const createClaimCompanyConfirmationLink = (companySlug, token) => {
  return createLanguageLink(routes.CLAIM_PROFILE_CONFIRMATION.path)
    .replace(':companySlug', companySlug)
    .replace(':token', token);
};

const createAddNewCompanyLink = () => {
  throw new Error('NOT IMPLEMENTED YET!');
  return createLanguageLink(routes.ADD_COMPANY_REVIEW.path);
};

const base64EncodeJson = (obj, useCompression = false) => {
  if (typeof obj !== 'object') {
    return null;
  }

  const jsonStr = JSON.stringify(obj);

  if (useCompression) {
    return compressToBase64(compress(jsonStr));
  }

  return compressToBase64(jsonStr);
};

const base64DecodeJson = (encoded, useCompression = false) => {
  if (!encoded) {
    return null;
  }

  let temp;

  if (useCompression) {
    temp = decompress(decompressFromBase64(encoded));
  } else {
    temp = decompressFromBase64(encoded);
  }

  try {
    return JSON.parse(temp);
    // eslint-disable-next-line no-unused-vars
  } catch (ignore) {
    return null;
  }
};

export {
  createHomeLink,
  createRegisterLink,
  createLoginLink,
  changeLanguageUrl,
  createAddReviewLink,
  createLostPasswordLink,
  createResetPasswordConfirmLink,
  createTermsLink,
  createContactUsLink,
  createHelpLink,
  createFaqLink,
  findParentLink,
  createAndClickLink,
  createForBusinessLink,
  createPrivacyLink,
  createUserAccountLink,
  createUpdateDetailsLink,
  createUpdatePasswordLink,
  createUpdateEmailLink,
  createEmailChangeConfirmLink,
  createRequestNewEmailConfirmationToken,
  createRootLink,
  createCompanyLink,
  createAddNewCompanyLink,
  createAddCompanyReviewLink,
  isValidUrl,
  base64EncodeJson,
  base64DecodeJson,
  addTrackingToExternalLink,
  userFriendlyEncodedString,
  createMyReviewsLink,
  createClaimCompanyLink,
  createClaimCompanyConfirmationLink,
  createCompanyAccountLink,
  createCompanyReplyLink,
  createCompanyEditBasicLink,
  createCompanyEditContactLink,
  createCompanyEditUsersLink,
  createCompanyInviteUsersLink,
  createCompanyRequestReviewsLink,
  createCompanySubscriptionLink,
  createCompanyCommsPreferencesLink,
  createMissionLink,
  createWritingGuidelinesLink,
  createHowItWorksLink,
  createTWASettingsLink,
};
