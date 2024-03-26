import React, { useState, useContext } from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageWrapper from '../PageWrapper';
import { RouteFormContext } from '../../store';
import { DataEntryForm } from '../../containers';
import { formFields } from '../routes-page/config';
import { Error } from '../../components';
import { fetchRoutes } from '../../utils';

const climbTypeInput = formFields.find(
  (field) => field?.select?.props.name === 'type'
);
const defaultClimbTypeValue = climbTypeInput.select.props.options[0];
// const defaultFormFields =
//   defaultClimbTypeValue !== 'aid'
//     ? formFields.filter((field) => field?.select?.props.name !== 'aidRating')
//     : formFields;

// console.log(climbTypeInput);
// console.log(defaultClimbTypeValue);
// console.log(defaultFormFields);

function AddNewRoute(props) {
  const ctx = useContext(RouteFormContext);
  // const [routeFormFields, setRouteFormFields] = useState(formFields);
  const [climbType, setClimbType] = useState(defaultClimbTypeValue);
  // const [isAidRatingDisabled, setIsAidRatingDisabled] = useState(
  //   defaultClimbTypeValue !== 'aid'
  // );
  const [isError, setIsError] = useState(false);

  climbTypeInput.select.props.onChange = function (e) {
    const climbType = e.target.value;
    // climbType === 'aid' && setIsAidRatingDisabled(false);
    setClimbType(climbType);
  };

  console.log(climbType);
  // console.log(isAidRatingDisabled);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('submit value');
  // };

  return (
    <PageWrapper title="Enter new route" showSidebar={false}>
      {!isError ? (
        <DataEntryForm fields={formFields} />
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
