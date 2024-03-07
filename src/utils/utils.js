const _ = require('lodash');

// removes empty elements from an array using the lodash isEmpty method
exports.removeEmptyElementsFromArr = (elements) =>
  elements.filter((element) => !_.isEmpty(element));
