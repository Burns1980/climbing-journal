/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

import { climbingRoutes } from './config';
import { ADD_ROUTE } from '../routes/actions';

export const RoutesContext = createContext(null);
export const RoutesDispatchContext = createContext(null);

export default function RoutesProvider({ children }) {
  const [routeState, dispatch] = useReducer(routesReducer, climbingRoutes);

  return (
    <RoutesContext.Provider value={routeState}>
      <RoutesDispatchContext.Provider value={dispatch}>
        {children}
      </RoutesDispatchContext.Provider>
    </RoutesContext.Provider>
  );
}

function routesReducer(routesState, action) {
  switch (action.type) {
    case ADD_ROUTE: {
      return [
        ...routesState,
        {
          grade: action.grade,
          routeName: action.routeName,
          description: action.description,
          gearDescription: action.gearDescription,
          // favorite: action.favorite,
          // hide: action.hide,
        },
      ];
    }
    default: {
      throw Error('Unknown action type ' + action.type);
    }
  }
}
