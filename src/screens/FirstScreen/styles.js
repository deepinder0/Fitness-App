import COLORS from '../../consts/color';
import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STYLES = StyleSheet.create({
  inputContainer: { 
    flexDirection: 'row', 
    marginTop: 20, 
  },

  btCreate: {
    backgroundColor: "black",
    width: windowWidth * 0.59,
    height: windowHeight * 0.083,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  },

  input: {
    color: COLORS.white,
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
    marginTop: 0.15 * windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnPrimary: {
    backgroundColor: "black",
    borderColor: COLORS.appPrimary,
    borderWidth: 1,
    width: windowWidth * 0.59,
    height: windowHeight * 0.083,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
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
    width: 60, 
    height: 60, 
    marginLeft: 43,
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
    flexDirection: 'row',
    marginTop: 40,
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
  logo: {
    flex: 1,
    aspectRatio: 4, 
    marginTop: '15%',
    resizeMode: 'contain',
  }
});

export default STYLES;