import React from 'react';

import {connect} from 'react-redux';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors'

import {toggleCartHidden} from '../../redux/cart/cart.action'

import './cart.scss';


const Cart = ({toggleCartHidden, CartItemsCount}) => {


    return (
        <div className='cart-item' onClick={toggleCartHidden}>
            <i className="fas fa-shopping-cart cart-logo"></i>
            <div className='cart-count-container'>
                <span className='cart-count'>{CartItemsCount}</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    CartItemsCount: selectCartItemsCount(state), 
})

const mapDispatchToProp = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
})

export default connect(mapStateToProps, mapDispatchToProp)(Cart);