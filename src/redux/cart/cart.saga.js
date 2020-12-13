import {all, takeLatest, call, put} from 'redux-saga/effects';
import userActionTypes from '../user/user.types';
import {clearCart} from './cart.action'

export function* onClearCart() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, onClearCart)
}

export function* cartSaga() {
    yield all([call(onSignOutSuccess)]);
}