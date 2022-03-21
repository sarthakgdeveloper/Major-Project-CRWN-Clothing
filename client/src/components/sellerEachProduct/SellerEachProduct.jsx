import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./sellereachproduct.scss";

function SellerEachProduct({ product }) {
  const { t } = useTranslation();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  return (
    <div className="sellerEachProduct_container">
      <div
        className="productImages_shifters"
        style={{ display: product?.imagesUrl?.length > 1 ? "flex" : "none" }}
      >
        <span
          onClick={() =>
            selectedPhoto > 0 && setSelectedPhoto(selectedPhoto - 1)
          }
          style={selectedPhoto === 0 ? { opacity: "0.5" } : {}}
        >
          &#8656;
        </span>
        <span
          onClick={() =>
            selectedPhoto < product?.imagesUrl?.length - 1 &&
            setSelectedPhoto(selectedPhoto + 1)
          }
          style={
            selectedPhoto === product?.imagesUrl.length - 1
              ? { opacity: "0.5" }
              : {}
          }
        >
          &#8658;
        </span>
      </div>
      <div className="productImage_container">
        <LazyLoadImage
          src={product?.imagesUrl[selectedPhoto]}
          alt={product?.productName}
          effect="blur"
        />
      </div>
      <div className="productDetails">
        <span>{product?.productName}</span>
        <span>{t(product?.category.toLowerCase())}</span>
        <span>₹{product?.price}</span>
      </div>
    </div>
  );
}

export default SellerEachProduct;
