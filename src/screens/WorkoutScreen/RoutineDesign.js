import { StyleSheet, View, Text, Dimensions } from "react-native";

import React, { useState } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function RoutineDesign(props) {
  const [truncated, setTruncated] = useState(true);
  return (
    <View style={styles.container3}>
      <Text style={styles.text3}>{props.routinename}</Text>
      {props.exercises.map((exercise, index) => {
        if (truncated) {
          if (index < 2) {
            return <Text style={styles.text}>{exercise.ExerciseName}</Text>;
          } else if (index == 2) {
            return (
              <Text
                style={styles.text}
                onPress={() => {
                  {
                    setTruncated(!truncated);
                  }
                }}
              >
                ... Read more
              </Text>
            );
          }
        } else {
          if (index < props.exercises.length - 1) {
            return <Text style={styles.text}>{exercise.ExerciseName}</Text>;
          } else {
            return (
              <>
                <Text style={styles.text}>{exercise.ExerciseName}</Text>
                <Text
                  style={styles.text}
                  onPress={() => {
                    {
                      setTruncated(!truncated);
                    }
                  }}
                >
                  Read less
                </Text>
              </>
            );
          }
        }
      })}
    </View>
  );
}

export default RoutineDesign;
const styles = StyleSheet.create({
  text3: {
    color: "#fff",
    fontSize: 13,
    paddingLeft: windowWidth / 90,
    marginVertical: windowWidth / 90,
  },
  container3: {
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 10,
    padding: windowWidth / 20,
    margin: windowWidth / 50,
    width: windowWidth * 0.55,
    minHeight: windowHeight * 0.22,
    minWidth: windowWidth * 0.55,
  },
  text: { color: "#707070", fontSize: 15, paddingLeft: windowWidth / 95 },
});
