import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PageWrapper } from '../';
import { DataEntryForm } from '../../containers';
import { Error, LoadSpinner } from '../../components';
import useRouteForm from '../add-new-route/useRouteForm';

const EditPage = (props) => {
  const { defaultFormFields, dynamicProps } = useRouteForm();
  const { routeId } = useParams();

  return (
    <PageWrapper title={`Edit ${routeId}`}>
      <DataEntryForm
        dataTc="editRouteForm"
        fields={defaultFormFields}
        dynamicProps={dynamicProps}
      />
    </PageWrapper>
  );
};

EditPage.propTypes = {};

export default EditPage;
