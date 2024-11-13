import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RouteFormContext = createContext({
  getDifficultyOptions: () => {},
  getClimbType: () => {},
  setDifficultyOptions: () => {},
  setClimbType: () => {},
});

function RouteFormProvider({ children }) {
  const [difficultyOptionsVal, setDifficultyOptionsVal] = useState([]);
  const [climbTypeVal, setClimbTypeVal] = useState('trad');

  function setClimbType(val) {
    setClimbTypeVal(val);
  }

  function getClimbType() {
    return climbTypeVal;
  }

  function setDifficultyOptions(options) {
    setDifficultyOptionsVal(options);
  }

  function getDifficultyOptions() {
    return difficultyOptionsVal;
  }

  const routeFormCtx = {
    setClimbType,
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
