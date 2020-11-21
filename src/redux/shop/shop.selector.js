import {createSelector} from 'reselect';

const getState = state => state;

export const selectShop = createSelector([getState], (state) => state.shop);

export const selectCollection = collectionUrlParams => createSelector([selectShop], shop => shop[collectionUrlParams]);
