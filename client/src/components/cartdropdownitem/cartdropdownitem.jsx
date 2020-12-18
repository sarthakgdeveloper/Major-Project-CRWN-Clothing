import React from 'react';
import './cartdropdownitem.scss';

const CartDropDownItem = ({item: {imageUrl, name, quantity, price}}) => (
    <div className='cart-dropdown-item'>
        <img src={imageUrl} alt="item"/>
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} X ${price}</span>
        </div>
    </div>
)

export default CartDropDownItem;