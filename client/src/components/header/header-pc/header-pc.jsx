import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
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
  const { t } = useTranslation();

  const languageObj = {
    en: {
      code: "en",
      name: "English",
      country_code: "gb",
    },
    hi: {
      code: "hi",
      name: "Hindi",
      country_code: "in",
    },
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo to="/">
          <h1>{t("header_name")}</h1>
        </Logo>
      </LogoContainer>
      <div className="dropdown flex align-items-center">
        <button
          className="btn btn-link dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            className={`fi fi-${
              languageObj[i18n.language]?.country_code || "gb"
            } mx-2`}
          ></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {Object.values(languageObj).map(({ code, name, country_code }) => (
            <li key={country_code}>
              <button
                className="dropdown-item"
                onClick={() => i18n.changeLanguage(code)}
              >
                <span className={`fi fi-${country_code} mx-2`}></span>
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <OptionsContainer>
        {currentUser?.user !== "Karigar" ? (
          <OptionLink to="/shop">
            <span>{t("header_nav_shop")}</span>
          </OptionLink>
        ) : (
          currentUser?.user === "Karigar" && (
            <OptionLink
              to={`/${currentUser.displayName.replace(/ /g, "")}/add-product`}
            >
              <span>{t("header_nav_add_product")}</span>
            </OptionLink>
          )
        )}
        {currentUser?.user !== "Karigar"
          ? currentUser?.user === "Gharak" && (
              <OptionLink to="/auctions">
                <span>{t("header_nav_auctions")}</span>
              </OptionLink>
            )
          : currentUser?.user === "Karigar" && (
              <OptionLink to="/orders">
                <span>{t("header_nav_orders")}</span>
              </OptionLink>
            )}
        {currentUser ? (
          <OptionDiv onClick={() => signOut()}>
            {t("header_nav_signout")}
          </OptionDiv>
        ) : (
          <OptionLink to="/signin">
            <span>{t("header_nav_signin")}</span>
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
