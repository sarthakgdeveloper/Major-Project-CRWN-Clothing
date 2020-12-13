import {all, call} from "redux-saga/effects";
import {fetchCollectionsStart} from './shop/shop.saga';
import {userSaga} from './user/user.saga';
import {cartSaga} from './cart/cart.saga';

export function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSaga),
        call(cartSaga)
    ])
}