import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "./src/consts/color";
import { Actions } from "react-native-router-flux";

const { width } = Dimensions.get("window");

function Navigator() {
const color = COLORS.appPrimary;
  return (
    <View style={styles.containers}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Actions.PostScreen();
          }}
        >
          <Ionicons
            name="ios-home"
            size={24}
            color={color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            
            Actions.Namo();
          }}
        >
          <Ionicons
            name="barbell-outline"
            size={24}
            color={color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.AddPost();
          }}
        >
          <Ionicons
            name={"add-circle-outline"}
            size={24}
            color={color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.Finder();
          }}
        >
          <Ionicons
            name={"location-outline"}
            size={24}
            color={color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.UserProfile();
          }}
        >
          <Ionicons
            name={"person-circle-outline"}
            size={24}
            color={color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Navigator;

const styles = StyleSheet.create({
  containers: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.navBack,
    padding: 10,
    width: width,
  },
});
