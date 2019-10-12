import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC8qVHex0pvlscpqBjZvJUgAhL5xxvMkHA",
  authDomain: "crwn-db-c2f43.firebaseapp.com",
  databaseURL: "https://crwn-db-c2f43.firebaseio.com",
  projectId: "crwn-db-c2f43",
  storageBucket: "crwn-db-c2f43.appspot.com",
  messagingSenderId: "1095200163532",
  appId: "1:1095200163532:web:f7e31ca714720da395e469",
  measurementId: "G-J45H21TPSG"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
