import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('browser window implementation', {
  providedIn: 'root',
  factory: () => window,
});
