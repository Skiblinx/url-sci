import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  // eslint-disable-next-line no-unused-vars
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  NextOrObserver,
  User,
  updateProfile
} from 'firebase/auth';
// import 'firebase/dynamic-links';
// import { dynamicLinks } from 'firebase/dynamic-links';

const firebaseConfig = {
  apiKey: "AIzaSyAjwEKtF1sKHb8jz2aj9WnGWsUTvNpd4tA",
  authDomain: "scissors-app-694bb.firebaseapp.com",
  projectId: "scissors-app-694bb",
  storageBucket: "scissors-app-694bb.appspot.com",
  messagingSenderId: "647262210247",
  appId: "1:647262210247:web:f531b368599999b46696e2",
  measurementId: "G-8VZGVYCDZE"
};

const fireabaseApp = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(fireabaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth: { uid?: any; displayName?: any; email?: any },
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('An error occured', error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUserOut = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
};
