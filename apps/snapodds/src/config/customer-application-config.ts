export interface CustomerApplicationConfig {
  /**
   * The flag indicating whether AutoSnap is enabled for this customer
   */
  autoSnapEnabled: boolean;

  /**
   * The minimum interval between two AutoSnap attempts (in milliseconds)
   */
  autoSnapMinInterval: number;

  /**
   * The maximum time interval until we stop AutoSnapping after no results were found and the user has to perform a manual snap instead (in milliseconds)
   */
  autoSnapMaxTimeoutDuration: number;
}
