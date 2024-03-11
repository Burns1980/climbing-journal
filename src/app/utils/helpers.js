export const truncateTextByWords = (text, maxWords) => {
  if (typeof text !== 'string') {
    throw new Error(
      'The truncateTextByWords function received a value for "text" that is not a string'
    );
  }

  if (typeof maxWords !== 'number' || maxWords < 0) {
    throw new Error(
      'The truncateTextByWords function received a value for "maxWords" that is not a number or a value that is less than 0'
    );
  }

  if (maxWords <= 0 || text.length === 0) {
    return '';
  }

  const numOfWords = text.split(' ').length;

  if (numOfWords <= maxWords) {
    return text;
  }

  return text.split(' ').slice(0, maxWords).join(' ');
};
