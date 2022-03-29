import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { createAuctionProduct } from "../../firebase/firebase.utils";
import Axios from "axios";
import "./auctionpopup.scss";

function AuctionPopup({
  imagesUrl,
  productName,
  setPopupData,
  price,
  id,
  setAuctioned,
}) {
  const [auctionDate, setAuctionDate] = useState(getCurrentDate);
  const [basePrice, setBasePrice] = useState(price);
  const [auctionTime, setAuctionTime] = useState(getCurrentTime);

  const handleBasePriceChange = (e) => setBasePrice(e.target.value);
  const handleAuctionDateChange = (e) => {
    const selectedDate = Date.parse(`${e.target.value} ${auctionTime}`);
    const todayDate = Date.parse(new Date());
    if (todayDate > selectedDate) {
      return alert("select a date in future");
    }
    return setAuctionDate(e.target.value);
  };

  const handleAuctionTimeChange = (e) => {
    const selectedTime = Date.parse(`${auctionDate} ${e.target.value}`);
    const todaytime = Date.parse(new Date());
    if (todaytime >= selectedTime) {
      return alert("select a time in future");
    }
    return setAuctionTime(e.target.value);
  };

  function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  function getCurrentTime() {
    let today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    return time;
  }

  const sendAuctionRequest = async () => {
    const selectedDate = Date.parse(`${auctionDate} ${auctionTime}`);
    const todayDate = Date.parse(new Date());
    if (selectedDate <= todayDate) {
      return alert("Date and Time can not be set to past or present");
    }
    const auctionId = await createAuctionProduct({
      id,
      basePrice,
      date: auctionDate,
      time: auctionTime,
    });
    await Axios({
      url: "schedule_auction",
      method: "post",
      data: {
        date: auctionDate,
        time: auctionTime,
        auctionId,
      },
    })
      .then((response) => {
        setAuctioned(true);
      })
      .catch((error) => {
        console.log("Error: ", error.response.data);
        alert("There was an issue");
      });
    setPopupData(false);
    if (auctionId) return alert("auction has been done");
    else return alert("there is some error");
  };

  return (
    <div className="auctionPopup_container">
      <div className="auctionPopup">
        <div className="close_icon">
          <i
            className="fa-solid fa-xmark"
            onClick={() => setPopupData(false)}
          ></i>
        </div>
        <div className="productDetail_container">
          <div>
            <LazyLoadImage src={imagesUrl[0]} height="100%" width="100%" />
          </div>
          <p>{productName}</p>
        </div>
        <div className="productAuction_details">
          <div>
            <label htmlFor="basePrice_setup">Base Price</label>
            <input
              type="number"
              id="basePrice_setup"
              value={basePrice}
              onChange={handleBasePriceChange}
              required
            />
          </div>
          <div>
            <label htmlFor="auctionStart_setup">Set Auction Date</label>
            <input
              type="date"
              id="auctionStart_setup"
              value={auctionDate}
              onChange={handleAuctionDateChange}
              required
            />
          </div>
          <div>
            <label htmlFor="auctionStart_setup">Set Auction Time</label>
            <input
              type="time"
              id="auctionStart_setup"
              value={auctionTime}
              onChange={handleAuctionTimeChange}
              required
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success submit_button"
          onClick={() => {
            sendAuctionRequest();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AuctionPopup;
