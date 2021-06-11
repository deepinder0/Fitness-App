import React from "react";
import { View, Text, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
function Exercise(props) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View style={{ display: "flex" }}>
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#00ff5f",
          }}
          source={require("./core.jpg")}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: 0.5,
        }}
      >
        <View>
          <Text style={{ color: "#00ff5f", fontWeight: "bold", fontSize: 20 }}>
            {props.ExerciseName}
          </Text>
        </View>
        <View>
          <Text style={{ color: "gray", fontSize: 15 }}>{props.BodyPart}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => Actions.ExerciseSets(props)}>
          <Entypo name="plus" size={24} color="#00ff5f" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Exercise;
