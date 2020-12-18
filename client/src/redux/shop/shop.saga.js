import {takeLatest, call, put} from 'redux-saga/effects';
import {shopActionTypes} from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {fetchCollectionFail, fetchCollectionSuccess} from './shop.action';

export function* fetchCollectionsStartAsync() {
    try {
        const collectionRef = firestore.collection("collections");
        const snapShot = yield collectionRef.get();
        const newShopData = yield call(convertCollectionsSnapshotToMap, snapShot);
        yield put(fetchCollectionSuccess(newShopData));
    } catch(error) {
        yield put(fetchCollectionFail())
    }
    
}

export function* fetchCollectionsStart() {
    yield takeLatest(shopActionTypes.FETCH_COLLECTION_START,fetchCollectionsStartAsync)
}