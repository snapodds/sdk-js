import { SportsMediaSdkBuilder } from './sports-media-sdk.builder';
import { OddsSdkBuilder } from './odds-sdk.builder';
import { SdkBuilder } from './sdk-builder';
import { OperatorsSdkBuilder } from './operators-sdk.builder';

/**
 * Entry point for the user to interact with the different SDK Builders
 */
export class SnapoddsSdkWrapper {
  static sportsMediaBuilder: () => SdkBuilder = () => new SportsMediaSdkBuilder();
  static operatorsBuilder: () => SdkBuilder = () => new OperatorsSdkBuilder();
  static oddsBuilder: () => SdkBuilder = () => new OddsSdkBuilder();
}
