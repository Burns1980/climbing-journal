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
import { updateRouteStateObject, updateTypeChangeValues } from './helpers';

const formFields = formInputFields.map((field) => ({
  ...field,
  configProps: {
    ...field.configProps,
  },
}));

const initialState = formFields.map((field) => {
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

function RouteForm({ isEditMode }) {
  const { routeId } = useParams();
  const { routes } = useContext(DataContext);
  const submit = useSubmit();
  let routeToEdit = {};
  let editRouteState = [];

  // On page refresh dataContext resets to an empty array so we want to
  // skip on that case.
  if (isEditMode && routes.data.length > 0) {
    routeToEdit = routes.data.find((route) => route._id === routeId);
    editRouteState = updateRouteStateObject(routeToEdit);
  }

  const initialStateToSet =
    editRouteState.length > 0 ? editRouteState : initialState;

  const [formValues, setFormValues] = useState(initialStateToSet);

  useEffect(() => {
    if (isEditMode && routes.data.length > 0) {
      routeToEdit = routes.data.find((route) => route._id === routeId) || {};
      const newState = updateRouteStateObject(routeToEdit, formValues);
      setFormValues(newState);
    }
  }, [routes]);

  function clearForm() {
    setFormValues(initialState);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === fieldPropNames.TYPE) {
      setFormValues((prevFormValues) => {
        return updateTypeChangeValues(name, value, prevFormValues);
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
  const routeData = await request.json();
  const newRoute = {};
  const { data, isEditMode } = routeData;

  if (isEditMode) {
    console.log('in edit mode upon clicking submit button');
  } else {
    data.forEach((field) => {
      if (
        typeof field.value === 'string' &&
        field.value.match(/--[a-zA-Z ]*--/)
      )
        return;
      field.value && (newRoute[field.name] = field.value);
    });

    // res = await fetchRoutes('POST', { data: [newRoute] });
  }

  // if (res.status === 'fail') {
  //   console.log('Error adding new route:', res);
  //   return res;
  // }
  console.log('new route', newRoute);

  return redirect('/routes-climbed');
}

export default RouteForm;
