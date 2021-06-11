
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import COLORS from '../consts/color';
import { View, Image } from "react-native";
import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Loader(props) {
    const style = StyleSheet.create({
        center: {
            marginLeft: windowWidth * .45,
            marginTop: windowHeight * .45
        }
    });
    return (
        <Spinner
            visible={props.show}
        >
        <View style={style.center}>
        <Image
            source={require('../../assets/Images/loading.gif')}
            />
        </View>
    </Spinner>
    );
}