import React from "react";
import Loader from "../loader/loader";
import { firestore, sendNewAuctionBid } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./productauction.scss";
import { useEffect, useState } from "react";

function ProductAuction({ match, currentUser }) {
  const [
    {
      productData,
      base_bid_value,
      bid_ended,
      bid_started,
      highest_bid,
      highest_bid_user_name,
      highest_bid_user,
    },
    storeAuctionData,
  ] = useState({});

  const [biddingAmount, setBiddingAmount] = useState(
    highest_bid ? highest_bid : base_bid_value ? base_bid_value : 0
  );

  const [loading, isLoading] = useState(true);

  const subscribe = async (id) => {
    firestore.doc(`auctions/${id}`).onSnapshot(async (snapshot) => {
      const { uid, ...otherInfo } = snapshot.data();
      const data = await uid.get();
      storeAuctionData({
        productData: data.data(),
        ...otherInfo,
      });
      setTimeout(() => isLoading(false), 1000);
    });
  };

  useEffect(() => {
    if (match?.params?.id) {
      subscribe(match?.params?.id);
    }

    return () => subscribe(match?.params?.id);
  }, [match?.params?.id]);

  useEffect(() => {
    if (highest_bid) {
      setBiddingAmount(highest_bid);
    }
  }, [highest_bid]);

  const handlebiddingInput = (e) => {
    return setBiddingAmount(e.target.value);
  };

  const handleBidButtonClick = async () => {
    if (
      !(highest_bid < biddingAmount && highest_bid_user !== currentUser?.id)
    ) {
      return alert("error");
    }
    const status = await sendNewAuctionBid(
      match?.params?.id,
      currentUser,
      biddingAmount
    );
    if (status) {
      return alert("success");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="auctionProduct_cardContainer">
      {currentUser?.user === "Gharak" &&
      productData &&
      bid_started &&
      !bid_ended ? (
        <>
          <span>Auction for</span>
          <p>{productData?.productName}</p>
          <div className="product_card">
            <div className="productImage_container">
              <LazyLoadImage
                src={productData?.imagesUrl[0]}
                alt=""
                effect="blur"
              />
            </div>
            <div className="auctionData">
              <div className="highestBid_details">
                <div>
                  {currentUser?.id === highest_bid_user && (
                    <span className="own_bid">Your bid</span>
                  )}
                  <span>{highest_bid_user_name}</span>
                </div>
                <span>{`₹${highest_bid}`}</span>
              </div>
              <div className="bid_input">
                <input
                  type="number"
                  placeholder="Place a higher bid!!"
                  value={`${biddingAmount}`}
                  onChange={handlebiddingInput}
                />
              </div>
              <button
                disabled={
                  currentUser?.id === highest_bid_user ||
                  biddingAmount <= highest_bid
                }
                onClick={handleBidButtonClick}
              >
                Bid Now
              </button>
            </div>
          </div>
        </>
      ) : (
        <span>Error</span>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ProductAuction);
