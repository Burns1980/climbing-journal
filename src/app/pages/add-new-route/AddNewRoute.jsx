import React from 'react';
import { redirect, useSubmit } from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import useRouteForm from './useRouteForm';
import { fetchRoutes } from '../../utils';

function AddNewRoute() {
  const submit = useSubmit();
  // initializes form fields and state
  const { formFields, formValues, clearForm } = useRouteForm();

  function handleSubmit(e) {
    submit(
      // { data: formValues },
      { data: [{ test: 'data' }] },
      { method: 'post', encType: 'application/json' }
    );
  }

  return (
    <PageWrapper
      data-tc="addNewRoutePage"
      title="Enter new route"
      showSidebar={false}
    >
      <DataEntryForm
        dataTc="addNewRouteForm"
        handleSubmit={handleSubmit}
        fields={formFields}
        clearForm={clearForm}
        formValues={formValues}
      />
    </PageWrapper>
  );
}

export async function action({ request, params }) {
  console.log('request', await request.json());
  // const data = await request.json();
  const newRoute = {};

  // for (const [key, val] of data.entries()) {
  //   newRoute[key] = val;
  // }

  // console.log('data', data);
  // console.log('new route', newRoute);

  // const res = await fetchRoutes('POST', { data: [newRoute] });

  // if (res.status === 'fail') {
  //   console.log('Error adding new route:', res);
  //   return res;
  // }

  return redirect('/routes-climbed');
}

export default AddNewRoute;
