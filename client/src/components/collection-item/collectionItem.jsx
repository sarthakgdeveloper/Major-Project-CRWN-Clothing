import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import {
  CollectionFooterContainer,
  CollectionItemContainer,
  CustomButtonContainer,
  ImageContainer,
} from "./collectionItem.style";

const CollectionItem = ({ item, addItem }) => {
  const {
    items: { productName: name, price, imagesUrl },
  } = item;

  return (
    <CollectionItemContainer>
      <ImageContainer
        style={{ backgroundImage: `url(${imagesUrl[0]})` }}
      ></ImageContainer>
      <CollectionFooterContainer>
        <span>{name}</span>
        <span>₹{price}</span>
      </CollectionFooterContainer>
      <CustomButtonContainer onClick={() => addItem(item?.items)}>
        Add To Cart
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
