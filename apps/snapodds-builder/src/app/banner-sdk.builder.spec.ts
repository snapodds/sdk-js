import { sportEventTvSearchMock } from '@response/mocks';
import { mock } from 'jest-mock-extended';
import { BannerSdkBuilder } from './banner-sdk.builder';
import { SnapOddsSdkElement } from './snap-odds-sdk-element.type';

describe('BannerSdkBuilder', () => {
  let builder: BannerSdkBuilder;
  let sdk: SnapOddsSdkElement;

  const body = mock<HTMLElement>();

  beforeEach(() => {
    builder = new BannerSdkBuilder();
  });

  it('should assign the tvSearchResult to the sdk on callback', () => {
    const resultsCallback: jest.Mock = jest.fn();
    const tvSearchResult = sportEventTvSearchMock.resultEntries[0];

    builder.onResults(resultsCallback).appendTo(body);
    sdk = body.appendChild.mock.calls[0][0] as SnapOddsSdkElement;
    sdk.resultsCallback?.(tvSearchResult);

    expect(sdk.tvSearchResult).toBe(tvSearchResult);
    expect(resultsCallback).toHaveBeenCalledWith(tvSearchResult);
  });
});
