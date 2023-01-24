import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

function* loadProducts() {
  try {
    // const res = await axiosInstance.get<ProductType[]>('660/products');
    const res = yield call(axiosInstance.get, '660/products');
    yield put({
      type: 'LOAD_PRODUCTS_SUCCESS',
      payload: res.data,
      meta: { loadingId: -1 },
    });
  } catch (error) {
    yield put({
      type: 'LOAD_PRODUCTS_FAIL',
      payload: error,
      meta: { loadingId: -1 },
    });
  }
}

function* loadProductsRequest() {
  yield takeEvery('LOAD_PRODUCTS_REQUEST', loadProducts);
}

export default function* productsSaga() {
  yield all([fork(loadProductsRequest)]);
}
