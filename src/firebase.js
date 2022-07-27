import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3njjelXHlk_z-J4Q6tD5BHovNz6ofjJc",
  authDomain: "slack-f8b78.firebaseapp.com",
  projectId: "slack-f8b78",
  storageBucket: "slack-f8b78.appspot.com",
  messagingSenderId: "667634685978",
  appId: "1:667634685978:web:5b7a332839e8ff506b19a3",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db };
