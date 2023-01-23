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
    addToCart: (data) => addToCart(data)(dispatch),
    updateCartItem: (data) => updateCartItem(data)(dispatch),
    deleteCartItem: (data) => deleteCartItem(data)(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
