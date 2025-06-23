import { combineReducers } from 'redux';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
});
