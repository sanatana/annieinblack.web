import permissions from './company.config';

describe('Company limitations are set up correctly when', () => {
  it('account user limits are set', () => {
    testUserLimitsPerTier();
  });

  it('company account user rank limits', () => {
    testUserRankLimitsPerTier();
  });

  it('company account reply limits', () => {
    testCompanyReplyLimits();
  });

  it('company admin permissions are set', () => {
    testCompanyAccountPermissions();
  });

  const testUserLimitsPerTier = () => {
    const keys = Object.keys(permissions.USER_LIMIT_PER_TIER);
    expect(keys.length).toBe(3);
    expect(keys).toContain('FREE');
    expect(keys).toContain('STARTUP');
    expect(keys).toContain('SCALEUP');

    expect(permissions.USER_LIMIT_PER_TIER.FREE).toBe(1);
    expect(permissions.USER_LIMIT_PER_TIER.STARTUP).toBe(2);
    expect(permissions.USER_LIMIT_PER_TIER.SCALEUP).toBe(10);
  };

  const testUserRankLimitsPerTier = () => {
    const keys = Object.keys(permissions.RANK_PERMISSIONS);
    expect(keys.length).toBe(3);
    expect(keys).toContain('FREE');
    expect(keys).toContain('STARTUP');
    expect(keys).toContain('SCALEUP');

    expect(permissions.RANK_PERMISSIONS.FREE).toStrictEqual([1]);
    expect(permissions.RANK_PERMISSIONS.STARTUP).toStrictEqual([1,2]);
    expect(permissions.RANK_PERMISSIONS.SCALEUP).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  };

  const testCompanyReplyLimits = () => {
    const keys = Object.keys(permissions.REPLY_WEEKLY_LIMITS);
    expect(keys.length).toBe(3);
    expect(keys).toContain('FREE');
    expect(keys).toContain('STARTUP');
    expect(keys).toContain('SCALEUP');

    expect(permissions.REPLY_WEEKLY_LIMITS.FREE).toBe(2);
    expect(permissions.REPLY_WEEKLY_LIMITS.STARTUP).toBe(100);
    expect(permissions.REPLY_WEEKLY_LIMITS.SCALEUP).toBe(0);
  };

  const testCompanyAccountPermissions = () => {
    const keys = Object.keys(permissions.ROLE_PERMISSIONS);
    expect(keys.length).toBe(6);
    expect(keys).toContain('about');
    expect(keys).toContain('comms');
    expect(keys).toContain('users');
    expect(keys).toContain('subscription');
    expect(keys).toContain('contact');
    expect(keys).toContain('image');
  };
});
