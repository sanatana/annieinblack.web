import classList from './class_list';

describe('classList', () => {
  it('returns a string of class names appended to a base name', () => {
    const result = classList('base-class', { modifier: true });

    expect(result).toBe('base-class base-class--modifier');
  });

  it('does not append classes if they are false, null, undefined', () => {
    const result = classList('base-class', {
      modifier: true,
      falseModifier: false,
      nullModifier: null,
      undefinedModifier: undefined,
    });

    expect(result).toBe('base-class base-class--modifier');
  });

  it('converts modifiers to kebab case', () => {
    const result = classList('base-class', { camelCase: true });

    expect(result).toBe('base-class base-class--camel-case');
  });
});
