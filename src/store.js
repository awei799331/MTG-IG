import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/index';
import ReduxThunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk))
);

export default store;