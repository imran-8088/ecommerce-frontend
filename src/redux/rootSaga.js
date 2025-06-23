import { all } from 'redux-saga/effects';
import productSaga from '../features/products/productSaga';

export default function* rootSaga() {
  yield all([
    productSaga(),
  ]);
}
