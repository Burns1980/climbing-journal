import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../../components';
import styles from './data-entry-form.module.css';

const InputField = ({ field }) => {
  const name = field.name.toLowerCase().replace(' ', '-').trim();
  return (
    <div className={styles.inputContainer + ' text-sm'}>
      <Input name={name} labelName={field.name} inputProps={field.inputProps} />
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
