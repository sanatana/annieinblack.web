import { compress, decompress } from 'lz-string';

class CustomStorage {
  constructor(type = 'local') {
    if (type !== 'session' && type !== 'local') {
      throw new Error(`Storage must be one of 'local' or 'session'`);
    }

    this.storage = window[`${type}Storage`];
    this.enabled = this.isAvailable();
  }

  isAvailable() {
    try {
      this.storage.setItem('test', 'test');
      this.storage.removeItem('test');

      return true;
    } catch {
      return false;
    }
  };

  set(key, val) {
    if (this.enabled) {
      const value = typeof val === 'object' ? JSON.stringify(val) : val;
      this.storage.setItem(key, value);
    }
  };

  get(key, options = { parse: false }) {
    if (this.enabled) {
      if (options.parse) {
        const value = this.storage.getItem(key);
        return value ? JSON.parse(value) : null;
      }
      return this.storage.getItem(key);
    }

    return null;
  };

  remove(key) {
    if (this.enabled) {
      this.storage.removeItem(key);
    }
  };

  setEncrypted(key, val) {
    if (!this.enabled) {
      return;
    }

    const value = typeof val === 'object' ? JSON.stringify(val) : val;
    this.storage.setItem(key, compress(value));
  };

  getDecrypted(key, options = { parse: false }) {
    const data = this.storage.getItem(key);

    if (data) {
      const temp = decompress(data);

      if (temp && options.parse) {
        return JSON.parse(temp);
      }

      if (temp) {
        return temp;
      }
    }

    return null;
  };
}

export default CustomStorage;
