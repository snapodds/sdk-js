/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

declare const gtag: Function;
declare const ga: Function;

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  readonly category = 'SnapscreenSDK';
  readonly label = 'JS/1.0.0';

  constructor(private readonly logger: LoggerService) {}

  /**
   * Tracks analytics based on which analytics service is available.
   * Fallback to the LoggerService if neither GoogleAnalytics nor GoogleTagManager is available-
   * @param action: the action of the event to track
   * @param value: the value of the event to track
   * @private
   */
  private trackEvent(action: string, value?: number | string) {
    try {
      if (this.isGoogleAnalytics()) {
        this.trackGoogleAnalyticsEvent(action);
      } else if (this.isGoogleTagManager()) {
        this.trackGoogleTagManagerEvent(action);
      } else {
        this.logger.info('Tracked event', {
          eventCategory: this.category,
          eventAction: action,
          eventLabel: this.label,
          eventValue: value,
        });
      }
    } catch (error) {
      this.logger.error('Failed to track event', error);
    }
  }

  /**
   * Checks if GoogleAnalytics is globally available
   * @private
   */
  private isGoogleAnalytics(): boolean {
    return typeof ga === 'function';
  }

  /**
   * Track Event using GoogleAnalytics
   * @param action
   * @private
   */
  private trackGoogleAnalyticsEvent(action: string): void {
    ga('send', {
      hitType: 'pageview',
      transport: 'beacon',
      page: `/${this.category}/${this.label}/${action}`,
      title: `${this.category}: ${action}`,
    });
  }

  /**
   * Checks if GoogleTagManager is globally available
   * @private
   */
  private isGoogleTagManager(): boolean {
    return typeof gtag === 'function';
  }

  /**
   * Track Event using GoogleTagManager
   * @param action
   * @private
   */
  private trackGoogleTagManagerEvent(action: string): void {
    gtag('event', 'page_view', {
      page_path: `/${this.category}/${this.label}/${action}`,
      page_title: `${this.category}: ${action}`,
    });
  }

  sdkInitialized() {
    this.trackEvent('SnapSdkInit');
  }

  snapViewOpened() {
    this.trackEvent('SnapViewOpen');
  }

  snapViewSnap() {
    this.trackEvent('SnapViewSnap');
  }

  snapViewSnapResult(duration: number) {
    this.trackEvent('SnapViewSnapResult', duration);
  }

  snapViewSnapFailed(duration: number) {
    this.trackEvent('SnapViewSnapFail', duration);
  }

  snapViewSnapNegative(duration: number) {
    this.trackEvent('SnapViewSnapNegative', duration);
  }

  snapViewClosed() {
    this.trackEvent('SnapViewClose');
  }
}
