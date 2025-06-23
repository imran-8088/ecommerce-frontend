import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from './productSlice';
import { getProducts } from '../../api';

function* fetchProducts() {
  try {
    const products = yield call(getProducts);
    yield put(fetchProductsSuccess(products));
  } catch (e) {
    yield put(fetchProductsFailure(e.message));
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
}
