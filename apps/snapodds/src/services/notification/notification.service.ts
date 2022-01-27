import { Inject, Injectable } from '@angular/core';
import { ApplicationConfigService } from '../config/application-config.service';
import { NAVIGATOR } from '../tokens/navigator-token';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    @Inject(NAVIGATOR) private readonly navigator: Navigator,
    private readonly applicationConfigService: ApplicationConfigService
  ) {}

  notify(): void {
    if (this.applicationConfigService.isVibrateEnabled() && this.hasVibrationApi()) {
      this.navigator.vibrate(200);
    }
  }

  private hasVibrationApi(): boolean {
    return typeof this.navigator?.vibrate === 'function';
  }
}
