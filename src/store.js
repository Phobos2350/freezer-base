import Raven from "raven-js";
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import history from './history';
import reducers from './reducers';
import createRavenMiddleware from "raven-for-redux";

Raven.config('https://e6a467fdb39f4286a9c2112ae69b6fb4@sentry.io/217280').install()

export default (initialState = {}) => {
  let middleware = applyMiddleware(createRavenMiddleware(Raven), thunk, routerMiddleware(history));

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};
