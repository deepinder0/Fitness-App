import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
} from "react-native";
import COLORS from "../../consts/color";
import { Actions } from "react-native-router-flux";
import SvgUri from "react-native-svg-uri";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "row",
  },
  trackButtonContainer: {
    backgroundColor: "#312F2F",
    height: windowHeight * 0.5,
    width: windowWidth * 0.58,
    marginLeft: windowWidth * 0.07,
    marginTop: windowHeight * 0.04,
    borderRadius: 20,
  },
  trackDietContainer: {
    backgroundColor: "#312F2F",
    height: windowHeight * 0.15,
    borderRadius: 20,
  },
  trackTrainerContainer: {
    backgroundColor: "#312F2F",
    marginTop: windowHeight * 0.025,
    height: windowHeight * 0.15,
    borderRadius: 20,
  },
  trackMusicContianer: {
    backgroundColor: "#312F2F",
    marginTop: windowHeight * 0.025,
    height: windowHeight * 0.15,
    borderRadius: 20,
  },
  buttonContainer: {
    height: windowHeight * 0.5,
    width: windowWidth * 0.27,
    marginLeft: "5%",
    marginTop: windowHeight * 0.04,
  },
});

const Namo = () => {
  const backActionHandler = () => {
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
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  return (
    <View style={styles.flexContainer}>
      <View style={styles.trackButtonContainer}>
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: windowHeight * 0.045,
              width: windowWidth * 0.007,
              backgroundColor: COLORS.appPrimary,
              left: windowWidth * 0.07,
              // top: windowHeight * 0.016,
            }}
          ></View>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              // marginTop: "5%",
              marginLeft: "15%",
            }}
          >
            WORKOUT
          </Text>
        </View>
        <View
          style={{
            marginLeft: windowWidth * 0.07,
            marginTop: windowHeight * 0.010,
            width: windowWidth * 0.25,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: "white",
            }}
          >
            Start tracking your efforts.
          </Text>
        </View>
        <View
          style={{
            marginLeft: windowWidth * 0.38,
            bottom: '5%'
          }}
        >
          <SvgUri size={1} source={require("../../../assets/Icons/swim.svg")} />
        </View>
        <View
          style={{
            marginLeft: windowWidth * 0.2,
            bottom: '5%'
          }}
        >
          <SvgUri size={1} source={require("../../../assets/Icons/cycle.svg")} />
        </View>
        <View
          style={{
            left: windowWidth * 0.4,
            bottom: '5%'
          }}
        >
          <Image size={1} source={require("../../../assets/Icons/walking.png")} />
        </View>
        <View
          style={{
            left: windowWidth * 0.2,
            bottom: windowHeight * 0.10,
          }}
        >
          <SvgUri size={1} source={require("../../../assets/Icons/yog.svg")} />
        </View>
        <View
          style={{
            left: windowWidth * 0.05,
            bottom: windowHeight * 0.30,
          }}
        >
          <SvgUri source={require("../../../assets/Icons/run.svg")} />
        </View>
        <View
          style={{
            backgroundColor: "#00b300",
            left: windowWidth * 0.095,
            width: windowWidth * 0.4,
            height: windowHeight * 0.05,
            bottom: windowHeight * 0.16,
            borderRadius: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Actions.AddRotineScreen();
            }}
          >
            <Text
              style={{
                left: "35%",
                top: "7%",
                fontSize: 20,
              }}
            >
              Track
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            Actions.ManageDiet();
          }}
        >
          <View style={styles.trackDietContainer}>
            <Image
              source={require("../../../assets/Icons/dietIcon.png")}
              style={{
                position: "absolute",
                height: windowHeight * 0.13,
                width: windowWidth * 0.20,
                marginLeft: windowWidth * 0.030,
              }}
            />
            <Text
              style={{
                color: COLORS.appPrimary,
                marginLeft: windowWidth * 0.095,
                marginTop: windowHeight * 0.116,
              }}
            >
              Diet
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Actions.MyTrainer();
          }}
        >
          <View style={styles.trackTrainerContainer}>
            <Image
              source={require("../../../assets/Icons/yoga.png")}
              style={{
                position: "absolute",
                height: windowHeight * 0.13,
                width: windowWidth * 0.20,
                marginLeft: windowWidth * 0.030,
              }}
            />
            <Text
              style={{
                color: COLORS.appPrimary,
                marginLeft: windowWidth * 0.095,
                marginTop: windowHeight * 0.116,
              }}
            >
              Trainer
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Actions.MyMusic();
          }}
        >
          <View style={styles.trackMusicContianer}>
            <Image
              source={require("../../../assets/Icons/music.png")}
              style={{
                position: "absolute",
                height: windowHeight * 0.12,
                width: windowWidth * 0.20,
                marginLeft: windowWidth * 0.030,
              }}
            />
            <Text
              style={{
                color: COLORS.appPrimary,
                marginLeft: windowWidth * 0.090,
                marginTop: windowHeight * 0.116,
              }}
            >
              Music
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Namo;
