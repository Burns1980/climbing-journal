import { useEffect, useState } from 'react';
import { optionSets, formInputFields } from '../routes-page/config';
import { updateAidRating, updateGrade } from './helpers';

// map the options into form props
const defaultFormFields = formInputFields.map((field) => {
  if (field.optionsKey) {
    return {
      ...field,
      configProps: {
        ...field.configProps,
        options: optionSets[field.optionsKey],
      },
    };
  }
  return field;
});

const initialControlProps = formInputFields
  .map((field) => {
    switch (field.configProps.name) {
      case 'aidRating':
        return {
          name: field.configProps.name,
          controlProps: {
            disabled: true, // Initial disabled state
          },
        };
      case 'grade':
        return {
          name: field.configProps.name,
          controlProps: {},
        };
      case 'type':
        return {
          name: field.configProps.name,
          controlProps: {
            onChange: () => {},
          },
        };
      default:
        return null;
    }
  })
  .filter((props) => props !== null);

let i = 0;

export default function useRouteForm() {
  console.log('i ran again ', ++i);
  const [controlProps, setControlProps] = useState(initialControlProps);
  // const [formControlledInputs, setControlProps] = useState(initialControlProps);
  console.log('controlProps', controlProps);

  function handleTypeChange(e) {
    const { value } = e.target;

    setControlProps((controlProps) => {
      return controlProps.map((fieldData) => {
        switch (fieldData.name) {
          case 'aidRating':
            return updateAidRating(fieldData, value, optionSets);
          case 'grade':
            return updateGrade(fieldData, value, optionSets);

          default:
            return fieldData;
        }
      });
    });
  }

  // initialize the event handlers
  useEffect(() => {
    setControlProps((controlProps) => {
      return controlProps.map((formField) => {
        if (formField.name === 'type') {
          return {
            ...formField,
            controlProps: {
              ...formField.controlProps,
              onChange: handleTypeChange,
            },
          };
        }
        return formField;
      });
    });
  }, []);

  return { defaultFormFields, controlProps };
}
