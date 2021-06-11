import * as React from "react";
import { Text, View } from "react-native";


const SettingsScreen = (props) => {
  const a = props.show ? ("flex") : ("none"); 
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
        display: a ,
        }}
    >
      <Text>Settings!</Text>
    </View>
  );
};
export default SettingsScreen;
