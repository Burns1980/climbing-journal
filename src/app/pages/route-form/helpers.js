import dayjs from 'dayjs';

import { optionSets, fieldPropNames } from '../routes-page/config';

const SPORT = 1,
  TRAD = 2,
  BOULDER = 3,
  AID = 4,
  ICE = 5,
  MIXED = 6;
const {
  climbTypes,
  boulderGrades,
  YDSGrades,
  iceGrades,
  aidRatings,
  disabledAid,
  mixedGrades,
  commitmentGrades,
  seriousnessRatings,
} = optionSets;

export function updateMultipleStateValues(prevFormValues, updatedFields) {
  return prevFormValues.map((fieldState) => {
    const updatedField = updatedFields.find(
      (updatedField) => updatedField.name === fieldState.name
    );
    return updatedField ? { ...fieldState, ...updatedField } : fieldState;
  });
}

const getFieldValue = (searchArr, targetFieldName) =>
  searchArr.find((item) => item.name === targetFieldName).value;

/**
 * Updates form values based on the selected climb type.
 *
 * @param {string} name - The name of the field being updated.
 * @param {string} value - The value of the field being updated.
 * @param {Array} prevFormValues - The previous form values.
 * @returns {Array<Object>} An array of objects representing form field values and options.
 */
export function getTypeChangeValues(name, value, prevFormValues) {
  const newState = [{ name, value, isDisabled: false }];

  const YDSGradeObj = {
    name: fieldPropNames.GRADE,
    value: YDSGrades[0],
    options: YDSGrades,
  };
  const disabledAidObj = {
    name: fieldPropNames.AID_RATING,
    value: disabledAid[0],
    options: disabledAid,
    isDisabled: true,
  };
  const enabledAidObj = {
    name: fieldPropNames.AID_RATING,
    value:
      getFieldValue(prevFormValues, fieldPropNames.AID_RATING) || aidRatings[0],
    options: aidRatings,
    isDisabled: false,
  };
  const seriousnessRatingObj = {
    name: fieldPropNames.SERIOUSNESS_RATING,
    value:
      getFieldValue(prevFormValues, fieldPropNames.SERIOUSNESS_RATING) ||
      seriousnessRatings[0],
    options: seriousnessRatings,
  };
  const pitchesObj = {
    name: fieldPropNames.PITCHES,
    value: getFieldValue(prevFormValues, fieldPropNames.PITCHES) || '',
  };
  const commitmentGradeObj = {
    name: fieldPropNames.COMMITMENT_GRADE,
    value:
      getFieldValue(prevFormValues, fieldPropNames.COMMITMENT_GRADE) ||
      commitmentGrades[0],
    options: commitmentGrades,
  };

  switch (value) {
    case optionSets.climbTypes[SPORT]:
    case optionSets.climbTypes[TRAD]: {
      const updatedValues = [
        disabledAidObj,
        {
          ...YDSGradeObj,
          isDisabled: false,
        },
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ];
      return updateMultipleStateValues(
        prevFormValues,
        newState.concat(updatedValues)
      );
    }
    case optionSets.climbTypes[AID]: {
      const updatedValues = [
        enabledAidObj,
        {
          ...YDSGradeObj,
          isDisabled: false,
        },
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ];
      return updateMultipleStateValues(
        prevFormValues,
        newState.concat(updatedValues)
      );
    }
    case optionSets.climbTypes[BOULDER]: {
      const naBoulderingOptions = ['--N/A for bouldering--'];
      const updatedValues = [
        disabledAidObj,
        {
          name: fieldPropNames.GRADE,
          value: boulderGrades[0],
          options: boulderGrades,
          isDisabled: false,
        },
        {
          ...seriousnessRatingObj,
          value: naBoulderingOptions[0],
          options: naBoulderingOptions,
          isDisabled: true,
        },
        {
          ...pitchesObj,
          value: '',
          isDisabled: true,
        },
        {
          ...commitmentGradeObj,
          value: naBoulderingOptions[0],
          options: naBoulderingOptions,
          isDisabled: true,
        },
      ];
      return updateMultipleStateValues(
        prevFormValues,
        newState.concat(updatedValues)
      );
    }
    case optionSets.climbTypes[ICE]: {
      const updatedValues = [
        disabledAidObj,
        {
          name: fieldPropNames.GRADE,
          value: iceGrades[0],
          options: iceGrades,
        },
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ];
      return updateMultipleStateValues(
        prevFormValues,
        newState.concat(updatedValues)
      );
    }
    case optionSets.climbTypes[MIXED]: {
      const updatedValues = [
        disabledAidObj,
        {
          name: fieldPropNames.GRADE,
          value: mixedGrades[0],
          options: mixedGrades,
        },
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ];
      return updateMultipleStateValues(
        prevFormValues,
        newState.concat(updatedValues)
      );
    }
    default: {
      console.error('Invalid climb type');
      return ['error'];
    }
  }
}

/**
 * Generates an array of objects representing form field values and options
 * based on the provided climb type.
 *
 * @param {string} climbTypeVal - The type of climb (e.g., sport, traditional, aid, boulder, ice, mixed).
 * @param {Object} routeToUpdateObj - The object containing the current values of the route to update.
 * @param {string} [routeToUpdateObj.grade] - The grade of the route.
 * @param {string} [routeToUpdateObj.aidRating] - The aid rating of the route.
 * @param {string} [routeToUpdateObj.seriousnessRating] - The seriousness rating of the route.
 * @param {string} [routeToUpdateObj.pitches] - The number of pitches of the route.
 * @param {string} [routeToUpdateObj.commitmentGrade] - The commitment grade of the route.
 * @returns {Array<Object>} An array of objects representing form field values and options.
 */
function getClimbTypeDependentVals(climbTypeVal, routeToUpdateObj) {
  const typeDependantVals = [
    { name: 'type', value: climbTypeVal, options: climbTypes },
  ];
  const YDSGradeObj = {
    name: fieldPropNames.GRADE,
    value: routeToUpdateObj.grade || YDSGrades[0],
    options: YDSGrades,
  };
  const disabledAidObj = {
    name: fieldPropNames.AID_RATING,
    value: disabledAid[0],
    options: disabledAid,
    isDisabled: true,
  };
  const enabledAidObj = {
    name: fieldPropNames.AID_RATING,
    value: routeToUpdateObj.aidRating || aidRatings[0],
    options: aidRatings,
    isDisabled: false,
  };
  const seriousnessRatingObj = {
    name: fieldPropNames.SERIOUSNESS_RATING,
    value: routeToUpdateObj.seriousnessRating || seriousnessRatings[0],
    options: seriousnessRatings,
  };
  const pitchesObj = {
    name: fieldPropNames.PITCHES,
    value: routeToUpdateObj.pitches || '',
  };
  const commitmentGradeObj = {
    name: fieldPropNames.COMMITMENT_GRADE,
    value: routeToUpdateObj.commitmentGrade || commitmentGrades[0],
    options: commitmentGrades,
  };

  switch (climbTypeVal) {
    case optionSets.climbTypes[SPORT]:
    case optionSets.climbTypes[TRAD]: {
      return typeDependantVals.concat([
        YDSGradeObj,
        disabledAidObj,
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ]);
    }
    case optionSets.climbTypes[AID]: {
      return typeDependantVals.concat([
        YDSGradeObj,
        enabledAidObj,
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ]);
    }
    case optionSets.climbTypes[BOULDER]: {
      const naBoulderingOptions = ['--N/A for bouldering--'];
      return typeDependantVals.concat([
        disabledAidObj,
        {
          name: fieldPropNames.GRADE,
          value: routeToUpdateObj.grade || boulderGrades[0],
          options: boulderGrades,
        },
        {
          ...seriousnessRatingObj,
          value: naBoulderingOptions[0],
          options: naBoulderingOptions,
          isDisabled: true,
        },
        {
          ...pitchesObj,
          value: '',
          isDisabled: true,
        },
        {
          ...commitmentGradeObj,
          value: naBoulderingOptions[0],
          options: naBoulderingOptions,
          isDisabled: true,
        },
      ]);
    }
    case optionSets.climbTypes[ICE]: {
      return typeDependantVals.concat([
        disabledAidObj,
        {
          name: fieldPropNames.GRADE,
          value: routeToUpdateObj.grade || iceGrades[0],
          options: iceGrades,
        },
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ]);
    }
    case optionSets.climbTypes[MIXED]: {
      return typeDependantVals.concat([
        disabledAidObj,
        {
          name: fieldPropNames.GRADE,
          value: routeToUpdateObj.grade || mixedGrades[0],
          options: mixedGrades,
        },
        {
          ...seriousnessRatingObj,
          isDisabled: false,
        },
        {
          ...pitchesObj,
          isDisabled: false,
        },
        {
          ...commitmentGradeObj,
          isDisabled: false,
        },
      ]);
    }
    default: {
      console.error(
        `${climbTypeVal} is an invalid climb type. Check the state values to make sure the "type" value is valid.`
      );
    }
  }
}

/**
 * Provides the initial form state when editing a route when receiving a valid
 * editRouteObj
 *
 * @param {Object} editRouteObj - The object containing the route details to be edited, where the key matches the input name and value matches input value.
 * @param {Array} curRouteStateArr - The current route form state.
 * @returns {Array} - A new array containing the route form state
 */
export function getInitialEditRouteState(editRouteObj, curRouteStateArr) {
  const climbTypeVal = editRouteObj.type;
  const typeDependantValsArr = getClimbTypeDependentVals(
    climbTypeVal,
    editRouteObj
  );

  return curRouteStateArr.map((field) => {
    const fieldMatch = typeDependantValsArr.find(
      (typeDependantVal) => typeDependantVal.name === field.name
    );

    if (fieldMatch) {
      return fieldMatch;
    }

    if (field.name === 'dateClimbed') {
      return {
        ...field,
        value: editRouteObj[field.name]
          ? dayjs(editRouteObj[field.name]).format('YYYY-MM-DD')
          : '',
      };
    }

    return {
      ...field,
      value: editRouteObj[field.name] || '',
    };
  });
}
