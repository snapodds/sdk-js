/**
 * A Customer
 */
export interface Customer {
  /**
   * The id of a customer
   */
  id: number;

  /**
   * The clientId of a customer
   */
  clientId: string;

  /**
   * The name of the customer.
   */
  name: string;

  /**
   * 	Whether upload of media (original and preprocessed images, recording) used for TV search enabled for the customer.
   */
  tvSearchUploadEnabled: boolean;

  /**
   * The quality of the TV search image to upload.
   */
  tvSearchUploadQuality: number;

  /**
   * Whether search for pages available for the customer.
   */
  webSearchPageEnabled: boolean;

  /**
   * Whether thumbnails of found pages available for the customer.
   */
  webSearchPageThumbnailEnabled: boolean;

  /**
   * Whether search for images available for the customer.
   */
  webSearchImageEnabled: boolean;

  /**
   * Whether search for videos available for the customer.
   */
  webSearchVideoEnabled: boolean;

  /**
   * The flag indicating whether AutoSnap is enabled for this customer.
   */
  autoSnapEnabled: boolean;

  /**
   * 	The minimum interval between two AutoSnap attempts (in milliseconds).
   */
  autoSnapMinInterval: number;

  /**
   * The maximum time interval until we stop AutoSnapping after no results were found
   * and the user has to perform a manual snap instead (in milliseconds).
   */
  autoSnapMaxTimeoutDuration: number;

  /**
   * The tracking id for the Google Analytics.
   */
  gaTrackingId: string;

  /**
   *  The write key for the Segment Analytics.
   */
  segmentWriteKey: string;

  _links: {
    self: {
      href: string;
    };
  };
}
