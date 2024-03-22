import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.css';

function Input({ labelName, error, inputProps = {}, ...props }) {
  return (
    <>
      <label
        className={styles.formInputLabel + ' text-md'}
        htmlFor={props.name}
      >
        {labelName}
      </label>
      {inputProps.type === 'textarea' ? (
        <textarea {...props} {...inputProps} />
      ) : (
        <input {...props} {...inputProps} />
      )}
      {error && (
        <div className={styles.controlError + ' text-md'}>{<p>{error}</p>}</div>
      )}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
};

export default Input;
