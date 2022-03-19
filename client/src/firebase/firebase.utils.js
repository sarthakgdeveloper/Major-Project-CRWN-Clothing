import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "@firebase/storage";

const config = {
  apiKey: "AIzaSyDomk6ggJs796Gw9dtmelLHtklalCE2WkE",
  authDomain: "first-project--crown-clothing.firebaseapp.com",
  databaseURL: "https://first-project--crown-clothing.firebaseio.com",
  projectId: "first-project--crown-clothing",
  storageBucket: "first-project--crown-clothing.appspot.com",
  messagingSenderId: "63404492215",
  appId: "1:63404492215:web:7509336481787fd7d79432",
  measurementId: "G-1ZS40E2N6R",
};

const createSellerProfile = async (userAuth) => {
  const sellerPoint = firestore.doc(`sellersUID/${userAuth.email}`);
  const snapShot = await sellerPoint.get();
  if (!snapShot.exists) {
    const { uid } = userAuth;
    const createdAt = new Date();
    try {
      sellerPoint.set({
        uid,
        createdAt,
      });
      const sellerRef = firestore.doc(`sellers/${userAuth.uid}`);
      return sellerRef;
    } catch (error) {
      console.log("error while creating an account");
    }
  }
};

const checkSellerProfile = async (user) => {
  const sellerPoint = firestore.doc(`sellersUID/${user.email}`);
  const snapShot = await sellerPoint.get();
  return snapShot.exists;
};

export const isGharakExist = async (userAuth) => {
  if (!userAuth) return;
  try {
    const user = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await user.get();
    return snapshot.exists;
  } catch (e) {
    console.log("unable to sign in");
  }
};
export const isKarigarExist = async (userAuth) => {
  if (!userAuth) return;
  try {
    const user = firestore.doc(`sellersUID/${userAuth.email}`);
    const snapshot = await user.get();
    return snapshot.exists;
  } catch (e) {
    console.log("unable to sign in");
  }
};

export const createUserProfileDocument = async (
  userAuth,
  selectedUser,
  AdditionalData
) => {
  if (!userAuth) return;
  const sellerRef = await checkSellerProfile(userAuth);
  if (sellerRef) {
    return firestore.doc(`sellers/${userAuth.uid}`);
  }
  const userRef =
    selectedUser === "Karigar"
      ? await createSellerProfile(userAuth)
      : firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const newData = {
      displayName,
      email,
      createdAt,
      ...AdditionalData,
    };
    if (selectedUser === "Karigar") {
      newData.storeIds = [];
      newData.category = [];
    }
    try {
      userRef.set(newData);
    } catch (error) {
      console.log("error while creating an account");
    }
  }
  return userRef;
};

export const getSellerOrders = async (id, getOrderData) => {
  const orderRef = firestore.collection("orders").where("uid", "==", id);
  const orderSnapshot = await orderRef.get();
  const orderData = orderSnapshot.docs.map(async (doc) => {
    const { id, quantity, userInfo } = doc.data();
    const productRef = firestore.doc(`products/${id}`);
    const snapshot = await productRef.get();
    const data = snapshot.data();
    getOrderData((pData) => {
      return [
        ...pData,
        {
          ...data,
          quantity,
          userInfo,
        },
      ];
    });
  });
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { category, price, productName, imagesUrl, userName, uid } =
      doc.data();
    return {
      routeName: encodeURI(category.toLowerCase()),
      id: doc.id,
      title: category,
      items: {
        price,
        productName,
        imagesUrl,
        userName,
        uid,
        id: doc.id,
      },
    };
  });

  return transformedCollections.reduce((acc, object) => {
    if (!acc[object.title.toLowerCase()]) {
      acc[object.title.toLowerCase()] = [object];
    } else {
      acc[object.title.toLowerCase()] = [
        ...acc[object.title.toLowerCase()],
        object,
      ];
    }
    return acc;
  }, {});
};

export const getStoreData = async (storeIds, setData) => {
  if (!storeIds) return;
  storeIds.forEach(async (id) => {
    const productRef = firestore.doc(`products/${id}`);
    const storeData = await productRef.get();
    const data = { ...storeData.data() };
    setData((pData) => {
      return [{ ...data }, ...pData];
    });
  });
};

const uploadingProduct = async (
  imagesUrl,
  productName,
  price,
  userName,
  category,
  uid,
  isUploaded,
  isLoading
) => {
  try {
    const sellerRef = firestore.doc(`sellers/${uid}`);
    const sellerEachProductRef = firestore.collection(`products`).doc();
    const snapshot = await sellerRef.get();
    const sellerData = { ...snapshot.data() };
    const newProduct = {
      imagesUrl,
      productName,
      price,
      category,
      userName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    };
    await sellerEachProductRef.set({
      ...newProduct,
    });

    if (snapshot.exists && sellerData?.storeIds.length > 0) {
      await sellerRef.update({
        ...sellerData,
        storeIds: [...sellerData?.storeIds, sellerEachProductRef?.id],
        category: sellerData.category.includes(category)
          ? [...sellerData.category]
          : [...sellerData?.category, category],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await sellerRef.set({
        ...sellerData,
        storeIds: [sellerEachProductRef.id],
        category: [category],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    alert("uploaded");
    isUploaded(true);
    isLoading(false);
  } catch (e) {
    console.log("error", e.message);
  }
};

export const uploadNewProduct = async (
  productImages,
  productCategory,
  productName,
  productPrice,
  currentUser,
  isUploaded,
  isLoading
) => {
  const imagesUrl = [];
  await productImages.forEach((file, index) => {
    const fileName = `${currentUser?.displayName?.replace(
      / /g,
      ""
    )}_${productCategory}_${productName}_${file?.name}`;
    const uploadTask = fireStorage.ref(`productsImages/${fileName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //   const getProgress = Math.round(
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //   );
        //   return checkProgress(getProgress);
      },
      (error) => {
        return alert(error.message);
      },
      () => {
        fireStorage
          .ref("productsImages")
          .child(fileName)
          .getDownloadURL()
          .then(async (url) => {
            imagesUrl.push(url);
            if (index === productImages.length - 1) {
              await uploadingProduct(
                imagesUrl,
                productName,
                productPrice,
                currentUser?.displayName,
                productCategory,
                currentUser?.id,
                isUploaded,
                isLoading
              );
            }
          });
      }
    );
  });
};

export const sendUsersOrders = async ({
  order,
  address_city,
  address_country,
  address_line1,
  address_zip,
  name,
}) => {
  await order.forEach(async (data) => {
    const { id, quantity, uid } = data;
    const orderRef = firestore.collection("orders").doc();
    const orderInfo = {
      id,
      quantity,
      uid,
      userInfo: {
        address_city,
        address_country,
        address_line1,
        address_zip,
        name,
      },
    };
    await orderRef.set(orderInfo);
  });
};

export const sendNewAuctionBid = async (auctionId, user, bidAmount) => {
  if (!auctionId) return;
  const auctionRef = firestore.doc(`auctions/${auctionId}`);
  const snapshot = await auctionRef.get();
  const auctionData = snapshot.data();
  if (
    auctionData?.highest_bid < bidAmount &&
    auctionData?.highest_bid_user !== user?.id
  ) {
    await auctionRef.update({
      ...auctionData,
      highest_bid: bidAmount,
      highest_bid_user: user?.id,
      highest_bid_user_name: user?.displayName,
    });

    return true;
  }

  return false;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const fireStorage = firebase.storage();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
