import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash';

export const FormContext = createContext({
  getFormFields: () => {},
  getInputControlProps: () => {},
  setFormFields: () => {},
  setInputControlProps: () => {},
});

function FormProvider({ children }) {
  const [formFieldsVal, setFormFieldsVal] = useState([]);
  const [inputControlPropsVal, setInputControlPropsVal] = useState([]);

  function setFormFields(fields) {
    setFormFieldsVal(fields);
  }

  function setInputControlProps(controlProps) {
    setInputControlPropsVal(controlProps);
  }

  function getFormFields() {
    return formFieldsVal;
  }

  function getInputControlProps() {
    return inputControlPropsVal;
  }

  const routeFormCtx = {
    setFormFields,
    setInputControlProps,
    getFormFields,
    getInputControlProps,
  };

  return (
    <FormContext.Provider value={routeFormCtx}>{children}</FormContext.Provider>
  );
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormProvider;
