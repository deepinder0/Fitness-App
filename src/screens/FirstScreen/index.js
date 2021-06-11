import "react-native-gesture-handler";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import COLORS from "../../consts/color";
import STYLES from "./styles.js";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../../components/Firebase/firebaseApi";
import { Actions } from "react-native-router-flux";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import Loader from "../../components/Loader.js";

export default class FitApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showLoader: false,
    };
  }

  state = {
    email: "",
    pass: "",
  };

  // handleLogin = () => {
  //   const { email, password } = this.state;

  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log("this is your logged user ", user.user.displayName);
  //       db.collection("users").doc(user.user.uid).set({
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         userName: user.user.displayName,
  //         userType: user.user.photoURL,
  //         userID: user.user.uid,
  //         user_EMAIL: user.user.email,
  //       });
  //       if (user.user.photoURL === "nuser") {
  //         Actions.homeScreen();
  //       } else {
  //         new Actions.homeScreen();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       ToastAndroid.show("Invalid Credentials.", ToastAndroid.LONG);
  //     });
  // };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = auth.onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          auth
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in ");
              console.log(result);
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              console.log(errorCode);
              var errorMessage = error.message;
              console.log(errorMessage);
              // The email of the user's account used.
              var emailIsUsed = error.email;
              console.log(emailIsUsed);
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              console.log(credential);
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    this.setState({
      showLoader: true,
    });
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "438512234484-jpqnog6sip1m92kg9b4b94mthst8c8l4.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        this.setState({
          showLoader: false,
        });
        new Actions.PostsScreen();
        return result.accessToken;
      } else {
        this.setState({
          showLoader: false,
        });
        return { cancelled: true };
      }
    } catch (e) {
      this.setState({
        showLoader: false,
      });
      console.log(e);
      return { error: true };
    }
  };

  signInWithFacebookAsync = async () => {
    try {
      this.setState({
        showLoader: true,
      });
      // Attempt login with permissions

      this.setState({
        showLoader: false,
      });
      return;
    } catch (error) {
      this.setState({
        showLoader: false,
      });
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Loader
          show={this.state.showLoader}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={STYLES.scrollView}
        >
          <View style={STYLES.scrollInnerView}>
            <Image
              style={STYLES.logo}
              source={require("../../../assets/Icons/Logo.png")}
            ></Image>
          </View>
          <View style={STYLES.formContainer}>
            <TouchableOpacity
              style={STYLES.btnCreate}
              onPress={() => Actions.registerScreen()}
            >
              <Text
                style={{
                  color: COLORS.appPrimary,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                CREATE NEW ACCOUNT
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => this.signInWithFacebookAsync()}>
                <Icon size={60} type="entypo" color="#3B5A98" name="facebook" />
              </TouchableOpacity>
              <View style={{ width: 10 }}></View>
              <TouchableOpacity onPress={() => this.signInWithGoogleAsync()}>
                <Image
                  style={STYLES.btnImage}
                  source={require("../../../assets/Icons/google.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={STYLES.signInNote}>
            <Text
              style={{ color: "#707070", fontWeight: "bold", fontSize: 15 }}
            >
              Log in using Facebook or Gmail
            </Text>
          </View>
          <View style={STYLES.formContainer}>
            <TouchableOpacity
              style={STYLES.btnPrimary}
              onPress={() => Actions.loginScreen()}
            >
              <Text
                style={{ color: "#707070", fontWeight: "bold", fontSize: 18 }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
