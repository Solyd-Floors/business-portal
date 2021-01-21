import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import reducer from "./reducers";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer, 
    applyMiddleware(sagaMiddleware,logger),
)

store.__getValidationErrors__ = key => {
    let state = store.getState();
    return state[key].list || state[key].message || false
}

sagaMiddleware.run(rootSaga)

export default store;