import {shopActionTypes} from './shop.types';

const INITIAL_STATE = {};

const shopReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case shopActionTypes.GET_SHOP_DATA:
            state = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
}

export default shopReducer;