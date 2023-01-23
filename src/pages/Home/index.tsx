import { connect } from 'react-redux';
import Home from './Home';
import { loadProducts } from '../../actions/productsActions';
import {
  addToCart,
  deleteCartItem,
  loadCart,
  updateCartItem,
} from '../../actions/cartActions';

const mapStateToProps = ({ products, cart, loading }) => {
  return {
    products,
    cart,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => loadProducts()(dispatch),
    loadCart: () => loadCart()(dispatch),
    addToCart: (data) => addToCart(data)(dispatch),
    updateCartItem: (data) => updateCartItem(data)(dispatch),
    deleteCartItem: (data) => deleteCartItem(data)(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
