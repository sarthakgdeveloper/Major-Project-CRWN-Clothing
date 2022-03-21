import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  CollectionFooterContainer,
  CollectionItemContainer,
  CustomButtonContainer,
  ImageContainer,
  ImageShifter,
  ImagesSpan,
} from "./collectionItem.style";

const CollectionItem = ({ item, addItem }) => {
  const { t } = useTranslation();
  const {
    items: { productName: name, price, imagesUrl },
  } = item;

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <CollectionItemContainer>
      <ImageContainer>
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
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          <LazyLoadImage
            src={imagesUrl[selectedPhoto]}
            effect="blur"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            height={"100%"}
            width={"100%"}
          />
        </div>
      </ImageContainer>
      <CollectionFooterContainer>
        <span>{name}</span>
        <span>₹{price}</span>
      </CollectionFooterContainer>
      <CustomButtonContainer onClick={() => addItem(item?.items)}>
        {t("add_to_cart")}
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
