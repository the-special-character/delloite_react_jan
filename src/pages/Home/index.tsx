import { connect } from 'react-redux';
import Home from './Home';
import { loadProducts } from '../../actions/productsActions';
import { loadCart } from '../../actions/cartActions';

const mapStateToProps = ({ products, cart, loading }) => {
  return {
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => loadProducts()(dispatch),
    loadCart: () => loadCart()(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
