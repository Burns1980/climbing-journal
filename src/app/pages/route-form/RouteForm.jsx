import React, { useState, useContext, useEffect } from 'react';
import { redirect, useSubmit, useParams } from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import { DataContext } from '../../store';
import { fetchRoutes } from '../../utils';
import {
  optionSets,
  formInputFields,
  fieldPropNames,
} from '../routes-page/config';
import { getInitialEditRouteState, getTypeChangeValues } from './helpers';

const formFields = formInputFields.map((field) => ({
  ...field,
  configProps: {
    ...field.configProps,
  },
}));

const defaultState = formFields.map((field) => {
  const { configProps } = field;
  const { name } = configProps;
  const stateObj = {
    name: name,
    value: '',
  };

  stateObj.isDisabled = name === fieldPropNames.AID_RATING;

  if (field.optionsKey) {
    const options = optionSets[field.optionsKey];
    stateObj.value = '';
    stateObj.options = options;
  }

  return stateObj;
});

let i = 1;

function RouteForm({ isEditMode }) {
  console.log('render number', i++);
  const [formValues, setFormValues] = useState(defaultState);
  const { routeId } = useParams();
  const { routes } = useContext(DataContext);
  const submit = useSubmit();

  useEffect(() => {
    if (isEditMode && routes.data.length > 0) {
      const routeToEdit =
        routes.data.find((route) => route._id === routeId) || {};
      const initialEditRouteState = getInitialEditRouteState(
        routeToEdit,
        formValues
      );
      setFormValues(initialEditRouteState);
    }
  }, [routes]);

  function clearForm() {
    setFormValues(defaultState);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === fieldPropNames.TYPE) {
      setFormValues((prevFormValues) => {
        return getTypeChangeValues(name, value, prevFormValues);
      });
    } else {
      setFormValues(
        formValues.map((fieldState) =>
          fieldState.name === name ? { ...fieldState, value } : fieldState
        )
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    submit(
      { data: formValues, isEditMode },
      { method: 'post', encType: 'application/json' }
    );
  }

  return (
    <PageWrapper
      data-tc="RouteFormPage"
      title="Enter new route"
      showSidebar={false}
    >
      <DataEntryForm
        dataTc="RouteFormForm"
        isEditMode={isEditMode}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        fields={formFields}
        clearForm={clearForm}
        formValues={formValues}
      />
    </PageWrapper>
  );
}

export async function action({ request, params }) {
  let res;
  const { routeId } = params;
  const routeData = await request.json();
  const newRoute = {};
  const { data, isEditMode } = routeData;

  data.forEach((field) => {
    // Map unused fields to emtpy string
    if (
      typeof field.value === 'string' &&
      field.value.match(/--[a-z\/A-Z ]*--/)
    ) {
      return (newRoute[field.name] = '');
    }

    field && (newRoute[field.name] = field.value);
  });

  res = isEditMode
    ? await fetchRoutes('PUT', newRoute, routeId)
    : await fetchRoutes('POST', { data: [newRoute] });

  if (res.status === 'fail') {
    console.error('Error adding new route:', res);
    return res;
  }

  return redirect('/routes-climbed');
}

export default RouteForm;
