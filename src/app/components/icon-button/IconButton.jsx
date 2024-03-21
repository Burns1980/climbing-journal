import PropTypes from 'prop-types';

import './iconButton.css';

function IconButton({ iconClassName, ...props }) {
  return (
    <button {...props}>
      <i className={iconClassName}></i>
    </button>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
};

export default IconButton;
