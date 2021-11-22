import { InjectionToken } from '@angular/core';

export const DOCUMENT = new InjectionToken<Document>('browser document implementation', {
  providedIn: 'root',
  factory: () => document,
});
