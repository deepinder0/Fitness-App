import React, { useState } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import legs from "./legs.jpg";
import back from "./back.jpg";
import biceps from "./biceps.jpg";
import chest from "./chest.jpg";
import core from "./core.jpg";
import shoulder from "./shoulders.jpg";
import triceps from "./triceps.jpg";
import Navigator from "../../../Navigator";


export default function AddRotineScreen() {
  const [image1, setImage1] = useState(legs);
  const ChangeImage = (Image) => {
    setImage1(Image);
  };

  return (
    <View style={{ backgroundColor: "#000", display: "flex", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#000", display: "flex", flex: 1 }}>
        <View style={{ marginTop: "10%", padding: 10 }}>
          <Image
            style={{
              width: "100%",
              height: Dimensions.get("window").height * 0.625,
              borderWidth: 2,
              borderColor: "#85c61a",
            }}
            source={image1}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            textAlignVertical: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => ChangeImage(legs)}>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.361,
                height: Dimensions.get("window").height * 0.203,
                borderWidth: 2,
                borderColor: "#85c61a",
              }}
              source={legs}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChangeImage(back)}>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.361,
                height: Dimensions.get("window").height * 0.203,
                borderWidth: 2,
                borderColor: "#85c61a",
              }}
              source={back}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChangeImage(core)}>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.361,
                height: Dimensions.get("window").height * 0.203,
                borderWidth: 2,
                borderColor: "#85c61a",
              }}
              source={core}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            textAlignVertical: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => ChangeImage(chest)}>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.361,
                height: Dimensions.get("window").height * 0.203,
                borderWidth: 2,
                borderColor: "#85c61a",
              }}
              source={chest}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChangeImage(shoulder)}>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.361,
                height: Dimensions.get("window").height * 0.203,
                borderWidth: 2,
                borderColor: "#85c61a",
              }}
              source={shoulder}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChangeImage(triceps)}>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.361,
                height: Dimensions.get("window").height * 0.203,
                borderWidth: 2,
                borderColor: "#85c61a",
              }}
              source={triceps}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
