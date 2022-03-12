import React from "react";
import "./checkout.item.scss";
import QuantityHandler from "../quantity-handler/quantity-handler";
import { removeItem } from "../../redux/cart/cart.action";
import { connect } from "react-redux";

const CheckoutItem = ({
  cartItem: { name, imagesUrl, price },
  dispatch,
  cartItem,
}) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imagesUrl[0]} alt="item" />
      </div>
      <span className="name">{name}</span>
      <QuantityHandler cartItem={cartItem} />
      <span className="price">₹{price}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(removeItem(cartItem))}
      >
        &#10005;
      </div>
    </div>
  );
};

export default connect(null)(CheckoutItem);
