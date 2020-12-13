import {createSelector} from 'reselect';


export const selectShop = (state) => {
    return state.shop
};
export const selectCollectionItems = createSelector([selectShop], (shop) => {
    return shop.collection
});

export const selectCollection = collectionUrlParams => createSelector([selectCollectionItems], shop => shop ? shop[collectionUrlParams]:null);
export const selectIsfetching = createSelector([selectShop], shop => shop.isFetching )