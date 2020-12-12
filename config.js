import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCSrHaGHPbHZ8gez2fKzlHTFf0q-aLXZBE",
  authDomain: "donor-9c446.firebaseapp.com",
  projectId: "donor-9c446",
  storageBucket: "donor-9c446.appspot.com",
  messagingSenderId: "250395168081",
  appId: "1:250395168081:web:9cae0879639004d83d9770",
  measurementId: "G-GLHY5DK1T5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
