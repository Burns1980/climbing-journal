import _ from 'lodash';
import React, { useRef } from 'react';
import { Form, useActionData } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { Modal } from '../../containers';
import InputField from './InputField';
import { groupFieldsIntoRows } from './helpers';
import styles from './data-entry-form.module.css';
import { fieldTypes } from '../../pages/routes-page/config';
import { useMenuToggle } from '../../customHooks';

function DataEntryForm({ fields, dynamicProps }) {
  const { status, data } = useActionData() || { status: null, data: null };
  const modalRef = useRef();
  const formRef = useRef();

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

  function handleClearForm() {
    formRef.current.reset();
    modalRef.current.close();
  }

  function handleGoBack() {
    modalRef.current.close();
  }

  function getMatchingDynamicProps(fieldName) {
    const containesDynamicProp = dynamicProps.find(
      (fieldProp) => fieldProp.name === fieldName
    );
    return containesDynamicProp ? containesDynamicProp.dynamicProps : '';
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
        <Form ref={formRef} className={styles.formInputs} method="post">
          <legend className="text-sm">* denotes a required field</legend>
          {status === 'fail' && !_.isEmpty(data) && (
            <div className="text-sm">
              <h3 className="text-md">The following fields have errors</h3>
              <ul>
                {Object.entries(data).map((error) => {
                  return <li key={error[0]}>{`${error[0]}: ${error[1]}`}</li>;
                })}
              </ul>
            </div>
          )}
          {inputRows.map((row) => (
            <div className={styles.rowContainer} key={row[0].configProps.name}>
              {row.map((field) => (
                <InputField
                  key={field.configProps.name}
                  dynamicProps={getMatchingDynamicProps(field.configProps.name)}
                  field={field}
                />
              ))}
            </div>
          ))}
          {textAreaFields.map((field) => (
            <InputField
              key={field.configProps.name}
              dynamicProps={getMatchingDynamicProps(field.configProps.name)}
              field={field}
            />
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
