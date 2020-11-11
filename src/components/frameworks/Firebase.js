import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCMJ2ttQzCBTCzLiD3XBzQY9hvCa1yNFqw",
    authDomain: "mixtape-matchmaker.firebaseapp.com",
    databaseURL: "https://mixtape-matchmaker.firebaseio.com",
    projectId: "mixtape-matchmaker",
    storageBucket: "mixtape-matchmaker.appspot.com",
    messagingSenderId: "264898319559",
    appId: "1:264898319559:web:9b551334e7d302b3cddae2",
    measurementId: "G-8C76XYXQ4N"
  };

firebase.initializeApp(firebaseConfig);

export const firebase;
export const storage = firebase.storage();
