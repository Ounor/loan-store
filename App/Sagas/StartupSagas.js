import {call, put} from 'redux-saga/effects';
import DataActions from '../Redux/DataRedux';
import * as RNLocalize from 'react-native-localize';

export function* startup(api, action) {
  const response = yield call(api.getData);
  const status = yield call(api.getStatus);
  const country = RNLocalize.getCountry();
  if (response.ok) {
    yield put(DataActions.dataSuccess(response.data));
    if (status.ok) {
      yield put(DataActions.appStatusSuccess(status.data));
    }
    yield put(DataActions.locationSuccess(country || 'RU'));
    yield put(DataActions.dataLoaded(true));
  } else {
    yield put(DataActions.dataFailure(response.error));
  }
}
