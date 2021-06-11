import "react-native-gesture-handler";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  ToastAndroid,
  Image,
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
import * as SecureStore from 'expo-secure-store';
import Loader from "../../components/Loader.js";

export default class FitApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoader: false,
    };
  }

  state = {
    email: "",
    pass: "",
  };

  handleLogin = () => {
    const { email, password } = this.state;
    if (!(password && email)) {
      ToastAndroid.show(
        "Email or password cannot be a null",
        ToastAndroid.LONG
      );
      this.setState({
        showLoader: false,
      });
      return;
    }
      auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        try {
          auth.onAuthStateChanged((user) => {
            if (user != null) {
              SecureStore.setItemAsync('userEmail', email);
              SecureStore.setItemAsync('userPassword', password);
              SecureStore.setItemAsync('uid', user.uid);      
              const uid = user.uid;
              db.collection("users").doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                  db.collection("users").doc(user.uid).update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                  });
                  db.collection("users").doc(user.uid).get().then((doc) => {
                    if (doc.data().userType === "") {
                      this.setState({
                        showLoader: false
                      })
                      new Actions.registerCategory(uid);
                    } else if (doc.data().userName === "") {
                      this.setState({
                        showLoader: false
                      })
                      new Actions.usernameRegistry(uid);
                    } else {
                      this.setState({
                        showLoader: false
                      })
                      new Actions.homeScreen();
                    }
                  });
                } else {
                  db.collection("users").doc(user.uid).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    userName: "",
                    userType: "",
                    userEmail: user.email,
                    modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
                  });
                  this.setState({
                    showLoader: false
                  })
                  Actions.registerCategory(uid);
                }

              }).catch((error) => {
                console.log(error);
                ToastAndroid.show("Error reaching our servers, Try Later", ToastAndroid.LONG);
              });
            }
          });
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Invalid Credentials.", ToastAndroid.LONG);
        this.setState({
          showLoader: false,
        });
      });
  };
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
    console.log("google signIn method started");
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
        //this line to be added according to type of navigation used
        // new Actions.PostScreen();
        new Actions.homeScreen();
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
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
            <View style={STYLES.inputContainer}>
              <Icon
                name="person-outline"
                color={COLORS.appPrimary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#707070"}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={STYLES.input}
              />
            </View>
            <View style={STYLES.inputContainer}>
              <Icon
                name="lock-outline"
                color={COLORS.appPrimary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={"#707070"}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                style={STYLES.input}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={STYLES.btnPrimary}
              onPress={() => {
                this.setState({
                  showLoader: true,
                });
                this.handleLogin();
              }}
            >
              <Text
                style={{ color: "#707070", fontWeight: "bold", fontSize: 18 }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View style={STYLES.signInNote}>
            <Text style={{ color: COLORS.appPrimary, fontWeight: "bold" }}>
              Don't have an account ?
            </Text>
            <TouchableOpacity onPress={() => Actions.registerScreen()}>
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
