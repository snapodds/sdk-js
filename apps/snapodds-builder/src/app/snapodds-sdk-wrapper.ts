import { BannerSdkBuilder } from './banner-sdk.builder';
import { OddsSdkBuilder } from './odds-sdk.builder';
import { SdkBuilder } from './sdk-builder';
import { SnapSdkBuilder } from './snap-sdk.builder';

export class SnapoddsSdkWrapper {
  static bannerBuilder: () => SdkBuilder = () => new BannerSdkBuilder();
  static oddsBuilder: () => SdkBuilder = () => new OddsSdkBuilder();
  static snapBuilder: () => SdkBuilder = () => new SnapSdkBuilder();
}
