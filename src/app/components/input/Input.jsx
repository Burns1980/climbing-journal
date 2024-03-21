import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.css';

function Input({ name, labelName, inputProps = {} }) {
  return (
    <>
      <label className={styles.formInputLabel + ' text-md'} htmlFor={name}>
        {labelName}
      </label>
      {inputProps.type === 'textarea' ? (
        <textarea
          className={styles.formtextArea}
          id={name}
          name={name}
          {...inputProps}
        />
      ) : (
        <input
          className={styles.formInput}
          {...inputProps}
          id={name}
          name={name}
        />
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
