import {shopActionTypes} from './shop.types';

export const getShopdata = (data) => ({
    type: shopActionTypes.GET_SHOP_DATA,
    payload: data,
})