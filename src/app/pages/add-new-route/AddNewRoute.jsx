import React from 'react';
import PropTypes from 'prop-types';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import { formFields } from '../routes-page/config';
import styles from './add-new-route.module.css';

function AddNewRoute(props) {
  return (
    <PageWrapper showSidebar={false}>
      <DataEntryForm title="Enter new route" fields={formFields} />
    </PageWrapper>
  );
}

AddNewRoute.propTypes = {};

export default AddNewRoute;
