import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./auctionbidendedpopup.scss";

function AuctionBidEndedPopup({ details }) {
  const {
    productData: { productName, imagesUrl },
    highestBidUser,
    highestBidUserId,
    highestBid,
    currentUserId,
  } = details;

  return (
    <div className="auctionBidEndedPopup_container">
      <div className="auctionBidEndedPopup">
        <span>Auction has been ended!</span>
        {currentUserId === highestBidUserId && (
          <span>Congratulations, You won!!</span>
        )}
        <div className="productDetail_container">
          <div>
            <LazyLoadImage src={imagesUrl[0]} height="100%" width="100%" />
          </div>
          <p>{productName}</p>
        </div>
        <div className="auctionBidEndedPopup_userDetails">
          <p>HighestBid </p>
          <span>
            {highestBidUser} ₹{highestBid}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuctionBidEndedPopup;
