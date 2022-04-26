import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

export default StyleSheet.create({
  biometricModalContainer: {
    borderRadius     : 15,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 10
  },
  menuWrapper: {  
    height: '100%' 
  },
  menuHeader : {
    marginLeft    : scale(22),
    marginTop     : getStatusBarHeight() + verticalScale(12),
    justifyContent: 'space-between'
  },
  menuEl      : { width: '100%' },
  menuText    : { justifyContent: 'space-between' },

  buttonBack: {
  },
  textTitle: {
    fontSize: 16, 
    top     : 5
  },
  circleLevel: {
    width         : verticalScale(100),
    height        : verticalScale(100),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  viewInfoCntc: {
    flex      : 1,
    alignItems: 'center',
  },
  containerView: {
    height: verticalScale(475)
  },
  containerModal: {
    width          : scale(315), 
    height         : verticalScale(515), 
    borderRadius   : 8 
  },
  touchableButton: {
    width         : '100%',
    height        : '100%', 
    alignItems    : 'center', 
    justifyContent: 'center'
  },
  containerLevel: {
    width         : verticalScale(54), 
    height        : verticalScale(24), 
    borderRadius  : verticalScale(30),
    alignContent  : 'center',
    justifyContent: 'center'
  },
  containerShow:{
    width   : verticalScale(25),
    height  : verticalScale(25),
    backgroundColor:'white',
    borderRadius:verticalScale(30), 
    alignItems:'center',
    justifyContent:'center'
  }
});
