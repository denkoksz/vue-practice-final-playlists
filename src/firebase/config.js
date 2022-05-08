import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDANHSCTRf1OrNstt-bntzwq25bpA_u_ho",
    authDomain: "muso-ninjas-ca513.firebaseapp.com",
    projectId: "muso-ninjas-ca513",
    storageBucket: "muso-ninjas-ca513.appspot.com",
    messagingSenderId: "995511387622",
    appId: "1:995511387622:web:4b4e731c3c1946c4a9c227"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { projectFirestore, projectAuth, projectStorage, timestamp };