import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RouteFormContext = createContext({
  difficultyGradeOptions: [],
  climbType: '',
  setDifficultyGradeOptions: () => {},
  setClimbType: () => {},
});

function RouteFormProvider({ children }) {
  const [difficultyGradeOptions, setDifficultyGradeOptions] = useState();
  const [climbType, setClimbType] = useState();

  function setClimbTypeValue(val) {
    setClimbType(val);
  }

  function getClimbType() {
    return climbType;
  }

  function setDifficultyOptions(options) {
    setDifficultyGradeOptions(options);
  }

  function getDifficultyOptions() {
    return difficultyGradeOptions;
  }

  const routeFormCtx = {
    setClimbTypeValue,
    getClimbType,
    setDifficultyOptions,
    getDifficultyOptions,
  };

  return (
    <RouteFormContext.Provider value={routeFormCtx}>
      {children}
    </RouteFormContext.Provider>
  );
}

RouteFormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteFormProvider;
