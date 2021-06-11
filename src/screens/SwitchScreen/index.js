import * as React from "react";
import { Actions } from "react-native-router-flux";
import { auth, db } from "../../components/Firebase/firebaseApi";
import * as SecureStore from 'expo-secure-store';
import { View, Image, SafeAreaView, ScrollView, Text } from "react-native";
import COLORS from "../../consts/color";
import STYLES from "./styles";
export default function SwitchScreen() {

    SecureStore.getItemAsync('uid').then((resp) => {
        if (resp) {
            let email;
            let password;
            SecureStore.getItemAsync('userEmail').then((mail) => {
                email = mail;
                SecureStore.getItemAsync('userPassword').then((pass) => {
                    password = pass;
                    auth.signInWithEmailAndPassword(email, password).then((user) => {
                        if (user) {
                            db.collection("users").doc(user.user.uid).get().then((doc) => {
                                if (doc.data().userType === "") {
                                    Actions.registerCategory();
                                } else if (doc.data().userName === "") {
                                    Actions.usernameRegistry();
                                } else {
                                    Actions.homeScreen();
                                }
                            }).catch((e) => {
                                console.log(e);
                            });
                        } else {
                            Actions.FirstScreen();
                        }
                    });
                }).catch((e) => {
                    console.log(e);
                });
            });
        } else {
            Actions.FirstScreen();
        }
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={STYLES.scrollView}
            >
                <View style={STYLES.scrollInnerView}>
                    <Image
                        style={STYLES.logo}
                        source={require("../../../assets/Icons/Logo.png")}
                    ></Image>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
