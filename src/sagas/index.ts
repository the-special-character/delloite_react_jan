import { all, fork } from 'redux-saga/effects';
import cartSaga from './cartSaga';
import productsSaga from './productsSaga';

export default function* root() {
  yield all([fork(cartSaga), fork(productsSaga)]);
}
