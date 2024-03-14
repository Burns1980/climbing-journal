import { LOAD_ROUTES, SET_FETCH_ERROR } from '../reducers';

export async function loadRoutesToState(dispatch, data) {
  try {
    dispatch({
      type: LOAD_ROUTES,
      payload: {
        data,
        isLoading: false,
        isError: false,
      },
    });
  } catch (err) {
    dispatch({
      type: SET_FETCH_ERROR,
      payload: {
        isLoading: false,
        isError: true,
        errorMessage:
          err.message || 'Could not fetch routes done. Try again later.',
      },
    });
    console.error('There was a problem with the fetch operation', err);
  }
}
