import { useEffect, useState } from 'react';
import { optionSets, formInputFields } from '../routes-page/config';
import { updateAidRating, updateGrade } from './helpers';

const formFields = formInputFields.map((field) => {
  if (field.optionsKey) {
    return {
      ...field,
      configProps: {
        ...field.configProps,
        options: optionSets[field.optionsKey],
        onChange: () => {},
      },
      controlProps: {
        onChange: () => {},
      },
    };
  }

  if (field.configProps.name === 'aidRating') {
    return {
      ...field,
      configProps: {
        ...field.configProps,
        onChange: () => {},
      },
      controlProps: {
        disabled: true,
        onChange: () => {},
      },
    };
  }

  return {
    ...field,
    configProps: {
      ...field.configProps,
      onChange: () => {},
    },
    controlProps: {
      onChange: () => {},
    },
  };
});

const initialState = formFields.map((field) => {
  return {
    [field.configProps.name]: '',
  };
});

export default function useRouteForm() {
  // initializing the event handlers
  formFields.forEach((field) => {
    if (field.configProps.name === 'type') {
      return (field.configProps.onChange = handleTypeChange);
    }
    field.configProps.onChange = handleChange;
  });

  const [formValues, setFormValues] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((formValues) => {
      return {
        ...formValues,
        [name]: value,
      };
    });

    console.log('value', value);
  }

  function handleTypeChange(e) {
    console.log('input', e.target);
  }

  useEffect(() => {}, []);

  return { formFields };
}

// export default function useRouteForm() {
//   console.log('i ran again ', ++i);
//   const [controlProps, setControlProps] = useState(initialControlProps);
//   // const []
//   //
//   function handleTypeChange(e) {
//     const { value } = e.target;

//     setControlProps((controlProps) => {
//       return controlProps.map((fieldData) => {
//         switch (fieldData.name) {
//           case 'aidRating':
//             return updateAidRating(fieldData, value, optionSets);
//           case 'grade':
//             return updateGrade(fieldData, value, optionSets);

//           default:
//             return fieldData;
//         }
//       });
//     });
//   }

//   // initialize the event handlers
//   useEffect(() => {
//     setControlProps((controlProps) => {
//       return controlProps.map((formField) => {
//         if (formField.name === 'type') {
//           return {
//             ...formField,
//             controlProps: {
//               ...formField.controlProps,
//               onChange: handleTypeChange,
//             },
//           };
//         }
//         return formField;
//       });
//     });
//   }, []);

//   return { formFields, controlProps };
// }
