import { InjectionToken } from '@angular/core';
import * as UAParser from 'ua-parser-js';

/**
 * InjectionToken for the User agent parser implementation
 */
export const UA_PARSER = new InjectionToken<UAParser>('User agent parser implementation', {
  providedIn: 'root',
  factory: () => new UAParser(),
});
