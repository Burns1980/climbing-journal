import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, LoadSpinner, APIErrorList } from '../../components';
import { Modal } from '../../containers';
import InputField from './InputField';
import { groupFieldsIntoRows, getMatchingDynamicProps } from './helpers';
import styles from './data-entry-form.module.css';
import { fieldTypes } from '../../pages/routes-page/config';
import { useMenuToggle } from '../../customHooks';

function DataEntryForm({ fields, dynamicProps, dataTc }) {
  const actionData = useActionData();
  const [fieldErrors, setFieldErrors] = useState(actionData);
  const navigation = useNavigation();
  const modalRef = useRef();
  const formRef = useRef();
  const errorListRef = useRef();

  useMenuToggle();

  useEffect(() => {
    setFieldErrors(actionData);
  }, [actionData]);

  useEffect(() => {
    if (fieldErrors?.status === 'fail' && !_.isEmpty(fieldErrors?.data)) {
      errorListRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [fieldErrors]);

  useEffect(() => {
    if (navigation.formAction === '/routes-climbed/add-new-route') {
      setFieldErrors(null);
    }
  }, [navigation.formAction]);

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
    setFieldErrors(null);
    formRef.current.reset();
    modalRef.current.close();
  }

  function handleGoBack() {
    modalRef.current.close();
  }

  return (
    <>
      <Modal
        data-tc={`${dataTc}-modal`}
        className={styles.confirmationModal}
        ref={modalRef}
      >
        <h2 className="text-lg">Are you sure you want to clear the form?</h2>
        <div className={styles.modalBtns}>
          <Button onClick={handleGoBack}>Cancel</Button>
          <Button
            className={`${styles.btnMarginTop} btn-secondary text-md`}
            onClick={handleClearForm}
          >
            Clear form
          </Button>
        </div>
      </Modal>
      <div data-tc={`${dataTc}-container`} className={styles.formContainer}>
        <Form ref={formRef} className={styles.formInputs} method="post">
          {fieldErrors?.status === 'fail' && !_.isEmpty(fieldErrors?.data) && (
            <APIErrorList ref={errorListRef} data={fieldErrors.data} />
          )}
          {inputRows.map((row) => (
            <div className={styles.rowContainer} key={row[0].configProps.name}>
              {row.map((field) => (
                <InputField
                  key={field.configProps.name}
                  dynamicProps={getMatchingDynamicProps(
                    field.configProps.name,
                    dynamicProps
                  )}
                  field={field}
                  error={
                    fieldErrors?.data[field.configProps.name]
                      ? `${field.label.replace('(required)', '')} is required`
                      : null
                  }
                />
              ))}
            </div>
          ))}
          {textAreaFields.map((field) => (
            <InputField
              key={field.configProps.name}
              dynamicProps={getMatchingDynamicProps(
                field.configProps.name,
                dynamicProps
              )}
              field={field}
              error={
                fieldErrors?.data[field.configProps.name]
                  ? `${field.label.replace('(required)', '')} is required`
                  : null
              }
            />
          ))}
          <div className={`${styles.buttonRow}`}>
            <Button
              type="submit"
              className={`btn text-md position-relative ${styles.formButton}`}
              disabled={navigation.state !== 'idle'}
            >
              Save route
              {navigation.state !== 'idle' && (
                <span className={styles.spinnerOverlay}>
                  <LoadSpinner className="size-sm" />
                </span>
              )}
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
      type: PropTypes.string,
      configProps: PropTypes.object,
    }).isRequired
  ),
  dynamicProps: PropTypes.array,
};

export default DataEntryForm;
