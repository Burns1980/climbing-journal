import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Input } from '../../components';
import inputStyles from './input-field.module.css';

const InputField = ({ field, controlProps, error }) => {
  const { routeId } = useParams();
  const controlType = field.type;
  const configProps = field?.configProps;

  const id = configProps?.name?.trim();

  const inputClassName = `${
    controlType === 'textarea'
      ? inputStyles.formtextArea
      : inputStyles.formInput
  } text-sm`;

  // console.log('use params', routeId);

  return (
    <div className={`${inputStyles.inputContainer} text-sm`}>
      <Input
        className={inputClassName}
        id={id}
        controlType={controlType}
        labelName={field.label}
        error={error}
        {...configProps}
        {...controlProps}
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
