import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const DigitalTimer = (props) => {
  const [paused, setPaused] = useState(props.pause);
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([props.hours ? props.hours : 0, props.minutes ? props.minutes : 0, props.seconds ? props.seconds : 0]);
  const [display, setDisplay] = useState("flex");
  const tick = () => {
    if (paused || over) return;
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const restart = () => {
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    setPaused(false);
    setOver(false);
  };

  const Reset = () => {
    setTime([parseInt(0), parseInt(0), parseInt(0)]);
    setPaused(false);
    setOver(false);
    setDisplay("none");
  };
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <View
      style={{ display: display, flexDirection: "row", alignItems: "center" }}
    >
      <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>{`${m?.toString()
        .padStart(2, "0")}:${s?.toString().padStart(2, "0")}`}</Text>

      {paused ? (
        <Ionicons name="play-circle-outline" size={20}
          color="#00ff5f"
          onPress={() => setPaused(!paused)}
          style={{ padding: 10 }} />
      ) : (
        <Ionicons name="pause-circle-outline" size={20}
          color="#00ff5f"
          style={{ padding: 10 }}
          onPress={() => setPaused(!paused)}/>
      )}

    </View>
  );
};

export default DigitalTimer;
