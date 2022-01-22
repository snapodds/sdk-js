import { sportEventTvSearchMock } from '@response/mocks';
import { mock } from 'jest-mock-extended';
import { OddsSdkBuilder } from './odds-sdk.builder';
import { SnapOddsSdkElement } from './snap-odds-sdk-element.type';

describe('OddsSdkBuilder', () => {
  let builder: OddsSdkBuilder;
  let sdk: SnapOddsSdkElement;

  const body = mock<HTMLElement>();

  beforeEach(() => {
    builder = new OddsSdkBuilder();
  });

  it('should assign the tvSearchResult to the sdk', () => {
    console.log(sportEventTvSearchMock);
    const tvSearchResult = sportEventTvSearchMock.resultEntries[0];

    builder.setTvSearchResult(tvSearchResult).appendTo(body);
    sdk = body.appendChild.mock.calls[0][0] as SnapOddsSdkElement;

    expect(sdk.tvSearchResult).toBe(tvSearchResult);
  });
});
