import PropTypes from 'prop-types';

import './error.css';

function Error({ title, message }) {
  return (
    <div className="error-message text-md">
      <div className="text-lg">{title}</div>
      <p>{message}</p>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default Error;
