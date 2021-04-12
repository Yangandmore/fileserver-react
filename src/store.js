import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = (initialState = Map()) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};

export default configureStore;
