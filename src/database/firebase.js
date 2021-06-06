import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBGbEbMKjmXO_oWYq5HwYDmnXzKfbtkdzM",
    authDomain: "medmanage-d8dc5.firebaseapp.com",
    projectId: "medmanage-d8dc5",
    storageBucket: "medmanage-d8dc5.appspot.com",
    messagingSenderId: "1013237335424",
    appId: "1:1013237335424:web:b3eec05b980260b390ad65",
    measurementId: "G-HNHT002LPT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db ,auth, storage };