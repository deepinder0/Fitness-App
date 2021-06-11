import "react-native-gesture-handler";
import REGEX from "../consts/regularExp";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ToastAndroid
} from "react-native";

import COLORS from "../consts/color";
import STYLES from "../styles/registerScreenStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { auth } from "../components/Firebase/firebaseApi";
import Loader from "../components/Loader.js";
export default class FitApp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      txtNameMsg: "",
      txtEmailMsg: "",
      passErrorMsg: "",
      passNotMatchMsg: "",
      showLoader: false
    };
  }

  checkPassMatch(confirmPassword, password) {
    return password === confirmPassword;
  }

  checkEmail(email) {
    let result = REGEX.email.test(email);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  checkPassword(password) {
    let result = !(password === null || password === "");
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  register(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show("Successfully Registered!!!", ToastAndroid.LONG);
        Actions.loginScreen();
        this.setState({
          showLoader: false
        })
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        this.setState({
          showLoader: false
        });
      });
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
            <Image
              style={STYLES.logo}
              source={require("../../assets/Icons/Logo.png")}
            ></Image>
          </View>
          <View style={STYLES.signupView}>
          </View>
          <View style={STYLES.formContainer}>
            <View>
              <Text style={STYLES.errorText}>{this.state.txtNameMsg}</Text>
            </View>
            <View style={STYLES.inputContainer}>
              <Icon
                name="mail-outline"
                color={COLORS.appPrimary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#707070"}
                style={STYLES.input}
                onChangeText={(text) => {
                  this.setState({ email: text });
                  this.setState({
                    txtEmailMsg: this.checkEmail(text)
                      ? ""
                      : "Email is not valid !",
                  });
                }}
              />
            </View>
            <View>
              <Text style={STYLES.errorText}>{this.state.txtEmailMsg}</Text>
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
                style={STYLES.input}
                onChangeText={(text) => {
                  this.setState({ password: text });
                  this.setState({
                    passErrorMsg: this.checkPassword(text)
                      ? ""
                      : "Password is null !",
                  });
                }}
                secureTextEntry
              />
            </View>
            <View>
              <Text style={STYLES.errorText}>{this.state.passErrorMsg}</Text>
            </View>
            <View style={STYLES.inputContainer}>
              <Icon
                name="lock"
                color={COLORS.appPrimary}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={"#707070"}
                value={this.state.confirmPassword}
                onChangeText={(confirmPassword) => {
                  this.setState({ confirmPassword: confirmPassword })
                  this.setState({
                    passNotMatchMsg: this.checkPassMatch(confirmPassword, this.state.password)
                      ? ""
                      : "Make Sure your passwords match."
                  })
                }}
                style={STYLES.input}
                secureTextEntry={true}
              />
            </View>
            <View>
              <Text style={STYLES.errorText}>{this.state.passNotMatchMsg}</Text>
            </View>
            <TouchableOpacity
              style={STYLES.btnPrimary}
              onPress={() => {
                if (
                  this.checkPassMatch(this.state.confirmPassword, this.state.password) &&
                  this.checkEmail(this.state.email) &&
                  this.checkPassword(this.state.password)
                ) {
                  this.setState({
                    showLoader: true
                  })

                  this.register(
                    this.state.email,
                    this.state.password
                  );
                }
              }}
            >
              <Text style={{ color: "#707070", fontWeight: "bold", fontSize: 18 }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View style={STYLES.signInNote}>
            <Text style={{ color: COLORS.appPrimary, fontWeight: "bold" }}>
              Already have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                Actions.loginScreen();
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
