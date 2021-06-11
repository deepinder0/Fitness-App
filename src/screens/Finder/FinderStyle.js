import COLORS from '../../consts/color';
import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const STYLES = StyleSheet.create({
    textFollow: {
        color: COLORS.appPrimary,
        fontSize: 11,
        marginTop: 2,
        fontWeight: 'bold'
    },
    buttonFollow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black',
        alignContent: 'center',
        borderColor: COLORS.appPrimary,
        borderRadius: 19,
        borderWidth: 1,
        marginTop: 10,
        width: 70,
        height: 25
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignContent: 'center'
    },
    titleStyle: {
        margin: 10,
        fontSize: 20,
        color: COLORS.appPrimary,
        backgroundColor: 'black',
    },
    cardStyle: {
        backgroundColor: 'transparent',
        padding: 10,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        margin: 0,
        borderWidth: 1,
        borderColor: '#696969',
    },
    cardHeadingStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeadingTextStyle: {
        marginLeft: 8,
        color: COLORS.appPrimary,
        fontWeight: 'bold',
        fontSize: 26,
    },
    childViewTextStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    touchableHighlight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderColor: COLORS.appPrimary,
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 5,
        width: windowWidth/4,
        height: windowHeight/18.3
    },
    listViewText: {
        color: 'white',
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 10,
    },
    listViewTextAdd: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 12,
    },
    buttonIcons: {
        flexDirection: 'column',
        paddingVertical: 4
    },
    buttonView: {
        marginVertical: 8,
        marginHorizontal: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    iconView: {
        flexDirection: 'row',
        margin: 3
    },
    iconListView: {
        flexDirection: 'column',
        marginLeft: 5
    },
    imageContainer: {
        width: 85,
        height: 85,
        borderRadius: 40,
        borderColor: COLORS.appPrimary,
        borderWidth: 2,
        right: 6
    },
    imageContainerView: {
        right: 5,
        position: 'absolute',
        marginTop: 4
    }
});
export default STYLES;

