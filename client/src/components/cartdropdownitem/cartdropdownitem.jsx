import React from "react";
import QuantityHandler from "../quantity-handler/quantity-handler";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./cartdropdownitem.scss";

const CartDropDownItem = ({ item }) => {
  const { imagesUrl, name, quantity, price } = item;
  return (
    <div className="cart-dropdown-item">
      <LazyLoadImage src={imagesUrl[0]} alt="item" effect="blur" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} X ₹{price}
        </span>
      </div>
      <div className="quantity-handler">
        <QuantityHandler cartItem={item} />
      </div>
    </div>
  );
};

export default CartDropDownItem;
