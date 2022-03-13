import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getSellerOrders } from "../../firebase/firebase.utils";
import "./sellerorder.scss";

function SellerOrders({ currentUser }) {
  const [orderData, getOrderData] = useState([]);

  const gettingOrderData = async () => {
    await getSellerOrders(currentUser.id, getOrderData);
  };

  useEffect(() => {
    if (currentUser && currentUser?.id) {
      gettingOrderData();
    }
    return () => getOrderData([]);
  }, [currentUser]);

  console.log(orderData);

  return currentUser?.user === "Karigar" ? (
    <div className="sellerOrders_container">
      <span className="sellerOrders_title">Orders</span>
      {orderData && orderData.length > 0 && (
        <div className="sellerOrders">
          <div className="eachOrder">
            <div>
              <span>Product Name</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            <div>
              <span>Address</span>
            </div>
          </div>
          {orderData.map((order, index) => (
            <div className="eachOrder" key={index}>
              <div>
                <span>{order?.productName}</span>
                <span>{order?.quantity}</span>
                <span>{order?.price}</span>
              </div>
              <div>
                <span>{order?.userInfo?.name}</span>
                <span>{order?.userInfo?.address_line1}</span>
                <span>{order?.userInfo?.address_city}</span>
                <span>{order?.userInfo?.address_zip}</span>
                <span>{order?.userInfo?.address_country}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SellerOrders);
