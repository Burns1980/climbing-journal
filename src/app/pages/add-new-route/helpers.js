export function updateStateValues(prevFormValues, name, value) {
  return prevFormValues.map((fieldData) =>
    fieldData.name === name ? { ...fieldData, value } : fieldData
  );
}

export function updateMultipleStateValues(prevFormValues, updatedFields) {
  return prevFormValues.map((fieldState) => {
    const updatedField = updatedFields.find(
      (updatedField) => updatedField.name === fieldState.name
    );
    return updatedField ? { ...fieldState, ...updatedField } : fieldState;
  });
}
