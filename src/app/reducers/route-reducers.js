import { LOAD_ROUTES, SET_FETCH_ERROR, SET_IS_LOADING } from './';

export default function routesReducer(routesState, action) {
  const { payload } = action;

  switch (action.type) {
    case SET_FETCH_ERROR: {
      const { isLoading, isError, errorMessage } = payload;
      return {
        ...routesState,
        isLoading,
        isError,
        errorMessage,
      };
    }
    case SET_IS_LOADING: {
      const { isLoading } = payload;
      return {
        ...routesState,
        isLoading,
      };
    }
    case LOAD_ROUTES: {
      const { isLoading, isError, data } = payload;
      return {
        ...routesState,
        isLoading,
        isError,
        data,
      };
    }
    default: {
      return routesState;
    }
  }
}
