import React from 'react';
import './checkout.item.scss';
import {increaseQuantity, decreaseQuantity, removeItem} from '../../redux/cart/cart.action';
import {connect} from 'react-redux';

const CheckoutItem = ({cartItem: {name, imageUrl, price, quantity}, dispatch, cartItem}) => (
    <div className='checkout-item'>
        <div className="image-container">
            <img src={imageUrl} alt="item"/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <span className='symbol'onClick={() => dispatch(decreaseQuantity(cartItem))}>&#10094;</span>
            {quantity}
            <span className='symbol' onClick={() => dispatch(increaseQuantity(cartItem))}>&#10095;</span>
            </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={() => dispatch(removeItem(cartItem))}>&#10005;</div>
    </div>
)

export default connect(null)(CheckoutItem);