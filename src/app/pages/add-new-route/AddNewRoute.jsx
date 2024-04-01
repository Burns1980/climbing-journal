import React from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageWrapper from '../PageWrapper';
import { Error } from '../../components';
import { DataEntryForm } from '../../containers';
import { useRouteForm } from '../../customHooks';
import { fetchRoutes } from '../../utils';

function AddNewRoute(props) {
  const { defaultFormFields, dynamicProps, isError } = useRouteForm();

  return (
    <PageWrapper title="Enter new route" showSidebar={false}>
      {!isError ? (
        <DataEntryForm fields={defaultFormFields} dynamicProps={dynamicProps} />
      ) : (
        <Error
          title="Missing form fields"
          message="The form fields array was missing. Perhaps server is down. Try refreshing."
        />
      )}
    </PageWrapper>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const newRoute = {};

  for (const [key, val] of data.entries()) {
    newRoute[key] = val;
  }

  console.log(newRoute);
  const res = await fetchRoutes('POST', { data: [newRoute] });

  console.log(res);
  if (res.status === 'fail') {
    const { message } = res;
    return res;
  }

  return redirect('/routes-climbed');
  // return null;
}

AddNewRoute.propTypes = {};

export default AddNewRoute;
