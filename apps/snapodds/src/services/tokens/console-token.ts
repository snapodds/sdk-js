import { InjectionToken } from '@angular/core';

/**
 * InjectionToken for the browser console implementation
 */
export const CONSOLE = new InjectionToken<Console>('browser console implementation', {
  providedIn: 'root',
  factory: () => console,
});
