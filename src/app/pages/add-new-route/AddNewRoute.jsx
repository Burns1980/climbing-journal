import React from 'react';
import { redirect } from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import useRouteForm from './useRouteForm';
import { fetchRoutes } from '../../utils';

function AddNewRoute() {
  const { defaultFormFields, dynamicProps } = useRouteForm();

  return (
    <PageWrapper title="Enter new route" showSidebar={false}>
      <DataEntryForm fields={defaultFormFields} dynamicProps={dynamicProps} />
    </PageWrapper>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const newRoute = {};

  for (const [key, val] of data.entries()) {
    newRoute[key] = val;
  }

  const res = await fetchRoutes('POST', { data: [newRoute] });

  if (res.status === 'fail') {
    return res;
  }

  return redirect('/routes-climbed');
}

export default AddNewRoute;
