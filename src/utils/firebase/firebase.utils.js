import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from 'firebase/auth';
import {
  getFirestore,
  doc, 
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCcBqxAXCreOLiI5IVl4fSZbdCOizQ3mc",
  authDomain: "crwn-clothing-db-99a64.firebaseapp.com",
  projectId: "crwn-clothing-db-99a64",
  storageBucket: "crwn-clothing-db-99a64.appspot.com",
  messagingSenderId: "636913963776",
  appId: "1:636913963776:web:827dcbf76fad399c1b99e5"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) {
    return
  }
  const userDocRef = doc(db,'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      } catch(error) {
        console.log('error while creating the user', error.message);
      }

      return userDocRef
  };

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password) {
    return
  }

  return await createUserWithEmailAndPassword(auth, email, password)

};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password) {
    return
  }

  return await signInWithEmailAndPassword(auth, email, password)

};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback)
};


