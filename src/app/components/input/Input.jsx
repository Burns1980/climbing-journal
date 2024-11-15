import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../';
import styles from './input.module.css';

// TODO: Make sure to clear the state in the clear form modal
function Input({ field, error, ...props }) {
  let controlComponent;
  const { inputElementType, label, configProps } = field;
  const { name } = configProps;

  if (error) {
    props['aria-describedby'] = `${name}-error`;
  }

  const inputClassName = `${
    inputElementType === 'textarea' ? styles.formtextArea : styles.formInput
  } text-sm`;

  const commonClassNames = `${inputClassName} ${
    error ? styles.errorBorder : ''
  }`;

  switch (inputElementType) {
    case 'textarea':
      controlComponent = (
        <textarea
          className={commonClassNames}
          id={name}
          {...props}
          {...field.configProps}
        />
      );
      break;
    case 'input':
      controlComponent = (
        <input
          className={commonClassNames}
          id={name}
          {...props}
          {...field.configProps}
        />
      );
      break;
    case 'select':
      controlComponent = (
        <Select
          className={commonClassNames}
          id={name}
          {...props}
          {...field.configProps}
        ></Select>
      );
      break;
    default:
      controlComponent = <div>Invalid control type</div>;
  }

  return (
    <div className={`${styles.inputContainer} text-sm`}>
      <label className={styles.formInputLabel + ' text-md'} htmlFor={name}>
        {label}
      </label>
      {controlComponent}
      {error && (
        <div id={`${name}-error`} className={styles.controlError + ' text-sm'}>
          {error}
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default Input;
