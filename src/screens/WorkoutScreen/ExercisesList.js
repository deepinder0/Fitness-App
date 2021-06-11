import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ToastAndroid,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import { db, auth } from "../../components/Firebase/firebaseApi";

const windowWidth = Dimensions.get("window").width;

function ExercisesList(props) {
  let userId = auth.currentUser.uid;
  const [data, setData] = useState([]);
  // let previousSets = [];
  // const backActionHandler = () => {
  //   props.navigation.goBack(), Actions.AddRotineScreen();

  //   return true;
  // };

  // useEffect(() => {
  //   // Add event listener for hardware back button press on Android
  //   BackHandler.addEventListener("hardwareBackPress", backActionHandler);

  //   return () =>
  //     // clear/remove event listener
  //     BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  // }, []);

  useEffect(() => {
    const newArray = props.list
      ? props.list.map((e) => {
          return {
            ...e,
            seleted: false,
          };
        })
      : [];
    setData(newArray);
  }, []);

  const onValueChange = (item, index) => {
    const newData = data.map((e) => {
      if (e.id === item.id) {
        return {
          ...e,
          seleted: !e.seleted,
        };
      }
      return {
        ...e,
        seleted: e.seleted,
      };
    });
    setData(newData);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onValueChange(item, index)}>
        <View style={styles.item}>
          <Image style={styles.image} source={{ uri: item.Thumbnail }} />
          <View style={styles.wrapText}>
            <Text style={styles.textcolor}>{item.ExerciseName}</Text>
            <Text style={styles.textcolor1}>{item.BodyPart}</Text>
          </View>
          <View>
            <CheckBox
              isChecked={item.seleted}
              style={styles.checkBox}
              onClick={() => {
                onValueChange(item, index);
              }}
              checkBoxColor="#00ff5f"
              checkedCheckBoxColor="#00ff5f"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onClick = async () => {
    // let tempPreviousSets = [];
    const listSelected = data.filter((e) => e.seleted == true);
    // previousSets = await Promise.all(
    //   listSelected.map(async (exercise) => {
    //     await db
    //       .collection("users")
    //       .doc(userId)
    //       .collection("Exercises")
    //       .doc(exercise.id)
    //       .get()
    //       .then((doc) => {
    //         return (tempPreviousSets = doc.data().PreviousExercises);
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //         return (tempPreviousSets = [{kg: 0, reps: 0}])
    //       });
    //     return tempPreviousSets;
    //   })
    // ).catch((error)=> {
    //   ToastAndroid.show("Unable to connect, Please try later !!", ToastAndroid.LONG);
    //   console.log(error);
    // });
    const selectedEx = props.selectedExercises ? props.selectedExercises : [] ;

    const newlistSelected = listSelected.map((e, index) => {
      return {
        ...e,
        fields: [
          {
            previous: {kg: 0, reps: 0},
            value1: 0,
            value2: 0,
            tick: false,
          },
        ],
        notes: [{ valueOfnote: "Note" }],
      };
    });

    newlistSelected.push(...selectedEx);
    Actions.ExerciseSets({
      list1: newlistSelected,
      navigation: props.navigation,
      list: props.list,
      previousSets: props.previousSets,
      startDate: props.selectedDate,
    });
  };

  return (
    <View style={styles.containers}>
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack(), Actions.AddRotineScreen();
          }}
          style={{ marginLeft: windowWidth / 90 }}
        >
          <AntDesign name="left" size={20} color="#00ff5f" />
        </TouchableOpacity>
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text style={styles.text__Heading}>EXERCISES LIST</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.container2__1}>
          <View style={styles.container2__2}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack(), Actions.AddRotineScreen();
              }}
            >
              <Entypo name="cross" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.container2__3}>
              <FontAwesome
                name="search"
                size={20}
                color="gray"
                style={{ paddingLeft: 10 }}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor="gray"
                style={{ paddingLeft: 10 }}
              />
            </View>
          </View>
          <SafeAreaView style={styles.container3}>
            <FlatList
              style={styles.list}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => `key-${item.id}`}
              extraData={data}
            />
            <TouchableOpacity
              onPress={() => {
                const isExerciseSelected = data.filter(
                  (e) => e.seleted == true
                );
                isExerciseSelected.length == 0
                  ? ToastAndroid.show(
                      "Please select Exercise",
                      ToastAndroid.LONG
                    )
                  : onClick();
              }}
            >
              <View style={styles.wrapButtun}>
                <Text
                  style={{
                    color: "#00ff5f",
                    paddingVertical: 10,
                    textAlign: "center",
                  }}
                >
                  ADD EXERCISE
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

export default ExercisesList;
const styles = StyleSheet.create({
  containers: { flex: 1, backgroundColor: "#000" },
  container1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: windowWidth / 15,
    paddingVertical: windowWidth / 50,
  },
  text__Heading: {
    textAlign: "center",
    color: "#00ff5f",
    fontSize: 20,
  },
  container2: { backgroundColor: "#3a3a3a", display: "flex", flex: 1 },

  container2__1: {
    backgroundColor: "black",
    flex: 1,
    marginHorizontal: windowWidth / 14,
    marginTop: windowWidth / 10,
    borderWidth: 2,
    borderColor: "#000",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container2__2: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 10,
  },
  container2__3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
  },
  container3: {
    flex: 1,
    backgroundColor: "#000",
  },
  list: {
    flex: 1,
    padding: 8,
  },
  wrapButtun: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    textAlignVertical: "center",
    justifyContent: "space-around",
    padding: 4,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  wrapText: {
    flex: 1,
    marginLeft: 8,
  },
  textcolor: { color: "#00ff5f" },
  textcolor1: { color: "gray", opacity: 0.5 },

  checkBox: {
    width: 20,
    height: 20,
    marginTop: 4,
    marginRight: 10,
  },
});
