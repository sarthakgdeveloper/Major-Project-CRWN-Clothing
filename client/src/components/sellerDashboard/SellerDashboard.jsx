import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getStoreData } from "../../firebase/firebase.utils";
import "./sellerdashboard.scss";
import SellerEachProduct from "../sellerEachProduct/SellerEachProduct";

function SellerDashboard({ currentUser }) {
  const [data, setData] = useState([]);

  const gettingStoreData = async (id) => {
    await getStoreData(id, setData);
  };

  useEffect(() => {
    return () => setData([]);
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      gettingStoreData(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className="seller_dashboard">
      <span className="seller_displayName">{currentUser?.displayName}</span>
      <div className="sellerProducts_container">
        {data &&
          data.map((product, index) => (
            <SellerEachProduct product={product} key={index} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SellerDashboard);
