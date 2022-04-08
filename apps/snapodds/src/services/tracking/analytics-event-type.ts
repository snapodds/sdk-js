/**
 * Various types of events that are tracked via segment
 */
export enum AnalyticsEventType {
  SDK_INIT = 'SDK Init',
  SNAP_OPEN = 'Snap Open',
  SNAP_CLOSE = 'Snap Close',
  MANUAL_SNAP = 'Manual Snap',
  SNAP_WITH_RESULT = 'Snap with result',
  SNAP_WITHOUT_RESULT = 'Snap without result',
  SNAP_FAILED = 'Snap failed',
  ODDS_OPEN = 'Odds Open',
}
