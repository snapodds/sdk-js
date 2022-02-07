import { InjectionToken } from '@angular/core';

/**
 * InjectionToken for the browser navigator implementation
 */
export const NAVIGATOR = new InjectionToken<Navigator>('browser navigator implementation', {
  providedIn: 'root',
  factory: () => navigator,
});
