import React from "react";

import {
  HeaderContainer,
  LogoContainer,
  Logo,
  OptionLink,
  OptionDiv,
  OptionsContainer,
} from "./header-pc.styles";
import { connect } from "react-redux";

import { selectCartHidden } from "../../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../../redux/user/user.selector";

import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../../redux/user/user-action";
import Cart from "../../cart/cart";
import CartDropDown from "../../cartdropdown/cartdropdown";
import SellerProfile from "../../sellerProfile/SellerProfile";

const HeaderPc = ({ currentUser, signOut, cartHidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo to="/">
          <h1>Mutka</h1>
        </Logo>
      </LogoContainer>
      <OptionsContainer>
        {currentUser?.user !== "Karigar" ? (
          <OptionLink to="/shop">
            <span>Shop</span>
          </OptionLink>
        ) : (
          currentUser?.user === "Karigar" && <SellerProfile />
        )}
        {currentUser?.user !== "Karigar"
          ? null
          : currentUser?.user === "Karigar" && (
              <OptionLink to="/orders">
                <span>Orders</span>
              </OptionLink>
            )}
        {currentUser ? (
          <OptionDiv onClick={() => signOut()}>sign out</OptionDiv>
        ) : (
          <OptionLink to="/signin">
            <span>Sign In</span>
          </OptionLink>
        )}
        {currentUser?.user === "Gharak" && <Cart />}
        {cartHidden ? null : <CartDropDown />}
      </OptionsContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPc);
