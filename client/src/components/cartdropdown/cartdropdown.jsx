import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom-button/button";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartDropDownItem from "../cartdropdownitem/cartdropdownitem";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cartdropdown.scss";

const CartDropDown = ({ CartItems, history, dispatch }) => {
  const { t } = useTranslation();
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {CartItems.length ? (
          CartItems.map((item) => (
            <CartDropDownItem key={item.id} item={item} />
          ))
        ) : (
          <span className="empty-message">{t("empty_cart_message")}</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        {t("go_to_checkout")}
      </CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  CartItems: selectCartItems(state),
});

export default withRouter(connect(mapStateToProps)(CartDropDown));
