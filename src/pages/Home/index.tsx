import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () =>
      dispatch({ type: 'LOAD_PRODUCTS_REQUEST', meta: { loadingId: -1 } }),
    loadCart: () =>
      dispatch({ type: 'LOAD_CART_REQUEST', meta: { loadingId: -1 } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
