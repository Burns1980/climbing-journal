/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from 'react';

import {
  ADD_ROUTE,
  LOAD_ROUTES,
  SET_IS_LOADING,
  SET_FETCH_ERROR,
} from '../routes/actions';

export const RoutesContext = createContext(null);
export const RoutesDispatchContext = createContext(null);

export default function RoutesProvider({ children }) {
  const [routeState, dispatch] = useReducer(routesReducer, { isLoading: true });

  useEffect(() => {
    async function loadRoutesToState() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/routes`,
          {}
        );

        if (!res.ok) {
          throw new Error(
            'The response from the fetch operation was not "ok." Try refreshing'
          );
        }

        const { data } = await res.json();

        dispatch({
          type: LOAD_ROUTES,
          routes: data,
        });
      } catch (err) {
        dispatch({
          type: SET_FETCH_ERROR,
          isLoading: false,
          error: true,
          errorMessage: err.message,
        });
        console.error('There was a problem with the fetch operation', err);
      }
    }

    loadRoutesToState();
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
    case SET_FETCH_ERROR: {
      return {
        isLoading: action.isLoading,
        error: action.error,
        errorMessage: action.errorMessage,
        routes: [routesState.routes],
      };
    }
    case SET_IS_LOADING: {
      return {
        isLoading: action.isLoading,
        routes: [routesState.routes],
      };
    }
    case LOAD_ROUTES: {
      return {
        isLoading: false,
        routes: action.routes,
      };
    }
    default: {
      throw Error('Unknown action type ' + action.type);
    }
  }
}
