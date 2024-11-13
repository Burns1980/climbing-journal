import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Input } from '../../components';
import inputStyles from './input-field.module.css';

const InputField = ({ field, error }) => {
  const { routeId } = useParams();
  const inputType = field.type;
  const inputProps = field?.configProps;

  const name = inputProps.name?.trim();

  const inputClassName = `${
    inputType === 'textarea' ? inputStyles.formtextArea : inputStyles.formInput
  } text-sm`;

  // console.log('use params', routeId);

  return (
    <div className={`${inputStyles.inputContainer} text-sm`}>
      <Input
        className={inputClassName}
        name={name}
        inputType={inputType}
        inputLabel={field.label}
        error={error}
        {...inputProps}
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
