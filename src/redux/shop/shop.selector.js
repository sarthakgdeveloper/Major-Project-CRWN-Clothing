import {createSelector} from 'reselect';


const getState = state => state;

export const selectShop = createSelector([getState], (state) => {
    return state.shop
});

export const selectCollection = collectionUrlParams => createSelector([selectShop], shop => shop ? shop[collectionUrlParams]:null);
