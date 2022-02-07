import { InjectionToken } from '@angular/core';

/**
 * InjectionToken for the browser window implementation
 */
export const WINDOW = new InjectionToken<Window>('browser window implementation', {
  providedIn: 'root',
  factory: () => window,
});
