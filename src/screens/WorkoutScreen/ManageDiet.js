import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  FlatList,
  Button,
  BackHandler,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import COLORS from "../../consts/color";
import ScrollPicker from "react-native-wheel-scroll-picker";

const ManageDiet = ({ navigation }) => {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ManageDiet</Text>
    </View>
  );
};

export default ManageDiet;
