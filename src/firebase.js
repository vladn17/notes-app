import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCzbx7Vh4H0Y1rfrVWuzUOPdQcPTUgvY2U",
    authDomain: "notes-781a3.firebaseapp.com",
    databaseURL: "https://notes-781a3.firebaseio.com",
    projectId: "notes-781a3",
    storageBucket: "notes-781a3.appspot.com",
    messagingSenderId: "824709024704"
};
firebase.initializeApp(config);

export default firebase