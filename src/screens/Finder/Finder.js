import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import STYLES from "../Finder/FinderStyle";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Card } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import COLORS from "../../consts/color";
import { Actions } from "react-native-router-flux";

const listOfTrainers = [
  {
    id: 0,
    key: 0,
    name: "Manjot Singh",
    icon: "av-timer",
    uri:
      "https://media.gettyimages.com/photos/wrestler-batista-during-his-world-heaveyweight-wwe-championship-match-picture-id75998170?s=2048x2048",
    quality: "Body Building",
    crossFit: "Cross Fit",
    organisation: "HIIT",
    address: "SUB ZERO, Sec 9\n Chandigarh",
  },
  {
    id: 1,
    key: 1,
    name: "Rishi Datt",
    icon: "av-timer",
    uri:
      "https://media.gettyimages.com/photos/wrestler-batista-during-his-world-heaveyweight-wwe-championship-match-picture-id75998170?s=2048x2048",
    quality: "Yoga",
    crossFit: "Cross Fit",
    organisation: "HIIT",
    address: "Cult Fitness, Sec 9\n Chandigarh",
  },
  {
    id: 2,
    key: 2,
    name: "Angad Singh",
    icon: "av-timer",
    uri:
      "https://media.gettyimages.com/photos/wrestler-batista-during-his-world-heaveyweight-wwe-championship-match-picture-id75998170?s=2048x2048",
    quality: "HIIT",
    crossFit: "Cross Fit",
    organisation: "HIIT",
    address: "Sub Zero,Sec 9\n Chandigarh",
  },
  {
    id: 3,
    key: 3,
    name: "Manjot Singh",
    icon: "av-timer",
    uri:
      "https://media.gettyimages.com/photos/wrestler-batista-during-his-world-heaveyweight-wwe-championship-match-picture-id75998170?s=2048x2048",
    quality: "Body Building",
    crossFit: "Cross Fit",
    organisation: "HIIT",
    address: "Sub Zero,Sec 9\n Chandigarh",
  },
];
const Finder = () => {
  return (
    <SafeAreaView style={STYLES.container}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text style={STYLES.titleStyle}>TRAINER AROUND ME</Text>
      </View>
      <ScrollView>
        <View style={{ marginTop: 25, marginLeft: 10, marginRight: 10 }}>
          <SingleRow
            name={listOfTrainers[0].name}
            uri={listOfTrainers[0].uri}
            quality={listOfTrainers[0].quality}
            crossFit={listOfTrainers[0].crossFit}
            organisation={listOfTrainers[0].organisation}
            address={listOfTrainers[0].address}
          />
          <SingleRow
            name={listOfTrainers[1].name}
            uri={listOfTrainers[1].uri}
            quality={listOfTrainers[1].quality}
            crossFit={listOfTrainers[1].crossFit}
            organisation={listOfTrainers[1].organisation}
            address={listOfTrainers[1].address}
          />
          <SingleRow
            name={listOfTrainers[2].name}
            uri={listOfTrainers[2].uri}
            quality={listOfTrainers[2].quality}
            crossFit={listOfTrainers[2].crossFit}
            organisation={listOfTrainers[2].organisation}
            address={listOfTrainers[2].address}
          />
          <SingleRow
            name={listOfTrainers[3].name}
            uri={listOfTrainers[3].uri}
            quality={listOfTrainers[3].quality}
            crossFit={listOfTrainers[3].crossFit}
            organisation={listOfTrainers[3].organisation}
            address={listOfTrainers[3].address}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SingleRow = (props) => {

  return (
    <View>
      <View>
        <Card containerStyle={STYLES.cardStyle}>
          <TouchableOpacity
            style={STYLES.cardHeadingStyle}
            onPress={() => {
              Actions.TrainerProfile();
            }}
          >
            <Text style={STYLES.cardHeadingTextStyle}>{props.name}</Text>
          </TouchableOpacity>
          <View style={STYLES.imageContainerView}>
            <Image
              source={{
                uri: props.uri,
              }}
              style={STYLES.imageContainer}
            />
            <TouchableHighlight style={STYLES.buttonFollow}>
              <Text style={STYLES.textFollow}>FOLLOW</Text>
            </TouchableHighlight>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={STYLES.iconListView}>
              <View style={STYLES.iconView}>
                <MaterialIcons
                  name="accessibility"
                  color={COLORS.appPrimary}
                  size={13}
                />
                <Text style={STYLES.listViewText}>{props.quality}</Text>
              </View>
              <View style={STYLES.iconView}>
                <Ionicons
                  name="aperture-outline"
                  color={COLORS.appPrimary}
                  size={13}
                />
                <Text style={STYLES.listViewText}>{props.crossFit}</Text>
              </View>
              <View style={STYLES.iconView}>
                <Ionicons
                  name="timer-outline"
                  color={COLORS.appPrimary}
                  size={13}
                />
                <Text style={STYLES.listViewText}>{props.organisation}</Text>
              </View>
              <View style={STYLES.iconView}>
                <Ionicons
                  name="document-sharp"
                  color={COLORS.appPrimary}
                  size={28}
                />
                <Text style={STYLES.listViewTextAdd}>{props.address}</Text>
              </View>
            </View>
          </View>
          <View style={STYLES.buttonContainer}>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}

            <View style={STYLES.buttonView}>
              <TouchableHighlight
                style={STYLES.touchableHighlight}
                onPress={() => {
                  Linking.openURL("tel: +91 9999999999");
                }}
              >
                <View style={STYLES.buttonIcons}>
                  <FontAwesome
                    name={"phone"}
                    color={COLORS.appPrimary}
                    size={21}
                  />
                </View>
              </TouchableHighlight>
              <View style={STYLES.childViewTextStyle}></View>
            </View>
            <View style={STYLES.buttonView}>
              <TouchableHighlight
                style={STYLES.touchableHighlight}
                onPress={() => {}}
              >
                <View style={STYLES.buttonIcons}>
                  <Ionicons
                    name={"location"}
                    color={COLORS.appPrimary}
                    size={21}
                  />
                </View>
              </TouchableHighlight>
              <View style={STYLES.childViewTextStyle}></View>
            </View>
            <View style={STYLES.buttonView}>
              <TouchableHighlight
                style={STYLES.touchableHighlight}
                onPress={() => {}}
              >
                <View style={STYLES.buttonIcons}>
                  <MaterialIcons
                    name={"message"}
                    color={COLORS.appPrimary}
                    size={21}
                  />
                </View>
              </TouchableHighlight>
              <View style={STYLES.childViewTextStyle}></View>
            </View>
            {/* </ScrollView> */}
          </View>
        </Card>
      </View>
    </View>
  );
};

// function Finder() {
//     return (
//         <FinderStack.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <FinderStack.Screen name="FinderList" component={FinderList} />
//             <FinderStack.Screen name="TrainerProfile" component={TrainerProfile} />
//         </FinderStack.Navigator>
//     );
// }
export default Finder;
