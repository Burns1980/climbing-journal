import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../';
import styles from './input.module.css';

function Input({
  className,
  labelName,
  name,
  id,
  controlType,
  error,
  ...props
}) {
  let controlComponent;

  switch (controlType) {
    case 'textarea':
      controlComponent = (
        <textarea className={className} id={id} name={name} {...props} />
      );
      break;
    case 'input':
      controlComponent = (
        <input className={className} id={id} name={name} {...props} />
      );
      break;
    case 'select':
      controlComponent = (
        <Select
          className={`${className}`}
          id={id}
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
        {labelName}
      </label>
      {controlComponent}
      {error && (
        <div className={styles.controlError + ' text-md'}>{<p>{error}</p>}</div>
      )}
    </>
  );
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  controlType: PropTypes.oneOf(['input', 'textarea', 'select']).isRequired,
  error: PropTypes.string,
};

export default Input;
