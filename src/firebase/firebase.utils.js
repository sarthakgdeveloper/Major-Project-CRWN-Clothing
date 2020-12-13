import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDomk6ggJs796Gw9dtmelLHtklalCE2WkE",
    authDomain: "first-project--crown-clothing.firebaseapp.com",
    databaseURL: "https://first-project--crown-clothing.firebaseio.com",
    projectId: "first-project--crown-clothing",
    storageBucket: "first-project--crown-clothing.appspot.com",
    messagingSenderId: "63404492215",
    appId: "1:63404492215:web:7509336481787fd7d79432",
    measurementId: "G-1ZS40E2N6R"
};

export const createUserProfileDocument = async (userAuth, AdditionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...AdditionalData
            })
        } catch (error) {
            console.log('error while creating an account')
        }
    }
    return userRef;
}

firebase.initializeApp(config); 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit()
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollections.reduce((acc, object) => {
        acc[object.title.toLowerCase()] = object;
        return acc;
    }, {})
}




export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject) 
    })
}
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;