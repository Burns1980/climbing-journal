import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../../components';
import inputStyles from './input-field.module.css';

const InputField = ({ field }) => {
  const name = field.name.trim();
  return (
    <div className={inputStyles.inputContainer + ' text-sm'}>
      <Input
        className={
          field.inputProps.type === 'textarea'
            ? inputStyles.formtextArea + ' text-sm'
            : inputStyles.formInput + ' text-sm'
        }
        name={name}
        id={name}
        labelName={field.label}
        inputProps={field.inputProps}
      />
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    inputProps: PropTypes.object,
  }).isRequired,
};

export default InputField;
