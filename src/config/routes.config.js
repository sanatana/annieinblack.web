import * as linkHelper from '../helpers/links';
import {
  createCompanyCommsPreferencesLink,
  createCompanyEditUsersLink,
  createCompanyRequestReviewsLink,
  createCompanySubscriptionLink,
} from '../helpers/links';

const routes = {
  'ROOT': {
    'label': 'HOME',
    path: '/',
    'f': linkHelper.createRootLink,
  },
  'HOME': {
    'label': 'HOME',
    path: '/:lang',
    'f': linkHelper.createHomeLink,
  },
  'LOGIN':  {
    'label': 'LOGIN',
    path: '/:lang/login',
    'f': linkHelper.createLoginLink,
    parents: ['HOME'],
  },
  'REGISTER': {
    'label': 'REGISTER',
    path: '/:lang/register',
    'f': linkHelper.createRegisterLink,
    parents: ['HOME'],
  },
  'REGISTER_COMPANY_INVITATION': {
    'label': 'REGISTER',
    path: '/:lang/register/:tokenHash',
    'f': linkHelper.createRegisterLink,
    parents: ['HOME'],
  },
  'LOST_PASSWORD': {
    'label': 'TITLE_LOST_PASSWORD',
    path: '/:lang/reset-password',
    f: linkHelper.createLostPasswordLink,
    parents: ['HOME'],
  },
  'RESET_PASSWORD_WITH_CODE': {
    'label': 'HOME',
    path: '/:lang/lost-password/:token',
    f: linkHelper.createLostPasswordLink,
    parents: ['HOME'],
  },
  'ADD_REVIEW': {
    'label': 'TITLE_ADD_REVIEW',
    path: '/:lang/reviews',
    f: linkHelper.createAddReviewLink,
    parents: ['HOME'],
  }
  ,
  'TERMS':  {
    'label': 'TITLE_TERMS',
    path: '/:lang/terms-and-conditions',
    f: linkHelper.createTermsLink,
    parents: ['HOME'],
  },
  'PRIVACY':  {
    'label': 'TITLE_PRIVACY',
    path: '/:lang/privacy-policy',
    f: linkHelper.createPrivacyLink,
    parents: ['HOME'],
  },
  'MISSION':  {
    'label': 'TITLE_MISSION',
    path: '/:lang/mission-statement',
    f: linkHelper.createMissionLink,
    parents: ['HOME'],
  },
  'GUIDELINES':  {
    'label': 'TITLE_GUIDELINES',
    path: '/:lang/review-writing-guidelines',
    f: linkHelper.createWritingGuidelinesLink,
    parents: ['HOME'],
  },
  'HOW':  {
    'label': 'TITLE_HOW_WORKS',
    path: '/:lang/how-it-works',
    f: linkHelper.createHowItWorksLink,
    parents: ['HOME'],
  },
  'CONTACT_US': {
    'label': 'TITLE_CONTACT',
    path: '/:lang/contact-us',
    f: linkHelper.createContactUsLink,
    parents: ['HOME'],
  },
  'HELP_CENTER': {
    'label': 'TITLE_HELP_CENTER',
    path: '/:lang/help-center',
    f: linkHelper.createHelpLink,
    parents: ['HOME'],
  },
  'FOR_BUSINESS': {
    'label': 'TITLE_FOR_BUSINESS',
    path: '/:lang/business',
    f: linkHelper.createForBusinessLink,
    parents: ['HOME'],
  },
  'FAQ': {
    'label': 'TITLE_FAQ',
    path: '/:lang/frequently-ask-questions',
    f: linkHelper.createFaqLink,
    parents: ['HOME'],
  },
  'USER_ACCOUNT': {
    'label': 'TITLE_MY_ACCOUNT',
    path: '/:lang/me/account',
    f: linkHelper.createUserAccountLink,
    parents: ['HOME'],
  },
  'USER_ACCOUNT_REVIEWS': {
    'label': 'MY_REVIEWS',
    path: '/:lang/me/account/reviews',
    f: linkHelper.createUserAccountLink,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'USER_ACCOUNT_DETAILS': {
    'label': 'TITLE_USER_ACCOUNT_DETAILS',
    path: '/:lang/me/account/details',
    f: linkHelper.createUpdateDetailsLink,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'USER_ACCOUNT_EMAIL': {
    'label': 'TITLE_EMAIL_CHANGE',
    path: '/:lang/me/account/email-change',
    f: linkHelper.createUpdateEmailLink,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'USER_ACCOUNT_EMAIL_CHANGE_CODE': {
    'label': 'TITLE_EMAIL_CHANGE_CONFIRMATION',
    path:  '/:lang/me/account/email-change/:token',
    f: linkHelper.createUpdateEmailLink,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'USER_ACCOUNT_PASSWORD': {
    'label': 'TITLE_PASSWORD_CHANGE',
    path: '/:lang/me/account/password-change',
    f: linkHelper.createUpdatePasswordLink,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'USER_ACCOUNT_TWA': {
    'label': 'USER_ACCOUNT_TWA_TITLE',
    path: '/:lang/me/account/tfa',
    f: linkHelper.createUpdatePasswordLink,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'EMAIL_CONFIRMATION_WITH_TOKEN': {
    'label': 'TITLE_EMAIL_CHANGE',
    path: '/:lang/confirmation/email/token/:token',
    parents: ['HOME'],
  },
  'NEW_EMAIL_CONFIRMATION_TOKEN': {
    'label': 'TITLE_EMAIL_CHANGE',
    path: '/:lang/me/account/email-confirmation-request',
    f: linkHelper.createRequestNewEmailConfirmationToken,
    parents: ['HOME', 'USER_ACCOUNT'],
  },
  'COMPANY_PAGE': {
    'label': 'COMPANY_PAGE',
    path: '/:lang/reviews/:companySlug',
    f: null,
    parents: ['HOME', 'REVIEWS'],
  },
  'COMPANY_PAGE_REPLY': {
    'label': 'COMPANY_PAGE_REPLY',
    path: '/:lang/reviews/:companySlug/review/:reviewId',
    f: null,
    parents: ['HOME', 'REVIEWS'],
  },
  'ADD_COMPANY_REVIEW': {
    'label': 'ADD_COMPANY_REVIEW',
    path: '/:lang/review/:companySlug',
    parents: ['HOME', 'REVIEWS'],
  },
  'CLAIM_PROFILE': {
    'label': 'CLAIM_PROFILE',
    path: '/:lang/claim/:companySlug',
    parents: ['HOME', 'REVIEWS'],
  },
  'CLAIM_PROFILE_CONFIRMATION': {
    'label': 'CLAIM_PROFILE',
    path: '/:lang/claim/:companySlug/confirmation/:token',
    parents: ['HOME', 'REVIEWS'],
  },
  'COMPANY_ACCOUNT_HOME': {
    'label': 'COMPANY_ACCOUNT_HOME',
    parents: ['HOME', 'USER_ACCOUNT'],
    f: linkHelper.createCompanyAccountLink,
    path: '/:lang/me/business',
  },
  'COMPANY_ACCOUNT_BASIC': {
    'label': 'COMPANY_ACCOUNT_BASIC',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME'],
    path: '/:lang/me/business/about',
  },
  COMPANY_ACCOUNT_CONTACT: {
    'label': 'COMPANY_ACCOUNT_CONTACT',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME'],
    path: '/:lang/me/business/contact',
  },
  COMPANY_ACCOUNT_USERS: {
    'label': 'COMPANY_ACCOUNT_USERS',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME'],
    path: '/:lang/me/business/users',
    f: createCompanyEditUsersLink,
  },
  COMPANY_ACCOUNT_ASK_FOR_REVIEWS: {
    'label': 'COMPANY_ACCOUNT_ASK_FOR_REVIEWS',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME'],
    path: '/:lang/me/business/request',
    f: createCompanyRequestReviewsLink,
  },
  COMPANY_ACCOUNT_INVITE_USERS: {
    'label': 'COMPANY_ACCOUNT_INVITE_USERS',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME', 'COMPANY_ACCOUNT_USERS'],
    path: '/:lang/me/business/users/invite',
  },
  COMPANY_SUBSCRIPTION: {
    'label': 'COMPANY_SUBSCRIPTION',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME'],
    path: '/:lang/me/business/subscription',
    f: createCompanySubscriptionLink,
  },
  COMPANY_SUBSCRIPTION_PAYMENT_SUCCESS: {
    'label': 'COMPANY_SUBSCRIPTION_PAYMENT_SUCCESS',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME', 'COMPANY_SUBSCRIPTION'],
    path: '/:lang/me/business/subscription/success',
  },
  COMPANY_NOTIFICATION_PREFERENCES: {
    'label': 'COMPANY_NOTIFICATION_PREFERENCES',
    parents: ['HOME', 'USER_ACCOUNT', 'COMPANY_ACCOUNT_HOME'],
    path: '/:lang/me/business/notifications',
    f: createCompanyCommsPreferencesLink,
  },
};

export default routes;
