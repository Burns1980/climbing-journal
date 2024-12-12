import PropTypes from 'prop-types';

import { Select } from '../';
import styles from './input.module.css';

function Input({
  inputElementType,
  handleChange,
  label,
  configProps,
  stateObj,
  error,
}) {
  let inputComponent;
  const { name } = configProps;

  if (error) {
    configProps['aria-describedby'] = `${name}-error`;
  }

  const inputClassName = `${
    inputElementType === 'textarea' ? styles.formtextArea : styles.formInput
  } text-sm`;

  const commonClassNames = `${inputClassName} ${
    error ? styles.errorBorder : ''
  }`;

  switch (inputElementType) {
    case 'textarea':
      inputComponent = (
        <textarea
          className={commonClassNames}
          id={name}
          onChange={handleChange}
          value={stateObj.value}
          disabled={stateObj.isDisabled}
          {...configProps}
        />
      );
      break;
    case 'input':
      inputComponent = (
        <input
          className={commonClassNames}
          id={name}
          onChange={handleChange}
          value={stateObj.value}
          disabled={stateObj.isDisabled}
          {...configProps}
        />
      );
      break;
    case 'select':
      inputComponent = (
        <Select
          className={commonClassNames}
          id={name}
          onChange={handleChange}
          value={stateObj.value}
          disabled={stateObj.isDisabled}
          options={stateObj.options}
          {...configProps}
        ></Select>
      );
      break;
    default:
      inputComponent = <div>Invalid control type</div>;
  }

  return (
    <div className={`${styles.inputContainer} text-sm`}>
      <label className={styles.formInputLabel + ' text-md'} htmlFor={name}>
        {label}
      </label>
      {inputComponent}
      {error && (
        <div id={`${name}-error`} className={styles.controlError + ' text-sm'}>
          {error}
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  inputElementType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  configProps: PropTypes.object,
  stateObj: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default Input;
