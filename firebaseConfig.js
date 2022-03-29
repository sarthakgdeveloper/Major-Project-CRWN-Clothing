const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  collection,
  getDoc,
  updateDoc,
} = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyDomk6ggJs796Gw9dtmelLHtklalCE2WkE",
  authDomain: "first-project--crown-clothing.firebaseapp.com",
  databaseURL: "https://first-project--crown-clothing.firebaseio.com",
  projectId: "first-project--crown-clothing",
  storageBucket: "first-project--crown-clothing.appspot.com",
  messagingSenderId: "63404492215",
  appId: "1:63404492215:web:7509336481787fd7d79432",
  measurementId: "G-1ZS40E2N6R",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Auction = collection(db, "auctions");
const Users = collection(db, "users");

const getAuctionDetails = async (id) => {
  try {
    const auctionRef = doc(Auction, id);
    const aSnapshot = await getDoc(auctionRef);
    const auctionData = aSnapshot.data();
    if (aSnapshot.exists()) {
      return {
        error: null,
        auction: {
          auctionRef,
          auctionData,
        },
      };
    }
    console.log(e.message);
  } catch (e) {
    return { auction: null, error: e.message };
  }
};

const startTheAuction = async (id) => {
  try {
    const {
      auction: { auctionRef, auctionData },
      error,
    } = await getAuctionDetails(id);
    if (!error) {
      await updateDoc(auctionRef, {
        ...auctionData,
        bid_started: true,
      });

      return { error: null, auction: auctionData };
    }
    return false;
  } catch (e) {
    console.log(e.message);
    return { error: e.message, auction: null };
  }
};

const getUserDetails = async (id) => {
  try {
    const userRef = doc(Users, id);
    const aSnapshot = await getDoc(userRef);
    const userData = aSnapshot.data();
    if (aSnapshot.exists()) {
      return { user: userData, error: null };
    }
    return { user: null, error: "No user found" };
  } catch (e) {
    console.log(e.message);
    return { user: null, error: e.message };
  }
};

const placeHigherBid = async (id, newBid, user) => {
  try {
    const {
      auction: { auctionRef, auctionData },
      error,
    } = await getAuctionDetails(id);
    if (error) return { error };
    if (Number(newBid) <= Number(auctionData?.highest_bid)) {
      return { error: "Bid value is not valid" };
    }
    if (!error && !auctionData?.bid_ended) {
      await updateDoc(auctionRef, {
        ...auctionData,
        highest_bid: newBid,
        highest_bid_user: user?.userId,
        highest_bid_user_name: user?.userName,
      });

      return { error: null, auction: auctionData };
    }
    return { error: "unable to place this bid" };
  } catch (e) {
    console.log(e.message);
    return { auction: null, error: e.message };
  }
};

const checkAuctionBidEnded = async (id) => {
  try {
    const {
      auction: { auctionData },
      error,
    } = await getAuctionDetails(id);
    if (error) {
      return { error };
    }
    return {
      auctionEnded: auctionData.bid_ended ? "Auction has been Finished" : false,
    };
  } catch (e) {
    console.log(e.message);
    return { auctionEnded: null, error: e.message };
  }
};

const endAuction = async (id) => {
  try {
    const {
      auction: { auctionData, auctionRef },
      error,
    } = await getAuctionDetails(id);
    if (error) {
      return { error };
    }
    await updateDoc(auctionRef, {
      ...auctionData,
      bid_ended: true,
    });
    return {
      auctionEnded: "Auction has been Finished",
    };
  } catch (e) {
    console.log(e.message);
    return { auctionEnded: null, error: e.message };
  }
};

module.exports = {
  startTheAuction,
  getUserDetails,
  placeHigherBid,
  checkAuctionBidEnded,
  endAuction,
};
