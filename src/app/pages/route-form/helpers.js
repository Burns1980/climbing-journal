import dayjs from 'dayjs';

import { optionSets, fieldPropNames } from '../routes-page/config';

const SPORT = 0,
  TRAD = 1,
  BOULDER = 2,
  AID = 3,
  ICE = 4,
  MIXED = 5;
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

export function getUpdatedStateObject() {
  const tempStateObj = {};
}

// export function updateTypeChangeValues(name, value, setFormValues) {
//   switch (value) {
//     case optionSets.climbTypes[SPORT]:
//     case optionSets.climbTypes[TRAD]: {
//       setFormValues((prevFormValues) => {
//         console.log(prevFormValues);
//         const updateValues = [
//           { name, value },
//           {
//             name: fieldPropNames.AID_RATING,
//             value: disabledAid[0],
//             options: disabledAid,
//             isDisabled: true,
//           },
//           {
//             name: fieldPropNames.GRADE,
//             value:
//               prevFormValues.find((field) => field.name === 'grade').value ||
//               YDSGrades[0],
//             options: YDSGrades,
//           },
//           {
//             name: fieldPropNames.SERIOUSNESS_RATING,
//             value: seriousnessRatings[0],
//             options: seriousnessRatings,
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.PITCHES,
//             value: '',
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.COMMITMENT_GRADE,
//             value: commitmentGrades[0],
//             options: commitmentGrades,
//             isDisabled: false,
//           },
//         ];
//         return updateMultipleStateValues(prevFormValues, updateValues);
//       });
//       break;
//     }
//     case optionSets.climbTypes[AID]: {
//       setFormValues((prevFormValues) => {
//         const updateValues = [
//           { name, value },
//           {
//             name: fieldPropNames.AID_RATING,
//             value: aidRatings[0],
//             options: [...aidRatings],
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.GRADE,
//             value: YDSGrades[0],
//             options: YDSGrades,
//           },
//           {
//             name: fieldPropNames.SERIOUSNESS_RATING,
//             value: seriousnessRatings[0],
//             options: seriousnessRatings,
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.PITCHES,
//             value: '',
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.COMMITMENT_GRADE,
//             value: commitmentGrades[0],
//             options: commitmentGrades,
//             isDisabled: false,
//           },
//         ];
//         return updateMultipleStateValues(prevFormValues, updateValues);
//       });
//       break;
//     }
//     case optionSets.climbTypes[BOULDER]: {
//       const naBoulderingOptions = ['--N/A for bouldering--'];

//       setFormValues((prevFormValues) => {
//         const updateValues = [
//           { name, value },
//           {
//             name: fieldPropNames.AID_RATING,
//             value: disabledAid[0],
//             options: [...disabledAid],
//             isDisabled: true,
//           },
//           {
//             name: fieldPropNames.GRADE,
//             value: boulderGrades[0],
//             options: [...boulderGrades],
//           },
//           {
//             name: fieldPropNames.SERIOUSNESS_RATING,
//             value: naBoulderingOptions[0],
//             options: naBoulderingOptions,
//             isDisabled: true,
//           },
//           {
//             name: fieldPropNames.PITCHES,
//             value: '',
//             isDisabled: true,
//           },
//           {
//             name: fieldPropNames.COMMITMENT_GRADE,
//             value: naBoulderingOptions[0],
//             options: naBoulderingOptions,
//             isDisabled: true,
//           },
//         ];
//         return updateMultipleStateValues(prevFormValues, updateValues);
//       });
//       break;
//     }
//     case optionSets.climbTypes[ICE]: {
//       setFormValues((prevFormValues) => {
//         const updateValues = [
//           { name, value },
//           {
//             name: fieldPropNames.AID_RATING,
//             value: disabledAid[0],
//             options: [...disabledAid],
//             isDisabled: true,
//           },
//           {
//             name: fieldPropNames.GRADE,
//             value: iceGrades[0],
//             options: iceGrades,
//           },
//           {
//             name: fieldPropNames.SERIOUSNESS_RATING,
//             value: seriousnessRatings[0],
//             options: seriousnessRatings,
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.PITCHES,
//             value: '',
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.COMMITMENT_GRADE,
//             value: commitmentGrades[0],
//             options: commitmentGrades,
//             isDisabled: false,
//           },
//         ];
//         return updateMultipleStateValues(prevFormValues, updateValues);
//       });
//       break;
//     }
//     case optionSets.climbTypes[MIXED]: {
//       setFormValues((prevFormValues) => {
//         const updateValues = [
//           { name, value },
//           {
//             name: fieldPropNames.AID_RATING,
//             value: disabledAid[0],
//             options: [...disabledAid],
//             isDisabled: true,
//           },
//           {
//             name: fieldPropNames.GRADE,
//             value: mixedGrades[0],
//             options: mixedGrades,
//           },
//           {
//             name: fieldPropNames.SERIOUSNESS_RATING,
//             value: seriousnessRatings[0],
//             options: seriousnessRatings,
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.PITCHES,
//             value: '',
//             isDisabled: false,
//           },
//           {
//             name: fieldPropNames.COMMITMENT_GRADE,
//             value: commitmentGrades[0],
//             options: commitmentGrades,
//             isDisabled: false,
//           },
//         ];
//         return updateMultipleStateValues(prevFormValues, updateValues);
//       });
//       break;
//     }
//     default: {
//       console.error('Invalid climb type');
//     }
//   }
// }

const getFieldValue = (searchArr, targetFieldName) =>
  searchArr.find((item) => item.name === targetFieldName).value;

export function updateTypeChangeValues(name, value, prevFormValues) {
  const newState = [{ name, value, isDisabled: false }];

  const YDSGradeObj = {
    name: fieldPropNames.GRADE,
    value: getFieldValue(prevFormValues, fieldPropNames.GRADE) || YDSGrades[0],
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
          value:
            getFieldValue(prevFormValues, fieldPropNames.GRADE) ||
            boulderGrades[0],
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
    }
    case optionSets.climbTypes[MIXED]: {
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
    }
    default: {
      console.error('Invalid climb type');
      return ['error'];
    }
  }
}

// The routeToUpdateObj is from the data store, therefore, the structure
// is the same.
function getTypeDependentVals(climbTypeVal, routeToUpdateObj = {}) {
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
    value: routeToUpdateObj.pitches,
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
          options: [...boulderGrades],
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

export function updateRouteStateObject(editRouteObj, curRouteStateArr = []) {
  const climbTypeVal = editRouteObj.type;
  const typeDependantValsArr = getTypeDependentVals(climbTypeVal, editRouteObj);
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
        value: dayjs(editRouteObj[field.name]).format('YYYY-MM-DD'),
      };
    }

    return {
      ...field,
      value: editRouteObj[field.name] || '',
    };
  });
}
