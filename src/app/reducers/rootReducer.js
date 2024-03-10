import areasReducers from './areas-reducers';
import routesReducer from './route-reducers';

export default (state, action) => {
  return {
    routes: routesReducer(state.routes, action),
    areas: areasReducers(state.areas, action),
  };
};
