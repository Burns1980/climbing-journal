import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { redirect, useSubmit, useParams } from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import { DataContext } from '../../store';
import { fetchRoutes } from '../../utils';
import {
  optionSets,
  formInputFields,
  fieldPropNames,
  DEFAULT_OPTION,
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

    if (name === fieldPropNames.TYPE) {
      stateObj.options = options;
      return stateObj;
    }

    stateObj.options = DEFAULT_OPTION;
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
    console.log('useEffect', routes.data);
    if (isEditMode && routes.data.length > 0) {
      console.log('formValues', formValues);
      const routeToEdit =
        routes.data.find((route) => route._id === routeId) || {};
      const initialEditRouteState = getInitialEditRouteState(
        routeToEdit,
        defaultState
      );
      console.log('initial edit state', routeToEdit);
      setFormValues(initialEditRouteState);
    }
  }, [routes.data, routeId, isEditMode]);

  function clearForm() {
    setFormValues(defaultState);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'pitches') {
      console.log('typeof', typeof value);
      console.log('pitches', value);
    }

    if (value && name === fieldPropNames.TYPE) {
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
        formValues={formValues}
        clearForm={clearForm}
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
      field.value.match(/--[a-z/A-Z ]*--/)
    ) {
      return (newRoute[field.name] = '');
    }

    field && (newRoute[field.name] = field.value);
  });

  res = isEditMode
    ? await fetchRoutes('PUT', newRoute, routeId)
    : await fetchRoutes('POST', { data: [newRoute] });

  // const jsonRes = await res.json();
  // console.log('res', jsonRes);

  if (!res.ok) {
    console.log('newRoute', newRoute);
    console.log('Error adding new route:', res);
    // return await res.json();
    return res;
  }

  return redirect('/routes-climbed');
}
RouteForm.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
};

export default RouteForm;
