import "react-native-gesture-handler";
import {
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  Alert
} from "react-native";
import COLORS from "../../consts/color";
import STYLES from "./styles.js";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../../components/Firebase/firebaseApi";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";
import Loader from "../../components/Loader.js";

export default class FitApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showLoader: false,
      userId: props.data
    };
    // auth.signOut();
  }

  backActionHandler() {
    Alert.alert("Alert!", "Are you sure you want to Quit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "YES", onPress: () => BackHandler.exitApp()
          ()
      }
    ]);
    return true;
  };

  useEffect(){

    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", this.backActionHandler());

    return (()=>{
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler());
  }, []);}

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
            <Text style={STYLES.welcomeText}>
            Welcome to
            </Text>
            <Text style={STYLES.welcomeText}>
            FITOZO
            </Text>
            <Text style={STYLES.noteText}>
                Register as
            </Text>
          </View>
          <View style={STYLES.formContainer}>
          <TouchableOpacity
              style={STYLES.btnPrimary}
              onPress={() => {
                  this.setState({
                    showLoader: true
                  });
                  db.collection("users").doc(this.state.userId).update({
                    userType: "ServiceUser",
                    modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
                  }).then(() => {
                    this.setState({
                      showLoader: false
                    });
                    Actions.usernameRegistry(this.state.userId);
                  }).catch(()=>{
                    ToastAndroid.show("Error occurred !!", ToastAndroid.LONG);
                    this.setState({
                      showLoader: false
                    });
                  });
                }}
            >
              <Text style={{ color: COLORS.appPrimary, fontWeight: "bold", fontSize: 15 }}>
                USER ACCOUNT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={STYLES.btnPrimary}
              onPress={() =>{
                  this.setState({
                    showLoader: true
                  });
                  db.collection("users").doc(this.state.userId).update({
                    userType: "Business",
                    modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
                  }).then(() => {
                    this.setState({
                      showLoader: false
                    });
                    Actions.usernameRegistry(this.state.userId);
                  }).catch(()=>{
                    ToastAndroid.show("Error occurred !!", ToastAndroid.LONG);
                    this.setState({
                      showLoader: false
                    });
                  });
                }}
            >
              <Text style={{ color: COLORS.appPrimary, fontWeight: "bold", fontSize: 15 }}>
                BUSINESS ACCOUNT
              </Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}