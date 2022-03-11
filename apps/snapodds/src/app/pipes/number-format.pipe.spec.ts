import { NumberFormatPipe } from './number-format.pipe';

describe('NumberFormatPipe', () => {
  let pipe: NumberFormatPipe;

  beforeEach(() => {
    pipe = new NumberFormatPipe();
  });

  it('should map null to empty string', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should prepend a plus sign to a positive number', () => {
    expect(pipe.transform(100)).toBe('+100');
  });

  it('should prepend a minus sign to a negative number', () => {
    expect(pipe.transform(-100)).toBe('-100');
  });
});
