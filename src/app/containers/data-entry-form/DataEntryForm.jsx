import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
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
  const actionResultData = useActionData();
  const [errors, setErrors] = useState(null);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const modalRef = useRef();
  const formRef = useRef();
  const errorListRef = useRef();

  useMenuToggle();

  useEffect(() => {
    if (
      actionResultData?.status === 'fail' &&
      !_.isEmpty(actionResultData?.data)
    ) {
      setErrors(actionResultData);
    }
  }, [actionResultData]);

  useEffect(() => {
    errors &&
      errorListRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [errors]);

  const inputRows = groupFieldsIntoRows(
    fields.filter((field) => field.inputElementType !== formInputTypes.textarea)
  );
  const textAreaFields = fields.filter(
    (field) => field.inputElementType === formInputTypes.textarea
  );

  function handleClearFormClick() {
    modalRef.current.open();
  }

  function handleDiscardChanges() {
    modalRef.current.open();
  }

  function handleFormReset() {
    if (isEditMode) {
      return navigate(-1);
    }
    clearForm();
    setErrors(null);
    modalRef.current.close();
    formRef?.current.scrollIntoView({ behavior: 'smooth' });
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
        <h2 className="text-lg">
          {isEditMode
            ? 'Do you want to discard all changes?'
            : 'Are you sure you want to clear the form?'}
        </h2>
        <div className={styles.modalBtns}>
          <Button onClick={handleGoBack}>Cancel</Button>
          <Button
            className={`${styles.btnMarginTop} btn-secondary text-md`}
            onClick={handleFormReset}
          >
            {isEditMode ? 'Discard all changes' : 'Clear form'}
          </Button>
        </div>
      </Modal>
      <div data-tc={`${dataTc}-container`} className={styles.formContainer}>
        <Form
          ref={formRef}
          className={styles.formInputs}
          method="post"
          onSubmit={handleSubmit}
        >
          {errors?.status === 'fail' && !_.isEmpty(errors?.data) && (
            <APIErrorList ref={errorListRef} data={errors.data} />
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
                  error={errors?.data[field.configProps.name]}
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
              error={errors?.data[field.configProps.name]}
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
            <Button
              className={`btn-secondary text-md ${styles.formButton}`}
              onClick={isEditMode ? handleDiscardChanges : handleClearFormClick}
            >
              {isEditMode ? 'Discard changes' : 'Clear form'}
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
