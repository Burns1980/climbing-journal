import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  optionSets,
  formFields,
  fieldTypes,
} from '../pages/routes-page/config';

const climbTypeInput = formFields.find((field) => field?.props.name === 'type');
const defaultClimbTypeValue = optionSets[climbTypeInput?.optionsKey][0];

const initialFormFields = _.cloneDeep(formFields).map((field) => {
  if (field.type === fieldTypes.select && field.optionsKey) {
    if (field.props.name === 'aidRating') {
      const isDisabled = defaultClimbTypeValue !== 'aid';
      field.label = isDisabled
        ? 'Aid rating (choose type aid to enable)'
        : 'Aid rating';
      const options = isDisabled ? ['N/A'] : optionSets[field.optionsKey];
      field.props.options = options;
      return field;
    }
    field.props.options = optionSets[field.optionsKey];
  }
  return field;
});

export default function useRouteForm() {
  const [dynamicFormFields, setDynamicFormFields] = useState(initialFormFields);
  const [climbType, setClimbType] = useState(defaultClimbTypeValue);
  const [isError, setIsError] = useState(false);

  function handleClimbTypeChange(type) {
    setClimbType(type);
  }

  // initializes Type input with onChange handler
  useEffect(() => {
    setDynamicFormFields((formFields) => {
      return formFields.map((field) => {
        if (field.props.name === 'type') {
          return {
            ...field,
            props: {
              ...field.props,
              onChange: (e) => handleClimbTypeChange(e.target.value),
            },
          };
        }
        return field;
      });
    });
  }, []);

  useEffect(() => {
    setDynamicFormFields((formFields) => {
      return formFields.map((field) => {
        if (field.props.name === 'aidRating') {
          const isDisabled = climbType !== 'aid';
          const label = isDisabled
            ? 'Aid rating (choose type aid to enable)'
            : 'Aid rating';
          const options = isDisabled ? ['N/A'] : optionSets[field.optionsKey];
          return {
            ...field,
            label,
            props: {
              ...field.props,
              disabled: isDisabled,
              options: options,
            },
          };
        }
        return field;
      });
    });
  }, [climbType]);

  return [dynamicFormFields, isError];
}
