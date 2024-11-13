import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../';
import styles from './input.module.css';

function Input({ className, inputLabel, name, inputType, error, ...props }) {
  let controlComponent;

  if (error) {
    props['aria-describedby'] = `${name}-error`;
  }

  const commonClassNames = `${className} ${error && styles.errorBorder}`;

  switch (inputType) {
    case 'textarea':
      controlComponent = (
        <textarea
          className={commonClassNames}
          id={name}
          name={name}
          {...props}
        />
      );
      break;
    case 'input':
      controlComponent = (
        <input className={commonClassNames} id={name} name={name} {...props} />
      );
      break;
    case 'select':
      controlComponent = (
        <Select
          className={commonClassNames}
          id={name}
          name={name}
          {...props}
        ></Select>
      );
      break;
    default:
      controlComponent = <div>Invalid control type</div>;
  }

  return (
    <>
      <label className={styles.formInputLabel + ' text-md'} htmlFor={name}>
        {inputLabel}
      </label>
      {controlComponent}
      {error && (
        <div id={`${name}-error`} className={styles.controlError + ' text-sm'}>
          {error}
        </div>
      )}
    </>
  );
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(['input', 'textarea', 'select']).isRequired,
  error: PropTypes.string,
};

export default Input;
