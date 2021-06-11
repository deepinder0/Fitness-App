import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  ToastAndroid,
  Animated,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Actions } from "react-native-router-flux";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import CheckBox from "react-native-check-box";
import DigitalTimer from "./DigitalTimer";
import Timer from "./Timer";
import Loader from "../../components/Loader";
import COLORS from "../../consts/color";
import Modal from "react-native-modal";
import { db, auth } from "../../components/Firebase/firebaseApi";
import firebase from "firebase";
import { MaterialIcons } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function ExerciseSets(props) {
  const [timer, setTimer] = useState(props?.digitalTimer);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(Math.floor(props.remainingTime / 60));
  const [seconds, setSeconds] = useState(props.remainingTime % 60);
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pause, setPause] = useState(false);
  const [previousSets, setPreviousSets] = useState(props.previousSets);
  console.log(previousSets, "previousSets")
  const toggleModal = () => setModalVisible(!isModalVisible);
  let done;
  const [data, setData] = useState(props.list1);
  const [previousSetsOfExercises, setPreviousSetsOfExercises] = useState(
    props.previousSetsOfExercises
  );
  const [rotinename, onChangeText] = useState("ROTINE_NAME");
  const [notes, onChangeNotes] = useState("Notes");
  const [previousExercises, setPreviousExercises] = useState([]);
  const [finalarray, setFinalarray] = useState();
  let userId = auth.currentUser.uid;
  let preExerciseName = [];
  let newdata1;
  useEffect(()=>{
    const selected = props.list1;
    if(selected) {
      let temp = [];
      previousSets.forEach((ps)=> {
        selected.forEach((ex)=>
          {
            if(ps.id == ex.id)
             {
               temp.push(ps.PreviousExercises);
            }
          }
        );
      });
      setPreviousSetsOfExercises(temp);
    }
  },[]);
  // useEffect(() => {
  //   setLoader(true);
  //   db.collection("users")
  //     .doc(userId)
  //     .collection("Exercises")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         doc.data().PreviousExercises.map((item) =>
  //           preExerciseName.push({
  //             name: item.ExerciseName,
  //             kgs: item.kgs,
  //             reps: item.reps,
  //             time: item.time,
  //           })
  //         );
  //         setPreviousExercises(
  //           Array.from(
  //             preExerciseName
  //               .reduce((map, obj) => map.set(obj.name, obj), new Map())
  //               .values()
  //           )
  //         );
  //       });
  //     });
  //   newdata1 = [...previousExercises];
  //   const filterByReference = (data, newdata1) => {
  //     let res = [];
  //     let res1 = [];
  //     let res2;
  //     res = data.filter((el) => {
  //       return !newdata1.find((element) => {
  //         return element.name === el.ExerciseName;
  //       });
  //     });
  //     res1 = newdata1.filter((el) => {
  //       return data.find((element) => {
  //         return element.ExerciseName === el.name;
  //       });
  //     });
  //     res = res.map((e) => ({
  //       name: e.ExerciseName,
  //     }));
  //     res2 = [...res, ...res1];
  //     return res2;
  //   };
  //   setFinalarray(() => filterByReference(data, newdata1));
  //   console.log("hhh", finalarray);
  //   setLoader(false);
  // }, []);
  const donefxn = (selectedExercises, isDone) => {
    const newdata = selectedExercises.map((e) => ({
      exercisename: e.ExerciseName,
      Extentedfields: e.fields,
      exerciseId: e.id,
      Extendednotes: e.notes,
    }));
    let kgs = [];
    let reps = [];
    let tick = [];
    let exercisenotes = [];
    let FinalModifiedArray = [];
    let SetsArray = [];
    let FinalSetsArray = [];
    newdata.map((e, index) => {
      e.Extentedfields.map((item) => {
        kgs.push(item.value1);
        reps.push(item.value2);
        tick.push(item.tick);
      });
      kgs.map((kg, index) => {
        SetsArray.push({ kg: kg, reps: reps[index] });
      });
      FinalSetsArray.push(SetsArray);
      SetsArray = [];
      e.Extendednotes.map((item) => {
        exercisenotes.push(item.valueOfnote);
      });

      const allEqual = (arr) => arr.every((val) => val === true);
      const result = allEqual(tick);
      done = result;
      let ModifiedExercisesFormat = {
        ExerciseName: e.exercisename,
        kgs: kgs,
        reps: reps,
        time: [],
        notes: exercisenotes,
        exerciseId: e.exerciseId,
      };
      FinalModifiedArray.push(ModifiedExercisesFormat);
      kgs = [];
      reps = [];
      exercisenotes = [];
    });
    if (done || (!isDone)) {

      db.collection("users")
        .doc(userId)
        .collection("CustomRoutines")
        .add({
          Exercise: [...FinalModifiedArray],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          RoutineName: rotinename,
          RoutineNotes: notes,
          startDate: props.startDate,
          done: isDone && done
        })
        .catch((e) => {
          console.log(e.message);
        });
      
      if (isDone) { 
        selectedExercises.map((e, selectedExercisesIndex) => {
          db.collection("users")
            .doc(userId)
            .collection("Exercises")
            .doc(e.id)
            .set({
              PreviousExercises: FinalSetsArray[selectedExercisesIndex],
            })
            .then(() => {})
            .catch((e) => {
              console.log(e.message);
            });
      });
    }
      props.navigation.goBack(), Actions.AddRotineScreen();
    } else {
      ToastAndroid.show("Please Mark all the sets true!!!", ToastAndroid.LONG);
    }
  };

  const handleTick = (ide, idx, e, value1, value2) => {
    if (value1 !== 0 && value2 !== 0) {
      const newData = [...props.list1];
      newData[ide].fields[idx].tick = !e;
      setData(newData);
    } else {
      ToastAndroid.show(
        "Kg and Reps values cannot be empty.",
        ToastAndroid.LONG
      );
    }
  };
  const handleChange1 = (ide, idx, e) => {
    const newData = [...props.list1];
    newData[ide].fields[idx].value1 = e;
    setData(newData);
  };
  const handleChangeNotes = (ide, index, e) => {
    const newData = [...props.list1];
    newData[ide].notes[index].valueOfnote = e;
    setData(newData);
  };

  const handleChange2 = (ide, idx, e) => {
    const newData = [...props.list1];
    newData[ide].fields[idx].value2 = e;
    setData(newData);
  };
  const handleAdd = (ide, preIndex) => {
    const newData = [...props.list1];
    newData[ide].fields.push({
      previous: previousSetsOfExercises[ide][preIndex] ? previousSetsOfExercises[ide][preIndex] : {kg: 0, reps: 0},
      value1: previousSetsOfExercises[ide][preIndex] ? previousSetsOfExercises[ide][preIndex].kg : 0,
      value2: previousSetsOfExercises[ide][preIndex] ? previousSetsOfExercises[ide][preIndex].reps : 0,
      tick: false,
    });
    setData(newData);
  };
  const addNote = (ide) => {
    const newData = [...props.list1];
    newData[ide].notes.push({ valueOfnote: "Note" });
    console.log(newData);
    setData(newData);
  };
  const deletenote = (ide, index) => {
    const newData = [...props.list1];
    newData[ide].notes.splice(index, 1);
    setData(newData);
  };

  const handleRemove = (ide, idx) => {
    const newData = [...props.list1];
    newData[ide].fields.splice(idx, 1);
    setData(newData);
  };

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    return (
      <View
        style={{
          backgroundColor: "#ff4d4d",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </Animated.Text>
      </View>
    );
  };

  return (
    <View style={styles.containers}>
      <Loader show={loader} />
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
          {timer ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <DigitalTimer
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                pause={props.pause}
              />
              <TouchableOpacity
                onPress={() => {
                  setTimer(false);
                  toggleModal();
                }}
              >
                <Ionicons name="timer-outline" size={20} color="#00ff5f" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <Ionicons name="timer-outline" size={20} color="#00ff5f" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.containerSave}
          onPress={() => {
            donefxn(data, false);
          }}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container1}
          onPress={() => {
            donefxn(data, true);
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
        />
      </View>
      <SafeAreaView>
        <ScrollView style={{height: windowHeight * 0.8}}>
          {data?.map((product, ide) =>{ 
            let preIndex = 0;
            return(
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
                <View>
                  <ModalDropdown
                    dropdownStyle={{
                      width: windowWidth / 3,
                      height: windowHeight / 13,
                      borderColor: COLORS.appPrimary,
                      borderWidth: 2,
                      borderRadius: 3,
                    }}
                    dropdownTextStyle={{ textAlign: "center", color: COLORS.appPrimary , backgroundColor:"black" , fontSize: 15 }}
                    options={["Add Note"]}
                    isFullWidth={true}
                    onSelect={() => {
                      addNote(ide);
                    }}
                  >
                    <MaterialIcons name="more-vert" size={24} color="#00ff5f" />
                  </ModalDropdown>
                </View>
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
                          value={note.valueOfnote}
                          onChangeText={(e) => {
                            handleChangeNotes(ide, index, e);
                          }}
                          style={styles.notesinput}
                        ></TextInput>
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="white"
                          onPress={() => {
                            deletenote(ide, index);
                          }}
                        />
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
                <View>
                  <Text>
                    <Ionicons name="checkmark-done" size={16} color="white" />
                  </Text>
                </View>
              </View>
              <ScrollView>
                {data[ide].fields?.map((field, idx) => {
                  preIndex = idx + 1;
                  return (
                    <Swipeable
                      // rightThreshold={windowWidth}
                      renderRightActions={RightActions}
                      onSwipeableRightWillOpen={() => {
                        handleRemove(ide, idx);
                      }}
                    >
                      <View style={styles.scrollview__2}>
                        <View key={product.id} style={styles.scrollview__2__1}>
                          <Text style={styles.text8}>{idx + 1}</Text>
                          {
                            (field.previous.kg === 0)
                            ?
                            <Text style={styles.text8}>-</Text>
                            :
                            <Text style={styles.text8}>{field.previous.kg}*{field.previous.reps}</Text>
                          }
                          <View style={styles.scrollview__textview}>
                            <TextInput
                              keyboardType="numeric"
                              value={field.value1}
                              onChangeText={(e) => {
                                handleChange1(ide, idx, e);
                              }}
                              style={styles.textinput}
                            ></TextInput>
                          </View>
                          <View style={styles.scrollview__textview}>
                            <TextInput
                              keyboardType="numeric"
                              value={field.value2}
                              onChangeText={(e) => handleChange2(ide, idx, e)}
                              style={styles.textinput}
                            ></TextInput>
                          </View>
                          <View style={styles.scrollview__textview}>
                            <CheckBox
                              isChecked={field.tick}
                              onClick={() => {
                                handleTick(
                                  ide,
                                  idx,
                                  field.tick,
                                  field.value1,
                                  field.value2
                                );
                              }}
                              checkBoxColor="#00ff5f"
                              checkedCheckBoxColor="#00ff5f"
                            />
                          </View>
                        </View>
                      </View>
                    </Swipeable>
                  );
                })}
              </ScrollView>
              <View style={styles.addsetview}>
                <TouchableOpacity
                  onPress={() => {
                    handleAdd(ide, preIndex);
                  }}
                >
                  <Text style={styles.addset}>Add Set</Text>
                </TouchableOpacity>
              </View>
            </View>
          )})}
          <View style={styles.textcenter}>
            <TouchableOpacity
              onPress={() =>{
                    Actions.ExercisesList({
                    list: props.list,
                    selectedExercises: data,
                    previousSets: previousSets,
                    selectedDate: props.selectedDate,
                  });
               }
              }
            >
              <Text style={styles.addexercises}>ADD EXERCISE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textcenter}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack(), Actions.AddRotineScreen();
              }}
            >
              <Text style={styles.cancelexercises}>Cancel Workout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={isModalVisible}
          style={{ justifyContent: "flex-end", margin: 0 }}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          animationInTiming={500}
          animationOutTiming={500}
          onModalHide={() => {
            setPause(false);
          }}
          onModalWillShow={() => {
            setPause(pause);
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              alignContent: "flex-start",
              justifyContent: "space-around",
              alignItems: "center",
              height: windowHeight,
            }}
          >
            <Timer pause={pause} toggleFxn={toggleModal} />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

export default ExerciseSets;
const styles = StyleSheet.create({
  containers: { flex: 1, backgroundColor: "#000" },
  container1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: windowWidth / 25,
    paddingVertical: windowWidth / 50,
  },
  containerSave: {
    display: "flex",
    flexDirection: "row",
    marginTop: windowWidth / 30,
    left: windowWidth / 10,
    marginLeft: windowWidth / 6
  },
  text__Heading: {
    textAlign: "center",
    color: "#00ff5f",
    fontSize: 20,
  },
  text: {
    color: "#00ff5f",
    fontSize: 14,
    borderColor: "#00ff5f",
    paddingLeft: windowWidth / 30,
    paddingRight: windowWidth / 30,
    marginRight: windowWidth / 30,
    marginTop: windowHeight / 110
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
