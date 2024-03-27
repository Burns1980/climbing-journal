import React from 'react';
import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import InputField from './InputField';
import { groupFieldsIntoRows } from './helpers';
import styles from './data-entry-form.module.css';
import { fieldTypes } from '../../pages/routes-page/config';

function DataEntryForm({ fields }) {
  const inputRows = groupFieldsIntoRows(
    fields.filter((field) => field.type !== fieldTypes.textarea)
  );
  const textAreaFields = fields.filter(
    (field) => field.type === fieldTypes.textarea
  );

  return (
    <div className={styles.formContainer}>
      <Form className={styles.formInputs} method="post">
        {inputRows.map((row, idx) => (
          <div className={styles.rowContainer} key={idx}>
            {row.map((field, idx) => (
              <InputField key={idx} field={field} />
            ))}
          </div>
        ))}
        {textAreaFields.map((field, idx) => (
          <InputField key={idx} field={field} />
        ))}
        <div className={`${styles.buttonRow}`}>
          <Button type="submit" className={`btn text-md ${styles.formButton}`}>
            Save
          </Button>
          <Button className={`btn-secondary text-md ${styles.formButton}`}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

DataEntryForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ),
};

export default DataEntryForm;
