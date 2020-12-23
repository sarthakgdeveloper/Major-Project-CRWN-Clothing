import React from 'react';

import {HeaderContainer, LogoContainer, Logo, OptionLink, OptionDiv, OptionsContainer} from './header-pc.styles';
import {connect} from 'react-redux';


import {selectCartHidden} from '../../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../../redux/user/user.selector'

import {createStructuredSelector} from 'reselect'
import {signOutStart} from '../../../redux/user/user-action';
import Cart from '../../cart/cart'
import CartDropDown from '../../cartdropdown/cartdropdown';

const HeaderPc = ({currentUser, signOut, cartHidden}) => {
    return (
        <HeaderContainer >
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
                {
                    cartHidden? null: <CartDropDown/>
                }
            </OptionsContainer>
        </HeaderContainer>
        
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartHidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPc);
