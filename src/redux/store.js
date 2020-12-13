
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import combineReducers from '../redux/root-reducer';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root.saga';


const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
}

export const store = createStore(combineReducers, applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga)

export const persister = persistStore(store);