import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function WorkoutScreen() {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          display: "flex",
          flex: 0.1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View>
          <TouchableOpacity onPress={() => Actions.AddRotineScreen()}>
            <AntDesign
              name="left"
              size={20}
              color="#00ff5f"
              style={{
                backgroundColor: "#000",
                paddingTop: 14,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 35,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.workout}>
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              backgroundColor: "#000",
              width: "100%",
              color: "#00ff5f",
              fontSize: 20,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 30,
            }}
          >
            START WORKOUT
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              color: "#000",
              alignContent: "center",
              textAlign: "center",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#00ff5f",
              width: "30%",
              marginLeft: "auto",
              marginRight: 20,
              borderRadius: 30,
              marginBottom: 20,
              marginTop: windowHeight / 50,
            }}
          >
            Finish
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "#fff",
            alignContent: "center",
            textAlign: "left",
            paddingLeft: 20,
            fontWeight: "bold",
          }}
        >
          WORKOUT
        </Text>
      </View>
      <View
        style={{
          marginBottom: 20,
          paddingLeft: 20,
          color: "gray",
        }}
      >
        <Text
          style={{
            color: "gray",
          }}
        >
          NOTES
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => Actions.ExercisesList()}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#000",
              width: "80%",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#00ff5f",
              paddingTop: 10,
              paddingBottom: 10,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            ADD EXERCISE
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => Actions.AddRotineScreen()}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
              width: "80%",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "red",
              paddingTop: 10,
              paddingBottom: 10,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 10,
            }}
          >
            CANCEL WORKOUT{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WorkoutScreen;

const styles = StyleSheet.create({
  workout: {
    marginTop: 35,
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});
