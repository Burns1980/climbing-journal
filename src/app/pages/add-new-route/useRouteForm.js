import { useEffect, useState } from 'react';
import { optionSets, formFields } from '../routes-page/config';
import { updateAidRating, updateGrade } from './helpers';

// map the options into form props
const defaultFormFields = formFields.map((field) => {
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

const initialDynamicProps = formFields
  .map((field) => {
    switch (field.configProps.name) {
      case 'aidRating':
        return {
          name: field.configProps.name,
          dynamicProps: {
            disabled: true, // Initial disabled state
          },
        };
      case 'grade':
        return {
          name: field.configProps.name,
          dynamicProps: {},
        };
      case 'type':
        return {
          name: field.configProps.name,
          dynamicProps: {
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
  const [dynamicProps, setDynamicProps] = useState(initialDynamicProps);

  function handleTypeChange(e) {
    const { value } = e.target;

    setDynamicProps((dynamicProps) => {
      return dynamicProps.map((fieldData) => {
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
    setDynamicProps((dynamicProps) => {
      return dynamicProps.map((formField) => {
        if (formField.name === 'type') {
          return {
            ...formField,
            dynamicProps: {
              ...formField.dynamicProps,
              onChange: handleTypeChange,
            },
          };
        }
        return formField;
      });
    });
  }, []);

  return { defaultFormFields, dynamicProps };
}
