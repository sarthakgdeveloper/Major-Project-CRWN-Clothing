
import React from 'react';

import {connect} from 'react-redux';

import CartDropDown from '../cartdropdown/cartdropdown';

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import {createStructuredSelector} from 'reselect'

import Cart from '../cart/cart'

import {Link} from 'react-router-dom'

import {auth} from '../../firebase/firebase.utils'

import './header.scss'



const Header = ({currentUser, cartHidden}) => (
    <div className='header'>
        <div className='logo-container'>
            <Link to='/' className='logo'>
                <h1>HMS</h1>
            </Link>
        </div>
        <div className="options">
            <Link to='/shop' className='option'>
                <span>Shop</span>
            </Link>
            <Link to='/contact' className='option'>
                <span>Contact</span>
            </Link>
            {
                currentUser ? (
                    <div className='option' onClick={()=>auth.signOut()}>sign out</div>) : (<Link to='/signin' className='option'><span>Sign In</span></Link>
                )
                
            }
            <Cart/>
        </div>
        {
            cartHidden? null: <CartDropDown/>
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);