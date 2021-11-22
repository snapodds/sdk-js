import { InjectionToken } from '@angular/core';

export const NAVIGATOR = new InjectionToken<Navigator>('browser navigator implementation', {
  providedIn: 'root',
  factory: () => navigator,
});
