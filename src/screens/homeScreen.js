import * as React from "react";
import { useState, useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "../consts/color";
import SettingsScreen from "./SettingsScreen/SettingsScreen";
import Namo from "./WorkoutScreen/Namo";
import AddRotineScreen from "./AddRotineScreen/AddPost";
import Finder from "./Finder/Finder";
import PostsScreen from "./PostsScreen/PostsScreen";
import UserProfile from "../components/userProfile";
import * as SecureStore from "expo-secure-store";
import Header from "../components/Header"

const Tab = createBottomTabNavigator();
export default function HomeScreen() {
  let userId;
  SecureStore.getItemAsync("uid").then((resp) => {
    userId = resp;
  });
  const backActionHandler = () => {
    console.log(userId);
    Alert.alert("Alert!", "Are you sure you want to Quit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => BackHandler.exitApp()(),
      },
    ]);
    return true;
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);
  const setting = state1 ? "flex" : "none";

  return (
    <NavigationContainer>
    <Header/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return (
                <Ionicons
                  name={focused ? "ios-home" : "ios-home-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Namo") {
              return (
                <Ionicons
                  name={focused ? "barbell" : "barbell-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "AddRotine") {
              return (
                <Ionicons
                  name={focused ? "add-circle" : "add-circle-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Finder") {
              return (
                <Ionicons
                  name={focused ? "location" : "location-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Profile") {
              return (
                <Ionicons
                  name={focused ? "person-circle" : "person-circle-outline"}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: COLORS.appPrimary,
          inactiveTintColor: "gray",
          labelStyle: {
            display: "none",
          },
          style: {
            backgroundColor: COLORS.navBack,
          },
        }}
      >
        <Tab.Screen name="Home" component={PostsScreen} key={PostsScreen} />
        <Tab.Screen name="Namo" component={Namo} key={Namo} />
        <Tab.Screen
          name="AddRotine"
          component={AddRotineScreen}
          key={AddRotineScreen}
        />
        <Tab.Screen name="Finder" component={Finder} key={Finder} />
        <Tab.Screen name="Profile" component={UserProfile} key={UserProfile} />
      </Tab.Navigator>
      <SettingsScreen show={state} />
    </NavigationContainer>
  );
}
