import { sportEventTvSearchMock } from '@response/mocks';
import { mock } from 'jest-mock-extended';
import { SportsMediaSdkBuilder } from './sports-media-sdk.builder';
import { SnapOddsSdkElement } from './snap-odds-sdk-element.type';

describe('SportsMediaSdkBuilder', () => {
  let builder: SportsMediaSdkBuilder;
  let sdk: SnapOddsSdkElement;

  const body = mock<HTMLElement>();

  beforeEach(() => {
    builder = new SportsMediaSdkBuilder();
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
