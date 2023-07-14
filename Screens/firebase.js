//Imports
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

//Firbase config
const firebaseConfig = {
  apiKey: "AIzaSyBmB7rWgR0aTq0zb_b4-paLcTsJMXEhk_Y",
  authDomain: "nedd-med-3444.firebaseapp.com",
  projectId: "nedd-med-3444",
  storageBucket: "nedd-med-3444.appspot.com",
  messagingSenderId: "236721615752",
  appId: "1:236721615752:web:5a76ccd0a6a9ed38bd803d",
  measurementId: "G-LC322PJKS9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//exporting functions for use
export { app, db, doc, setDoc, getDoc };

export const addUser = async (username, password, email) => {
  try {
    await setDoc(doc(db, 'users', username), {
      password: password,
      email: email,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
