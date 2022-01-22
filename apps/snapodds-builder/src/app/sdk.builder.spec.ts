import { mock } from 'jest-mock-extended';
import { SdkBuilder } from './sdk-builder';
import { SnapOddsSdkElement } from './snap-odds-sdk-element.type';

class TestSdkBuilder extends SdkBuilder {
  assignProperties(): void {
    // left blank intentionally
  }
}

describe('SdkBuilder', () => {
  let builder: TestSdkBuilder;
  let sdk: SnapOddsSdkElement;

  const apiUrl = 'http://example.org';
  const autoSnap = true;
  const language = 'en';
  const logLevel = 'info';
  const vibrate = true;
  const body = mock<HTMLElement>();

  let closeCallback: jest.Mock;
  let logCallback: jest.Mock;
  let resultsCallback: jest.Mock;
  let accessTokenProvider: jest.Mock;

  beforeEach(() => {
    closeCallback = jest.fn();
    logCallback = jest.fn();
    resultsCallback = jest.fn();
    accessTokenProvider = jest.fn();

    builder = new TestSdkBuilder();
    builder
      .setApiUrl(apiUrl)
      .setAutoSnap(autoSnap)
      .setLanguage(language)
      .setLogLevel(logLevel)
      .setVibrate(vibrate)
      .setAccessTokenProvider(accessTokenProvider)
      .onLog(logCallback)
      .onResults(resultsCallback)
      .onClose(closeCallback)
      .appendTo(body);

    sdk = body.appendChild.mock.calls[0][0] as SnapOddsSdkElement;
  });

  it('should build the sdk', () => {
    expect(body.appendChild).toHaveBeenCalled();
    expect(sdk.apiUrl).toBe(apiUrl);
    expect(sdk.autoSnap).toBe(autoSnap);
    expect(sdk.language).toBe(language);
    expect(sdk.logLevel).toBe(logLevel);
    expect(sdk.vibrate).toBe(vibrate);

    expect(sdk.accessTokenProvider).toBe(accessTokenProvider);
    expect(sdk.logCallback).toBe(logCallback);
  });

  it('should remove the sdk from the dom and call the close callback', () => {
    sdk.closeCallback?.();

    expect(body.removeChild).toHaveBeenCalledWith(sdk);
  });
});
