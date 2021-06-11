import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  Button,
  BackHandler,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import COLORS from "../../consts/color";
import ScrollPicker from "react-native-wheel-scroll-picker";
import { Actions } from "react-native-router-flux";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Timer(props) {
  var arrOfMinutes = [
    "0:15",
    "0:30",
    "0:45",
    "1:00",
    "1:15",
    "1:30",
    "1:45",
    "2:00",
    "2:15",
    "2:30",
    "2:45",
    "3:00",
    "3:15",
    "3:30",
    "3:45",
    "4:00",
    "4:15",
    "4:30",
    "4:45",
    "5:00",
  ];
  const [time, setTime] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [valueOfTime, setValueOfTime] = useState(0);
  const [pause, setPause] = useState(props.pause);
  const [pause1, setPause1] = useState(true);
  const [remainingDuration, setRemainingDuration] = useState(0);

  const startTimer = () => {
    setTime(!time);
    setValueOfTime(seconds);
    setPause(!pause);
  };

  return (
    <View style={{ display: "flex", backgroundColor: "#000", flex: 1 }}>
      <View style={styles.container1}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: windowWidth / 90 }}
        >
          <AntDesign name="left" size={25} color="#00ff5f" />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {time == false ? (
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 300 / 2,
              borderWidth: 12,
              borderColor: COLORS.appPrimary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ position: "absolute" }}>
              <ScrollPicker
                dataSource={arrOfMinutes}
                selectedIndex={-1}
                renderItem={(data, index) => {
                  //
                }}
                onValueChange={(data, selectedIndex) => {
                  //

                  let tempArr = data.split(":");

                  let tempSeconds = +tempArr[0] * 60 + +tempArr[1];
                  setSeconds(tempSeconds);

                  setRemainingDuration(0);
                }}
                wrapperHeight={170}
                wrapperWidth={70}
                wrapperBackground={"#000"}
                itemHeight={50}
                highlightColor={"#707070"}
                highlightBorderWidth={2}
                activeItemTextStyle={{ color: "#00ff5f", fontSize: 30 }}
                itemTextStyle={{ color: "#707070", fontSize: 22 }}
              />
            </View>
          </View>
        ) : (
          <CountdownCircleTimer
            isPlaying={pause}
            size={300}
            duration={valueOfTime}
            colors={COLORS.appPrimary}
          >
            {({ remainingTime, animatedColor }) => {
              const hours = Math.floor(remainingTime / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;
              setRemainingDuration(remainingTime);
              if (hours < 10) {
                remainingTime = `0${hours}:${minutes}:${seconds}`;
              }
              if (minutes < 10) {
                remainingTime = `0${hours}:0${minutes}:${seconds}`;
              }
              if (seconds < 10) {
                remainingTime = `0${hours}:0${minutes}:0${seconds}`;
              }
              return (
                <Animated.Text style={{ color: animatedColor, fontSize: 35 }}>
                  {remainingTime}
                </Animated.Text>
              );
            }}
          </CountdownCircleTimer>
        )}
        <View
          style={{ display: "flex", flex: 1, justifyContent: "center", marginTop: 10 }}
        >
        <TouchableOpacity style={{width: windowWidth * 0.4, marginVertical: windowHeight * 0.01}} onPress={startTimer}>
          <Text style={{color: COLORS.appPrimary, backgroundColor: "black", padding: 10, textAlign: "center"}}>
          Start Timer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: windowWidth * 0.4, marginVertical: windowHeight * 0.01}} onPress={() => {
              setPause(!pause);
              setPause1(!pause1);
            }}>
          <Text style={{color: COLORS.appPrimary, backgroundColor: "black", padding: 10, textAlign: "center"}}>
          {pause1 ? "Pause Timer" : "Resume Timer"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: windowWidth * 0.4, marginVertical: windowHeight * 0.01}} onPress={() => {
              props.toggleFxn();
              Actions.ExerciseSets({
                digitalTimer: true,
                remainingTime: remainingDuration,
                pause: !pause,
              });
            }}>
          <Text style={{color: COLORS.appPrimary, backgroundColor: "black", padding: 10, textAlign: "center"}}>
            OK
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Timer;
const styles = StyleSheet.create({
  container1: {
    display: "flex",

    marginTop: windowWidth / 15,
    paddingVertical: windowWidth / 50,
  },
});
