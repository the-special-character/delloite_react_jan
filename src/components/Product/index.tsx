import { connect } from 'react-redux';
import Product from './Product';
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
} from '../../actions/cartActions';

const mapStateToProps = ({ loading, cart }, { product }) => {
  const cartItem = cart.find((x) => x.productId === product.id);
  const isAdding = loading.some(
    (x) => x.id === product.id && x.actionName === 'ADD_CART',
  );

  const isUpdating = loading.some(
    (x) => x.id === product.id && x.actionName === 'UPDATE_CART',
  );

  const isDeleting = loading.some(
    (x) => x.id === product.id && x.actionName === 'DELETE_CART',
  );

  return {
    cartItem,
    isAdding,
    isUpdating,
    isDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (data) =>
      dispatch({
        type: 'ADD_CART_REQUEST',
        payload: data,
        meta: { loadingId: data.productId },
      }),
    updateCartItem: (data) =>
      dispatch({
        type: 'UPDATE_CART_REQUEST',
        payload: data,
        meta: { loadingId: data.productId },
      }),
    deleteCartItem: (data) =>
      dispatch({
        type: 'DELETE_CART_REQUEST',
        payload: data,
        meta: { loadingId: data.productId },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
