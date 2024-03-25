import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../components';
import inputStyles from './input-field.module.css';

const InputField = ({ field }) => {
  const controlType = Object.keys(field).find(
    (key) =>
      typeof field[key] === 'object' && Object.hasOwn(field[key], 'props')
  );

  const props = field[controlType]?.props;

  const id = props?.name?.trim();

  const inputClassName = `${
    controlType === 'textarea'
      ? inputStyles.formtextArea
      : inputStyles.formInput
  } text-sm`;

  return (
    <div className={`${inputStyles.inputContainer} text-sm`}>
      <Input
        className={inputClassName}
        id={id}
        controlType={controlType}
        labelName={field.label}
        {...props}
      />
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string.isRequired,
    input: PropTypes.shape({
      props: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
    textarea: PropTypes.shape({
      props: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
    select: PropTypes.shape({
      props: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default InputField;
