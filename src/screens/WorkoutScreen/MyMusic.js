import React, { useEffect } from "react";
import { View, Text, BackHandler } from "react-native";

const MyMusic = ({navigation}) => {
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
      <Text>MyMusic</Text>
    </View>
  );
};
export default MyMusic;
