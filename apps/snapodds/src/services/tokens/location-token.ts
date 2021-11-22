import { InjectionToken } from '@angular/core';

export const LOCATION = new InjectionToken<Location>('browser location implementation', {
  providedIn: 'root',
  factory: () => location,
});
