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
  const [formData, setFormData] = useState({
    name: '',
    dateClimbed: '',
    type: '',
    grade: '',
    aidRating: '',
    seriousnessRating: '',
    length: '',
    pitches: undefined,
    commitmentGrade: '',
    description: '',
    gear: '',
    imageCoverUrl: '',
  });
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    if (e.target.name === 'type') {
      if (e.target.value === 'aid') {
        setFormData((data) => {
          const optionsKey = dynamicFormFields.find(
            (field) => field.props.name === 'aidRating'
          ).optionsKey;
          return {
            ...data,
            aidRating: optionSets[optionsKey][0],
          };
        });
      }
      if (e.target.value !== 'aid') {
        setFormData((data) => {
          return {
            ...data,
            aidRating: '',
          };
        });
      }
      setClimbType(e.target.value);
    }
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleBlur(e) {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  }

  console.log(formData);

  // initializes Type input with onChange handler and onBlur
  // for others.
  useEffect(() => {
    setDynamicFormFields((formFields) => {
      return formFields.map((field) => {
        // if (field.props.name === 'type') {
        if (field.type === fieldTypes.select) {
          return {
            ...field,
            props: {
              ...field.props,
              onChange: handleChange,
            },
          };
        }
        return {
          ...field,
          props: {
            ...field.props,
            onBlur: handleBlur,
          },
        };
        // return field;
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
          const isDisabled = formData.type !== 'aid';
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
  }, [formData]);

  return [dynamicFormFields, isError];
}
