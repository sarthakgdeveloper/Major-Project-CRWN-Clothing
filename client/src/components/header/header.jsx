
import React from 'react';

import {connect} from 'react-redux';

import CartDropDown from '../cartdropdown/cartdropdown';

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import {createStructuredSelector} from 'reselect'
import {signOutStart} from '../../redux/user/user-action';
import Cart from '../cart/cart'


import {HeaderContainer, LogoContainer, Logo, OptionLink, OptionDiv, OptionsContainer} from './header.styles';



const Header = ({currentUser, cartHidden, signOut}) => (
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
                    <OptionDiv onClick={()=>signOut()}>sign out</OptionDiv>) : (
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

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);