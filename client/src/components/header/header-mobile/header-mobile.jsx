import React, { useState } from "react";
import "./header-mobile.scss";

import { connect } from "react-redux";

import { selectCartHidden } from "../../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../../redux/user/user.selector";

import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../../redux/user/user-action";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  LogoContainer,
  Logo,
} from "../header-pc/header-pc.styles.jsx";
import Cart from "../../cart/cart";
import CartDropDown from "../../cartdropdown/cartdropdown";

const HeaderMobile = ({ currentUser, signOut, cartHidden }) => {
  const [clicked, onClicked] = useState("");

  return (
    <div className={`navbar ${clicked ? "drop-down-navbar" : ""}`}>
      <div
        className={`navbar-items ${clicked ? "drop-down" : ""}`}
        onClick={() => {
          onClicked(!clicked);
        }}
      >
        <div>
          <Link className="links" to="/shop">
            Shop
          </Link>
        </div>
        <div>
          <Link className="links" to="/contact">
            Contact
          </Link>
        </div>
        <div>
          {currentUser ? (
            <div onClick={() => signOut()}>
              <span>sign out</span>
            </div>
          ) : (
            <Link className="links" to="/signin">
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
      <div className="logo">
        <HeaderContainer>
          <LogoContainer>
            <Logo to="/">
              <h1>Mutka</h1>
            </Logo>
          </LogoContainer>
        </HeaderContainer>
      </div>
      <div className="cart">
        <Cart />
        {cartHidden ? null : <CartDropDown />}
      </div>
      <div
        className={`hamburger-logo ${clicked ? "clicked-hamburger-logo" : ""}`}
        onClick={() => {
          return onClicked(!clicked);
        }}
      >
        <span></span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
