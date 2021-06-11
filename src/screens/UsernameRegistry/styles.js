import COLORS from '../../consts/color';
import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STYLES = StyleSheet.create({
  inputContainer: { 
    flexDirection: 'row',
    marginTop: 0.03 * windowHeight,
  },

  input: {
    color: COLORS.appPrimary,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: COLORS.appPrimary,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18
  },

  inputIcon: {
    marginTop: 5,
    position: 'absolute' 
  },

  formContainer: {
    marginTop: 0.05 * windowHeight,
    marginRight: 0.08 * windowWidth,
    marginLeft: 0.08 * windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnPrimary: {
    borderColor: COLORS.appPrimary,
    width: windowWidth * 0.59,
    height: windowHeight * 0.080,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },

  btnSecondary: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: COLORS.appPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
  },

  dropDown: {
    marginVertical: 1, 
    marginTop: 10, 
    padding: 10, 
    backgroundColor: 'transparent',
    borderColor: COLORS.appPrimary
  },

  dropDownLabel: {
    fontSize: 19,
    textAlign: 'left',
    color: COLORS.appPrimary
  },

  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute'
  },

  btnImage: { 
    width: 30, 
    height: 30, 
    marginLeft: 5,
    marginTop: 2 
  },

  line: { 
    height: 1,
    width: 30,
    backgroundColor: COLORS.appPrimary 
  },

  scrollView: {
    paddingHorizontal:15,
  },

  signupView: { 
    marginTop: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  signupText: {
    fontSize: 19, 
    fontWeight: 'bold', 
    color: COLORS.white
  },

  scrollInnerView: { 
    flexDirection: 'column',
    marginTop: windowHeight * .05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInNote: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 10
  },
  welcomeText: {
    color: COLORS.appPrimary,
    fontSize: 20
  },
  noteText: {
      color: "#707070",
      marginTop: windowHeight *.01,
      fontSize: 16
  }
});

export default STYLES;