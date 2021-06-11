import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

function ExerciseLevel() {
  const styles = StyleSheet.create({
    btnPrimary: {
      width: "100%",
      color: "#00ff5f",
      paddingLeft: 10,
      paddingRight: 10,
      height: 30,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <TouchableOpacity
        style={{ marginTop: 50, marginLeft: 10 }}
        onPress={() => Actions.AddRotineScreen()}
      >
        <AntDesign name="left" size={20} color="#00ff5f" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: -50,
        }}
      >
        <Text
          style={{
            width: "80%",
            color: "#00ff5f",
            fontSize: 35,
            paddingLeft: 50,
            paddingRight: 50,
            paddingBottom: 8,
            paddingTop: 8,
            borderRadius: 30,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          Choose Your Level
        </Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => Actions.WorkoutScreen()}
        >
          <Text
            style={{
              width: "80%",
              color: "#000",
              fontSize: 25,
              backgroundColor: "#00ff5f",
              paddingLeft: 50,
              paddingRight: 50,
              paddingBottom: 8,
              paddingTop: 8,
              borderRadius: 30,
              textAlign: "center",
            }}
          >
            Beginner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => Actions.WorkoutScreen()}
        >
          <Text
            style={{
              width: "80%",
              textAlign: "center",
              color: "#000",
              fontSize: 25,
              backgroundColor: "#00ff5f",
              paddingLeft: 50,
              paddingRight: 50,
              paddingBottom: 8,
              paddingTop: 8,
              borderRadius: 30,
            }}
          >
            Intermediate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => Actions.WorkoutScreen()}
        >
          <Text
            style={{
              width: "80%",
              textAlign: "center",
              color: "#000",
              fontSize: 25,
              backgroundColor: "#00ff5f",
              paddingLeft: 50,
              paddingRight: 50,
              paddingBottom: 8,
              paddingTop: 8,
              borderRadius: 30,
            }}
          >
            Expert
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ExerciseLevel;
