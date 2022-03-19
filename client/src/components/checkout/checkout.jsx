import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../checkout.item/checkout.item";
import StripeCheckoutButton from "../stripe-button/stripe";
import "./checkout.scss";

const CheckOut = ({ cartItem, cartTotal }) => {
  const { t } = useTranslation();
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>{t("checkout_product")}</span>
        </div>
        <div className="header-block">
          <span>{t("checkout_description")}</span>
        </div>
        <div className="header-block">
          <span>{t("checkout_quantity")}</span>
        </div>
        <div className="header-block">
          <span>{t("checkout_price")}</span>
        </div>
        <div className="header-block">
          <span>{t("checkout_remove")}</span>
        </div>
      </div>
      {cartItem.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <div className="total">
        <span>GST(18%) = </span>
        <span>
          {t("checkout_total")} ₹{Math.ceil(cartTotal + (18 / 100) * cartTotal)}
        </span>
      </div>

      {cartTotal ? (
        <div style={{ textAlign: "center" }}>
          <div className="test-warning">
            *{t("checkout_pay_message")}*
            <br />
            4242 4242 4242 4242 - Exp: 12/22 - CVV: 123
          </div>
          <StripeCheckoutButton
            price={Math.ceil(cartTotal + (18 / 100) * cartTotal)}
          />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItem: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CheckOut);
