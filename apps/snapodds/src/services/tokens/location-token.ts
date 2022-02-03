import { InjectionToken } from '@angular/core';

/**
 * InjectionToken for the browser location implementation
 */
export const LOCATION = new InjectionToken<Location>('browser location implementation', {
  providedIn: 'root',
  factory: () => location,
});
