import {
  LOAD_ROUTES,
  SET_FETCH_ERROR,
  SET_IS_LOADING,
} from '../routes/actions';
import rootReducer from './rootReducer';

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

describe('Root reducer', () => {
  it('Returns the initial state', () => {
    expect(rootReducer(initialState, {})).toEqual(initialState);
  });

  it(`Returns correct state after a ${LOAD_ROUTES} action`, () => {
    expect(
      rootReducer(initialState, {
        type: LOAD_ROUTES,
        payload: {
          isLoading: false,
          isError: false,
          data: [{ grade: '5.10a' }],
        },
      })
    ).toEqual({
      ...initialState,
      routes: {
        ...initialState.routes,
        isLoading: false,
        isError: false,
        data: [{ grade: '5.10a' }],
      },
    });
  });

  it(`Returns correct state after a ${SET_IS_LOADING} action. Ignores attempted state changes that are not part of the ${SET_IS_LOADING} action`, () => {
    expect(
      rootReducer(initialState, {
        type: SET_IS_LOADING,
        payload: {
          isLoading: false,
          data: [{ grade: '5.10a' }],
          isError: true,
        },
      })
    ).toEqual({
      ...initialState,
      routes: {
        ...initialState.routes,
        isLoading: false,
      },
    });
  });

  it(`Returns correct state after a ${SET_FETCH_ERROR} action Ignores attempted state changes that are not part of the ${SET_FETCH_ERROR} action`, () => {
    expect(
      rootReducer(initialState, {
        type: SET_FETCH_ERROR,
        payload: {
          isLoading: false,
          isError: true,
          errorMessage: 'There has been an error',
          data: [{ grade: '5.10a' }],
        },
      })
    ).toEqual({
      ...initialState,
      routes: {
        ...initialState.routes,
        isLoading: false,
        isError: true,
        errorMessage: 'There has been an error',
      },
    });
  });
});
