import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Animated,
  ToastAndroid,
} from "react-native";
import COLORS from "../../consts/color";
import DigitalTimer from "./DigitalTimer";
import { db, auth } from "../../components/Firebase/firebaseApi";
import firebase from "firebase";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import ModalDropdown from "react-native-modal-dropdown";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function PreviousExercises(props) {
  const rotineId = props.routine.id;
  const userId = auth.currentUser.uid;
  const timestamp = props.routine.timestamp;
  const startDate = props.routine.startDate;
  const isCompleted = props.routine.isCompleted;
  let done;
  const [rotinename, onChangeText] = useState(props.routine.rotinename);
  const [notes, onChangeNotes] = useState(props.routine.rotinenotes);
  const [data, setData] = useState(props.routine.exercises);
  // const addNote = (ide) => {
  //   const newData = [...props.routine.exercises];
  //   newData[ide].notes.push("Note");
  //   // console.log(newData);
  //   setData(newData);
  // };
  // const deletenote = (ide, index) => {
  //   const newData = [...props.routine.exercises];
  //   newData[ide].notes.splice(index, 1);
  //   setData(newData);
  // };
  const handleChangeNotes = (ide, index, e) => {
    const newData = [...props.routine.exercises];
    newData[ide].notes[index] = e;
    setData(newData);
  };
  // const handleAdd = (ide, preIndex) => {
  //   const newData = [...props.routine.exercises];
  //   newData[ide].kgs.push(0);
  //   newData[ide].reps.push(0);
  //   newData[ide].ticks.push(false);
  //   setData(newData);
  // };
  // const handleRemove = (ide, idx) => {
  //   const newData = [...props.routine.exercises];
  //   newData[ide].kgs.splice(idx, 1);
  //   newData[ide].reps.splice(idx, 1);
  //   newData[ide].ticks.splice(idx, 1);
  //   setData(newData);
  // };
  const handleTick = (ide, idx, e, value1, value2) => {
    if (value1 !== 0 && value2 !== 0) {
      const newData = [...props.routine.exercises];
      newData[ide].ticks[idx] = !e;
      setData(newData);
    } else {
      ToastAndroid.show(
        "Kg and Reps values cannot be empty.",
        ToastAndroid.LONG
      );
    }
  };
  const handleChange1 = (ide, idx, e) => {
    const newData = [...props.routine.exercises];
    newData[ide].kgs[idx] = e;
    setData(newData);
  };
  const handleChange2 = (ide, idx, e) => {
    const newData = [...props.routine.exercises];
    newData[ide].reps[idx] = e;
    setData(newData);
  };
  const donefxn = (exercises) => {
    let tick = [];
    exercises.map((e) =>{
        tick.push(...e.ticks)
    })
    const allEqual = (arr) => arr.every((val) => val === true);
    const result = allEqual(tick);
    done = result;
    // let SetsArray = [];
    // let FinalSetsArray = [];
    // exercises.map((exercise) => {
    //     exercise.kgs.map((kg, index) => {
    //         SetsArray.push({ kg: kg, reps: exercise.reps[index] });
    //       });
    //       FinalSetsArray.push(SetsArray);
    //       SetsArray = [];
    // })
    // console.log(exercises, 'tytyt')
    if (done) {
        exercises.map((exercise) => {
            delete exercise.ticks
        })
        db.collection("users")
        .doc(userId)
        .collection("CustomRoutines")
        .doc(rotineId)
        .update({
            isCompleted: done
        });
        // db.collection("users")
        // .doc(userId)
        // .collection("CustomRoutines")
        // .doc(rotineId)
        // .set({
        //     Exercise: exercises,
        //     RoutineName: rotinename,
        //     RoutineNotes: notes,
        //     modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
        //     timestamp: timestamp,
        //     startDate: startDate,
        // });
        // exercises.map((e, selectedExercisesIndex) => {
        //     db.collection("users")
        //       .doc(userId)
        //       .collection("Exercises")
        //       .doc(e.exerciseId)
        //       .set({
        //         PreviousExercises: FinalSetsArray[selectedExercisesIndex],
        //       })
        //       .then(() => {})
        //       .catch((e) => {
        //         console.log(e.message);
        //       });
        //   });
        props.navigation.goBack(), Actions.AddRotineScreen();
    } else {
        ToastAndroid.show("Please Complete all exercises of the Routine !!!", ToastAndroid.LONG);
    }
  };
  // const RightActions = (progress, dragX) => {
  //   const scale = dragX.interpolate({
  //     inputRange: [-100, 0],
  //     outputRange: [1, 0.5],
  //     extrapolate: "clamp",
  //   });
    
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: "#ff4d4d",
  //         justifyContent: "center",
  //         alignItems: "flex-end",
  //       }}
  //     >
  //       <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
  //         <Ionicons name="trash-outline" size={20} color="white" />
  //       </Animated.Text>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.containers}>
      <View style={styles.header}>
        <View style={styles.container1}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Alert!", "Your changes will be revert!", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel",
                },
                {
                  text: "YES",
                  onPress: () => {
                    props.navigation.goBack(), Actions.AddRotineScreen();
                  },
                },
              ]);
            }}
            style={{ marginLeft: windowWidth / 90 }}
          >
            <AntDesign name="left" size={20} color="#00ff5f" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.container1, {display: isCompleted ? "none" : "flex"}]}
          onPress={() => {
            donefxn(data);
          }}
        >
          <Text style={styles.text}>Done</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.text3}
          onChangeText={onChangeText}
          value={rotinename}
          editable={false}
        />
        <TextInput
          multiline
          style={styles.text2}
          onChangeText={onChangeNotes}
          value={notes}
          style={{
            borderColor: "#707070",
            borderWidth: 2,
            borderRadius: 10,
            color: "white",
            marginHorizontal: windowWidth * 0.02,
            paddingLeft: 8,
          }}
          editable={false}
        />
      </View>
      <SafeAreaView>
        <ScrollView style={{height: windowHeight * 0.8}}>
          {data?.map((product, ide) => {
            let preIndex = 0;
            return (
              <View style={styles.set}>
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={styles.text1}
                      onPress={() => {
                        // setModal(product.Instructions);
                        // toggleModal();
                      }}
                    >
                      {product.ExerciseName}
                    </Text>
                    <Text style={styles.text4}>{product.BodyPart}</Text>
                  </View>
                  {/* <View>
                    <ModalDropdown
                      dropdownStyle={{
                        width: windowWidth / 3,
                        height: windowHeight / 21,
                        borderColor: "#00ff5f",
                        borderWidth: 2,
                        borderRadius: 3,
                      }}
                      dropdownTextStyle={{ textAlign: "center", fontSize: 15 }}
                      options={["Add Note"]}
                      isFullWidth={true}
                      onSelect={() => {
                        addNote(ide);
                      }}
                    >
                      <MaterialIcons
                        name="more-vert"
                        size={24}
                        color="#00ff5f"
                      />
                    </ModalDropdown>
                  </View> */}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ScrollView>
                    {data[ide].notes?.map((note, index) => {
                      return (
                        <View style={styles.noteview__2}>
                          <TextInput
                            placeholder={"Note"}
                            value={note}
                            onChangeText={(e) => {
                              handleChangeNotes(ide, index, e);
                            }}
                            style={styles.notesinput}
                            editable={false}
                          ></TextInput>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={styles.scrollview__1}>
                  <View>
                    <Text style={styles.text5}>Set</Text>
                  </View>
                  <View>
                    <Text style={styles.text5}>Previous</Text>
                  </View>
                  <View>
                    <Text style={styles.text6}>KG</Text>
                  </View>
                  <View>
                    <Text style={styles.text7}>Reps</Text>
                  </View>
                  <View style={{display: isCompleted ? "none" : "flex"}}>
                    <Text>
                      <Ionicons name="checkmark-done" size={16} color="white" />
                    </Text>
                  </View>
                </View>
                <ScrollView>
                  {data[ide].kgs?.map((field, idx) => {
                    preIndex = idx + 1;
                    return (
                        <View style={styles.scrollview__2}>
                          <View
                            key={product.id}
                            style={styles.scrollview__2__1}
                          >
                            <Text style={styles.text8}>{idx + 1}</Text>
                            {props.lengthOfSets[ide] < preIndex ? (
                              <Text style={styles.text8}>-</Text>
                            ) : (
                              <Text style={styles.text8}>
                                {field}*{product.reps[idx]}
                              </Text>
                            )}
                            <View style={styles.scrollview__textview}>
                              <TextInput
                                keyboardType="numeric"
                                value={field}
                                onChangeText={(e) => {
                                  handleChange1(ide, idx, e);
                                }}
                                style={styles.textinput}
                                editable={false}
                              ></TextInput>
                            </View>
                            <View style={styles.scrollview__textview}>
                              <TextInput
                                keyboardType="numeric"
                                value={product.reps[idx]}
                                onChangeText={(e) => handleChange2(ide, idx, e)}
                                style={styles.textinput}
                                editable={false}
                              ></TextInput>
                            </View>
                            <View style={[styles.scrollview__textview, {display: isCompleted ? "none" : "flex"}]}>
                              <CheckBox
                                isChecked={product.ticks[idx]}
                                onClick={() => {
                                  handleTick(
                                    ide,
                                    idx,
                                    product.ticks[idx],
                                    product.kgs[idx],
                                    product.reps[idx]
                                  );
                                }}
                                checkBoxColor="#00ff5f"
                                checkedCheckBoxColor="#00ff5f"
                              />
                            </View>
                          </View>
                        </View>
                      
                    );
                  })}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default PreviousExercises;
const styles = StyleSheet.create({
  containers: { flex: 1, backgroundColor: "#000" },
  container1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: windowWidth / 30,
    paddingVertical: windowWidth / 50,
  },
  text__Heading: {
    textAlign: "center",
    color: "#00ff5f",
    fontSize: 20,
  },
  text: {
    color: "#00ff5f",
    fontWeight: "bold",
    fontSize: 18,
    borderColor: "#00ff5f",
    paddingLeft: windowWidth / 30,
    paddingRight: windowWidth / 30,
    marginRight: windowWidth / 30,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1: {
    color: "#00ff5f",
    fontSize: 20,
    paddingLeft: windowWidth / 90,
  },
  text3: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: windowWidth / 90,
    marginVertical: windowWidth / 90,
  },
  text2: {
    color: "gray",
    fontSize: 18,
    padding: windowWidth / 90,
  },
  text4: {
    color: "gray",
    fontSize: 15,
    paddingLeft: windowWidth / 90,
  },
  scrollview__1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  noteview__2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scrollview__2: { display: "flex", flexDirection: "column" },
  text5: { color: "white", fontSize: 16, fontWeight: "bold" },
  text6: { marginLeft: "5%", color: "white", fontSize: 16, fontWeight: "bold" },
  text7: { marginLeft: "2%", color: "white", fontSize: 16, fontWeight: "bold" },
  scrollview__2__1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: windowWidth / 50,
  },
  text8: {
    flex: 0.2,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  scrollview__textview: {
    flex: 0.2,
    alignItems: "center",
  },
  textinput: {
    backgroundColor: "#3a3a3a",
    borderColor: "#00ff5f",
    borderWidth: 1,
    color: "white",
    width: "90%",
    textAlign: "center",
  },
  notesinput: {
    backgroundColor: "black",
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: windowWidth * 0.01,
    marginVertical: windowHeight * 0.006,
    color: "white",
    flex: 1,
    textAlign: "left",
    paddingLeft: 8,
  },
  addset: {
    color: "#00ff5f",
    paddingVertical: 10,
    textAlign: "center",
  },
  addsetview: {
    borderColor: "#00ff5f",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
  },
  textcenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  addexercises: { color: COLORS.appPrimary, paddingVertical: 10, fontSize: 20 },
  cancelexercises: { color: "red", paddingVertical: 10 },
  set: {
    borderBottomWidth: 2,
    borderColor: "#707070",
    padding: windowHeight / 90,
    marginBottom: windowHeight / 50,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
  },
});
