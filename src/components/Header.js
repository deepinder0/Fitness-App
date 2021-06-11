import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constant from "expo-constants";
// import {useDispatch} from 'react-redux'
import COLORS from "../consts/color";
import Modal from "react-native-modal";
import { auth } from "./Firebase/firebaseApi";
import { Actions } from "react-native-router-flux";
import * as SecureStore from "expo-secure-store";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Header({ height, props }) {
  const [isModalVisible, setModalVisible] = useState(false);
  async function getValueFor(key) {
    await SecureStore.deleteItemAsync(key);
    await SecureStore.deleteItemAsync("userPassword");
    await SecureStore.deleteItemAsync("uid");
    auth.signOut().then(() => {
      setModalVisible();
      Actions.loginScreen();
    });
  }
  const toggleModal = () => setModalVisible(!isModalVisible);
  const headerColor = COLORS.navBack;
  return (
    <>
      <View
        style={{
          marginTop: Constant.statusBarHeight,
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          height: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          elevation: 4,
        }}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            position: "absolute",
          }}
          resizeMode="cover"
          source={require("../../assets/Images/navImage.png")}
        ></ImageBackground>
        <View
          style={{
            flexDirection: "row",
            margin: 5,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <Image
            style={{
              height: "100%",
              width: "30%",
              marginRight: 10,
              resizeMode: "center",
            }}
            source={require("../../assets/Icons/Logo.png")}
          ></Image>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 130,
            margin: 5,
          }}
        >
          <MaterialIcons
            name="menu"
            size={25}
            color={COLORS.appPrimary}
            onPress={toggleModal}
          />
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        style={{
          marginLeft: "50%",
          height: windowHeight,
          width: windowWidth / 2,
        }}
        animationIn={"slideInRight"}
        animationOut={"slideOutRight"}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={toggleModal}
      >
        <View
          style={{
            backgroundColor: "#fff",
            alignItems: "center",
            height: windowHeight,
            width: windowWidth / 2,
          }}
        >
          <View style={{ marginTop: 15, width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                console.log("Press");
                getValueFor("userEmail");
              }}
            >
              <Text
                style={{
                  color: "black",
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f5f5f5",
                  textAlign: "center",
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
