import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCybmOyBgTqfyH0VXj4pOH4cT1DR7TKsIM",
  authDomain: "live-good-59020.firebaseapp.com",
  databaseURL: "https://live-good-59020-default-rtdb.firebaseio.com",
  projectId: "live-good-59020",
  storageBucket: "live-good-59020.appspot.com",
  messagingSenderId: "105008037791",
  appId: "1:105008037791:web:f3fb9e53dcce35e1a287aa",
  measurementId: "G-EL1YFPTZML",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
