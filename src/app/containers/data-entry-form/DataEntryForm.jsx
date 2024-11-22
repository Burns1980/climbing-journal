import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, LoadSpinner, APIErrorList } from '../../components';
import { Modal } from '../../containers';
import { Input } from '../../components';
import { groupFieldsIntoRows } from './helpers';
import styles from './data-entry-form.module.css';
import { formInputTypes } from '../../pages/routes-page/config';
import { useMenuToggle } from '../../customHooks';

function DataEntryForm({
  fields,
  isEditMode,
  handleSubmit,
  handleChange,
  formValues,
  dataTc,
  clearForm,
}) {
  const actionData = useActionData();
  const [fieldErrors, setFieldErrors] = useState(actionData);

  const navigation = useNavigation();
  const modalRef = useRef();
  const errorListRef = useRef();

  useMenuToggle();

  useEffect(() => {
    setFieldErrors(actionData);

    if (fieldErrors?.status === 'fail' && !_.isEmpty(fieldErrors?.data)) {
      errorListRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }

    if (navigation.formAction === '/routes-climbed/add-new-route') {
      setFieldErrors(null);
    }
  }, [actionData, fieldErrors, navigation.formAction]);

  const inputRows = groupFieldsIntoRows(
    fields.filter((field) => field.inputElementType !== formInputTypes.textarea)
  );
  const textAreaFields = fields.filter(
    (field) => field.inputElementType === formInputTypes.textarea
  );

  function handleClearFormClick() {
    modalRef.current.open();
  }

  function handleClearForm() {
    clearForm();
    setFieldErrors(null);
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
        <Form
          className={styles.formInputs}
          method="post"
          onSubmit={handleSubmit}
        >
          {fieldErrors?.status === 'fail' && !_.isEmpty(fieldErrors?.data) && (
            <APIErrorList ref={errorListRef} data={fieldErrors.data} />
          )}
          {inputRows.map((row) => (
            <div className={styles.rowContainer} key={row[0].configProps.name}>
              {row.map((field) => (
                <Input
                  key={field.configProps.name}
                  inputElementType={field.inputElementType}
                  handleChange={handleChange}
                  label={field.label}
                  configProps={field.configProps}
                  stateObj={formValues.find(
                    (val) => val.name === field.configProps.name
                  )}
                  error={
                    fieldErrors?.data[field.name]
                      ? `${field.label.replace('(required)', '')} is required`
                      : null
                  }
                />
              ))}
            </div>
          ))}
          {textAreaFields.map((field) => (
            <Input
              key={field.configProps.name}
              inputElementType={field.inputElementType}
              handleChange={handleChange}
              label={field.label}
              configProps={field.configProps}
              stateObj={formValues.find(
                (val) => val.name === field.configProps.name
              )}
              error={
                fieldErrors?.data[field.name]
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
              Save
              {navigation.state !== 'idle' && (
                <span className={styles.spinnerOverlay}>
                  <LoadSpinner className="size-sm" />
                </span>
              )}
            </Button>
            {!isEditMode && (
              <Button
                onClick={handleClearFormClick}
                className={`btn-secondary text-md ${styles.formButton}`}
              >
                Clear form
              </Button>
            )}
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
      inputElementType: PropTypes.string.isRequired,
      optionsKey: PropTypes.string,
      configProps: PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
      }).isRequired,
    }).isRequired
  ),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.array,
  dataTc: PropTypes.string.isRequired,
  clearForm: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
};

export default DataEntryForm;
