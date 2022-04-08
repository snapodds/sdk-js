import { AnalyticsEventType } from '../analytics-event-type';
import { AnalyticsProperties } from '../analytics-properties';

/**
 * Structure of the data sent for each track event to segment
 */
export interface SegmentTrackEvent {
  /**
   * A unique device/user identifier. identifierForVendor on iOS,
   * a uniquely generated identifier for the installation on Android.
   * The "identifierForVendor" is unique for an app installation
   * on a specific device and stays the same unless all the apps
   * of the developer are removed from the device.
   *
   * (Note for the SDK that means the developer from the app where the SDK is integrated!)
   */
  anonymousId: string;

  /**
   * Context to help identify the device from which the event was sent
   */
  context?: {
    app?: {
      /** The bundle/package identifier of the app containing the SDK */
      name: string;

      /** The version of the app containing the SDK */
      version: string;
    };

    library: {
      /** The name of the Snapscreen SDK. sdk-ios for iOS; sdk-android for Android  */
      name: 'sdk-web';

      /** The version number of the Snapscreen SDK */
      version: string;
    };

    os: {
      /** The name of the operating system. ios or android */
      name?: string;

      /** The version number of the operating system */
      version?: string;
    };

    browser: {
      /** The name of the browser */
      name?: string;

      /** The version number of the browser */
      version?: string;
    };

    device: {
      /** The device model */
      name?: string;

      /** The device manufacturer. Apple for iOS-Devices, Android more specific */
      manufacturer?: string;

      /** The device type. ios or android */
      type?: string;

      /** The hardware model name of the device */
      model?: string;
    };

    engine: {
      /** The name of the browser engine */
      name?: string;

      /** The version number of the engine */
      version?: string;
    };

    /** The client ID that the SDK is used with */
    groupId?: string;
  };

  /** The event type used to identify this event */
  event: AnalyticsEventType;

  /** The properties that contain additional data for each event type */
  properties?: AnalyticsProperties;

  /** Timestamp when the event was created */
  timestamp: string;
}
