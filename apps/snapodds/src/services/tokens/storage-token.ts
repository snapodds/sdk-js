import { InjectionToken } from '@angular/core';

/**
 * InjectionToken for the browser local storage implementation
 */
export const STORAGE = new InjectionToken<Storage>('browser local storage implementation', {
  providedIn: 'root',
  factory: () => localStorage,
});
