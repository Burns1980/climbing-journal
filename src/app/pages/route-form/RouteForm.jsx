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
import { updateTypeChangeValues } from './helpers';

const formFields = formInputFields.map((field) => ({
  ...field,
  configProps: {
    ...field.configProps,
  },
}));

function initializeState() {
  return formFields.map((field) => {
    const { configProps } = field;
    const { name } = configProps;
    const stateObj = {
      name: name,
      value: '',
    };

    stateObj.isDisabled = name === fieldPropNames.AID_RATING;

    if (field.optionsKey) {
      const options = optionSets[field.optionsKey];
      stateObj.value = options[0];
      stateObj.options = options;
    }

    return stateObj;
  });
}

function RouteForm({ isEditMode }) {
  const [formValues, setFormValues] = useState(initializeState());
  const submit = useSubmit();
  const { routeId } = useParams();
  const { routes } = useContext(DataContext);
  console.log('routes', routes);
  console.log('routeId', routeId);

  useEffect(() => {
    if (isEditMode) {
      const routeToEdit = routes.data.find((route) => route._id === routeId);
      console.log('route to edit', routeToEdit);
      const { name } = routeToEdit;
      const initialEditState = formValues.map((fieldState) => {
        return {
          [fieldState.name]: routeToEdit[fieldState.name],
        };
      });
      console.log('initial edit state', initialEditState);
      // setFormValues(routeToEdit);
      if (name === fieldPropNames.TYPE) {
        updateTypeChangeValues(name, value, setFormValues);
      } else {
        setFormValues(
          formValues.map((fieldState) =>
            fieldState.name === name ? { ...fieldState, value } : fieldState
          )
        );
      }
    }
  }, []);

  function clearForm() {
    setFormValues(initializeState());
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === fieldPropNames.TYPE) {
      updateTypeChangeValues(name, value, setFormValues);
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
      { data: formValues },
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
  const routeData = await request.json();
  const newRoute = {};
  const { data } = routeData;

  data.forEach((field) => {
    if (field.value && field.value.match(/--[a-zA-Z ]*--/)) return;
    field.value && (newRoute[field.name] = field.value);
  });

  const res = await fetchRoutes('POST', { data: [newRoute] });

  if (res.status === 'fail') {
    console.log('Error adding new route:', res);
    return res;
  }

  return redirect('/routes-climbed');
}

export default RouteForm;
