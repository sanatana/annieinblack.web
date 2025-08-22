const USER_LIMIT_PER_TIER = {
  FREE: 1,
  STARTUP: 2,
  SCALEUP: 10,
};

const PRICES = {
  FREE: {
    price: 0,
    translation: 'PACKAGE_FREE'
  },
  STARTUP: {
    price: 15,
    translation: 'PACKAGE_STARTUP'
  },
  SCALEUP: {
    price: 50,
    translation: 'PACKAGE_SCALEUP'
  }
};

const RANK_PERMISSIONS = {
  FREE: [1], // only user 1 can do actions
  STARTUP: [1, 2], // only user 1,2 can do actions
  SCALEUP: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // first 10 users can do actions
};

const REPLY_WEEKLY_LIMITS = {
  FREE: 2,
  STARTUP: 100,
  SCALEUP: 0,
};

const ROLE_PERMISSIONS = {
  about: [1 , 2],
  comms: [1, 2],
  users: [1, 2],
  subscription: [1, 2],
  contact: [1, 2],
  image: [1, 2],
};

export default {
  RANK_PERMISSIONS,
  ROLE_PERMISSIONS,
  USER_LIMIT_PER_TIER,
  REPLY_WEEKLY_LIMITS,
  PRICES,
};
