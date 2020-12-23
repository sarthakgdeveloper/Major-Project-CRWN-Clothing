import React from 'react';
import './cartdropdownitem.scss';
import QuantityHandler from '../quantity-handler/quantity-handler';

const CartDropDownItem = ({item}) => {
    const {imageUrl, name, quantity, price} = item;
    return (
    <div className='cart-dropdown-item'>
        <img src={imageUrl} alt="item"/>
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} X ${price}</span>
        </div>
        <div className='quantity-handler'>
            <QuantityHandler cartItem={item}/>
        </div>
    </div>
)};

export default CartDropDownItem;