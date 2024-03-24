import React from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import { formFields } from '../routes-page/config';
import { fetchRoutes } from '../../utils';
import styles from './add-new-route.module.css';

function AddNewRoute(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit value');
  };

  return (
    <PageWrapper showSidebar={false}>
      <DataEntryForm
        handleSubmit={handleSubmit}
        title="Enter new route"
        fields={formFields}
      />
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
