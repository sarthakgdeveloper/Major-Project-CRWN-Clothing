import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AuctionPopup from "../auctionPopup/AuctionPopup";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./sellereachproduct.scss";
import { deleteSellerProduct } from "../../firebase/firebase.utils";

function SellerEachProduct({ product }) {
  const { t } = useTranslation();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [popupData, setPopupData] = useState(false);
  const [auctioned, setAuctioned] = useState(false);

  useEffect(() => {
    if (product?.isAuctioned) {
      setAuctioned(true);
    }
  }, [product]);

  return (
    <div className="sellerEachProduct_container">
      {popupData && (
        <AuctionPopup
          {...product}
          setPopupData={setPopupData}
          setAuctioned={setAuctioned}
        />
      )}
      <div
        className="dropdown"
        style={{ zIndex: 10, position: "relative", left: "45%" }}
      >
        <button
          className="btn"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {!auctioned && (
            <li>
              <button
                className="dropdown-item"
                onClick={() => setPopupData(true)}
              >
                Set as Auction
              </button>
            </li>
          )}
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                deleteSellerProduct(product);
              }}
            >
              Delete this product
            </button>
          </li>
        </ul>
      </div>
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
            selectedPhoto === product?.imagesUrl?.length - 1
              ? { opacity: "0.5" }
              : {}
          }
        >
          &#8658;
        </span>
      </div>
      {auctioned && <span className="auctionProduct_style">Auctioned</span>}
      <div className="productImage_container">
        <LazyLoadImage
          src={product?.imagesUrl[selectedPhoto]}
          alt={product?.productName}
          effect="blur"
          height="100%"
          width="100%"
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
