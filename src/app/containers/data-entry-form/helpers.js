export const groupFieldsIntoRows = (fields) => {
  return fields.reduce((rows, field, index) => {
    if (index % 2 === 0) {
      rows.push([field]);
    } else {
      rows[rows.length - 1].push(field);
    }
    return rows;
  }, []);
};
