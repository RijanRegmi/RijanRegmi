/**
 * Cookie and Session Management Utilities
 */

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Get cookie value by name on the client-side
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Set cookie value on the client-side
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return;
  
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    } else {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
  }

  cookieString += `; path=${options.path || '/'}`;
  if (options.domain) cookieString += `; domain=${options.domain}`;
  if (options.secure) cookieString += '; secure';
  if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

  document.cookie = cookieString;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return;
  setCookie(name, '', { expires: -1, path });
}
