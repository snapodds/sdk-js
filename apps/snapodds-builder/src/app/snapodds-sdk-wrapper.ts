import { BannerSdkBuilder } from './banner-sdk.builder';
import { OddsSdkBuilder } from './odds-sdk.builder';
import { SdkBuilder } from './sdk-builder';
import { SnapSdkBuilder } from './snap-sdk.builder';

/**
 * Entry point for the user to interact with the different SDK Builders
 */
export class SnapoddsSdkWrapper {
  static bannerBuilder: () => SdkBuilder = () => new BannerSdkBuilder();
  static oddsBuilder: () => SdkBuilder = () => new OddsSdkBuilder();
  static snapBuilder: () => SdkBuilder = () => new SnapSdkBuilder();
}
