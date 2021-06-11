import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
} from "react-native";
import contactData from "./contact.json";
import { AntDesign } from "@expo/vector-icons";


import Profile from "./Profile";
const windowWidth = Dimensions.get("window").width;


const ProfileScreen = ({ navigation }) => {
  const backActionHandler = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          marginTop: windowWidth / 15,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={{ marginLeft: windowWidth / 90 }}
        >
          <AntDesign name="left" size={20} color="#00ff5f" />
        </TouchableOpacity>
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text style={{
    textAlign: "center",
    color: "#00ff5f",
    fontSize: 20,
  }}>User Profile</Text>
        </View>
      </View>
      <Profile {...contactData} />
    </View>
  );
};

export default ProfileScreen;
