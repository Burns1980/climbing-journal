export function updateAidRating(fieldData, value, optionSets) {
  return {
    ...fieldData,
    dynamicProps: {
      ...fieldData.dynamicProps,
      disabled: value !== 'aid',
      options: value === 'aid' ? optionSets.aidRatings : optionSets.disabledAid,
    },
  };
}

export function updateGrade(fieldData, value, optionSets) {
  let options;
  switch (value) {
    case 'ice':
      options = optionSets.iceGrades;
      break;
    case 'boulder':
      options = optionSets.boulderGrades;
      break;
    case 'mixed':
      options = optionSets.mixedGrades;
      break;
    default:
      options = optionSets.YDSGrades;
  }

  return {
    ...fieldData,
    dynamicProps: {
      ...fieldData.dynamicProps,
      options,
    },
  };
}
