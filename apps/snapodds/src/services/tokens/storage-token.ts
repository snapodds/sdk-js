import { InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('browser local storage implementation', {
  providedIn: 'root',
  factory: () => localStorage,
});
