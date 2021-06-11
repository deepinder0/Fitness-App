import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  Share,
} from "react-native";
import { Actions } from "react-native-router-flux";
import CalendarStrip from "react-native-calendar-strip";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../../components/Firebase/firebaseApi";
import COLORS from "../../consts/color";
import Loader from "../../components/Loader";
import RoutineDesign from "./RoutineDesign";
import Modal from "react-native-modal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function AddRotineScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const [loader, setLoader] = useState(false);
  const [routines, setRoutines] = useState();
  const [shareableRoutine, setShareableRoutine] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [docId, setDocId] = useState();
  const [previousSets, setPreviousSets] = useState([]);
  const userId = auth.currentUser.uid;
  const toggleModal = () => setModalVisible(!isModalVisible);
  const [dateSelected, setSelectedDate] = useState(new Date());

  const backActionHandler = () => {
    navigation.goBack();
    return true;
  };

  const getFormatedDate = (date) => {
    const currentDate = date.getDate().toString();
    const currentMonth = (date.getMonth() + 1).toString();
    const formatedDate =
      currentMonth + "-" + currentDate + "-" + date.getFullYear();
    return formatedDate;
  };

  const loadData = (date) => {
    setLoader(true);
    const selectedDate = getFormatedDate(date);
    let userId = auth.currentUser.uid;
    //console.log(selectedDate);
    db.collection("users")
      .doc(userId)
      .collection("CustomRoutines")
      .orderBy("timestamp", "asc")
      .where("startDate", "==", selectedDate)
      .onSnapshot((snapshot) => {
        setRoutines(
          snapshot.docs.map((doc, index) => ({
            rotinename: doc.data().RoutineName,
            rotinenotes: doc.data().RoutineNotes,
            timestamp: doc.data().timestamp,
            exercises: doc.data().Exercise,
            startDate: doc.data().startDate,
            isCompleted: doc.data().done,
            id: doc.id,
          }))
        );
        setLoader(false);
      });
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  useEffect(() => {
    const date = new Date();
    loadData(date);
  }, []);

  useEffect(() => {
    setLoader(true);
    let userId = auth.currentUser.uid;
    db.collection("exercises").onSnapshot((snapshot) => {
      setExercises(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ExerciseName: doc.data().ExerciseName,
          BodyPart: doc.data().BodyPart,
          Instructions: doc.data().Instructions,
          ImageURL: doc.data().ImageURL,
          Thumbnail: doc.data().Thumbnail,
        }))
      );

      db.collection("users")
        .doc(userId)
        .collection("Exercises")
        .onSnapshot(
          ((snapshot) => {
            setPreviousSets(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                PreviousExercises: doc.data().PreviousExercises,
              }))
            );
          }),
          ((error) => {
            setPreviousSets([]);
            console.log(error);
          })
        );
      // console.log(previousSets);

      setLoader(false);
    });
  }, []);

  const onShareRoutine = async () => {
    let arrayOfExercises = shareableRoutine.Exercise.map((exercise) => {
      let sets = exercise.kgs.map((kg, index) => {
        return `Set ${index + 1}: ${kg} x ${exercise.reps[index]}\n`;
      });
      return `${exercise.ExerciseName}\n${exercise.notes}\n${sets.join("")}\n`;
    });
    let message = `${shareableRoutine.RoutineName}\n${
      shareableRoutine.RoutineNotes
    }\n${shareableRoutine.timestamp.toDate()}\n${arrayOfExercises.join("")}`;
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.containers}>
      <Loader show={loader} />
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={{ marginLeft: windowWidth / 90 }}
        >
          <AntDesign name="left" size={20} color="#00ff5f" />
        </TouchableOpacity>
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text style={styles.text__Heading}>WORKOUT</Text>
        </View>
      </View>
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: "white",
        }}
        scrollable={true}
        scrollerPaging={true}
        style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "#707070" }}
        calendarColor={"#000"}
        dateNumberStyle={{ color: "#00ff5f" }}
        dateNameStyle={{ color: "#00ff5f" }}
        highlightDateNumberStyle={{ color: "#fff" }}
        highlightDateNameStyle={{ color: "#fff" }}
        onDateSelected={(date) => {
          if (date.toString() != dateSelected.toString()) {
            setSelectedDate(new Date(date));
            loadData(new Date(date));
          }
        }}
        selectedDate={new Date()}
      />
      <View>
        <Text style={styles.text1}>Quick Start</Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => {
            Actions.ExercisesList({
              previousSets: previousSets,
              list: exercises,
              navigation: navigation,
              selectedDate: getFormatedDate(new Date()),
            });
          }}
        >
          <Text style={styles.text2}>START AN EMPTY WORKOUT</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.text1}>Routines</Text>
          <TouchableOpacity>
            <Feather
              name="plus"
              size={20}
              color="white"
              style={{ paddingHorizontal: windowWidth / 40 }}
              onPress={() => {
                Actions.ExerciseSets({
                  list: exercises,
                  previousSets: previousSets,
                  navigation: navigation,
                  selectedDate: getFormatedDate(dateSelected),
                });
              }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true}>
          {routines?.map((routine) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let lengthOfSets = routine.exercises.map((e) => {
                    return e.kgs.length;
                  });
                  routine.exercises.map((e) => {
                    e.ticks = e.kgs.map((i) => false);
                    return e;
                  });
                  Actions.PreviousExercises({
                    routine: routine,
                    lengthOfSets: lengthOfSets,
                    navigation: navigation,
                  });
                }}
                onLongPress={() => {
                  setDocId(routine.id);
                  toggleModal();
                }}
              >
                <RoutineDesign
                  routinename={routine.rotinename}
                  exercises={routine.exercises}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.text1}>Default Routines</Text>
        <ScrollView horizontal={true}></ScrollView>

        <Text style={styles.text1}>Assigned Routines</Text>
        <ScrollView horizontal={true}></ScrollView>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        style={{ justifyContent: "flex-end", margin: 0 }}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={toggleModal}
      >
        <View
          style={{
            backgroundColor: "#000",
            alignContent: "flex-start",
            justifyContent: "space-around",
            alignItems: "center",
            height: windowHeight / 3,
            borderTopColor: COLORS.appPrimary,
            borderWidth: 1,
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
          }}
        >
          <TouchableOpacity
            style={{
              width: windowWidth * 0.4,
              marginVertical: windowHeight * 0.01,
            }}
            onPress={() => {
              db.collection("users")
                .doc(userId)
                .collection("CustomRoutines")
                .doc(docId)
                .get()
                .then((doc) => {
                  setShareableRoutine(doc.data());
                });
              onShareRoutine();
            }}
          >
            <Text
              style={{
                color: COLORS.appPrimary,
                backgroundColor: "black",
                padding: 5,
                textAlign: "center",
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.4,
              marginVertical: windowHeight * 0.01,
            }}
            onPress={() => {
              setLoader(true);
              db.collection("users")
                .doc(userId)
                .collection("CustomRoutines")
                .doc(docId)
                .delete();
              setLoader(false);
              toggleModal();
            }}
          >
            <Text
              style={{
                color: COLORS.appPrimary,
                backgroundColor: "black",
                padding: 5,
                textAlign: "center",
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.4,
              marginVertical: windowHeight * 0.01,
            }}
            onPress={() => {
              //open multi date select
              toggleModal();
            }}
          >
            <Text
              style={{
                color: COLORS.appPrimary,
                backgroundColor: "black",
                padding: 5,
                textAlign: "center",
              }}
            >
              Multi-map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.4,
              marginVertical: windowHeight * 0.01,
            }}
            onPress={() => {
              toggleModal();
            }}
          >
            <Text
              style={{
                color: COLORS.appPrimary,
                backgroundColor: "black",
                padding: 5,
                textAlign: "center",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default AddRotineScreen;
const styles = StyleSheet.create({
  containers: { flex: 1, backgroundColor: "#000" },
  container1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: windowWidth / 15,
  },
  text__Heading: {
    textAlign: "center",
    color: "#00ff5f",
    fontSize: 20,
  },
  text: { color: "#707070", fontSize: 15, paddingLeft: windowWidth / 95 },
  text1: {
    color: "#707070",
    fontSize: 16,
    paddingLeft: windowWidth / 90,
    marginVertical: windowWidth / 70,
  },
  text3: {
    color: "#fff",
    fontSize: 18,
    paddingLeft: windowWidth / 90,
    marginVertical: windowWidth / 90,
  },
  text2: {
    color: COLORS.appPrimary,
    fontSize: 18,
    textAlign: "center",
    borderRadius: 10,
    width: "80%",
    paddingVertical: 10,
    marginHorizontal: "auto",
  },
  btnPrimary: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: windowWidth / 80,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container3: {
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 10,
    padding: windowWidth / 20,
    margin: windowWidth / 50,
  },
});
