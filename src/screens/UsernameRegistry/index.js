import "react-native-gesture-handler";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Alert,
} from "react-native";
import COLORS from "../../consts/color";
import STYLES from "./styles.js";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import { auth, db } from "../../components/Firebase/firebaseApi";
import { Actions } from "react-native-router-flux";
import Loader from "../../components/Loader.js";

export default class FitApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showLoader: false,
      userId: props.data,
    };
  }

  state = {
    username: "",
  };

  backActionHandler() {
    Alert.alert("Alert!", "Are you sure you want to Quit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => BackHandler.exitApp()(),
      },
    ]);
    return true;
  }

  useEffect() {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", this.backActionHandler());

    return (
      () => {
        // clear/remove event listener
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.backActionHandler()
        );
      },
      []
    );
  }

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
            <Text style={STYLES.welcomeText}>Complete your profile</Text>
            <Text style={STYLES.noteText}>
              Choose your username for account
            </Text>
          </View>
          <View style={STYLES.formContainer}>
            <View style={STYLES.inputContainer}>
              <Icon
                name="person"
                color={COLORS.appPrimary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="User Name"
                placeholderTextColor={"#707070"}
                value={this.state.usename}
                onChangeText={(username) => {
                  this.setState({ username });
                }}
                style={STYLES.input}
              />
            </View>
            <TouchableOpacity
              style={STYLES.btnPrimary}
              onPress={() => {
                this.setState({
                  showLoader: true,
                });
                db.collection("users")
                  .doc(this.state.userId)
                  .update({
                    modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    userName: this.state.username,
                  })
                  .then(() => {
                    this.setState({
                      showLoader: false,
                    });
                    new Actions.homeScreen();
                    ToastAndroid.show("Account Registered", ToastAndroid.LONG);
                  });
              }}
            >
              <Text
                style={{
                  color: COLORS.appPrimary,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
