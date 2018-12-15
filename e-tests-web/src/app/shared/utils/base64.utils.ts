/**
 *  Base64 encoding/decoding with special characters
 *  https://stackoverflow.com/a/30106551/7986258
 */
export class Base64Utils {

  public static b64EncodeUnicode(str) {
    console.log(str);
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  public static b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
