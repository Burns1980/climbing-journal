import { optionSets, fieldPropNames } from '../routes-page/config';

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

export function updateMultipleStateValues(prevFormValues, updatedFields) {
  return prevFormValues.map((fieldState) => {
    const updatedField = updatedFields.find(
      (updatedField) => updatedField.name === fieldState.name
    );
    return updatedField ? { ...fieldState, ...updatedField } : fieldState;
  });
}

export function updateTypeChangeValues(name, value, setFormValues) {
  switch (value) {
    case optionSets.climbTypes[SPORT]:
    case optionSets.climbTypes[TRAD]: {
      setFormValues((prevFormValues) => {
        const updateValues = [
          { name, value },
          {
            name: fieldPropNames.AID_RATING,
            value: disabledAid[0],
            options: disabledAid,
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
}
