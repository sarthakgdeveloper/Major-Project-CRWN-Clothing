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

firebase.initializeApp(config);

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
  orderSnapshot.docs.map(async (doc) => {
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

export const getStoreData = async (id, setData) => {
  const productsRef = firestore.collection("products").where("uid", "==", id);
  const pSnapshot = await productsRef.get();
  pSnapshot.docs.map((product) => {
    const data = product.data();
    setData((pData) => {
      return [{ ...data, id: product?.id }, ...pData];
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
    const sellerEachProductRef = firestore.collection(`products`).doc();
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
    )}_${productCategory}_${productName}_${file?.name}_${new Date().getTime()}`;
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

export const getAuctionProduct = async (id) => {
  const auctionRef = firestore.doc(`auctions/${id}`);
  const aSnapshop = await auctionRef.get();
  const auctionData = aSnapshop.data();
  const {
    uid,
    base_bid_value,
    bid_ended,
    bid_started,
    highest_bid,
    highest_bid_user,
    highest_bid_user_name,
  } = auctionData;
  const productRef = firestore.doc(`products/${uid}`);
  const pSnapshot = await productRef.get();
  const productData = pSnapshot.data();
  return {
    productData,
    base_bid_value,
    bid_ended,
    bid_started,
    highest_bid,
    highest_bid_user,
    highest_bid_user_name,
  };
};

export const createAuctionProduct = async ({ id, basePrice, date, time }) => {
  const auctionRef = firestore.collection("auctions").doc();
  const productRef = firestore.doc(`products/${id}`);
  const pSnapshot = await productRef.get();
  const productData = pSnapshot.data();

  if (pSnapshot.exists) {
    await auctionRef.set({
      uid: id,
      base_bid_value: basePrice,
      bid_ended: false,
      bid_started: false,
      date,
      time,
    });

    await productRef.update({
      ...productData,
      isAuctioned: true,
      auctionId: auctionRef?.id,
    });

    return auctionRef.id;
  }

  return false;
};

export const fGetAuctionsData = async (getAuctionData) => {
  const auctionsRef = firestore
    .collection("auctions")
    .where("bid_ended", "==", false);
  const snapshot = await auctionsRef.get();
  const data = snapshot.docs.map((data) => ({ ...data.data(), id: data.id }));
  data.forEach(async (auction) => {
    const { uid } = auction;
    const productRef = firestore.doc(`products/${uid}`);
    const pSnapshot = await productRef.get();
    const productData = pSnapshot.data();
    getAuctionData((pData) => [...pData, { ...auction, productData }]);
  });
};

const getImagePath = (urls) => {
  return urls.map((url) => {
    let imagePath = url.replace(
      "https://firebasestorage.googleapis.com/v0/b/first-project--crown-clothing.appspot.com/o/",
      ""
    );
    imagePath = imagePath.replace("%20", " ");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0, indexOfEndPath);

    imagePath = imagePath.replace("%2F", "/");

    return imagePath;
  });
};

export const deleteSellerProduct = async (product) => {
  const productRef = firestore.doc(`products/${product?.id}`);
  const pSnapshot = await productRef.get();
  const productImageName = getImagePath(product?.imagesUrl);
  console.log(productImageName);
  if (pSnapshot.exists) {
    if (product?.isAuctioned) {
      const auctionRef = firestore.doc(`auctions/${product?.auctionId}`);
      const aSnapshop = await auctionRef.get();
      if (aSnapshop.exists) {
        await auctionRef.delete();
      }
    }
    await productImageName.forEach(async (name) => {
      const storageRef = fireStorage.ref();
      const imageRef = storageRef.child(name);
      await imageRef.delete();
    });
    await productRef.delete();
  }
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
