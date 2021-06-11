import COLORS from '../../consts/color';
import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STYLES = StyleSheet.create({
  scrollView: {
    paddingHorizontal:15,
  },

  scrollInnerView: { 
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    flex: 1,
    aspectRatio: 3, 
    marginTop: '60%',
    resizeMode: 'contain',
  }
});

export default STYLES;