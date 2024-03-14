import { areasReducers, routesReducer } from './';

export default (state, action) => {
  return {
    routes: routesReducer(state.routes, action),
    areas: areasReducers(state.areas, action),
  };
};
