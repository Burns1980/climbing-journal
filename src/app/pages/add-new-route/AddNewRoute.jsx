import React, { useState } from 'react';
import { redirect, useSubmit } from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import { DataEntryForm } from '../../containers';
import { fetchRoutes } from '../../utils';
import {
  optionSets,
  formInputFields,
  fieldPropNames,
} from '../routes-page/config';
import { updateStateValues, updateMultipleStateValues } from './helpers';

const SPORT = 0,
  TRAD = 1,
  BOULDER = 2,
  AID = 3,
  ICE = 4,
  MIXED = 5;
const {
  boulderGrades,
  YDSGrades,
  iceGrades,
  aidRatings,
  disabledAid,
  mixedGrades,
  commitmentGrades,
  seriousnessRatings,
} = optionSets;

const formFields = formInputFields.map((field) => ({
  ...field,
  configProps: {
    ...field.configProps,
  },
}));

function initializeState() {
  return formFields.map((field) => {
    const { configProps } = field;
    const { name } = configProps;
    const stateObj = {
      name: name,
      value: '',
    };

    stateObj.isDisabled = name === fieldPropNames.AID_RATING;

    if (field.optionsKey) {
      const options = [...optionSets[field.optionsKey]];
      stateObj.value = options[0];
      stateObj.options = options;
    }

    return stateObj;
  });
}

function AddNewRoute() {
  const [formValues, setFormValues] = useState(initializeState());
  const submit = useSubmit();

  console.log('AddNewRoute rendered', formValues);

  function clearForm() {
    setFormValues(initializeState());
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === fieldPropNames.TYPE) {
      switch (value) {
        case optionSets.climbTypes[SPORT]:
        case optionSets.climbTypes[TRAD]: {
          setFormValues((prevFormValues) => {
            const updateValues = [
              { name, value },
              {
                name: fieldPropNames.AID_RATING,
                value: disabledAid[0],
                options: [...disabledAid],
                isDisabled: true,
              },
              {
                name: fieldPropNames.GRADE,
                value: YDSGrades[0],
                options: YDSGrades,
              },
              {
                name: fieldPropNames.SERIOUSNESS_RATING,
                value: seriousnessRatings[0],
                options: seriousnessRatings,
                isDisabled: false,
              },
              {
                name: fieldPropNames.PITCHES,
                value: '',
                isDisabled: false,
              },
              {
                name: fieldPropNames.COMMITMENT_GRADE,
                value: commitmentGrades[0],
                options: commitmentGrades,
                isDisabled: false,
              },
            ];
            return updateMultipleStateValues(prevFormValues, updateValues);
          });
          break;
        }
        case optionSets.climbTypes[AID]: {
          setFormValues((prevFormValues) => {
            const updateValues = [
              { name, value },
              {
                name: fieldPropNames.AID_RATING,
                value: aidRatings[0],
                options: [...aidRatings],
                isDisabled: false,
              },
              {
                name: fieldPropNames.GRADE,
                value: YDSGrades[0],
                options: YDSGrades,
              },
              {
                name: fieldPropNames.SERIOUSNESS_RATING,
                value: seriousnessRatings[0],
                options: seriousnessRatings,
                isDisabled: false,
              },
              {
                name: fieldPropNames.PITCHES,
                value: '',
                isDisabled: false,
              },
              {
                name: fieldPropNames.COMMITMENT_GRADE,
                value: commitmentGrades[0],
                options: commitmentGrades,
                isDisabled: false,
              },
            ];
            return updateMultipleStateValues(prevFormValues, updateValues);
          });
          break;
        }
        case optionSets.climbTypes[BOULDER]: {
          const naBoulderingOptions = ['--N/A for bouldering--'];

          setFormValues((prevFormValues) => {
            const updateValues = [
              { name, value },
              {
                name: fieldPropNames.AID_RATING,
                value: disabledAid[0],
                options: [...disabledAid],
                isDisabled: true,
              },
              {
                name: fieldPropNames.GRADE,
                value: boulderGrades[0],
                options: [...boulderGrades],
              },
              {
                name: fieldPropNames.SERIOUSNESS_RATING,
                value: naBoulderingOptions[0],
                options: naBoulderingOptions,
                isDisabled: true,
              },
              {
                name: fieldPropNames.PITCHES,
                value: '',
                isDisabled: true,
              },
              {
                name: fieldPropNames.COMMITMENT_GRADE,
                value: naBoulderingOptions[0],
                options: naBoulderingOptions,
                isDisabled: true,
              },
            ];
            return updateMultipleStateValues(prevFormValues, updateValues);
          });
          break;
        }
        case optionSets.climbTypes[ICE]: {
          setFormValues((prevFormValues) => {
            const updateValues = [
              { name, value },
              {
                name: fieldPropNames.AID_RATING,
                value: disabledAid[0],
                options: [...disabledAid],
                isDisabled: true,
              },
              {
                name: fieldPropNames.GRADE,
                value: iceGrades[0],
                options: iceGrades,
              },
              {
                name: fieldPropNames.SERIOUSNESS_RATING,
                value: seriousnessRatings[0],
                options: seriousnessRatings,
                isDisabled: false,
              },
              {
                name: fieldPropNames.PITCHES,
                value: '',
                isDisabled: false,
              },
              {
                name: fieldPropNames.COMMITMENT_GRADE,
                value: commitmentGrades[0],
                options: commitmentGrades,
                isDisabled: false,
              },
            ];
            return updateMultipleStateValues(prevFormValues, updateValues);
          });
          break;
        }
        case optionSets.climbTypes[MIXED]: {
          setFormValues((prevFormValues) => {
            const updateValues = [
              { name, value },
              {
                name: fieldPropNames.AID_RATING,
                value: disabledAid[0],
                options: [...disabledAid],
                isDisabled: true,
              },
              {
                name: fieldPropNames.GRADE,
                value: mixedGrades[0],
                options: mixedGrades,
              },
              {
                name: fieldPropNames.SERIOUSNESS_RATING,
                value: seriousnessRatings[0],
                options: seriousnessRatings,
                isDisabled: false,
              },
              {
                name: fieldPropNames.PITCHES,
                value: '',
                isDisabled: false,
              },
              {
                name: fieldPropNames.COMMITMENT_GRADE,
                value: commitmentGrades[0],
                options: commitmentGrades,
                isDisabled: false,
              },
            ];
            return updateMultipleStateValues(prevFormValues, updateValues);
          });
          break;
        }
        default: {
          console.error('Invalid climb type');
        }
      }
    } else {
      setFormValues((prevFormValues) =>
        updateStateValues(prevFormValues, name, value)
      );
    }
  }

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
        // handleSubmit={handleSubmit}
        handleChange={handleChange}
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
