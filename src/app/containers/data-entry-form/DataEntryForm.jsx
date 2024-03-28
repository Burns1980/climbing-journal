import React, { useRef } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { Modal } from '../../containers';
import InputField from './InputField';
import { groupFieldsIntoRows } from './helpers';
import styles from './data-entry-form.module.css';
import { fieldTypes } from '../../pages/routes-page/config';
import { useMenuToggle } from '../../customHooks';

function DataEntryForm({ fields }) {
  const navigate = useNavigate();
  const modalRef = useRef();

  useMenuToggle();

  const inputRows = groupFieldsIntoRows(
    fields.filter((field) => field.type !== fieldTypes.textarea)
  );
  const textAreaFields = fields.filter(
    (field) => field.type === fieldTypes.textarea
  );

  function handleClearFormClick() {
    modalRef.current.open();
  }

  function handleClearForm(e) {
    modalRef.current.close();
  }

  function handleGoBack() {
    modalRef.current.close();
  }

  return (
    <>
      <Modal className={styles.confirmationModal} ref={modalRef}>
        <h2 className="text-lg">Are you sure you want to clear the form?</h2>
        <div className={styles.modalBtns}>
          <Button onClick={handleGoBack}>Go back</Button>
          <Button
            className={`${styles.btnMarginTop} btn-secondary text-md`}
            onClick={handleClearForm}
          >
            Clear form
          </Button>
        </div>
      </Modal>
      <div className={styles.formContainer}>
        <Form className={styles.formInputs} method="post">
          {inputRows.map((row) => (
            <div className={styles.rowContainer} key={row[0].props.name}>
              {row.map((field) => (
                <InputField key={field.props.name} field={field} />
              ))}
            </div>
          ))}
          {textAreaFields.map((field) => (
            <InputField key={field.props.name} field={field} />
          ))}
          <div className={`${styles.buttonRow}`}>
            <Button
              type="submit"
              className={`btn text-md ${styles.formButton}`}
            >
              Save route
            </Button>
            <Button
              onClick={handleClearFormClick}
              className={`btn-secondary text-md ${styles.formButton}`}
            >
              Clear from
            </Button>
          </div>
        </Form>
      </div>
    </>
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
