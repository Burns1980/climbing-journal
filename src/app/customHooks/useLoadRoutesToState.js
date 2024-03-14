import { useEffect } from 'react';

import { LOAD_ROUTES } from '../reducers';

export function useLoadRoutesToState(dispatch, data) {
  useEffect(() => {
    dispatch({
      type: LOAD_ROUTES,
      payload: {
        data,
        isLoading: false,
        isError: false,
      },
    });
  }, [data, dispatch]);
}
