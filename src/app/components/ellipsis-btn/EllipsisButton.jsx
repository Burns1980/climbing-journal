import PropTypes from 'prop-types';
import { Button } from '../../components';

import './ellipsisButton.css';

function EllipsisButton({ handleClick }) {
  return (
    <Button
      className="btn-transparent"
      onClick={handleClick}
      aria-label="Open Menu"
    >
      <svg
        width="25px"
        height="30px"
        className="ellipsis-icon"
        fill="currentColor"
        viewBox="0 0 10 10"
      >
        <circle cx="5" cy="2" r="1" />
        <circle cx="5" cy="6" r="1" />
        <circle cx="5" cy="10" r="1" />
      </svg>
    </Button>
  );
}

EllipsisButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default EllipsisButton;
