import PropTypes from 'prop-types';

import './iconButton.css';

function IconButton({ className }) {
  return (
    <button>
      <i className={className}></i>
    </button>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
};

export default IconButton;
