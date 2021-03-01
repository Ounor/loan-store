import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  dataRequest: null,
  dataSuccess: ['appData'],
  dataFailure: ['error'],
  locationSuccess: ['country'],
  appStatusSuccess: ['status'],
  dataLoaded: ['loaded'],
  setCountry: ['country'],
});

export const DataTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: true,
  error: null,
  dataLoaded: false,
});

export const dataRequest = (state) => state.merge({fetching: true});

export const dataSuccess = (state, {appData}) => {
  const coreData = appData.data;
  return state.merge({fetching: false, error: null, ...coreData});
};

export const locationSuccess = (state, {country}) => {
  return state.merge({fetching: false, error: null, country});
};

export const appStatusSuccess = (state, {status}) => {
  return state.merge(status);
};

export const setCountry = (state, {country}) => {
  return state.merge(country);
};

export const dataFailure = (state, error) =>
  state.merge({fetching: false, error: error});

export const dataLoaded = (state, {loaded}) =>
  state.merge({dataLoaded: loaded});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_SUCCESS]: locationSuccess,
  [Types.APP_STATUS_SUCCESS]: appStatusSuccess,
  [Types.DATA_REQUEST]: dataRequest,
  [Types.DATA_SUCCESS]: dataSuccess,
  [Types.DATA_FAILURE]: dataFailure,
  [Types.DATA_LOADED]: dataLoaded,
  [Types.SET_COUNTRY]: setCountry,
});
