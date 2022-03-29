import React, { useState, useEffect } from "react";
import { fGetAuctionsData } from "../../firebase/firebase.utils";
import "./displayauction.scss";

function DisplayAuction() {
  const [auctionsData, getAuctionsData] = useState([]);
  const gettingAuctionsData = async () => {
    await fGetAuctionsData(getAuctionsData);
  };

  useEffect(() => {
    gettingAuctionsData();
  }, []);
  return (
    <div className="displayAuctions_container">
      <div className="displayAuctions">
        {auctionsData && auctionsData.length > 0 && (
          <>
            <div className="bid_started_container">
              <p>Auctions Started</p>
              <div className="bid_started">
                {auctionsData
                  .filter((auction) => auction?.bid_started)
                  .map((auction, index) => (
                    <div className="auction_stared" key={index}>
                      <div className="auctionProduct_image">
                        <img
                          src={auction?.productData?.imagesUrl[0]}
                          alt={auction?.productData?.productName}
                        />
                      </div>

                      <button>
                        <a href={`/auctions/${auction?.id}`}>Enter</a>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bid_starting_container">
              <p>Auctions yet to start</p>
              <div className="bid_starting">
                {auctionsData
                  .filter((auction) => !auction?.bid_started)
                  .map((auction, index) => (
                    <div className="auction_starting" key={index}>
                      <div className="auctionProduct_image">
                        <img
                          src={auction?.productData?.imagesUrl[0]}
                          alt={auction?.productData?.productName}
                        />
                      </div>
                      <div className="auctionStarting_dateTime">
                        <span>Starting at:</span>
                        <div>
                          <span>{auction?.date}</span>
                          <span>{auction?.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DisplayAuction;
