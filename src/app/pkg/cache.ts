export class Cache {
  static readonly prefix = 'XN';

  /**
   * Make cache key
   * @param key string
   * @returns string
   */
  private static cacheKey(key: string) {
    return [this.prefix, key].join('.').toUpperCase();
  }

  /**
   * Put cache
   *
   * @param key string
   * @param value any
   * @param ttl number in seconds, 0 as forver
   * @returns
   */
  static put(key: string, value: any, ttl: number = 0) {
    const cacheValue = {
      value,
      ttl: ttl > 0 ? Date.now() + ttl : ttl,
    };

    localStorage.setItem(this.cacheKey(key), JSON.stringify(cacheValue));

    return !!this.get(key);
  }

  /**
   * Get cache
   *
   * @param key string
   * @returns any
   */
  static get(key: string) {
    const cacheValue = localStorage.getItem(this.cacheKey(key));
    if (!cacheValue) {
      return null;
    }

    const cache = JSON.parse(cacheValue);
    if (cache.ttl > 0 && cache.ttl < Date.now()) {
      this.remove(key);
      return null;
    }

    return cache.value;
  }

  /**
   * Remove cache
   *
   * @param key string
   * @returns boolean
   */
  static remove(key: string) {
    localStorage.removeItem(this.cacheKey(key));

    return !!this.get(key);
  }

  /**
   * Clean all cache
   *
   * @returns number
   */
  static clean() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
        total++;
      }
    }

    return total;
  }
}
