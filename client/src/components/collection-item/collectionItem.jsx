import React, { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import {
  CollectionFooterContainer,
  CollectionItemContainer,
  CustomButtonContainer,
  ImageContainer,
  ImageShifter,
  ImagesSpan,
} from "./collectionItem.style";

const CollectionItem = ({ item, addItem }) => {
  const {
    items: { productName: name, price, imagesUrl },
  } = item;

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <CollectionItemContainer>
      <ImageContainer
        style={{ backgroundImage: `url(${imagesUrl[selectedPhoto]})` }}
      >
        <ImageShifter
          style={
            imagesUrl.length > 1 ? { display: "flex" } : { display: "none" }
          }
        >
          <ImagesSpan
            onClick={() =>
              selectedPhoto > 0 && setSelectedPhoto(selectedPhoto - 1)
            }
            style={selectedPhoto === 0 ? { opacity: "0.5" } : {}}
          >
            &#8656;
          </ImagesSpan>
          <ImagesSpan
            onClick={() =>
              selectedPhoto < imagesUrl?.length - 1 &&
              setSelectedPhoto(selectedPhoto + 1)
            }
            style={
              selectedPhoto === imagesUrl.length - 1 ? { opacity: "0.5" } : {}
            }
          >
            &#8658;
          </ImagesSpan>
        </ImageShifter>
      </ImageContainer>
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
