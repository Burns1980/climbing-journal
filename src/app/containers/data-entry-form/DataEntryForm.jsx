import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import InputField from './InputField';
import { groupFieldsIntoRows } from './helpers';
import styles from './data-entry-form.module.css';

function DataEntryForm({ title, fields }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit value');
  };

  const inputRows = groupFieldsIntoRows(
    fields.filter((field) => field.inputProps.type !== 'textarea')
  );
  const textAreaFields = fields.filter(
    (field) => field.inputProps.type === 'textarea'
  );

  return (
    <section className={styles.formContainer}>
      <h2 className={`${styles.formHeader} text-xl text-center header-margin`}>
        {title}
      </h2>
      <form
        className={styles.formInputs}
        onSubmit={handleSubmit}
        method="dialog"
      >
        {inputRows.map((row, idx) => (
          <div className={styles.rowContainer} key={idx}>
            {row.map((field) => (
              <InputField key={field.name} field={field} />
            ))}
          </div>
        ))}
        {textAreaFields.map((field) => (
          <InputField key={field.name} field={field} />
        ))}
        <div className={`${styles.buttonRow}`}>
          <Button className={`btn text-md ${styles.formButton}`} type="submit">
            Save
          </Button>
          <Button className={`btn-secondary text-md ${styles.formButton}`}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}

DataEntryForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      inputProps: PropTypes.object,
    })
  ).isRequired,
};

export default DataEntryForm;
