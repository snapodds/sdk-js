import { InjectionToken } from '@angular/core';

/**
 * InjectionToken for the browser document implementation
 */
export const DOCUMENT = new InjectionToken<Document>('browser document implementation', {
  providedIn: 'root',
  factory: () => document,
});
