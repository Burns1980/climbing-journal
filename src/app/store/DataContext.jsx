import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import { useLoadRoutesToState } from '../customHooks';
import { rootReducer } from '../reducers';
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
  const data = useRouteLoaderData('root');

  useLoadRoutesToState(dispatch, data.data);

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
