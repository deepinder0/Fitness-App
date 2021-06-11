// import React, { useState, useEffect } from 'react';
// import Firebase from './firebase';
// class Auth {

//   state = {}


//   constructor(state) {
//     this.state = state;
//   }
//   handleLogin() {
//     Firebase
//       .auth()
//       .signInWithEmailAndPassword(state.email, state.password)
//       .catch((err) => {
//         switch (err.code) {
//           case "auth/invalid-email":
//           case "auth/user-disabled":
//           case "auth/user-not-found":
//             break;
//           case "auth/wrong-password":
//             console.log(err.message);
//             break;
//         }
//         return false;
//       });
//     return true;
//   };

//   const handleSignup = () => {
//     clearErrors();
//     Firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .catch((err) => {
//         switch (err.code) {
//           case "auth/email-already-in-use":
//           case "auth/invalid-email":
//             setEmailError(err.message);
//             break;
//           case "auth/wrong-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };
//   const handleLogout = () => {
//     Firebase.auth().signOut();
//   };
//   const authListener = () => {
//     Firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         clearInputs();
//         setUser(user);
//       } else {
//         setUser("");
//       }
//     });
//   };

//   useEffect(() => {
//     authListener();

//   }, []);


// authUserTrainer(() => {
//   return false;
// });
// }



// export default Auth;

