import { combineReducers } from 'redux';
import auth from './authReducer';
import cart from './cartReducer';
import products from './productReducer';
import loading from './loadingReducer';
import errors from './errorReducer';

export default combineReducers({
  auth,
  cart,
  products,
  loading,
  errors,
});
