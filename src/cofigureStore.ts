import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducers';
import logger from './middleware/logger';
import sagas from './sagas';

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, logger];

  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  // store.dispatch({ type: 'login' });

  return store;
};

export default configureStore;
