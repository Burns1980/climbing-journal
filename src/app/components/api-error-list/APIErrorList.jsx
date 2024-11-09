import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import styles from './api-error-list.module.css';

const APIErrorList = forwardRef(function APIErrorList({ data }, ref) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      ref={ref}
      id="errorSummary"
      className={`${styles.errorContainer} text-sm`}
    >
      <h3 className="text-md">The following fields have errors</h3>
      <ul>
        {Object.entries(data).map(([fieldName, message]) => {
          return <li key={fieldName}>{`- ${message}`}</li>;
        })}
      </ul>
    </div>
  );
});

APIErrorList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default APIErrorList;
