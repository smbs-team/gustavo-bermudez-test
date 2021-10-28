import { applyMiddleware, createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import storage from "redux-persist/lib/storage"

import createRootReducer from "./reducers"
import rootSaga from "./sagas"

import loggerMiddleware from "./middleware/logger"
import callAPIMiddleware from "./middleware/callAPI"

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: "root",
  storage
}

export default function configureStore(preloadedState) {
  const rootReducer = createRootReducer()

  const middlewares = [loggerMiddleware, callAPIMiddleware, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  )

  store.runSaga = sagaMiddleware.run(rootSaga)

  const persistor = persistStore(store)

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(persistedReducer))
  }

  return { store, persistor }
}
