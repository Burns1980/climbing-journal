import { useEffect, useState } from 'react';
import { optionSets, formInputFields } from '../routes-page/config';
import { updateAidRating, updateGrade } from './helpers';

const formFields = formInputFields.map((field) => {
  if (field.optionsKey) {
    return {
      ...field,
      configProps: {
        ...field.configProps,
        options: [...optionSets[field.optionsKey]],
      },
    };
  }

  return {
    ...field,
    configProps: {
      ...field.configProps,
    },
  };
});

// const initialState= formFields.map((field) => {
//   if (field.optionsKey) {
//     return {
//       [field.configProps.name]: field.configProps.options[0],
//     };
//   }

//   return {
//     [field.configProps.name]: '',
//   };
// });

function initializeState() {
  return formFields.map((field) => {
    if (field.optionsKey) {
      return {
        [field.configProps.name]: field.configProps.options[0],
      };
    }

    return {
      [field.configProps.name]: '',
    };
  });
}

export default function useRouteForm() {
  console.log('init state', initializeState());
  const [formValues, setFormValues] = useState(initializeState());

  // initializing the event handlers
  formFields.forEach((field) => {
    const { configProps } = field;

    if (configProps.name === 'type') {
      return (configProps.onChange = handleTypeChange);
    }
    configProps.onChange = handleChange;
  });

  function clearForm() {
    console.log('initial state', formValues);
    const initialState = initializeState();
    setFormValues((currentState) => ({
      ...currentState,
      ...initialState,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((formValues) => {
      return {
        ...formValues,
        [name]: value,
      };
    });

    console.log('value', value);
    console.log('state', formValues);
  }

  function handleTypeChange(e) {
    const { name, value } = e.target;
    setFormValues((formValues) => {
      return {
        ...formValues,
        [name]: value,
      };
    });
    console.log('value', value);
    console.log('state', formValues);
  }

  return { formFields, formValues, clearForm };
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
