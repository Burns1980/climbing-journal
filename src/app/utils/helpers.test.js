import { truncateTextByWords } from './helpers';

describe('truncateTextByWords', () => {
  const testText = 'This is test text for unit tests.';

  it('When maxwords is less than 0, an error should be thrown', () => {
    const throwError = () => truncateTextByWords(3, -6);
    expect(throwError).toThrow(/truncateTextByWords/);
  });

  it('When maxwords is 0, an empty string should be returned', () => {
    expect(truncateTextByWords(testText, 0)).toEqual('');
  });

  it('When text is not a string, an error should be thrown', () => {
    const throwError = () => truncateTextByWords(3, 6);
    expect(throwError).toThrow(/truncateTextByWords/);
  });

  it('When maxWords is not a number, an error should be thrown', () => {
    const throwError = () => truncateTextByWords('text here', 'taco');
    expect(throwError).toThrow(/truncateTextByWords/);
  });

  it('When maxWords is greater than the number of words in the string, the original string should be returned', () => {
    expect(truncateTextByWords(testText, 10)).toEqual(testText);
  });

  it('When maxWords is less than the number of words in the string, the string should be truncated to the number of maxWords', () => {
    expect(truncateTextByWords(testText, 3)).toEqual(
      testText.split(' ').slice(0, 3).join(' ')
    );
  });
});
