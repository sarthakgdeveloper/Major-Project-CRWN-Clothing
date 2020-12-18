import cartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: cartActionTypes.TOGGLE_CART_HIDDEN,
})

export const addItem = (item) => ({
    type: cartActionTypes.ADD_ITEMS,
    payload: item
})

export const increaseQuantity = (item) => ({
    type: cartActionTypes.INCREASE_QUANTITY,
    payload: item
})

export const decreaseQuantity = (item) => ({
    type: cartActionTypes.DECREASE_QUANTITY,
    payload: item
})
export const removeItem = (item) => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
})
export const clearCart = () => ({
    type: cartActionTypes.CLEAR_CART
})