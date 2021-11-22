import { InjectionToken } from '@angular/core';

export const CONSOLE = new InjectionToken<Console>('browser console implementation', {
  providedIn: 'root',
  factory: () => console,
});
