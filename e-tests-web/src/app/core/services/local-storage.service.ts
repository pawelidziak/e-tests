import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  static setObject(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  static getObject(key: string): any {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  static removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
