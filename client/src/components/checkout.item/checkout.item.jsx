import React from "react";
import QuantityHandler from "../quantity-handler/quantity-handler";
import { removeItem } from "../../redux/cart/cart.action";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./checkout.item.scss";

const CheckoutItem = ({
  cartItem: { name, imagesUrl, price },
  dispatch,
  cartItem,
}) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <LazyLoadImage src={imagesUrl[0]} alt="item" effect="blur" />
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
