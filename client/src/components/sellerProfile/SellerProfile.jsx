import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import "./sellerProfile.scss";

function SellerProfile({ currentUser }) {
  return (
    <div className="seller_profile_container">
      <Link
        className="user-logo"
        to={`/${currentUser.displayName.replace(/ /g, "")}/add-product`}
      >
        ADD PRODUCT
      </Link>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SellerProfile);
