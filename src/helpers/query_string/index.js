const FAKE_URL = 'http://localhost:3000';

class QueryString {
  params;
  url;

  constructor(string = FAKE_URL) {
    this.url = new URL(string);
    this.params = new URLSearchParams(this.url.search);
  }

  delete(key) {
    this.params.delete(key);
  };

  get(key) {
    return this.params.get(key);
  }

  getAll() {
    const params = {};
    this.params.forEach((value, key) => { params[key] = value; });

    return params;
  };

  set(values) {
    Object.keys(values).forEach((value) => {
      this.params.set(value, values[value]);
    });
  };

  toString() {
    return this.params.toString();
  }
}

export default QueryString;
