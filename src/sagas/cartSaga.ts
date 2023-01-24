import {
  call,
  fork,
  put,
  takeEvery,
  all,
  takeLatest,
} from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

function* loadCart() {
  try {
    const res = yield call(axiosInstance.get, '660/cart');
    yield put({
      type: 'LOAD_CART_SUCCESS',
      payload: res.data,
      meta: { loadingId: -1 },
    });
  } catch (error) {
    yield put({
      type: 'LOAD_CART_FAIL',
      payload: error,
      meta: { loadingId: -1 },
    });
  }
}

function* addCart({ payload, meta }) {
  try {
    const res = yield call(axiosInstance.post, '660/cart', payload);
    yield put({
      type: 'ADD_CART_SUCCESS',
      payload: res.data,
      meta,
    });
  } catch (error) {
    yield put({
      type: 'ADD_CART_FAIL',
      payload: error,
      meta,
    });
  }
}

function* updateCart({ payload, meta }) {
  try {
    const res = yield call(
      axiosInstance.put,
      `660/cart/${payload.id}`,
      payload,
    );
    yield put({
      type: 'UPDATE_CART_SUCCESS',
      payload: res.data,
      meta,
    });
  } catch (error) {
    yield put({
      type: 'UPDATE_CART_FAIL',
      payload: error,
      meta,
    });
  }
}

function* deleteCart({ payload, meta }) {
  try {
    const res = yield call(axiosInstance.delete, `660/cart/${payload.id}`);
    yield put({
      type: 'DELETE_CART_SUCCESS',
      payload: payload,
      meta,
    });
  } catch (error) {
    yield put({
      type: 'DELETE_CART_FAIL',
      payload: error,
      meta,
    });
  }
}

function* loadCartRequest() {
  yield takeEvery('LOAD_CART_REQUEST', loadCart);
}

function* addCartRequest() {
  yield takeLatest('ADD_CART_REQUEST', addCart);
}

function* updateCartRequest() {
  yield takeLatest('UPDATE_CART_REQUEST', updateCart);
}

function* deleteCartRequest() {
  yield takeLatest('DELETE_CART_REQUEST', deleteCart);
}

export default function* cartSaga() {
  yield all([
    fork(loadCartRequest),
    fork(addCartRequest),
    fork(updateCartRequest),
    fork(deleteCartRequest),
  ]);
}
