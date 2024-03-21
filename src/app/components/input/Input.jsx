import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.css';

function Input({ name, labelName, inputProps = {}, ...props }) {
  return (
    <>
      <label className={styles.formInputLabel + ' text-md'} htmlFor={name}>
        {labelName}
      </label>
      {inputProps.type === 'textarea' ? (
        <textarea {...props} id={name} name={name} {...inputProps} />
      ) : (
        <input {...props} id={name} name={name} {...inputProps} />
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
