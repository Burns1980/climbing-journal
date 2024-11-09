import PropTypes from 'prop-types';

import { Button } from '../';
import { truncateTextByWords } from '../../utils';

const TruncateText = ({ onClick, maxWords, text, ...props }) => {
  const numOfWordsInDescription = text.split(' ').length;
  const READ_MORE_WORD_COUNT = 5;

  return (
    <p {...props}>
      {numOfWordsInDescription <= maxWords
        ? text
        : `${truncateTextByWords(text, maxWords - READ_MORE_WORD_COUNT)}... `}
      {numOfWordsInDescription > maxWords && (
        <span>
          <Button
            onClick={onClick}
            className="btn-secondary clear-bg clear-spacing text-sm lnk"
          >
            click to read more
          </Button>
        </span>
      )}
    </p>
  );
};

TruncateText.propTypes = {
  maxWords: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  props: PropTypes.object,
};

export default TruncateText;
