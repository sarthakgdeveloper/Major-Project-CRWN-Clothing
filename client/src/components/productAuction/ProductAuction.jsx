import React from "react";
import Loader from "../loader/loader";
import { getAuctionProduct } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./productauction.scss";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AuctionBidEndedPopup from "../auctionBidEndedPopup/AuctionBidEndedPopup";

function ProductAuction({ match, currentUser }) {
  const [
    { productData, base_bid_value, bid_ended, bid_started },
    storeAuctionData,
  ] = useState({});
  const [biddingAmount, setBiddingAmount] = useState(0);
  const [highestBid, sethighestBid] = useState(0);
  const [highestBidUser, sethighestBidUser] = useState(0);
  const [highestBidUserId, sethighestBidUserId] = useState(0);
  const [counter, setCounter] = useState(undefined);
  const [loading, isLoading] = useState(true);
  const [bidEnded, isBidEnded] = useState(false);

  const socket = io.connect("http://localhost:5000");

  const getProductData = async () => {
    const data = await getAuctionProduct(match.params.id);
    const {
      base_bid_value,
      bid_ended,
      bid_started,
      productData,
      highest_bid,
      highest_bid_user,
      highest_bid_user_name,
    } = data;
    storeAuctionData({
      productData,
      base_bid_value,
      bid_ended,
      bid_started,
    });
    if (highest_bid && highest_bid_user) {
      sethighestBid(highest_bid);
      setBiddingAmount(highest_bid);
      sethighestBidUser(highest_bid_user_name);
      sethighestBidUserId(highest_bid_user);
      isBidEnded(bid_ended);
    }
    setTimeout(() => isLoading(false), 1000);
  };

  useEffect(() => {
    if (currentUser && currentUser?.id && productData)
      socket.emit(
        "join",
        { userId: currentUser?.id, auctionRoom: match?.params?.id },
        (error) => {
          if (error) return console.log(error);
          return console.log("successfully joined the room");
        }
      );
  }, [currentUser?.id, productData]);

  useEffect(() => {
    getProductData();
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      alert("hello");
      return "jello";
    });
  }, []);

  socket.on("auctionBid", ({ newBid, userId, userName }) => {
    if (!userId || !userName || !newBid) return;
    isLoading(false);
    setBiddingAmount(newBid);
    sethighestBid(newBid);
    sethighestBidUser(userName);
    sethighestBidUserId(userId);
  });

  socket.on("counter", ({ Counter = 0 }) => {
    setCounter(Counter);
  });

  socket.on("auctionEnded", () => {
    console.log("ended");
    isBidEnded(true);
    window.location.reload();
  });

  const handlebiddingInput = (e) => {
    return setBiddingAmount(e.target.value);
  };

  const handleBidButtonClick = async () => {
    if (
      !(
        Number(highestBid || base_bid_value) < Number(biddingAmount) &&
        highestBidUserId !== currentUser?.id
      )
    ) {
      return alert("error");
    }
    isLoading(true);

    socket.emit(
      "sendAuctionBid",
      { newBid: biddingAmount, userId: currentUser?.id },
      (error) => {
        if (error) {
          return alert(error);
        }
      }
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="auctionProduct_cardContainer">
      {currentUser?.user === "Gharak" &&
      productData &&
      bid_started &&
      !bidEnded ? (
        <>
          <span>Auction for</span>
          <p>{productData?.productName}</p>
          <span>{!isNaN(counter) && counter}</span>
          <div className="product_card">
            <div className="productImage_container">
              <LazyLoadImage
                src={productData?.imagesUrl[0]}
                alt=""
                effect="blur"
                height="100%"
                width="100%"
              />
            </div>
            <div className="auctionData">
              <div className="highestBid_details">
                {highestBid && highestBidUserId ? (
                  <>
                    <div>
                      {currentUser?.id === highestBidUserId && (
                        <span className="own_bid">Your bid</span>
                      )}
                      <span>{highestBidUser}</span>
                    </div>
                    <span>{`₹${highestBid}`}</span>
                  </>
                ) : (
                  <>
                    <span>No bids</span>
                    <div>
                      <span className="own_bid">Starting Price</span>
                      <span>₹{base_bid_value}</span>
                    </div>
                  </>
                )}
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
                  currentUser?.id === highestBidUserId ||
                  Number(biddingAmount) <=
                    Number(highestBid ? highestBid : base_bid_value)
                }
                onClick={handleBidButtonClick}
              >
                Bid Now
              </button>
            </div>
          </div>
        </>
      ) : bidEnded ? (
        <AuctionBidEndedPopup
          details={{
            productData,
            highestBidUser,
            highestBidUserId,
            highestBid,
            currentUserId: currentUser?.id,
          }}
        />
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
