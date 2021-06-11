import React, {useState} from 'react';

import {  StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import COLORS from '../../../consts/color';
import { color } from 'react-native-reanimated';
const Comment = (props) => {
    const {comment, commentId} = props;
    return (
        <View>
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={'../../../../assets/users/user-1.jpg'}
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.name}>
                    {comment}{commentId}
                    </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }} >
                    <Text style={{color: COLORS.appPrimary}}>{comment}</Text>
                    
                        <TouchableOpacity 
                            style={{ position: 'absolute', right: 0 }}
                            onPress={() => console.log('delete')}
                        >
                            <MaterialCommunityIcons 
                                name="delete"
                                size={20}
                                color='red'
                            />
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC",
        color: COLORS.appPrimary
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.appPrimary
    },
});

export default Comment;