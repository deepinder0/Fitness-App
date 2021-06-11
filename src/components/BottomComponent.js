import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import COLORS from "../consts/color";

const windowHeight = Dimensions.get("window").height;

export default function BottomComponent() {
  const bottomComponentColor = COLORS.navBack;
  const [focused, setFocused] = useState(false);

  
  let size = 32;
  let color = COLORS.appPrimary;
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: windowHeight * 0.0703,
        backgroundColor: bottomComponentColor,
        elevation: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          onPress={() => setFocused(!focused)}
          name={focused ? "ios-home" : "ios-home-outline"}
          size={size}
          color={color}
        />
        <Ionicons
          onPress={() => setFocused(!focused)}
          name={focused ? "barbell" : "barbell-outline"}
          size={size}
          color={color}
        />
        <Ionicons
          onPress={() => setFocused(!focused)}
          name={focused ? "add-circle" : "add-circle-outline"}
          size={size}
          color={color}
        />
        <Ionicons
          onPress={() => setFocused(!focused)}
          name={focused ? "location" : "location-outline"}
          size={size}
          color={color}
        />
        <Ionicons
          onPress={() => setFocused(!focused)}
          name={focused ? "person-circle" : "person-circle-outline"}
          size={size}
          color={color}
        />
      </View>
    </View>
  );
}
