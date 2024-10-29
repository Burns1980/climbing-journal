import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PageWrapper } from '../';
import { Error, LoadSpinner } from '../../components';

const EditPage = (props) => {
  const { routeId } = useParams();

  return (
    <PageWrapper title={`Edit ${routeId}`}>
      <div>EditPage</div>
    </PageWrapper>
  );
};

EditPage.propTypes = {};

export default EditPage;
