import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "app-name.firebaseapp.com",
  projectId: "app-name",
  storageBucket: "app-name.appspot.com",
  messagingSenderId: "xxxxxxxxxxxxx",
  appId: "1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

firebase.initializeApp(firebaseConfig);

export default firebase;