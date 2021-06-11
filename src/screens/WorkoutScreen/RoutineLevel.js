import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
const windowWidth = Dimensions.get("window").width;
function RoutineLevel() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={() => Actions.AddRotineScreen()}
            style={{ marginLeft: windowWidth / 90 }}
          >
            <AntDesign name="left" size={20} color="#00ff5f" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text style={styles.text}>My Routine</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.containers}>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Legs</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./legs.jpg")} />
            </TouchableOpacity>
          </View>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Back</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./back.jpg")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containers}>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Shoulders</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image
                style={styles.images}
                source={require("./shoulders.jpg")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Biceps & Triceps</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./biceps.jpg")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containers}>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Chest</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./chest.jpg")} />
            </TouchableOpacity>
          </View>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Core</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./core.jpg")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containers}>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Full Body</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./fullbody.jpg")} />
            </TouchableOpacity>
          </View>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Cardio</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./cardio.jpg")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containers}>
          <View style={styles.containers__content}>
            <Text style={styles.text1}>Olympics</Text>
            <TouchableOpacity onPress={() => Actions.ExercisesList()}>
              <Image style={styles.images} source={require("./olympics.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.containers__content}>
            <Text style={styles.text1}></Text>
            <Image style={styles.e_images} source={require("./black.png")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default RoutineLevel;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: windowWidth / 15,
  },
  text: {
    color: "#00ff5f",
    fontWeight: "bold",
    fontSize: 30,
  },
  text1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  containers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: windowWidth / 20,
  },
  containers__content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  images: {
    width: 130,
    height: 130,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00ff5f",
  },
});
