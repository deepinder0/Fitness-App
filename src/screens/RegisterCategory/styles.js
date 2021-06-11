import COLORS from '../../consts/color';
import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STYLES = StyleSheet.create({

  formContainer: {
    marginTop: 0.1 * windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnPrimary: {
    borderColor: COLORS.appPrimary,
    width: windowWidth * 0.59,
    height: windowHeight * 0.083,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },

  scrollView: {
    paddingHorizontal:15,
  },

  scrollInnerView: { 
    flexDirection: 'column',
    marginTop: windowHeight * .20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  welcomeText: {
    color: COLORS.appPrimary,
    fontSize: 20
  },

  noteText: {
      color: "#707070",
      marginTop: windowHeight *.06,
      fontSize: 16
  }
});

export default STYLES;