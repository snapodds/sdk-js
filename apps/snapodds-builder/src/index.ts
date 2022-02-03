/**
 * Make the SDK Builder available on the global scope
 */
import { SnapoddsSdkWrapper } from './app/snapodds-sdk-wrapper';

(window as any).SnapoddsSdk = SnapoddsSdkWrapper;
