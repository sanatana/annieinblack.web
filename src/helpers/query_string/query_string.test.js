import QueryString from './index';

describe('queryString', () => {
  it('can get a key value pair from a query string', () => {
    const params = new QueryString('http://localhost:3000/page?hello=world&apple=banana');

    expect(params.get('hello')).toBe('world');
  });

  it('can get all key value pairs from a query string', () => {
    const params = new QueryString('http://localhost:3000/page?hello=world&apple=banana');

    expect(params.getAll('hello')).toEqual({ hello: 'world', apple: 'banana' });
  });

  it('returns null if the key does not exist', () => {
    const params = new QueryString('http://localhost:3000/page?hello=world&apple=banana');

    expect(params.get('nonExistent')).toBe(null);
  });

  it('can set a key value pair', () => {
    const params = new QueryString('http://localhost:3000/page?hello=world');
    params.set({ apple: 'banana' });

    expect(params.toString()).toBe('hello=world&apple=banana');
  });

  it('can delete a key value pair', () => {
    const params = new QueryString('http://localhost:3000/page?hello=world&apple=banana');
    params.delete('hello');

    expect(params.toString()).toBe('apple=banana');
  });

  it('fails silently if the key to be deleted does not exist', () => {
    const params = new QueryString('http://localhost:3000/page?hello=world&apple=banana');
    params.delete('nonExistent');

    expect(params.toString()).toBe('hello=world&apple=banana');
  });

  it('can set multiple key value pairs', () => {
    const params = new QueryString('http://localhost:3000/page');
    params.set({ apple: 'banana', hello: 'world' });

    expect(params.toString()).toBe('apple=banana&hello=world');
  });

  describe('can be used to construct query strings when no initial url is passed in', () => {
    it('get will return null as there is no url to query', () => {
      const params = new QueryString();

      expect(params.get('hello')).toBe(null);
    });

    it('getAll returns an empty object as there is no url to query', () => {
      const params = new QueryString();

      expect(params.getAll('hello')).toEqual({});
    });

    it('can set a key value pair', () => {
      const params = new QueryString();
      params.set({ apple: 'banana' });

      expect(params.toString()).toBe('apple=banana');
    });

    it('can delete a key value pair', () => {
      const params = new QueryString();
      params.set({ apple: 'banana', hello: 'world' });
      expect(params.toString()).toBe('apple=banana&hello=world');
      params.delete('hello');

      expect(params.toString()).toBe('apple=banana');
    });

    it('fails silently if the key to be deleted does not exist', () => {
      const params = new QueryString();
      params.set({ apple: 'banana', hello: 'world' });
      params.delete('nonExistent');

      expect(params.toString()).toBe('apple=banana&hello=world');
    });

    it('can set multiple key value pairs', () => {
      const params = new QueryString();
      params.set({ apple: 'banana', hello: 'world' });

      expect(params.toString()).toBe('apple=banana&hello=world');
    });
  });
});
