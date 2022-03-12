import React from "react";
import Directory from "../directory/directory-component";
import SellerDashboard from "../sellerDashboard/SellerDashboard";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { HomePageContainer } from "./homepage.style";

const HomePage = ({ currentUser }) => {
  return (
    <HomePageContainer>
      {currentUser?.user === "Karigar" ? <SellerDashboard /> : <Directory />}
    </HomePageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
