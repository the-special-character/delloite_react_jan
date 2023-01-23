import { createStore } from 'redux';
import rootReducers from './reducers';

const configureStore = () => {
  return createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
};

export default configureStore;
