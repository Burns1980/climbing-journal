import PropTypes from 'prop-types';
import React, { createContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { loadRoutesToState } from '../effects/index';
import rootReducer from '../reducers/rootReducer';
export const DataContext = createContext(null);
export const DataDispatchContext = createContext(null);

const initialState = {
  routes: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
  areas: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
};

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/routes-by-me') {
      loadRoutesToState(dispatch);
    }
  }, [pathname]);

  return (
    <DataContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
