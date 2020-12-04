import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../checkout.item/checkout.item';
import StripeCheckoutButton from '../stripe-button/stripe'
import './checkout.scss';

const CheckOut = ({cartItem, cartTotal}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItem.map(item => <CheckoutItem key={item.id} cartItem={item}/>)
        }

        <div className="total">
            <span>TOTAL: ${cartTotal}</span>
        </div>

        <div className="test-warning">
            *Please use the following test credit card for payments*
            <br/>
            4242 4242 4242 4242 - Exp: 12/20 - CVV: 123
        </div>
        <StripeCheckoutButton price={cartTotal}/>
       
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItem: selectCartItems,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(CheckOut);