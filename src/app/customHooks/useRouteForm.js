import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  optionSets,
  formFields,
  fieldTypes,
} from '../pages/routes-page/config';

const getInitialFormFields = () => {
  const climbTypeInput = formFields.find(
    (field) => field?.props.name === 'type'
  );
  const defaultClimbTypeValue = optionSets[climbTypeInput?.optionsKey][0];

  return _.cloneDeep(formFields).map((field) => {
    if (field.type === fieldTypes.select && field.optionsKey) {
      if (field.props.name === 'aidRating') {
        const isDisabled = defaultClimbTypeValue !== 'aid';
        const options = isDisabled ? ['N/A'] : optionSets[field.optionsKey];
        field.props.options = options;
        return field;
      }
      field.props.options = optionSets[field.optionsKey];
    }
    return field;
  });
};

export default function useRouteForm() {
  const [dynamicFormFields, setDynamicFormFields] = useState(
    getInitialFormFields()
  );
  const [climbType, setClimbType] = useState(
    dynamicFormFields.find((field) => field.props.name === 'type').props
      .options[0]
  );
  const [isError, setIsError] = useState(false);

  function handleClimbTypeChange(e) {
    setClimbType(e.target.value);
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
              onChange: handleClimbTypeChange,
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
        if (
          field.props.name === 'aidRating' &&
          field.type === fieldTypes.select
        ) {
          const isDisabled = climbType !== 'aid';
          return {
            ...field,
            props: {
              ...field.props,
              disabled: isDisabled,
              options: isDisabled ? ['N/A'] : optionSets[field.optionsKey],
            },
          };
        }
        return field;
      });
    });
  }, [climbType]);

  return [dynamicFormFields, isError];
}
