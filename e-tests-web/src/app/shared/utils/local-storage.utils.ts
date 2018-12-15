/**
 *    Methods used for inserting and deleting data to browser local storage
 */
export class LocalStorageUtils {

  public static setObject(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public static getObject(key: string): any {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  public static removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }
}
