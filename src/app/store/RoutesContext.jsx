/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from 'react';

import { ADD_ROUTE, LOAD_ROUTES } from '../routes/actions';

export const RoutesContext = createContext(null);
export const RoutesDispatchContext = createContext(null);

export default function RoutesProvider({ children }) {
  const [routeState, dispatch] = useReducer(routesReducer, []);

  useEffect(() => {
    async function loadRoutesToState() {
      const res = await fetch('http://localhost:3000/api/v1/routes', {});

      if (!res) {
        throw new Error('The response was not "ok"');
      }

      const { data } = await res.json();

      dispatch({
        type: LOAD_ROUTES,
        routes: data,
      });
    }

    try {
      loadRoutesToState();
    } catch (err) {
      console.error('There was a problem with the fetch operation', err);
    }
  }, []);

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

    case LOAD_ROUTES: {
      return action.routes;
    }
    default: {
      throw Error('Unknown action type ' + action.type);
    }
  }
}
