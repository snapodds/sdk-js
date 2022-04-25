import { mock } from 'jest-mock-extended';
import { OperatorsSdkBuilder } from './operators-sdk.builder';
import { SnapOddsSdkElement } from './snap-odds-sdk-element.type';

describe('OperatorSdkBuilder', () => {
  let builder: OperatorsSdkBuilder;
  let sdk: SnapOddsSdkElement;

  const body = mock<HTMLElement>();

  beforeEach(() => {
    builder = new OperatorsSdkBuilder();
  });

  it(`'should set the sdkMode to 'operator'`, () => {
    builder.appendTo(body);

    sdk = body.appendChild.mock.calls[0][0] as SnapOddsSdkElement;

    expect(sdk.sdkMode).toBe('operator');
  });
});
