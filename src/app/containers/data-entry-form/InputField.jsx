// import React from 'react';
// import PropTypes from 'prop-types';

// import { Input } from '../../components';
// import inputStyles from './input-field.module.css';

// const InputField = ({ field }) => {
//   const id = field.name.trim();
//   const inputClassName =
//     field.inputProps.type === 'textarea'
//       ? inputStyles.formtextArea + ' text-sm'
//       : inputStyles.formInput + ' text-sm';

//   return (
//     <div className={inputStyles.inputContainer + ' text-sm'}>
//       {field.inputProps ? (
//         <Input
//           className={inputClassName}
//           name={id}
//           id={id}
//           labelName={field.label}
//           inputProps={field.inputProps}
//           list={field.datalist ? id : ''}
//         />
//       ) : (
//         <div>placeholder for select</div>
//       )}
//     </div>
//   );
// };

// InputField.propTypes = {
//   field: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     inputProps: PropTypes.object,
//   }).isRequired,
// };

// export default InputField;

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../components';
import inputStyles from './input-field.module.css';

const InputField = ({ field: { name, inputProps, label, datalist } }) => {
  const id = name.trim();
  const doesDataListExist = datalist && datalist.length > 0 ? id : '';
  const dataListId = `${id}-dl`;
  const inputClassName = `${
    inputProps && inputProps.type === 'textarea'
      ? inputStyles.formtextArea
      : inputStyles.formInput
  } text-sm`;

  return (
    <div className={`${inputStyles.inputContainer} text-sm`}>
      <Input
        className={inputClassName}
        name={id}
        id={id}
        labelName={label}
        inputProps={inputProps}
        {...(doesDataListExist && { list: dataListId })}
      />
      {doesDataListExist && (
        <datalist id={dataListId}>
          {datalist.map((ydsGrade) => (
            <option key={ydsGrade} value={ydsGrade}></option>
          ))}
        </datalist>
      )}
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    inputProps: PropTypes.object,
    label: PropTypes.string,
    datalist: PropTypes.array,
  }).isRequired,
};

export default InputField;
