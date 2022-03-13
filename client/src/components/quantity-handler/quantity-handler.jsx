import React from "react";
import { connect } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cart/cart.action";
import "./quantity-handler.scss";

const QuantityHandler = ({ dispatch, cartItem }) => {
  const { quantity } = cartItem;
  return (
    <span className="quantity">
      <span
        className="symbol"
        onClick={() => dispatch(decreaseQuantity(cartItem))}
      >
        &#10094;
      </span>
      {quantity}
      <span
        className="symbol"
        onClick={() => dispatch(increaseQuantity(cartItem))}
      >
        &#10095;
      </span>
    </span>
  );
};

export default connect(null)(QuantityHandler);
