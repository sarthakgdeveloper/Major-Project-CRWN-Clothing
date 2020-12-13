import {shopActionTypes} from './shop.types';


export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTION_START,
})

export const fetchCollectionSuccess = collectionMap => ({
    type: shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionFail = error => ({
    type: shopActionTypes.FETCH_COLLECTION_FAIL,
    payload: error
})

