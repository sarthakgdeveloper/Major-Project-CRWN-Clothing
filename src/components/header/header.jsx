
import React from 'react';

import {connect} from 'react-redux';

import CartDropDown from '../cartdropdown/cartdropdown';

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import {createStructuredSelector} from 'reselect'

import Cart from '../cart/cart'


import {auth} from '../../firebase/firebase.utils'

import {HeaderContainer, LogoContainer, Logo, OptionLink, OptionDiv, OptionsContainer} from './header.styles';



const Header = ({currentUser, cartHidden}) => (
    <HeaderContainer>
        <LogoContainer>
            <Logo to='/'>
                <h1>HMS</h1>
            </Logo>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                <span>Shop</span>
            </OptionLink>
            <OptionLink to='/contact'>
                <span>Contact</span>
            </OptionLink>
            {
                currentUser ? (
                    <OptionDiv onClick={()=>auth.signOut()}>sign out</OptionDiv>) : (
                    <OptionLink to='/signin'>
                        <span>Sign In</span>
                    </OptionLink>
                )
                
            }
            <Cart/>
        </OptionsContainer>
        {
            cartHidden? null: <CartDropDown/>
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);