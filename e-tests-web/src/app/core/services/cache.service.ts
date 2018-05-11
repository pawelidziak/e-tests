import {Injectable} from '@angular/core';

const DEFAULT_EXPIRE = 900000; // 15 min - should be the same as token expired

@Injectable()
export class CacheService {

  private cache: Map<string, CacheContent> = new Map<string, CacheContent>();

  constructor() {
  }

  set(key: string, value: any): void {
    const content: CacheContent = {
      value: value,
      expiry: Date.now() + DEFAULT_EXPIRE
    };
    this.cache.set(key, content);
  }

  get(key: string): any {
    if (this.hasValidCachedValue(key)) {
      return this.cache.get(key).value;
    }
  }

  clear(key: string): void {
    this.cache.delete(key);
  }

  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Checks if the key exists and   has not expired.
   */
  private hasValidCachedValue(key: string): boolean {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }

  }
}

interface CacheContent {
  value: any;
  expiry: number;
}
