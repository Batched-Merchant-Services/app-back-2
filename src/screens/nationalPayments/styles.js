import { StyleSheet } from 'react-native';
import { verticalScale,scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  carouselItem: {
    height         : verticalScale(470),
    borderRadius   : 5
  },

  buttonListContact: {
    backgroundColor: 'rgba(74, 86, 180, .25)',
    height         : verticalScale(45),
    borderRadius   : verticalScale(8)
  },
  badge: {
    borderWidth: 1,
    position   : 'absolute',
    right      : 45,
    top        : -verticalScale(9)
  },
  viewBtnFloating: {
    width   : '100%',
    position: 'absolute',
    bottom  : 30
  },
  viewInfoCntc: {
    alignItems    : 'center',
    justifyContent: 'center'
  },
  heightLinear: {
    height: verticalScale(108)
  },
  onShare: {
    position: 'absolute',
    top  : 5,
    width: verticalScale(30),
    height: verticalScale(30),
    borderRadius: verticalScale(30),
    alignItems    : 'center',
    justifyContent: 'center'
  },

  containerModal: {
    width          : scale(325), 
    height         : verticalScale(520), 
    borderRadius   : 8 
  },
  buttonClose:{
    borderRadius: verticalScale(30),
    backgroundColor:'#232E65',
    width: scale(30),
    height: verticalScale(30),
    alignItems:'center',
    justifyContent: 'center'
  },
  containerClose:{
    alignItems: 'flex-end', 
    right: 10, 
    top: 10
  }
 
});

export default styles;
