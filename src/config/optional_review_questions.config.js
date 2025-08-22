/*
* PLEASE DON'T OVERRIDE THESE VALUES, ADD NEW ONES AND MAKE OLD ONE INACTIVE!!! Until we get these from api
* */
const optionalOptionsConfig = {
  'INTERVIEW_STAGES': [
    {
      'value': 1,
      'label': 'REVIEW_APPLICATION_STAGE_APPLICATION',
      'active': true
    },
    {
      'value': 2,
      'label': 'REVIEW_APPLICATION_STAGE_PHONE_SCREEN',
      'active': true
    },
    {
      'value': 3,
      'label': 'REVIEW_APPLICATION_STAGE_VIDEO_INTERVIEW',
      'active': true
    },
    {
      'value': 4,
      'label': 'REVIEW_APPLICATION_STAGE_IN_PERSON_INTERVIEW',
      'active': true
    },
    {
      'value': 5,
      'label': 'REVIEW_APPLICATION_STAGE_TECHNICAL_TEST',
      'active': true
    },
    {
      'value': 6,
      'label': 'REVIEW_APPLICATION_STAGE_GROUP_TASK',
      'active': true
    },
    {
      'value': 7,
      'label': 'REVIEW_APPLICATION_STAGE_FINAL_INTERVIEW',
      'active': true
    },
    {
      'value': 8,
      'label': 'REVIEW_APPLICATION_STAGE_OFFER',
      'active': true
    },
    {
      'value': 9,
      'label': 'REVIEW_APPLICATION_STAGE_HIRED',
      'active': true
    },
  ],
  COMMUNICATION: [
    {
      value: 10,
      label: 'REVIEW_APPLICATION_COMMS_TIMELY',
    },
    {
      value: 11,
      label: 'REVIEW_APPLICATION_COMMS_CLEAR',
    },
    {
      value: 12,
      label: 'REVIEW_APPLICATION_COMMS_FEEDBACK',
    },
    {
      value: 13,
      label: 'REVIEW_APPLICATION_COMMS_DARK',
    },
  ],
};

const flattenOptionalOptionsConfig = (config) =>
  Object.entries(config).reduce((acc, [group, items]) => {
    items.forEach((item) => {
      const key = item.value;
      if (!acc[key]) {
        acc[key] = { ...item, group };
      } else {
        const error = `Duplicate key "${key}" found in group "${group}" - skipping.`;
        throw new Error(error);
      }
    });
    return acc;
  }, {});

const OPTIONAL_QUESTIONS = {
  optional: optionalOptionsConfig,
  flat: flattenOptionalOptionsConfig(optionalOptionsConfig),
};

export default OPTIONAL_QUESTIONS;

