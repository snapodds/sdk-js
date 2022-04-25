import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { nanoid } from 'nanoid';
import * as UAParser from 'ua-parser-js';

import { environment } from '../../../environments/environment';
import { ApplicationConfigService } from '../../config/application-config.service';
import { CustomerApplicationConfigService } from '../../config/customer-application-config.service';
import { LoggerService } from '../../logger/logger.service';
import { STORAGE } from '../../tokens/storage-token';
import { UA_PARSER } from '../../tokens/ua-parser-token';
import { AnalyticsEventType } from '../analytics-event-type';
import { AnalyticsProperties } from '../analytics-properties';
import { AnalyticsService } from '../analytics.service';
import { SegmentTrackEvent } from './segment-track-event';

@Injectable()
export class SegmentAnalyticsService extends AnalyticsService {
  readonly serviceUrl = 'https://api.segment.io/v1/track';
  readonly storageKeySegmentAnonymousId = 'SEGMENT_ANONYMOUS_ID';

  constructor(
    private readonly http: HttpClient,
    private readonly ngZone: NgZone,
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly customerApplicationConfigService: CustomerApplicationConfigService,
    private readonly logger: LoggerService,
    @Inject(UA_PARSER) private readonly uaParser: UAParser,
    @Inject(STORAGE) private readonly storage: Storage
  ) {
    super();
  }

  protected trackEvent(event: AnalyticsEventType, properties?: AnalyticsProperties): void {
    const writeKey = this.customerApplicationConfigService.getSegmentWriteKey();
    const mode = this.applicationConfigService.getSdkMode();

    if (writeKey) {
      const data: SegmentTrackEvent = this.createSegmentDate(event, { ...properties, mode });
      const headers = { Authorization: `Basic ${btoa(`${writeKey}:`)}` };

      this.ngZone.runOutsideAngular(() => {
        this.http.post<SegmentTrackEvent>(this.serviceUrl, data, { headers }).subscribe({
          next: () => this.logger.debug('Segment Event Tracked', { event, properties, data }),
          error: () => this.logger.warn('Segment Event Tracking Failed', { event, properties, data }),
        });
      });
    }
  }

  private getAnonymousId(): string {
    let anonymousId = this.storage.getItem(this.storageKeySegmentAnonymousId);

    if (!anonymousId) {
      anonymousId = nanoid();
      this.storage.setItem(this.storageKeySegmentAnonymousId, anonymousId);
    }

    return anonymousId;
  }

  private createSegmentDate(event: AnalyticsEventType, properties?: AnalyticsProperties): SegmentTrackEvent {
    return {
      event,
      anonymousId: this.getAnonymousId(),
      context: {
        library: {
          name: 'sdk-web',
          version: environment.sdkVersion,
        },
        os: {
          name: this.uaParser.getOS().name,
          version: this.uaParser.getOS().version,
        },
        browser: {
          name: this.uaParser.getBrowser().name,
          version: this.uaParser.getBrowser().version,
        },
        engine: {
          name: this.uaParser.getEngine().name,
          version: this.uaParser.getEngine().version,
        },
        device: {
          name: this.uaParser.getDevice().model,
          manufacturer: this.uaParser.getDevice().vendor,
          type: this.uaParser.getDevice().type,
        },
      },
      properties,
      timestamp: new Date().toISOString(),
    };
  }
}
