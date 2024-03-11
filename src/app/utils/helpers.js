export const truncateTextByWords = (text, maxWords) => {
  if (maxWords <= 0) {
    return '';
  }

  const numOfWords = text.split(' ').length;

  if (numOfWords <= maxWords) {
    return text;
  }

  return text.split(' ').slice(0, maxWords).join(' ');
};
