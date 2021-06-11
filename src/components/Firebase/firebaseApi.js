import * as firebase from "firebase";

// var firebaseConfig = {
//     apiKey: "AIzaSyB4Cvz3ic_OZgoRKt9AFgYRlzsTqRetRXw",
//     authDomain: "react-native-app-fd88c.firebaseapp.com",
//     databaseURL: "https://react-native-app-fd88c-default-rtdb.firebaseio.com",
//     projectId: "react-native-app-fd88c",
//     storageBucket: "react-native-app-fd88c.appspot.com",
//     messagingSenderId: "438512234484",
//     appId: "1:438512234484:web:1c2f5682f4f448befd13a1"
//   };

var firebaseConfig = {
  //apiKey: "AIzaSyB4Cvz3ic_OZgoRKt9AFgYRlzsTqRetRXw",
  //authDomain: "react-native-app-fd88c.firebaseapp.com",
  //databaseURL: "https://react-native-app-fd88c-default-rtdb.firebaseio.com",
  //projectId: "react-native-app-fd88c",
  //storageBucket: "react-native-app-fd88c.appspot.com",
  //messagingSenderId: "438512234484",
  //appId: "1:438512234484:web:1c2f5682f4f448befd13a1",

   apiKey: "AIzaSyB8xqRGs-x14gASwx444IykbhKu3aDDcMc",
   authDomain: "fitzo-app.firebaseapp.com",
   projectId: "fitzo-app",
   storageBucket: "fitzo-app.appspot.com",
   messagingSenderId: "919347071685",
   appId: "1:919347071685:web:e0dd91a16b4db32b0ffeac"
};
// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider };
