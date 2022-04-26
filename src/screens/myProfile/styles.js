import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
const HEADER_MAX_HEIGHT = verticalScale(390);

const styles = StyleSheet.create({
  
  viewInfoCntc: {
    flex: 1
  },
  buttonInformation: {
    width          : verticalScale(22),
    height         : verticalScale(22),
    borderRadius   : verticalScale(30)
  },
  navBarIOS: {
    marginTop: (Platform.OS === 'ios') ? verticalScale(30) : 0
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  imageContainer: {
    flex: 1,
    width: null, height: null,
    resizeMode: 'cover',
    opacity: 0.5,
    borderRadius:75
  },
  imageProfile: {
    flex: 1,
    width: null, height: null,
    resizeMode: 'cover',
    borderRadius:75
  },
  imageProfileNull: {
    flex: 1,
    width:verticalScale(132), 
    height: verticalScale(132) , 
    resizeMode: 'cover',
    borderRadius: verticalScale(66),
  },
  photoProfile:{
    width:verticalScale(132), 
    height: verticalScale(132) , 
    borderRadius: verticalScale(132), 
  },
  photoProfileNull:{
    width: verticalScale(132), 
    height: verticalScale(132) , 
    borderRadius:verticalScale(132), 
    //borderColor:'#E4E9EE', 
    borderWidth:1,
    backgroundColor:'white'
  },
  // imageID:{
  //   width:'100%',
  //   height: verticalScale(200),
  //   borderColor: '#8C8C8C',
  //   borderWidth: 1,
  //   borderRadius:5,
  //   justifyContent: 'center',
  //   backgroundColor:'white'
  // },
  // buttonRight: {
  //   width          : verticalScale(35), 
  //   height         : verticalScale(35),
  //   backgroundColor: '#fff',
  //   borderRadius   : verticalScale(30),
  //   justifyContent : 'center',
  //   alignItems     : 'center'
  // },
  circleLevel: {
    width         : verticalScale(100),
    height        : verticalScale(100),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  containerId: {
    width               : '100%',
   //backgroundColor     : '#37458B',
    borderTopLeftRadius : 6,
    borderTopRightRadius: 6
  },
  containerBottomId: {
    width                  : '100%',
    //backgroundColor        : Colors.textBlueDark,
    borderBottomLeftRadius : 6,
    borderBottomRightRadius: 6
  },
  containerValidateId: {
    width               : '100%',
    //backgroundColor     : '#37458B',
    borderTopLeftRadius : 6,
    borderTopRightRadius: 6
  },
  aceptCard: {
    width                  : '100%',
    //backgroundColor        : '#139CB2',
    borderBottomLeftRadius : 6,
    borderBottomRightRadius: 6
  },
  warningCard: {
    width                  : '100%',
    //backgroundColor        : '#E5A324',
    borderBottomLeftRadius : 6,
    borderBottomRightRadius: 6
  },
  aceptBorder: {
    borderWidth : 1,
    borderColor : '#139CB2',
    borderRadius: 6,
  },
  warningBorder: {
    borderWidth : 1,
    //borderColor : '#E5A324',
    borderRadius: 6,
  },
  accept: {
    backgroundColor: '#139CB2',
    borderRadius   : verticalScale(12),
    position       : 'absolute',
    top            : verticalScale(-225),
    zIndex         : 0.4 
  },
  warning: {
    position: 'absolute',
    top     : verticalScale(-225),
    zIndex  : 0.4,
    right   : scale(-10)
  }

});

export default styles;
