import cartActionTypes from './cart.types';

window.localStorage.setItem('localCartItems', '[]');

const INITIAL_STATE = {
    hidden: true,
    cartItems: JSON.parse(window.localStorage.getItem('localCartItems')),
}


function removeItem(cartItems, item) {
    const newCartItem = cartItems.filter(citem => citem.id !== item.id)
    return newCartItem;
}

function addSameCartItem(cartItems, item) {
    return cartItems.map(cartItem => cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
}
function subSameCartItem(cartItems, item) {

    if(item.quantity === 1) {
        return removeItem(cartItems, item);
    }

    return cartItems.map(cartItem => cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}

function AddItems(cartItems, item) {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingCartItem) {
        return addSameCartItem(cartItems, item);
    }

    return [...cartItems, {...item}]
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden,
            }
        case cartActionTypes.ADD_ITEMS:
            return {
                ...state,
                cartItems: AddItems(state.cartItems, action.payload)
            }
        case cartActionTypes.INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: addSameCartItem(state.cartItems, action.payload)
            }
        case cartActionTypes.DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: subSameCartItem(state.cartItems, action.payload)
            }
        case cartActionTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems: removeItem(state.cartItems, action.payload)
            }
            
        default:
            return state;
    }
}

export default cartReducer;
