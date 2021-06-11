import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import FitApp from './homeScreen';

const { width } = Dimensions.get("window");


//It is based on react navigatin 4

const CustomDrawerNavigation = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
                <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/Icons/Logo.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
                </View>
                <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>User</Text>
                </View>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
            <View style={{ alignItems: "center", bottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginRight: 15 }}>
                        <Ionicons name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Ionicons name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const Drawer = createDrawerNavigator({
    Home: {
        screen: FitApp,
        navigationOptions: {
            title: 'Homepage'
        }
    },
    Settings: {
        screen: FitApp,
        navigationOptions: {
            title: 'Settings'
        }
    },
    Notifications: {
        screen: FitApp,
        navigationOptions: {
            title: 'Notifications'
        }
    },
    News: {
        screen: FitApp,
        navigationOptions: {
            title: 'News'
        }
    }
},
    {
        drawerPosition: 'left',
        contentComponent: CustomDrawerNavigation,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        drawerWidth: (width / 3) * 2
    });

    
// const DrawerNavigatorMenu = createAppContainer(Drawer);

// export default DrawerNavigatorMenu;