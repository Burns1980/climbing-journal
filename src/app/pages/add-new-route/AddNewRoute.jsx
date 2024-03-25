import React from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import { formFields } from '../routes-page/config';
import { Error } from '../../components';
import { fetchRoutes } from '../../utils';

function AddNewRoute(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit value');
  };

  return (
    <PageWrapper title="Enter new route" showSidebar={false}>
      {formFields ? (
        <DataEntryForm handleSubmit={handleSubmit} fields={formFields} />
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

  // console.log(res);

  return redirect('/routes-by-me');
  // return null;
}

AddNewRoute.propTypes = {};

export default AddNewRoute;
